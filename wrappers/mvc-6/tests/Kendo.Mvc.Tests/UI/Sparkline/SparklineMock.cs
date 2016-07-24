using Kendo.Mvc.UI;
using Microsoft.AspNetCore.Mvc.Rendering;
using Moq;
using System.Text.Encodings.Web;

namespace Kendo.Mvc.Tests
{
    public class SparklineMock<T> : Sparkline<T> where T : class
    {
        public SparklineMock(ViewContext viewContext)
            : base(viewContext)
        {
            Generator = KendoHtmlGeneratorTestHelper.CreateKendoHtmlGenerator();;
            HtmlEncoder = new Mock<HtmlEncoder>().Object;
        }

        public new string ToHtmlString()
        {
            return base.ToHtmlString();
        }
    }
}
