using System.IO;
using Kendo.Mvc.UI;
using Microsoft.AspNet.Mvc.Rendering;
using Microsoft.Extensions.WebEncoders;

namespace Kendo.Mvc.Tests
{
    public class RadioButtonMock : RadioButton
    {
        public RadioButtonMock(ViewContext viewContext)
            : base(viewContext)
        {
            Generator = KendoHtmlGeneratorTestHelper.CreateKendoHtmlGenerator(); ;
            HtmlEncoder = new HtmlEncoder();
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
