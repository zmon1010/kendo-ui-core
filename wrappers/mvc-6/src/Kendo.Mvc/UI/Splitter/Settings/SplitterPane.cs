using System;
using System.Collections.Generic;
using System.IO;
using Kendo.Mvc.Extensions;
using Kendo.Mvc.Rendering;
using Microsoft.AspNet.Mvc.Rendering;
using Microsoft.AspNet.Routing;

namespace Kendo.Mvc.UI
{
    /// <summary>
    /// Kendo UI SplitterPane class
    /// </summary>
    public partial class SplitterPane 
    {
        public SplitterPane()
        {
        }

        public string MaxSize { get; set; }
        public string MinSize { get; set; }
        public string ContentUrl { get; set; }

        /// <summary>
        /// Specifies HTML attributes for the pane
        /// </summary>
        public IDictionary<string, object> HtmlAttributes
        {
            get;            
        } = new RouteValueDictionary();

        /// <summary>
        /// Specifies the pane contents
        /// </summary>
        public Func<object, object> Template { get; set; }
        public Action TemplateAction { get; set; }
        public string Html { get; set; }

        public Dictionary<string, object> Serialize()
        {
            var settings = SerializeSettings();

            if (MaxSize?.HasValue() == true)
            {
                settings["max"] = MaxSize;
            }

            if (MinSize?.HasValue() == true)
            {
                settings["min"] = MinSize;
            }

            if (ContentUrl?.HasValue() == true)
            {
                settings["contentUrl"] = ContentUrl;
            }

            return settings;
        }

        public void WriteHtml(TextWriter writer, IKendoHtmlGenerator generator)
        {
            var tag = generator.GenerateTag("div", HtmlAttributes);

            writer.Write(tag.ToString(TagRenderMode.StartTag));

            tag.AddCssClass("k-pane");

            if (Scrollable.HasValue && Scrollable.Value)
            {
                tag.AddCssClass("k-scrollable");
            }

            if (Html.HasValue())
            {
                writer.Write(Html);
            }
            else if (Template != null)
            {
                writer.WriteContent(Template);
            }
            else if (TemplateAction != null)
            {
                TemplateAction();
            }

            writer.Write(tag.ToString(TagRenderMode.EndTag));
        }
    }
}
