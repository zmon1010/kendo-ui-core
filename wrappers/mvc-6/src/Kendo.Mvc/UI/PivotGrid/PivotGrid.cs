using System.IO;
using Microsoft.AspNet.Mvc;
using Microsoft.AspNet.Mvc.ModelBinding;

namespace Kendo.Mvc.UI
{
    /// <summary>
    /// Kendo UI PivotGrid component
    /// </summary>
    public partial class PivotGrid<T> : WidgetBase
        where T : class 
    {
        public PivotGrid(ViewContext viewContext) : base(viewContext)
        {
            DataSource = new PivotDataSource(ModelMetadataProvider);
            DataSource.ModelType(typeof(T));
        }

        [Activate]
        public IModelMetadataProvider ModelMetadataProvider
        {
            get;
            set;
        }

        [Activate]
        public IUrlGenerator UrlGenerator
        {
            get;
            set;
        }

        public string Configurator
        {
            get;
            set;
        }

        public PivotDataSource DataSource
        {
            get;
            private set;
        }

        protected override void WriteHtml(TextWriter writer)
        {
            var tag = Generator.GenerateTag("div", ViewContext, Id, Name, HtmlAttributes);

            writer.Write(tag.ToString());

            base.WriteHtml(writer);
        }

        public override void WriteInitializationScript(TextWriter writer)
        {
            var settings = SerializeSettings();

            if (!string.IsNullOrEmpty(Configurator))
            {
                settings["configurator"] = Configurator;
            }

            settings["dataSource"] = DataSource.ToJson();

            writer.Write(Initializer.Initialize(Selector, "PivotGrid", settings));
        }
    }
}

