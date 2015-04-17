using Kendo.Mvc.Extensions;
using Microsoft.AspNet.Mvc;
using Microsoft.AspNet.Mvc.ModelBinding;
using System;
using System.Collections.Generic;
using System.IO;

namespace Kendo.Mvc.UI
{
    /// <summary>
    /// Kendo UI Scheduler component
    /// </summary>
    public partial class Scheduler<T> : WidgetBase
        where T : class, ISchedulerEvent 
    {
        public Scheduler(ViewContext viewContext) : base(viewContext)
        {
            ToolbarCommands = new List<SchedulerToolbarCommand>();

            DataSource = new DataSource(ModelMetadataProvider);

            DataSource.Type = DataSourceType.Ajax;

            DataSource.Schema.Model = new SchedulerModelDescriptor(typeof(T), ModelMetadataProvider);
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

        public DataSource DataSource
        {
            get;
            private set;
        }

        public IList<SchedulerToolbarCommand> ToolbarCommands
        {
            get;
            private set;
        }

        protected override void WriteHtml(TextWriter writer)
        {
            var tag = Generator.GenerateTag("div", ViewContext, Id, Name, HtmlAttributes);

            if (!HtmlAttributes.ContainsKey("id"))
            {
                HtmlAttributes["id"] = Id;
            }

            writer.Write(tag.ToString());

            base.WriteHtml(writer);
        }

        public override void WriteInitializationScript(TextWriter writer)
        {
            var settings = SerializeSettings();

            var idPrefix = "#";
            if (IsInClientTemplate)
            {
                idPrefix = "\\" + idPrefix;
            }

            if (DataSource.Type != DataSourceType.Custom || DataSource.CustomType == "aspnetmvc-ajax")
            {
                DataSource.Transport.StringifyDates = true;
                if (DataSource.IsClientOperationMode)
                {
                    ProcessDataSource();
                }
            }

            if (ToolbarCommands.Count > 0)
            {
                settings["toolbar"] = ToolbarCommands.ToJson();
            }

            if (Mobile != MobileMode.Disabled)
            {
                if (Mobile == MobileMode.Auto)
                {
                    settings["mobile"] = true;
                }
                else
                {
                    settings["mobile"] = Mobile.ToString().ToLowerInvariant();
                }
            }

            Dictionary<string, object> dataSource = (Dictionary<string, object>)DataSource.ToJson();

            settings["dataSource"] = dataSource;

            writer.Write(Initializer.Initialize(Selector, "Scheduler", settings));
        }

        private void ProcessDataSource()
        {
            DataSourceRequest request = new DataSourceRequest();

            DataSource.Process(request, true);
        }
    }
}

