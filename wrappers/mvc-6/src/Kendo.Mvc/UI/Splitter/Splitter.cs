using System.IO;
using Kendo.Mvc.Extensions;
using Microsoft.AspNet.Mvc;
using Microsoft.AspNet.Mvc.Rendering;

namespace Kendo.Mvc.UI
{
    /// <summary>
    /// Kendo UI Splitter component
    /// </summary>
    public partial class Splitter : WidgetBase
        
    {
        public Splitter(ViewContext viewContext) : base(viewContext)
        {
        }

        protected override void WriteHtml(TextWriter writer)
        {
            var tag = Generator.GenerateTag("div", ViewContext, Id, Name, HtmlAttributes);

            writer.Write(tag.ToString(TagRenderMode.StartTag));

            tag.AddCssClass("k-widget k-splitter");          
            tag.AddCssClass(Orientation == SplitterOrientation.Horizontal ? "k-splitter-horizontal" : "k-splitter-vertical");

            Panes.Each(p => p.WriteHtml(writer, Generator));

            writer.Write(tag.ToString(TagRenderMode.EndTag));

            base.WriteHtml(writer);
        }

        public override void WriteInitializationScript(TextWriter writer)
        {
            var settings = SerializeSettings();

            // TODO: Manually serialized settings go here

            writer.Write(Initializer.Initialize(Selector, "Splitter", settings));
        }
    }
}

