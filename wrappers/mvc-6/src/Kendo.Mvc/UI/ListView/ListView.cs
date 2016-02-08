using Kendo.Mvc.Extensions;
using Microsoft.AspNet.Mvc;
using Microsoft.AspNet.Mvc.Infrastructure;
using Microsoft.AspNet.Mvc.ModelBinding;
using Microsoft.AspNet.Mvc.Rendering;
using Microsoft.AspNet.Mvc.ViewFeatures.Internal;
using System.Collections.Generic;
using System.IO;
using System.Text;
using System.Text.RegularExpressions;

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
            SerializeEditTemplate(settings);

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

        private void SerializeEditTemplate(IDictionary<string, object> options)
        {
            InitializeEditor();
            if (Editable.Enabled && !string.IsNullOrEmpty(EditorHtml))
            {
                var html = EditorHtml.Trim()
                                .EscapeHtmlEntities()
                                .Replace("\r\n", string.Empty)
                                .Replace("jQuery(\"#", "jQuery(\"\\#");

                options["editTemplate"] = html;
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
        private void InitializeEditor()
        {
            if (Editable.Enabled)
            {
                var popupSlashes = new Regex("(?<=data-val-regex-pattern=\")([^\"]*)", RegexOptions.Multiline);
                var htmlHelper = ViewContext.CreateHtmlHelper<T>();

                var viewContext = ViewContext.ViewContextForType<T>(ModelMetadataProvider);
                ((ICanHasViewContext)htmlHelper).Contextualize(viewContext);

                var sb = new StringBuilder();
                using (var writer = new StringWriter(sb))
                {
                    if (Editable.TemplateName.HasValue())
                    {
                        htmlHelper.EditorForModel(Editable.TemplateName).WriteTo(writer, HtmlEncoder);
                    }
                    else
                    {
                        htmlHelper.EditorForModel().WriteTo(writer, HtmlEncoder);
                    }
                }
                EditorHtml = popupSlashes.Replace(sb.ToString(), match =>
                {
                    return match.Groups[0].Value.Replace("\\", IsInClientTemplate ? "\\\\\\\\" : "\\\\");
                });
            }
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

        public ListViewEditingSettings<T> Editable { get; } = new ListViewEditingSettings<T>();
        public string EditorHtml
        {
            get;
            set;
        }
    }
}

