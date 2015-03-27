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
    }
}

