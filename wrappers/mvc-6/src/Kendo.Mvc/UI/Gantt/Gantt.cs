using Kendo.Mvc.Extensions;
using Microsoft.AspNet.Mvc.Rendering;
using System;
using System.Collections.Generic;
using System.IO;

namespace Kendo.Mvc.UI
{
    /// <summary>
    /// Kendo UI Gantt component
    /// </summary>
    public partial class Gantt<TTaskModel, TDependenciesModel> : WidgetBase
        where TTaskModel : class, IGanttTask  where TDependenciesModel : class, IGanttDependency
    {

        public DataSource DataSource
        {
            get;
            private set;
        }

        public DataSource DependenciesDataSource
        {
            get;
            private set;
        }

        public Gantt(ViewContext viewContext) : base(viewContext)
        {
            DataSource = new DataSource(ModelMetadataProvider);
            DataSource.Type = DataSourceType.Ajax;
            DataSource.Schema.Model = new GanttTaskModelDescriptor(typeof(TTaskModel), ModelMetadataProvider);

            DependenciesDataSource = new DataSource(ModelMetadataProvider);
            DependenciesDataSource.Type = DataSourceType.Ajax;
            DependenciesDataSource.Schema.Model = new GanttDependencyModelDescriptor(typeof(TDependenciesModel), ModelMetadataProvider);
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

            ProcessDataSource(DataSource);

            settings["dataSource"] = (Dictionary<string, object>)DataSource.ToJson();

            ProcessDataSource(DependenciesDataSource);

            settings["dependencies"] = (Dictionary<string, object>)DependenciesDataSource.ToJson();

            writer.Write(Initializer.Initialize(Selector, "Gantt", settings));
        }

        private void ProcessDataSource(DataSource dataSource)
        {
            if (dataSource.Type != DataSourceType.Custom || dataSource.CustomType == "aspnetmvc-ajax")
            {
                if (dataSource.IsClientOperationMode)
                {
                    DataSourceRequest request = new DataSourceRequest();

                    dataSource.Process(request, true);
                }
            }
        }
    }
}

