using Kendo.Mvc.Extensions;
using Microsoft.AspNet.Mvc;
using Microsoft.AspNet.Mvc.Infrastructure;
using Microsoft.AspNet.Mvc.ModelBinding;
using Microsoft.AspNet.Mvc.Rendering;
using System;
using System.Collections.Generic;
using System.IO;

namespace Kendo.Mvc.UI
{
    /// <summary>
    /// Kendo UI ListView component
    /// </summary>
    public partial class ListView<T> : WidgetBase where T : class

    {
        public ListView(ViewContext viewContext) : base(viewContext)
        {
            ActionBindingContext = GetService<IActionBindingContextAccessor>().ActionBindingContext;
            //Selectable = new ListViewSelectionSettings();

            DataSource = new DataSource(ModelMetadataProvider)
            {
                Type = DataSourceType.Ajax,
                ServerAggregates = true,
                ServerFiltering = true,
                ServerGrouping = true,
                ServerPaging = true,
                ServerSorting = true
            };

            DataSource.ModelType(typeof(T));
        }

        protected override void WriteHtml(TextWriter writer)
        {
            var tag = Generator.GenerateTag("div", ViewContext, Id, Name, HtmlAttributes);

            tag.WriteTo(writer, HtmlEncoder);

            if (Pageable.Enabled)
            {
                Dictionary<string, object> htmlAttributes = new Dictionary<string, object>();
                htmlAttributes.Add("id", this.Id + "_pager");
                htmlAttributes.Add("class", "k-pager-wrap");
                var pagerTag = Generator.GenerateTag("div", ViewContext, Id, Name, htmlAttributes);
                pagerTag.WriteTo(writer, HtmlEncoder);
            }

            base.WriteHtml(writer);
        }

        public override void WriteInitializationScript(TextWriter writer)
        {
            var settings = SerializeSettings();

            settings["dataSource"] = DataSource.ToJson();

            if (DataSource.Type != DataSourceType.Custom || DataSource.CustomType == "aspnetmvc-ajax")
            {
                ProcessDataSource();
            }
            
            SerializeClientTemplate(settings);

            SerializePaging(settings);

            if (Selectable.Enabled)
            {
                var selectable = "single";
                if (Selectable.Mode.HasValue)
                {
                    selectable = Selectable.Mode.Value.Serialize();
                }
                settings["selectable"] = selectable;
            }

            writer.Write(Initializer.Initialize(Selector, "ListView", settings));
        }
        private void SerializeClientTemplate(IDictionary<string, object> options)
        {
            var idPrefix = "#";

            if (IsInClientTemplate)
            {
                idPrefix = "\\" + idPrefix;
            }

            if (!string.IsNullOrEmpty(ClientTemplateId))
            {
                options["template"] = new ClientHandlerDescriptor { HandlerName = string.Format("kendo.template(jQuery('{0}{1}').html())", idPrefix, ClientTemplateId) };
            }

            if (!string.IsNullOrEmpty(ClientAltTemplateId))
            {
                options["altTemplate"] = new ClientHandlerDescriptor { HandlerName = string.Format("kendo.template(jQuery('{0}{1}').html())", idPrefix, ClientAltTemplateId) };
            }
        }

        private void SerializePaging(IDictionary<string, object> options)
        {
            if (Pageable.Enabled)
            {
                AutoBind = DataSource.Type != DataSourceType.Server && AutoBind.GetValueOrDefault(true);
                Pageable.AutoBind = AutoBind.Value;
                var paging = Pageable.ToJson();
                paging.Add("pagerId", Id + "_pager");
                options["pageable"] = paging;
            }
        }

        private void ProcessDataSource()
        {
            if (Pageable.Enabled && DataSource.PageSize == 0)
            {
                DataSource.PageSize = 10;
            }

            var binder = new DataSourceRequestModelBinder();

            var bindingContext = new ModelBindingContext
            {
                ValueProvider = ActionBindingContext.ValueProvider,
                ModelMetadata = ModelMetadataProvider.GetMetadataForType(typeof(T))
            };

            var result = binder.BindModelAsync(bindingContext).Result; // make it run synchronously

            DataSource.Process((DataSourceRequest)bindingContext.Model, true/*!EnableCustomBinding*/);
        }
        public ActionBindingContext ActionBindingContext
        {
            get;
            set;
        }

        public DataSource DataSource
        {
            get;
            private set;
        }
        public string ClientTemplateId
        {
            get;
            set;
        }
        public string ClientAltTemplateId
        {
            get;
            set;
        }
        public PageableSettings Pageable { get; } = new PageableSettings();
    }
}

