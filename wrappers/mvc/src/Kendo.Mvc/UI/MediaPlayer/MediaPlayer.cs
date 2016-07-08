namespace Kendo.Mvc.UI
{
    using Extensions;
    using Infrastructure;
    using System.Collections.Generic;
    using System.IO;
    using System.Web.Mvc;
    using System.Web.UI;

    /// <summary>
    /// Kendo UI MediaPlayer component
    /// </summary>
    public class MediaPlayer<T> : WidgetBase
        where T : class
    {
        public MediaPlayer(ViewContext viewContext, IJavaScriptInitializer initializer, IUrlGenerator urlGenerator)
            : base(viewContext, initializer)
        {
            UrlGenerator = urlGenerator;

            DataSource = new DataSource()
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
        public string TagName
        {
            get;
            set;
        }
        public IUrlGenerator UrlGenerator
        {
            get;
            private set;
        }

        protected override void WriteHtml(HtmlTextWriter writer)
        {
            var html = new MediaPlayerHtmlBuilder<T>(this).Build();
            writer.Write(html.InnerHtml);

            base.WriteHtml(writer);
        }

        public override void WriteInitializationScript(TextWriter writer)
        {
            var settings = new Dictionary<string, object>(Events);

            if (DataSourceId.HasValue())
            {
                settings["dataSourceId"] = DataSourceId;
            }
            else
            {
                settings["dataSource"] = DataSource.ToJson();
            }

            writer.Write(Initializer.Initialize(Selector, "MediaPlayer", settings));
            base.WriteInitializationScript(writer);
        }

        public DataSource DataSource
        {
            get;
            private set;
        }

        public string DataSourceId
        {
            get;
            set;
        }
    }
}

