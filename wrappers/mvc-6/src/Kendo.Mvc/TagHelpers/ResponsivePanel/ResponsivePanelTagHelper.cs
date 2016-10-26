using Microsoft.AspNetCore.Razor.TagHelpers;
using Kendo.Mvc.Rendering;
using Microsoft.AspNetCore.Mvc.TagHelpers;
using System.Collections.Generic;

namespace Kendo.Mvc.TagHelpers
{
    /// <summary>
    /// Kendo UI ResponsivePanel TagHelper
    /// </summary>
    [HtmlTargetElement("kendo-responsivepanel")]
    public partial class ResponsivePanelTagHelper : TagHelperBase
    {
        public ResponsivePanelTagHelper(IKendoHtmlGenerator generator) : base(generator)
        {
        }

        protected override void WriteHtml(TagHelperOutput output)
        {
            GenerateId(output);

            var htmlAttributes = new Dictionary<string, object>();

            var tagBuilder = Generator.GenerateTag("div", ViewContext, Id, Name, htmlAttributes);

            output.TagName = "div";

            output.MergeAttributes(tagBuilder);
        }

        protected override void WriteInitializationScript(TagHelperOutput output)
        {
            var settings = SerializeSettings();

            // TODO: Manually serialized settings go here

            var initializationScript = Initializer.Initialize(Selector, "ResponsivePanel", settings);

            output.PostElement.SetHtmlContent("<script>" + initializationScript + "</script>");
        }
    }
}

