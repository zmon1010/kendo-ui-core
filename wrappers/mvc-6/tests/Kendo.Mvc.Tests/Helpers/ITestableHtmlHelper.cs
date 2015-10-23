using Microsoft.AspNet.Mvc.Rendering;
using Microsoft.AspNet.Mvc.ViewFeatures.Internal;

namespace Kendo.Mvc.Tests
{
    public interface ITestableHtmlHelper : IHtmlHelper, ICanHasViewContext
    {
    }
}