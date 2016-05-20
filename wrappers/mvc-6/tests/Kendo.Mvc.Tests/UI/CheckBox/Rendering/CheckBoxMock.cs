using System.IO;
using Kendo.Mvc.UI;
using Microsoft.AspNetCore.Mvc.Rendering;
using System.Text.Encodings.Web;

namespace Kendo.Mvc.Tests
{
    public class CheckBoxMock : CheckBox
    {
        public CheckBoxMock(ViewContext viewContext)
            : base(viewContext)
        {
            Generator = KendoHtmlGeneratorTestHelper.CreateKendoHtmlGenerator(); ;
            HtmlEncoder = HtmlEncoder.Default;
        }

        public new void WriteHtml(TextWriter writer)
        {
            base.WriteHtml(writer);
        }

        protected override CheckBoxHtmlBuilder GetHtmlBuilder()
        {
            return new CheckBoxHtmlBuilderMock(this);
        }
    }
}
