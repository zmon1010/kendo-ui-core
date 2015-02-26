using System.Collections.Generic;
using System.IO;
using System.Linq;
using Microsoft.AspNet.Mvc;
using Microsoft.AspNet.Mvc.ModelBinding;
using Microsoft.AspNet.Routing;

namespace Kendo.Mvc.UI
{
    /// <summary>
    /// The server side wrapper for Kendo UI Grid
    /// </summary>
    /// <typeparam name="T"></typeparam>
    public partial class Grid<T> : WidgetBase
        where T : class
    {
        private readonly static int DEFAULT_COLUMN_RESIZE_HANDLE_WIDTH = 3;

        public Grid(ViewContext viewContext) : base (viewContext)
        {
          //  this.htmlBuilderFactory = htmlBuilderFactory;

            PrefixUrlParameters = true;
			//  RowTemplate = new HtmlTemplate<T>();
			//DetailTemplate = new HtmlTemplate<T>();
			//Columns = new List<GridColumnBase<T>>();
			//DataKeys = new List<IDataKey>();

			InitializeSettings();

            Pageable = new PageableSettings();
            Sortable = new GridSortableSettings();
            Scrollable = new GridScrollableSettings();
            Navigatable = new GridSettings();
            Filterable = new GridFilterableSettings();
            ColumnMenu = new GridColumnMenuSettings();

            //Editable = new GridEditableSettings<T>(this)
            //{
            //    PopUp = new Window(viewContext, Initializer)
            //    {
            //        Modal = true,
            //        Draggable = true
            //    }
            //};

            Grouping = new GridGroupableSettings();
            Resizable = new GridSettings();
            Reorderable = new GridSettings();                        

            //Selectable = new GridSelectableSettings();

            //ToolBar = new GridToolBarSettings<T>(this);
            //NoRecordsTemplate = new HtmlTemplate();

            AutoGenerateColumns = true;

            ColumnResizeHandleWidth = DEFAULT_COLUMN_RESIZE_HANDLE_WIDTH;

            TableHtmlAttributes = new RouteValueDictionary();
            ModelMetadataProvider.GetType();

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

        public int ColumnResizeHandleWidth
        {
            get;
            set;
        }

        public bool AutoGenerateColumns
        {
            get;
            set;
        }

        /// <summary>
        /// Gets the column menu configuration.
        /// </summary>
        public GridColumnMenuSettings ColumnMenu
        {
            get;
            private set;
        }

        /// <summary>
        /// Gets the filtering configuration.
        /// </summary>
        public GridFilterableSettings Filterable
        {
            get;
            private set;
        }

        /// <summary>
        /// Gets the keyboard navigation configuration.
        /// </summary>
        public GridSettings Navigatable
        {
            get;
            private set;
        }

        /// <summary>
        /// Gets the scrolling configuration.
        /// </summary>
        public GridScrollableSettings Scrollable
        {
            get;
            private set;
        }

        /// <summary>
        /// Gets the paging configuration.
        /// </summary>
        public PageableSettings Pageable
        {
            get;
            internal set;
        }

        /// <summary>
        /// Gets the sorting configuration.
        /// </summary>
        /// <value>The sorting.</value>
        public GridSortableSettings Sortable
        {
            get;
            internal set;
        }

        public GridGroupableSettings Grouping
        {
            get;
            private set;
        }

        public GridSettings Resizable
        {
            get;
            private set;
        }

        public GridSettings Reorderable
        {
            get;
            private set;
        }

        /// <summary>
        /// Gets or sets a value indicating whether to add the <see cref="WidgetBase.Name"/> property of the grid as a prefix in url parameters.
        /// </summary>
        /// <value><c>true</c> if prefixing is enabled; otherwise, <c>false</c>. The default value is <c>true</c></value>
        public bool PrefixUrlParameters
        {
            get;
            set;
        }

        public IDictionary<string, object> TableHtmlAttributes
        {
            get;
            private set;
        }

        public bool? AutoBind { get; set; }

        protected override Dictionary<string, object> SerializeSettings()
        {
            var settings = base.SerializeSettings();

			var autoBind = DataSource.Type != DataSourceType.Server && AutoBind.GetValueOrDefault(true);

		//	var columns = VisibleColumns.Select(c => c.ToJson());

			var idPrefix = "#";
			if (IsInClientTemplate)
			{
				idPrefix = "\\" + idPrefix;
			}

			//if (columns.Any())
			//{
			//	options["columns"] = columns;
			//}

			if (Grouping.Enabled)
			{
				settings["groupable"] = Grouping.ToJson();
			}

			if (Pageable.Enabled)
			{
				Pageable.AutoBind = autoBind;

				settings["pageable"] = Pageable.ToJson();
			}

			if (Sortable.Enabled)
			{
				var sorting = Sortable.ToJson();
				settings["sortable"] = sorting.Any() ? (object)sorting : true;
			}

			//if (Selectable.Enabled)
			//{
			//	options["selectable"] = String.Format("{0}, {1}", Selectable.Mode, Selectable.Type);
			//}

			if (Filterable.Enabled)
			{
				var filtering = Filterable.ToJson();
				settings["filterable"] = filtering.Any() ? (object)filtering : true;
			}			

			//var pdf = Pdf.ToJson();

			//if (pdf.Any())
			//{
			//	options["pdf"] = pdf;
			//}

			if (ColumnMenu.Enabled)
			{
				var menu = ColumnMenu.ToJson();
				settings["columnMenu"] = menu.Any() ? (object)menu : true;
			}

			if (Resizable.Enabled)
			{
				settings["resizable"] = true;
			}

			if (ColumnResizeHandleWidth != DEFAULT_COLUMN_RESIZE_HANDLE_WIDTH)
			{
				settings["columnResizeHandleWidth"] = ColumnResizeHandleWidth;
			}

			if (Reorderable.Enabled)
			{
				settings["reorderable"] = true;
			}

			if (!Scrollable.Enabled)
			{
				settings["scrollable"] = false;
			}
			else
			{
				var scrolling = Scrollable.ToJson();
				if (scrolling.Any())
				{
					settings["scrollable"] = scrolling;
				}
			}

			//if (Editable.Enabled)
			//{
			//	options["editable"] = Editable.ToJson();
			//}

			//if (ToolBar.Enabled)
			//{
			//	options["toolbar"] = ToolBar.ToJson();
			//}

			if (autoBind == false)
			{
				settings["autoBind"] = autoBind;
			}

			settings["dataSource"] = DataSource.ToJson();

			//if (!String.IsNullOrEmpty(ClientDetailTemplateId))
			//{
			//	options["detailTemplate"] = new ClientHandlerDescriptor { HandlerName = String.Format("kendo.template(jQuery('{0}{1}').html())", idPrefix, ClientDetailTemplateId) };
			//}

			//if (!String.IsNullOrEmpty(ClientRowTemplate))
			//{
			//	options["rowTemplate"] = ClientRowTemplate;
			//}

			//if (!String.IsNullOrEmpty(ClientAltRowTemplate))
			//{
			//	options["altRowTemplate"] = ClientAltRowTemplate;
			//}

			if (Navigatable.Enabled)
			{
				settings["navigatable"] = true;
			}

			//if (Mobile != MobileMode.Disabled)
			//{
			//	if (Mobile == MobileMode.Auto)
			//	{
			//		options["mobile"] = true;
			//	}
			//	else
			//	{
			//		options["mobile"] = Mobile.ToString().ToLowerInvariant();
			//	}
			//}

			return settings;
        }

        protected override void WriteHtml(TextWriter writer)
        {            
            var tag = Generator.GenerateTag("div", ViewContext, Id, Name, HtmlAttributes);            

            writer.Write(tag.ToString());

            base.WriteHtml(writer);
        }
    }
}