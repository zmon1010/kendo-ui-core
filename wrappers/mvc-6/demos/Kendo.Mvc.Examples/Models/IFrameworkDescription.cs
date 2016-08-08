using System.Collections.Generic;

namespace Kendo.Mvc.Examples.Models
{
    public interface IFrameworkDescription
    {
        string Name { get; }

        IEnumerable<ExampleFile> GetFiles(string contentRootPath, string example, string section);
    }
}
