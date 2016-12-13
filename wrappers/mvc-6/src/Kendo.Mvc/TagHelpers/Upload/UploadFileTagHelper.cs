using Microsoft.AspNetCore.Razor.TagHelpers;
using System.Threading.Tasks;

namespace Kendo.Mvc.TagHelpers
{
    /// <summary>
    /// Kendo UI UploadFile TagHelper
    /// </summary>
    [HtmlTargetElement("kendo-uploadfile", ParentTag="kendo-uploadfiles")]
    [SupressTagRendering]
    public partial class UploadFileTagHelper : TagHelperCollectionItemBase
    {
        public UploadFileTagHelper() : base()
        {
        }

        public override async Task ProcessAsync(TagHelperContext context, TagHelperOutput output)
        {
            await base.ProcessAsync(context, output);
        }

        protected override void AddSelfToParent(TagHelperContext context)
        {
            var key = typeof(UploadFilesTagHelper);
            if (context.Items.ContainsKey(key))
            {
                (context.Items[key] as UploadFilesTagHelper).Add(this);
            }
        }
    }
}

