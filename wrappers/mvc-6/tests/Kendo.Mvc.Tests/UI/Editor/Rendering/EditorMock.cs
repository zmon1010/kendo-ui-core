using System.IO;
using Kendo.Mvc.UI;
using Microsoft.AspNetCore.Mvc.Rendering;
using Moq;
using System.Text.Encodings.Web;

namespace Kendo.Mvc.Tests
{
    public class EditorMock : Editor
    {
        public EditorMock(ViewContext viewContext)
            : base(viewContext)
        {
            Generator = KendoHtmlGeneratorTestHelper.CreateKendoHtmlGenerator(); ;
            HtmlEncoder = HtmlEncoder.Default;
        }

        public new TagBuilder GenerateTag(TextWriter writer)
        {
            return base.GenerateTag(writer);
        }
    }
}
