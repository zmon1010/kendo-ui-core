using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Text;
using ApiChange.Api.Introspection;
using Mono.Cecil;

namespace ApiChange.Api.Scripting
{
    class AssemblyVersionUpdater
    {
        private readonly AssemblyDefinition myAssembly;
        private readonly StringBuilder myModificationDescription = new StringBuilder();
        private readonly TypeReference myStringTypeForAssembly;

        public AssemblyVersionUpdater(AssemblyDefinition assembly)
        {
            myAssembly = assembly;
            myStringTypeForAssembly = myAssembly.MainModule.Import(typeof(string));
        }

        public void FlushChanges(string filename, WriterParameters writerParams)
        {
            myAssembly.Write(filename, writerParams);
            myModificationDescription.Length = 0;
            
        }

        public string UpdateVersion(Dictionary<string, Versions> versionMappings)
        {
            UpdateVersionOfThisAssembly(versionMappings);
            UpdateReferenceVersions(versionMappings);

            return myModificationDescription.ToString();
        }

        private void UpdateVersionOfThisAssembly(Dictionary<string, Versions> versionMappings)
        {
            Versions versions;
            if (versionMappings.TryGetValue(myAssembly.Name.Name, out versions))
            {
                UpdateAssemblyVersion(versions);
                UpdateVersionAttributes(versions);
            }
        }

        private void UpdateAssemblyVersion(Versions versions)
        {
            var newVersion = versions.AssemblyVersion;
            var assemblyName = myAssembly.Name;

            if (assemblyName.Version != newVersion)
            {
                AppendDescription("assembly version", assemblyName.Version, newVersion);
                assemblyName.Version = newVersion;
            }
        }

        private void AppendDescription(string versionDescription, Version oldVersion, Version newVersion)
        {
            myModificationDescription.AppendFormat("Updating {0} from {1} to {2}", versionDescription, oldVersion, newVersion);
            myModificationDescription.AppendLine();
        }

        private void UpdateVersionAttributes(Versions versions)
        {
            foreach (var customAttribute in myAssembly.CustomAttributes)
            {
                var newVersion = ReplacementVersionOrDefault(customAttribute, versions);
                if (newVersion != null) UpdateVersionString(customAttribute, newVersion);
            }
        }

        private void UpdateReferenceVersions(IDictionary<string, Versions> nameVersionMappings)
        {
            var assemblyNameReferences = myAssembly.GetIndirectAssemblyReferences().ToLookup(reference => reference.Name);

            foreach (var assemblyDependency in myAssembly.MainModule.AssemblyReferences)
            {
                Versions version;
                if (nameVersionMappings.TryGetValue(assemblyDependency.Name, out version))
                {
                    LoadAssemblyReferencesAndEnsureUpdated(version, assemblyDependency, assemblyNameReferences);
                }
            }
        }

        /// <summary>
        /// In the current version of Mono.Cecil, setting one of these references seems to set the others, but only when that part of the assembly is loaded.
        /// Explicitly loading (by iterating through) and setting them all guards against future changes.
        /// </summary>
        private void LoadAssemblyReferencesAndEnsureUpdated(Versions version, AssemblyNameReference assemblyDependency,
            ILookup<string, AssemblyNameReference> assemblyNameReferences)
        {
            var newVersion = version.AssemblyVersion;
            if (assemblyDependency.Version != newVersion)
            {
                AppendDescription("version of reference to " + assemblyDependency.Name, assemblyDependency.Version, newVersion);
                assemblyDependency.Version = newVersion;
                foreach (var typeReferenceSource in assemblyNameReferences[assemblyDependency.Name])
                {
                    if (typeReferenceSource.Version != newVersion)
                    {
                        AppendDescription("custom attribute on a type in " + assemblyDependency.Name, typeReferenceSource.Version, newVersion);
                        typeReferenceSource.Version = newVersion;
                    }
                }
            }
        }

        private Version ReplacementVersionOrDefault(CustomAttribute customAttribute, Versions versions)
        {
            switch (customAttribute.AttributeType.Name)
            {
                case "AssemblyInformationalVersionAttribute":
                    return versions.AssemblyInformationalVersion;
                case "AssemblyFileVersionAttribute":
                    return versions.AssemblyFileVersion;
                case "AssemblyVersionAttribute":
                    return versions.AssemblyVersion;
            }
            return null;
        }

        private void UpdateVersionString(CustomAttribute customAttribute, Version newVersion)
        {
            var oldVersion = new Version(customAttribute.ConstructorArguments.First().Value.ToString());
            if (oldVersion != newVersion)
            {
                customAttribute.ConstructorArguments.Clear();
                var newVersionArg = new CustomAttributeArgument(myStringTypeForAssembly, newVersion.ToString());
                customAttribute.ConstructorArguments.Add(newVersionArg);
                AppendDescription(customAttribute.AttributeType.Name, oldVersion, newVersion);
            }
        }
    }
}