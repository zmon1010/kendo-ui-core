using System;
using Mono.Cecil;

namespace ApiChange.Api.Scripting
{
    public class AssemblyWithFileVersion
    {
        public AssemblyWithFileVersion(AssemblyDefinition assembly, Version fileVersion)
        {
            Assembly = assembly;
            FileVersion = fileVersion;
        }

        public AssemblyDefinition Assembly { get; private set; }
        public Version FileVersion { get; private set; }
    }
}