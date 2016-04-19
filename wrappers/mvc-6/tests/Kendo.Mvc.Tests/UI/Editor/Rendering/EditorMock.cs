using System.IO;
using Kendo.Mvc.UI;
using Microsoft.AspNet.Mvc.Rendering;
using Microsoft.Extensions.WebEncoders;
using Moq;

namespace Kendo.Mvc.Tests
{
    public class EditorMock : Editor
    {
        public EditorMock(ViewContext viewContext)
            : base(viewContext)
        {
            Generator = KendoHtmlGeneratorTestHelper.CreateKendoHtmlGenerator(); ;
            HtmlEncoder = new HtmlEncoder();
        }

        public new TagBuilder GenerateTag(TextWriter writer)
        {
            return base.GenerateTag(writer);
        }
    }
}
