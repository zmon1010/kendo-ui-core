using Microsoft.AspNet.Mvc.Rendering;
using Microsoft.AspNet.Mvc.ViewFeatures;
using System.IO;

namespace Kendo.Mvc.UI
{
    public class TextBox<T> : WidgetBase
    {
        public TextBox(ViewContext viewContext) : base(viewContext)
        {
            Enabled = true;
            IsSelfInitialized = false;
        }

        public T Value
        {
            get;
            set;
        }

        public bool Enabled
        {
            get;
            set;
        }

        public string Format
        {
            get;
            set;
        }

        protected override void WriteHtml(TextWriter writer)
        {
            var metadata = ExpressionMetadataProvider.FromStringExpression(Name, HtmlHelper.ViewData, HtmlHelper.MetadataProvider).Metadata;

            var tag = Generator.GenerateInput(ViewContext, metadata, Id, Name, Value, string.Empty, string.Empty, HtmlAttributes);

            tag.AddCssClass("k-textbox");

            if (!Enabled)
            {
                tag.MergeAttribute("disabled", "disabled");
                tag.AddCssClass("k-state-disabled");
            }

            tag.WriteTo(writer, HtmlEncoder);

            base.WriteHtml(writer);
        }

        public override void WriteInitializationScript(TextWriter writer)
        {
        }
    }
}