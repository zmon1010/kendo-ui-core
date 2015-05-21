
using System;
using Mono.Cecil;
using System.IO;
using ApiChange.Infrastructure;

namespace ApiChange.Api.Introspection
{
    public class AssemblyLoader
    {
        static TypeHashes myType = new TypeHashes(typeof(AssemblyLoader));

        static bool IsManagedCppAssembly(AssemblyDefinition assembly)
        {
            foreach (ModuleDefinition mod in assembly.Modules)
            {
                foreach (AssemblyNameReference assemblyRef in mod.AssemblyReferences)
                {
                    if (assemblyRef.Name == "Microsoft.VisualC")
                    {
                        // Managed C++ targets are not supported by Mono Cecil skip all targets 
                        // which reference the C-Runtime
                        return true;
                    }
                }
            }

            return false;
        }

        public static AssemblyDefinition LoadCecilAssembly(string fileName, bool immediateLoad = false)
        {
            using (Tracer t = new Tracer(Level.L5, myType, "LoadCecilAssembly"))
            {
                var fileInfo = new FileInfo(fileName);
                if (fileInfo.Length == 0)
                {
                    t.Info("File {0} has zero byte length", fileName);
                    return null;
                }

                try
                {
                    var pdbPath = Path.ChangeExtension(fileName, "pdb");
                    var readingMode = immediateLoad ? ReadingMode.Immediate : ReadingMode.Deferred;
                    var assemblyResolver = new DefaultAssemblyResolver();
                    assemblyResolver.AddSearchDirectory(fileInfo.Directory.FullName);
                    var readerParameters = new ReaderParameters {ReadSymbols = File.Exists(pdbPath), ReadingMode = readingMode, AssemblyResolver = assemblyResolver};
                    var assemblyDef = AssemblyDefinition.ReadAssembly(fileName, readerParameters);

                    // Managed C++ assemblies are not supported by Mono Cecil
                    if (IsManagedCppAssembly(assemblyDef))
                    {
                        t.Info("File {0} is a managed C++ assembly", fileName);
                        return null;
                    }

                    return assemblyDef;
                }
                catch (BadImageFormatException) // ignore invalid PE files
                {

                }
                catch (IndexOutOfRangeException)
                {
                    t.Info("File {0} is a managed C++ assembly", fileName);
                }
                catch (NullReferenceException) // ignore managed c++ targets
                {
                    t.Info("File {0} is a managed C++ assembly", fileName);
                }
                catch (ArgumentOutOfRangeException)
                {
                    t.Info("File {0} is a managed C++ assembly", fileName);
                }
                catch (Exception ex)
                {
                    t.Error(Level.L1, "Could not read assembly {0}: {1}", fileName, ex);
                }

                return null;
            }
        }
    }
}
