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
    [OutputElementHint("button")]
    public partial class ButtonTagHelper : TagHelperBase
    {
        public string Tag { get; set; }

        public ButtonTagHelper(IKendoHtmlGenerator generator) : base(generator)
        {
            Tag = "button";
        }

        protected override void WriteHtml(TagHelperOutput output)
        {
            GenerateId(output);

            var htmlAttributes = new Dictionary<string, object>();

            htmlAttributes.Add("type", "button");

            var tagBuilder = Generator.GenerateTag(Tag, ViewContext, Id, Name, htmlAttributes);

            output.TagName = Tag;

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

