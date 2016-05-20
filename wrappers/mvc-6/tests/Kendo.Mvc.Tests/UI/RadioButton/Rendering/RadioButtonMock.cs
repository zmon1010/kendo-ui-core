using System.IO;
using Kendo.Mvc.UI;
using Microsoft.AspNetCore.Mvc.Rendering;
using System.Text.Encodings.Web;

namespace Kendo.Mvc.Tests
{
    public class RadioButtonMock : RadioButton
    {
        public RadioButtonMock(ViewContext viewContext)
            : base(viewContext)
        {
            Generator = KendoHtmlGeneratorTestHelper.CreateKendoHtmlGenerator(); ;
            HtmlEncoder = HtmlEncoder.Default;
        }

        public new void WriteHtml(TextWriter writer)
        {
            base.WriteHtml(writer);
        }

        protected override RadioButtonHtmlBuilder GetHtmlBuilder()
        {
            return new RadioButtonHtmlBuilderMock(this);
        }
    }
}
