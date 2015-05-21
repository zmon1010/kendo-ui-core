using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Remoting.Messaging;
using Mono.Cecil;

namespace ApiChange.Api.Introspection
{
    public static class AssemblyDefinitionExtensions
    {
        public static IEnumerable<AssemblyNameReference> GetIndirectAssemblyReferences(this AssemblyDefinition assembly)
        {
            return assembly.GetAllTypes().SelectMany(GetAllScopes).OfType<AssemblyNameReference>();
        }

        private static IEnumerable<IMetadataScope> GetAllScopes(TypeDefinition t)
        {
            var customAttributeProviders = GetCustomAttributeProviders(t);
            return customAttributeProviders.SelectMany(m => m.CustomAttributes.SelectMany(GetScopes));
        }

        private static IEnumerable<ICustomAttributeProvider> GetCustomAttributeProviders(TypeDefinition t)
        {
            return new[]{t}
                .Concat(t.Events.OfType<ICustomAttributeProvider>())
                .Concat(t.Fields.OfType<ICustomAttributeProvider>())
                .Concat(t.Properties.OfType<ICustomAttributeProvider>())
                .Concat(t.Methods.SelectMany(GetCustomAttributeProviders));
        }

        private static IEnumerable<ICustomAttributeProvider> GetCustomAttributeProviders(MethodDefinition m)
        {
            return new ICustomAttributeProvider[] {m, m.MethodReturnType}
                .Concat(m.Parameters.OfType<ICustomAttributeProvider>())
                .Concat(m.GenericParameters.OfType<ICustomAttributeProvider>());

        }

        private static IEnumerable<IMetadataScope> GetScopes(CustomAttribute ca)
        {
            return ca.ConstructorArguments.Select(a => a.Value).OfType<TypeReference>().Select(n => n.Scope);
        }


        public static IEnumerable<TypeDefinition> GetAllTypes(this AssemblyDefinition assembly)
        {
            return assembly.Modules.SelectMany(module => FlattenTypes(module.Types));
        }

        private static IEnumerable<TypeDefinition> FlattenTypes(IEnumerable<TypeDefinition> typeDefinitions)
        {
            return typeDefinitions.SelectMany(FlattenType);
        }

        private static IEnumerable<TypeDefinition> FlattenType(TypeDefinition t)
        {
            return new[]{t}.Concat(FlattenTypes(t.NestedTypes));
        }
    }
}