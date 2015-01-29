namespace Kendo.Mvc.Infrastructure.Implementation
{
    using System;
    using System.Collections.Generic;
    using System.IO;
    using System.Reflection;
    using System.Threading;
    using Microsoft.CodeAnalysis;
    using Microsoft.CodeAnalysis.CSharp;
    using Microsoft.CodeAnalysis.CSharp.Syntax;
    using Microsoft.CodeAnalysis.Emit;
    using Microsoft.Framework.Runtime;
    using Microsoft.Framework.Runtime.Infrastructure;

    internal class ClassFactory 
    {
        private readonly IAssemblyLoadContext loader;
        private int classCount;

        public static readonly ClassFactory Instance = new ClassFactory((IAssemblyLoadContextAccessor)CallContextServiceLocator.Locator.ServiceProvider.GetService(typeof(IAssemblyLoadContextAccessor)));

        private readonly ReaderWriterLockSlim rwLock;

        static ClassFactory() { }

        private ClassFactory(IAssemblyLoadContextAccessor loaderAccessor)
        {
            loader = loaderAccessor.GetLoadContext(typeof(ClassFactory).GetTypeInfo().Assembly);
            rwLock = new ReaderWriterLockSlim();
        }

        public Type GetDynamicClass(IEnumerable<DynamicProperty> properties)
        {
            string typeName = "DynamicClass" + (classCount + 1);

            var compilationUnit = SyntaxFactory.CompilationUnit()
              .AddUsings(SyntaxFactory.UsingDirective(SyntaxFactory.IdentifierName("System")));
            var baseTypeName = SyntaxFactory.ParseTypeName(typeof(DynamicClass).FullName);

            var c = SyntaxFactory.ClassDeclaration(typeName)
                .AddBaseListTypes(SyntaxFactory.SimpleBaseType(baseTypeName))
                .AddModifiers(SyntaxFactory.Token(SyntaxKind.PublicKeyword));

            foreach (var prop in properties)
            {
                c = c.AddMembers(CreateDynamicProperty(prop));
            }

            compilationUnit = compilationUnit.AddMembers(c);

            var compilation = Compilation(compilationUnit.SyntaxTree);

            rwLock.EnterWriteLock();
            try
            {
                classCount++;
            }
            finally
            {
                rwLock.ExitWriteLock();
            }

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
                else
                {
                    throw new Exception("Unable to build type" + typeName);
                }
            }
        }


        private CSharpCompilation Compilation(SyntaxTree syntaxTree)
        {
            var assemblyName = "DynamicClasses" + classCount;
            return CSharpCompilation.Create(assemblyName,
                        options: new CSharpCompilationOptions(OutputKind.DynamicallyLinkedLibrary),
                        syntaxTrees: new[] { syntaxTree },
                        references: new MetadataReference[] {
#if ASPNETCORE50
                            MetadataReference.CreateFromAssembly(typeof(object).GetTypeInfo().Assembly)
#else
                            MetadataReference.CreateFromAssembly(typeof(object).Assembly)
#endif
                        });
        }

        private static PropertyDeclarationSyntax CreateDynamicProperty(DynamicProperty property)
        {
            return SyntaxFactory.PropertyDeclaration(SyntaxFactory.ParseTypeName(property.Type.FullName), property.Name)
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
    }
}