using System.Collections.Generic;
using System.IO;
using System.Reflection;
using Mono.Cecil;
using Mono.Cecil.Pdb;

namespace ApiChange.Api.Scripting
{
    internal class AssemblyUpdateTask
    {
        private readonly string myAssemblyName;
        private readonly AssemblyVersionUpdater myAssemblyVersionUpdater;
        private readonly string myFilename;
        private readonly WriterParameters myWriterParameters;
        private bool myChangesToWrite;

        public AssemblyUpdateTask(string assemblyName, AssemblyVersionUpdater assemblyVersionUpdater, string filename, string snkPath = null)
        {
            myAssemblyName = assemblyName;
            myAssemblyVersionUpdater = assemblyVersionUpdater;
            myFilename = filename;
            myWriterParameters = new WriterParameters
            {
                SymbolWriterProvider = new PdbWriterProvider(),
                WriteSymbols = File.Exists(Path.ChangeExtension(filename, "pdb"))
            };
            if (!string.IsNullOrEmpty(snkPath)) myWriterParameters.StrongNameKeyPair = new StrongNameKeyPair(File.ReadAllBytes(snkPath));
        }

        public void UpdateWithVersions(Dictionary<string, Versions> versions, TextWriter output)
        {
            var updateDescription = myAssemblyVersionUpdater.UpdateVersion(versions);
            if (updateDescription.Length > 0)
            {
                output.WriteLine("Updating {0}...", myAssemblyName);
                output.WriteLine(updateDescription);
                myAssemblyVersionUpdater.FlushChanges(myFilename, myWriterParameters);
                myChangesToWrite = true;
            }
        }

        public void FlushChanges()
        {
            if (myChangesToWrite) myAssemblyVersionUpdater.FlushChanges(myFilename, myWriterParameters);
            myChangesToWrite = false;
        }
    }
}