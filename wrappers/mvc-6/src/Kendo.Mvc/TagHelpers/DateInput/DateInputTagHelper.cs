using Microsoft.AspNetCore.Razor.TagHelpers;
using Kendo.Mvc.Rendering;
using Microsoft.AspNetCore.Mvc.TagHelpers;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Kendo.Mvc.TagHelpers
{
    /// <summary>
    /// Kendo UI DateInput TagHelper
    /// </summary>
    [HtmlTargetElement("kendo-dateinput")]

    public partial class DateInputTagHelper : TagHelperBase
    {
        public DateInputTagHelper(IKendoHtmlGenerator generator) : base(generator)
        {
        }

        public override async Task ProcessAsync(TagHelperContext context, TagHelperOutput output)
        {
            context.Items[this.GetType()] = this;
            await output.GetChildContentAsync();
            await base.ProcessAsync(context, output);
        }

        protected override void WriteHtml(TagHelperOutput output)
        {
            GenerateId(output);

            var htmlAttributes = new Dictionary<string, object>();

            var tagBuilder = Generator.GenerateTag("input", ViewContext, Id, Name, htmlAttributes);

            output.TagName = "input";
            output.TagMode = TagMode.SelfClosing;
            output.MergeAttributes(tagBuilder);
        }

        protected override string GetInitializationScript()
        {
            var settings = SerializeSettings();

            // TODO: Manually serialized settings go here
            return Initializer.Initialize(Selector, "DateInput", settings);
        }
    }
}

