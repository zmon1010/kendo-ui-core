using System.IO;
using System.Linq;
using ApiChange.Api.Introspection.Diff;
using ApiChange.Infrastructure;
using Mono.Cecil;

namespace ApiChange.Api.Introspection
{
    public class PublicApiDiff
    {
        private readonly AssemblyDiffCollection myAssemblyDiffCollection;

        public PublicApiDiff(IAssemblyDiffer differ)
        {
            myAssemblyDiffCollection = differ.GenerateTypeDiff(QueryAggregator.PublicApiQueries);
        }

        public Compatibility ApiCompatibility
        {
            get
            {
                return PublicMemberRemoved() ? Compatibility.Incompatible
                    : PublicMemberAdded()   ? Compatibility.BackwardsCompatible
                        : Compatibility.Identical;
            }
        }

        public void AppendDifferenceDescription(TextWriter writer)
        {
            var printer = new DiffPrinter(writer);
            printer.Print(myAssemblyDiffCollection);
        }

        private bool PublicMemberAdded()
        {
            return myAssemblyDiffCollection.AddedRemovedTypes.AddedCount > 0 || myAssemblyDiffCollection.ChangedTypes.Any(HasAddeddMembers);
        }

        private bool PublicMemberRemoved()
        {
            return myAssemblyDiffCollection.AddedRemovedTypes.RemovedCount > 0 || myAssemblyDiffCollection.ChangedTypes.Any(HasSomethingPublicRemoved);
        }

        private static bool HasSomethingPublicRemoved(TypeDiff typeDiff)
        {
            return typeDiff.HasChangedBaseType || Members(typeDiff).RemovedCount > 0;
        }

        private bool HasAddeddMembers(TypeDiff typeDiff)
        {
            return typeDiff.HasChangedBaseType || Members(typeDiff).AddedCount > 0;
        }

        private static DiffCollection<IMemberDefinition> Members(TypeDiff typeDiff)
        {
            var diffCollection = new DiffCollection<IMemberDefinition>();
            diffCollection.AddRange(typeDiff.Events.Cast<IDiffResult<IMemberDefinition>>());
            diffCollection.AddRange(typeDiff.Fields.Cast<IDiffResult<IMemberDefinition>>());
            diffCollection.AddRange(typeDiff.Interfaces.Cast<IDiffResult<IMemberDefinition>>());
            diffCollection.AddRange(typeDiff.Methods.Cast<IDiffResult<IMemberDefinition>>());
            return diffCollection;
        }
    }
}