using System;
using System.IO;
using Kendo.Mvc.Resources;
using Microsoft.AspNetCore.Mvc.Rendering;

namespace Kendo.Mvc.UI
{
    /// <summary>
    /// Kendo UI ListBox component
    /// </summary>
    public partial class ListBox : WidgetBase
    {
        private readonly ListBoxSettingsSerializer settingsSerializer;

        public string DataSourceId { get; set; }

        public DataSource DataSource { get; private set; }

        public ListBox(ViewContext viewContext) : base(viewContext)
        {
            settingsSerializer = new ListBoxSettingsSerializer(this);

            DataSource = new DataSource(ModelMetadataProvider);
        }

        protected override void WriteHtml(TextWriter writer)
        {
            var tag = Generator.GenerateTag("select", ViewContext, Id, Name, HtmlAttributes);

            tag.WriteTo(writer, HtmlEncoder);

            base.WriteHtml(writer);
        }

        public override void WriteInitializationScript(TextWriter writer)
        {
            var settings = SerializeSettings();

            // TODO: Manually serialized settings go here
            settingsSerializer.Serialize(settings);

            writer.Write(Initializer.Initialize(Selector, "ListBox", settings));
        }

        public override void VerifySettings()
        {
            base.VerifySettings();

            if (AutoBind.HasValue)
            {
                if (!IsClientBinding || (IsClientBinding && DataSource.Data != null))
                {
                    throw new NotSupportedException(Exceptions.CannotSetAutoBindIfBoundDuringInitialization);
                }
            }
        }

        private bool IsClientBinding
        {
            get
            {
               return DataSource.Type == DataSourceType.Ajax || DataSource.Type == DataSourceType.WebApi || DataSource.Type == DataSourceType.Custom;
            }
        }
    }
}

