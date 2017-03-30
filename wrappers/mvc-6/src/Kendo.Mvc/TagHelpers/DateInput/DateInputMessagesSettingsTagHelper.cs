using Microsoft.AspNetCore.Razor.TagHelpers;
using System.Threading.Tasks;

namespace Kendo.Mvc.TagHelpers
{
    /// <summary>
    /// Kendo UI messages TagHelper
    /// </summary>
    [HtmlTargetElement("kendo-date-input-messages-settings", ParentTag="kendo-dateinput", TagStructure=TagStructure.WithoutEndTag )]
    
    [SuppressTagRendering]
    public partial class DateInputMessagesSettingsTagHelper : TagHelperChildBase
    {
        public DateInputMessagesSettingsTagHelper() : base()
        {
        }

        public override async Task ProcessAsync(TagHelperContext context, TagHelperOutput output)
        {
            await base.ProcessAsync(context, output);
        }

        protected override void AddSelfToParent(TagHelperContext context)
        {
            var parent = typeof(DateInputTagHelper);
            if (context.Items.ContainsKey(parent))
            {
                (context.Items[parent] as DateInputTagHelper).Messages = this;
            }
        }
    }
}

