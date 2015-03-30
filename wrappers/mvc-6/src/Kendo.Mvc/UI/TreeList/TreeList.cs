using Kendo.Mvc.Extensions;
using Kendo.Mvc.UI;
using Microsoft.AspNet.Mvc;
using Microsoft.AspNet.Mvc.ModelBinding;
using Microsoft.AspNet.Mvc.Rendering;
using Microsoft.Framework.DependencyInjection;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.RegularExpressions;

namespace Kendo.Mvc.UI
{
    /// <summary>
    /// Kendo UI TreeList component
    /// </summary>
    public partial class TreeList<T> : WidgetBase
        where T : class 
    {
        public TreeList(ViewContext viewContext) : base(viewContext)
        {
			DataSource = new DataSource(ModelMetadataProvider)
			{
				Type = DataSourceType.Server,
				ServerAggregates = true,
				ServerFiltering = true,
				ServerGrouping = true,
				ServerPaging = true,
				ServerSorting = true
			};

			DataSource.ModelType(typeof(T));
		}

		[Activate]
		public IModelMetadataProvider ModelMetadataProvider
		{
			get;
			set;
		}

		[Activate]
		public IScopedInstance<ActionBindingContext> ActionBindingContext
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

		protected override void WriteHtml(TextWriter writer)
        {
			if (DataSource.Type != DataSourceType.Custom || DataSource.CustomType == "aspnetmvc-ajax")
			{
				ProcessDataSource();
			}

			if (Editable.Enabled)
			{
				InitializeEditors();
			}

			var tag = Generator.GenerateTag("div", ViewContext, Id, Name, HtmlAttributes);            

            base.WriteHtml(writer);
        }

        public override void WriteInitializationScript(TextWriter writer)
        {			
            var settings = SerializeSettings();

			settings["dataSource"] = DataSource.ToJson();			

			if (Selectable.Enabled)
			{
				var selectable = "row";
				if (Selectable.Mode.HasValue)
				{
					selectable = Selectable.Mode.Value.Serialize();
				}

				if (Selectable.Type.HasValue)
				{
					selectable += ", " + Selectable.Type.Value.Serialize();
				}
			}

			writer.Write(Initializer.Initialize(Selector, "TreeList", settings));
        }

		private string EditorForModel(IHtmlHelper htmlHelper, string templateName, IEnumerable<Action<IDictionary<string, object>, object>> foreignKeyData, object additionalViewData)
		{
			var viewContext = ViewContext.ViewContextForType<T>(ModelMetadataProvider);
			((ICanHasViewContext)htmlHelper).Contextualize(viewContext);

			if (foreignKeyData != null)
			{
				var dataItem = Editable.DefaultDataItem();
				foreignKeyData.Each(action => action(viewContext.ViewData, dataItem));
			}

			if (templateName.HasValue())
			{
				return htmlHelper.EditorForModel(templateName, additionalViewData).ToString();
			}

			return htmlHelper.EditorForModel(additionalViewData).ToString();

		}

		private string EditorForColumn(TreeListColumn<T> column, IHtmlHelper helper)
		{
			((ICanHasViewContext)helper).Contextualize(ViewContext.ViewContextForType<T>(ModelMetadataProvider));

			var validation = helper.ValidationMessage(column.Field);

			return helper.Editor(column.Field, string.Empty /*EditorTemplateName*/, null /*AdditionalViewData*/).ToString() + validation ?? string.Empty;
		}

		private void InitializeEditors()
		{
			var popupSlashes = new Regex("(?<=data-val-regex-pattern=\")([^\"]*)", RegexOptions.Multiline);

			var dataItem = Editable.DefaultDataItem();

			var htmlHelper = ViewContext.CreateHtmlHelper<T>();

			if (Editable.Mode == TreeListEditMode.PopUp)
			{
				var html = EditorForModel(htmlHelper, Editable.TemplateName, null /*Columns.OfType<IGridForeignKeyColumn>().Select(c => c.SerializeSelectList)*/, null/*Editable.AdditionalViewData*/);

				Editable.EditorHtml = popupSlashes.Replace(html, match =>
				{
					return match.Groups[0].Value.Replace("\\", IsInClientTemplate ? "\\\\\\\\" : "\\\\");
				});
			}
			else
			{
				var fields = DataSource.Schema.Model.Fields;

				var isDynamic = dataItem.GetType().IsDynamicObject();

				Columns.Each(column =>
				{
					if (!column.Field.HasValue())
					{
						return;
					}

					var field = fields.FirstOrDefault(f => f.Member == column.Field);
					if (isDynamic && field != null && !field.IsEditable)
					{
						return;
					}

					var editorHtml = EditorForColumn(column, htmlHelper);

					if (IsInClientTemplate)
					{
						editorHtml = popupSlashes.Replace(editorHtml, match =>
						{
							return match.Groups[0].Value.Replace("\\", "\\\\");
						});
					}
					column.EditorHtml = editorHtml;

				});
			}
		}		

		private void ProcessDataSource()
		{			
			var binder = new DataSourceRequestModelBinder();

			var bindingContext = new ModelBindingContext
			{
				ValueProvider = ActionBindingContext.Value.ValueProvider,
				ModelMetadata = ModelMetadataProvider.GetMetadataForType(null, typeof(T))
			};

			var result = binder.BindModelAsync(bindingContext).Result; // make it run synchronously

			DataSource.Process((DataSourceRequest)bindingContext.Model, true/*!EnableCustomBinding*/);
		}		
	}
}

