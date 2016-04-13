using Kendo.Mvc.Extensions;
using Microsoft.AspNet.Mvc.ModelBinding;
using System.IO;
using Microsoft.AspNet.Mvc.Rendering;
using Microsoft.AspNet.Mvc.Infrastructure;

namespace Kendo.Mvc.UI
{
    /// <summary>
    /// Kendo UI DataSource component
    /// </summary>
    public partial class DataSourceWidget<T> : WidgetBase where T : class
    {
        public DataSource DataSource
        {
            get;
            private set;
        }

        public PivotDataSource PivotDataSource
        {
            get;
            internal set;
        }

        public DataSourceWidget(ViewContext context) : base(context)
        {
            DataSource = new DataSource(context.GetService<IModelMetadataProvider>());
            DataSource.ModelType(typeof(T));
        }

        public override void WriteInitializationScript(TextWriter writer)
        {
            var settings = SerializeSettings();

            if (DataSource.Type != DataSourceType.Custom || DataSource.CustomType == "aspnetmvc-ajax")
            {
                ProcessDataSource();
            }

            if (PivotDataSource != null)
            {
                writer.Write(this.Name + "= new kendo.data." + ClassName + "(" + Initializer.Serialize(PivotDataSource.ToJson()) + ")");
            }
            else {
                writer.Write(this.Name + "= new kendo.data." + ClassName + "(" + Initializer.Serialize(DataSource.ToJson()) + ")");
            }
        }

        internal string ClassName
        {
            get;
            set;
        } = "DataSource";

        private void ProcessDataSource()
        {
            var binder = new DataSourceRequestModelBinder();
            var bindingContext = new ModelBindingContext
            {
                ValueProvider = GetService<IActionBindingContextAccessor>().ActionBindingContext.ValueProvider,
                ModelMetadata = ModelMetadataProvider.GetMetadataForType(typeof(T))
            };

            var result = binder.BindModelAsync(bindingContext).Result;

            DataSource.Process((DataSourceRequest)bindingContext.Model, true);
        }

    }
}
