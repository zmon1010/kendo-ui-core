using Microsoft.AspNet.Razor.TagHelpers;
using Kendo.Mvc.Rendering;
using Microsoft.AspNet.Mvc.TagHelpers;
using System.Collections.Generic;

namespace Kendo.Mvc.TagHelpers
{
    /// <summary>
    /// Kendo UI Window TagHelper
    /// </summary>
    [HtmlTargetElement("kendo-window")]
    public partial class WindowTagHelper : TagHelperBase
    {
        public WindowTagHelper(IKendoHtmlGenerator generator) : base(generator)
        {
        }

        protected override void WriteHtml(TagHelperOutput output)
        {
            GenerateId(output);

            var htmlAttributes = new Dictionary<string, object>();

            if (!Visible.GetValueOrDefault(true))
            {
                htmlAttributes.Add("style", "display:none");
            }

            var tagBuilder = Generator.GenerateTag("div", ViewContext, Id, Name, htmlAttributes);

            output.TagName = "div";
            output.TagMode = TagMode.StartTagAndEndTag;

            output.MergeAttributes(tagBuilder);
        }

        protected override void WriteInitializationScript(TagHelperOutput output)
        {
            var settings = SerializeSettings();

            // TODO: Manually serialized settings go here

            var initializationScript = Initializer.Initialize(Selector, "Window", settings);

            output.PostElement.SetHtmlContent("<script>" + initializationScript + "</script>");
        }
    }
}

