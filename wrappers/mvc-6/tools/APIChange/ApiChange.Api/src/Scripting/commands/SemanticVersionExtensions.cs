using System;
using ApiChange.Api.Introspection;

namespace ApiChange.Api.Scripting
{
    public static class SemanticVersionExtensions
    {
        public static Version GetNewSemanticVersion(this Version oldSemVer, Compatibility compatibility)
        {
            switch (compatibility)
            {
                case Compatibility.Identical:
                    return new Version(oldSemVer.Major, oldSemVer.Minor, oldSemVer.Build + 1);
                case Compatibility.BackwardsCompatible:
                    return new Version(oldSemVer.Major, oldSemVer.Minor + 1, 0);
                case Compatibility.Incompatible:
                    return new Version(oldSemVer.Major + 1, 0, 0);
                default:
                    throw new ArgumentOutOfRangeException("compatibility");
            }
        }
    }
}