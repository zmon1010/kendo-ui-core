using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.AspNetCore.Mvc.ViewFeatures;

namespace Kendo.Mvc.Tests
{
    public interface ITestableHtmlHelper : IHtmlHelper, IViewContextAware
    {
    }
}