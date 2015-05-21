namespace ApiChange.Api.Introspection
{
    public interface IDiffResult<out T>
    {
        DiffOperation Operation { get; }
        T ObjectV1 { get; }
    }
}