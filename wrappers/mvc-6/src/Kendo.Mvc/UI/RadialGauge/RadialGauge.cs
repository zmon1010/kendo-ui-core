using Kendo.Mvc.Extensions;
using Microsoft.AspNet.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using Microsoft.AspNet.Mvc.Rendering;

namespace Kendo.Mvc.UI
{
    /// <summary>
    /// Kendo UI RadialGauge component
    /// </summary>
    public partial class RadialGauge : WidgetBase
        
    {
        public RadialGauge(ViewContext viewContext) : base(viewContext)
        {
        }

        /// <summary>
        /// Gets or sets the Gauge theme.
        /// </summary>
        /// <value>
        /// The Gauge theme.
        /// </value>
        public string Theme
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the render type.
        /// </summary>
        /// <value>The render type.</value>
        public RenderingMode? RenderAs
        {
            get;
            set;
        }

        protected override void WriteHtml(TextWriter writer)
        {
            var tag = Generator.GenerateTag("div", ViewContext, Id, Name, HtmlAttributes);

            writer.Write(tag.ToString(TagRenderMode.Normal));

            base.WriteHtml(writer);
        }

        public override void WriteInitializationScript(TextWriter writer)
        {
            var settings = SerializeSettings();

            if (Theme.HasValue())
            {
                settings.Add("theme", Theme);
            }

            writer.Write(Initializer.Initialize(Selector, "RadialGauge", settings));
        }
    }
}

