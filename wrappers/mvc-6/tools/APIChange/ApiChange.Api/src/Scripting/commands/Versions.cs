using System;
using System.Diagnostics;
using ApiChange.Api.Introspection;

namespace ApiChange.Api.Scripting
{
    [DebuggerDisplay("{AssemblyFileVersion.ToString()}")]
    internal class Versions
    {
        public Compatibility Compatibility { get; private set; }

        public Versions(Version oldFileVersion, Compatibility compatibility)
        {
            Compatibility = compatibility;
            var oldSemanticVersion = new Version(oldFileVersion.Minor, oldFileVersion.Build, oldFileVersion.Revision);
            var newSemanticVersion = oldSemanticVersion.GetNewSemanticVersion(compatibility);
            SemanticVersion = newSemanticVersion;
            AssemblyFileVersion = new Version(oldFileVersion.Major, newSemanticVersion.Major, newSemanticVersion.Minor, newSemanticVersion.Build);
            AssemblyInformationalVersion = AssemblyFileVersion;
            AssemblyVersion = new Version(newSemanticVersion.Major, 0, 0, 0);
        }

        public Version AssemblyFileVersion { get; private set; }
        public Version AssemblyInformationalVersion { get; private set; }
        public Version AssemblyVersion { get; private set; }
        public Version SemanticVersion { get; private set; }
    }
}