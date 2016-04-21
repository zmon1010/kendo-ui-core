namespace Kendo.Mvc.Infrastructure.Implementation
{
    using System;
    using System.Collections.Generic;
    using System.IO;
    using System.Reflection;
    using System.Threading;
    using System.Linq;
    using Microsoft.CodeAnalysis;
    using Microsoft.CodeAnalysis.CSharp;
    using Microsoft.CodeAnalysis.CSharp.Syntax;
    using Microsoft.CodeAnalysis.Emit;
    using Microsoft.Extensions.PlatformAbstractions;
    using Microsoft.Dnx.Compilation.CSharp;
    using Microsoft.Dnx.Compilation;

    internal class ClassFactory
    {
        public static readonly ClassFactory Instance = new ClassFactory((IAssemblyLoadContextAccessor)CallContextServiceLocator.Locator.ServiceProvider.GetService(typeof(IAssemblyLoadContextAccessor)));

        private readonly IAssemblyLoadContext loader;
        private int classCount;
        private readonly ReaderWriterLockSlim rwLock;
        private static string TO_STRING_METHOD_TEMPLATE =
           "public override string ToString() " +
            "{" +
            "var props = this.GetType().GetProperties(System.Reflection.BindingFlags.Instance | System.Reflection.BindingFlags.Public); " +
            "var sb = new System.Text.StringBuilder();" +
            "sb.Append(\"{\"); " +
            "for (int i = 0; i < props.Length; i++) " +
            "{ " +
            "    if (i > 0) sb.Append(\", \"); " +
            "    sb.Append(props[i].Name); " +
            "    sb.Append(\"=\");" +
            "    sb.Append(props[i].GetValue(this, null));" +
            "} " +
            "sb.Append(\"}\"); " +
            "return sb.ToString(); " +
        "}";

        static ClassFactory() { }

        private ClassFactory(IAssemblyLoadContextAccessor loaderAccessor)
        {
            loader = loaderAccessor.GetLoadContext(typeof(ClassFactory).GetTypeInfo().Assembly);
            rwLock = new ReaderWriterLockSlim();
        }

        public Type GetDynamicClass(IEnumerable<DynamicProperty> properties)
        {
            string typeName = "DynamicClass" + (classCount + 1);

            var compilationUnit = DeclareCompilationUnit()
                .AddMembers(DeclareClass(typeName)
                    .AddMembers(properties.Select(DeclareDynamicProperty).ToArray())
                    .AddMembers(DeclareToStringMethod())
                );

            var compilation = CreateCompilation(compilationUnit.SyntaxTree);

            IncrementClassCounter();

            return EmitType(typeName, compilation);
        }

        private Type EmitType(string typeName, CSharpCompilation compilation)
        {
            using (var ms = new MemoryStream())
            {
                EmitResult result;
                result = compilation.Emit(ms);

                if (result.Success)
                {
                    ms.Seek(0, SeekOrigin.Begin);

                    var assembly = loader.LoadStream(ms, assemblySymbols: null);

                    return assembly.GetType(typeName);
                }

                throw new Exception("Unable to build type" + typeName);
            }
        }

        private void IncrementClassCounter()
        {
            rwLock.EnterWriteLock();
            try
            {
                classCount++;
            }
            finally
            {
                rwLock.ExitWriteLock();
            }
        }

        private ClassDeclarationSyntax DeclareClass(string typeName)
        {
            return SyntaxFactory.ClassDeclaration(typeName)
                    .AddModifiers(SyntaxFactory.Token(SyntaxKind.PublicKeyword));
        }

        private CompilationUnitSyntax DeclareCompilationUnit()
        {
            return SyntaxFactory.CompilationUnit()
              .AddUsings(SyntaxFactory.UsingDirective(SyntaxFactory.IdentifierName("System")));
        }

        private CSharpCompilation CreateCompilation(SyntaxTree syntaxTree)
        {
            var assemblyName = "DynamicClasses" + classCount;
            return CSharpCompilation.Create(assemblyName,
                        options: new CSharpCompilationOptions(OutputKind.DynamicallyLinkedLibrary),
                        syntaxTrees: new[] { syntaxTree },
                        references: GetReferences()
            );
        }

        private IEnumerable<MetadataReference> GetReferences()
        {
            var references = new List<MetadataReference>();

#if DNXCORE50
            var serviceProvider = CallContextServiceLocator.Locator.ServiceProvider;
            var libraryExporter = (ILibraryExporter)serviceProvider.GetService(typeof(ILibraryExporter));
            var libraryExport = libraryExporter.GetExport("System");
            if (libraryExport != null)
            {
                foreach (var metadataReference in libraryExport.MetadataReferences)
                {
                    var roslynReference = metadataReference as IRoslynMetadataReference;
                    if (roslynReference != null)
                    {
                        references.Add(roslynReference.MetadataReference);
                        break;
                    }

                    var fileMetadataReference = metadataReference as IMetadataFileReference;
                    if (fileMetadataReference != null)
                    {
                        var metadata = AssemblyMetadata.CreateFromStream(File.OpenRead(fileMetadataReference.Path));
                        references.Add(metadata.GetReference());
                        break;
                    }
                }
            }
#else
            references.Add(MetadataReference.CreateFromFile(typeof(object).Assembly.Location));
#endif
            if (references.Count == 0)
            {
                throw new InvalidOperationException("Unable to create MetadataReference");
            }

            return references;
        }

        private PropertyDeclarationSyntax DeclareDynamicProperty(DynamicProperty property)
        {
            var nonNullableType = Nullable.GetUnderlyingType(property.Type);

            var propertyType = nonNullableType == null ?
                SyntaxFactory.ParseTypeName(property.Type.FullName) :
                SyntaxFactory.NullableType(SyntaxFactory.ParseTypeName(nonNullableType.FullName));
           
            return SyntaxFactory.PropertyDeclaration(propertyType, property.Name)
                .WithModifiers(SyntaxFactory.TokenList(SyntaxFactory.Token(SyntaxKind.PublicKeyword)))
                .WithAccessorList(
                    SyntaxFactory.AccessorList(
                        SyntaxFactory.List(new[] {
                            SyntaxFactory.AccessorDeclaration(SyntaxKind.GetAccessorDeclaration)
                                .WithSemicolonToken(SyntaxFactory.Token(SyntaxKind.SemicolonToken)),
                            SyntaxFactory.AccessorDeclaration(SyntaxKind.SetAccessorDeclaration)
                                .WithSemicolonToken(SyntaxFactory.Token(SyntaxKind.SemicolonToken))
                            })
                ));
        }

        private MethodDeclarationSyntax DeclareToStringMethod()
        {
            return CSharpSyntaxTree
                .ParseText(TO_STRING_METHOD_TEMPLATE)
                .GetRoot()
                .ChildNodes()
                .First() as MethodDeclarationSyntax;
        }
    }
}