namespace ApiChange.Api.Introspection
{
    public interface IAssemblyDiffer
    {
        AssemblyDiffCollection GenerateTypeDiff(QueryAggregator queries);
    }
}