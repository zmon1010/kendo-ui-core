using Kendo.Mvc.UI;
using Microsoft.AspNet.Mvc.Rendering;
using Microsoft.Extensions.WebEncoders;
using Moq;

namespace Kendo.Mvc.Tests
{
    public class SparklineMock<T> : Sparkline<T> where T : class
    {
        public SparklineMock(ViewContext viewContext)
            : base(viewContext)
        {
            Generator = KendoHtmlGeneratorTestHelper.CreateKendoHtmlGenerator();;
            HtmlEncoder = new Mock<IHtmlEncoder>().Object;
        }

        public new string ToHtmlString()
        {
            return base.ToHtmlString();
        }
    }
}
