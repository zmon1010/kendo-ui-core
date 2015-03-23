using System;
using Mono.Cecil;

namespace ApiChange.Api.Scripting
{
    public class ComparableAssemblyData
    {
        public ComparableAssemblyData(AssemblyDefinition @new, string newFilename, AssemblyDefinition old, Version oldFileVersion)
        {
            New = @new;
            NewFilename = newFilename;
            Old = old;
            OldFileVersion = oldFileVersion;
            OldExists = Old != null && OldFileVersion != null;
        }

        public bool OldExists { get; private set; }
        public AssemblyDefinition New { get; private set; }
        public string NewFilename { get; private set; }
        public AssemblyDefinition Old { get; private set; }
        public Version OldFileVersion { get; private set; }

    }
}