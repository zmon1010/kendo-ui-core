using Kendo.Mvc.Extensions;
using Microsoft.AspNet.Mvc;
using Microsoft.AspNet.Mvc.ModelBinding;
using System;
using System.Collections.Generic;
using System.IO;

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
            var tag = Generator.GenerateTag("div", ViewContext, Id, Name, HtmlAttributes);

            // Do custom rendering here

            base.WriteHtml(writer);
        }

        public override void WriteInitializationScript(TextWriter writer)
        {
            var settings = SerializeSettings();

			settings["dataSource"] = (Dictionary<string, object>)DataSource.ToJson();

			writer.Write(Initializer.Initialize(Selector, "TreeList", settings));
        }
    }
}

