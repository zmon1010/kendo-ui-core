namespace Kendo.Mvc.Infrastructure
{
    public interface IPathResolver
    {
        /// <summary>
        /// Returns the physical path for the specified virtual path.
        /// </summary>
        /// <param name="virtualPath">The virtual path.</param>
        string Resolve(string virtualPath);
    }
}