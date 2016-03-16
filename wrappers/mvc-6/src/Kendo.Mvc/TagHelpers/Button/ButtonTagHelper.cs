using Microsoft.AspNet.Razor.TagHelpers;
using Kendo.Mvc.Rendering;
using Microsoft.AspNet.Mvc.TagHelpers;
using System.Collections.Generic;

namespace Kendo.Mvc.TagHelpers
{
    /// <summary>
    /// Kendo UI Button TagHelper
    /// </summary>
    [HtmlTargetElement("kendo-button")]
    public partial class ButtonTagHelper : TagHelperBase
    {
        public ButtonTagHelper(IKendoHtmlGenerator generator) : base(generator)
        {
        }

        protected override void WriteHtml(TagHelperOutput output)
        {
            GenerateId(output);

            var htmlAttributes = new Dictionary<string, object>();

            var tagBuilder = Generator.GenerateTag("button", ViewContext, Id, Name, htmlAttributes);

            output.TagName = "button";

            output.MergeAttributes(tagBuilder);
        }

        protected override void WriteInitializationScript(TagHelperOutput output)
        {
            var settings = SerializeSettings();

            // TODO: Manually serialized settings go here

            var initializationScript = Initializer.Initialize(Selector, "Button", settings);

            output.PostElement.SetHtmlContent("<script>" + initializationScript + "</script>");
        }
    }
}

