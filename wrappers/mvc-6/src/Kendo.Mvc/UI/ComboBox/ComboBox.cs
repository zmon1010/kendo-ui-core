using Microsoft.AspNet.Mvc.Rendering;
using System.IO;
using Kendo.Mvc.Extensions;

namespace Kendo.Mvc.UI
{
    /// <summary>
    /// Kendo UI ComboBox component
    /// </summary>
    public partial class ComboBox : WidgetBase

    {
        public DataSource DataSource
        {
            get;
            private set;
        }
        public int? SelectedIndex { get; set; }

        public ComboBox(ViewContext viewContext) : base(viewContext)
        {
            DataSource = new DataSource(ModelMetadataProvider);
        }

        protected override void WriteHtml(TextWriter writer)
        {
            if (Enable == false)
            {
                HtmlAttributes.Merge("disabled", "disabled", true);
            }

            var tag = Generator.GenerateTextInput(ViewContext, null, Id, Name, Value, string.Empty, HtmlAttributes);

            tag.WriteTo(writer, HtmlEncoder);

            base.WriteHtml(writer);
        }

        public override void WriteInitializationScript(TextWriter writer)
        {
            var settings = SerializeSettings();

            if (!string.IsNullOrEmpty(DataSource.Transport.Read.Url) ||
                !string.IsNullOrEmpty(DataSource.Transport.Read.ActionName) ||
                DataSource.Type == DataSourceType.Custom)
            {
                settings["dataSource"] = DataSource.ToJson();
            }
            else if (DataSource.Data != null)
            {
                settings["dataSource"] = DataSource.Data;
            }

            if (SelectedIndex.HasValue && SelectedIndex > -1)
            {
                settings["index"] = SelectedIndex;
            }

            writer.Write(Initializer.Initialize(Selector, "ComboBox", settings));
        }
    }
}

