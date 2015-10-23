using Microsoft.AspNet.Mvc.Rendering;
using System.IO;
using System.Linq;

namespace Kendo.Mvc.UI
{
    /// <summary>
    /// Kendo UI Chart component
    /// </summary>
    public partial class Chart : WidgetBase        
    {
        public ChartSeriesDefaultsSettings SeriesDefaults { get; } = new ChartSeriesDefaultsSettings();

        public Chart(ViewContext viewContext) : base(viewContext)
        {
        }

        protected override void WriteHtml(TextWriter writer)
        {
            var tag = Generator.GenerateTag("div", ViewContext, Id, Name, HtmlAttributes);
            tag.WriteTo(writer, HtmlEncoder);

            base.WriteHtml(writer);
        }

        public override void WriteInitializationScript(TextWriter writer)
        {
            var settings = SerializeSettings();

            var seriesDefaults = SeriesDefaults.Serialize();
            if (seriesDefaults.Any())
            {
                settings["seriesDefaults"] = seriesDefaults;
            }

            writer.Write(Initializer.Initialize(Selector, "Chart", settings));
        }
    }
}

