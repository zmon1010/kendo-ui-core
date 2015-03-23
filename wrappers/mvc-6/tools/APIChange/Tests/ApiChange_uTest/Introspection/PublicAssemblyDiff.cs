using ApiChange.Api.Introspection;
using Mono.Cecil;

namespace UnitTests.Introspection
{
    public class PublicAssemblyDiff : IAssemblyDiffer
    {
        private readonly AssemblyDiffCollection myAssemblyDiffCollection;

        private PublicAssemblyDiff(AssemblyDiffCollection assemblyDiffCollection)
        {
            myAssemblyDiffCollection = assemblyDiffCollection;
        }

        public AssemblyDiffCollection GenerateTypeDiff(QueryAggregator queries)
        {
            return myAssemblyDiffCollection;
        }

        public static PublicApiDiff From(IDiffResult<TypeDefinition> typeAddRemove = null, TypeDiff typeChange = null)
        {
            var assemblyDiff = new AssemblyDiffCollection();
            if (typeAddRemove != null) assemblyDiff.AddedRemovedTypes.Add(typeAddRemove);
            if (typeChange != null) assemblyDiff.ChangedTypes.Add(typeChange);
            return From(assemblyDiff);
        }

        public static PublicApiDiff From(AssemblyDiffCollection assemblyDiff)
        {
            var assemblyDiffer = new PublicAssemblyDiff(assemblyDiff);
            return new PublicApiDiff(assemblyDiffer);
        }
    }
}