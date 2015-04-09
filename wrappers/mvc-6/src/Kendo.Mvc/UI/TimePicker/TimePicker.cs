using Kendo.Mvc.Extensions;
using Microsoft.AspNet.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Globalization;
using System.Linq;
using Microsoft.AspNet.Mvc.Rendering.Expressions;
using Microsoft.AspNet.Mvc.Rendering;

namespace Kendo.Mvc.UI
{
    /// <summary>
    /// Kendo UI TimePicker component
    /// </summary>
    public partial class TimePicker : WidgetBase
        
    {
        public TimePicker(ViewContext viewContext) : base(viewContext)
        {
            Animation = new PopupAnimation();
            Enabled = true;
        }

        public bool Enabled
        {
            get;
            set;
        }

        public PopupAnimation Animation
        {
            get;
            private set;
        }

        public CultureInfo CultureInfo
        {
            get
            {
                CultureInfo info = null;
                if (Culture.HasValue())
                {
                    info = new CultureInfo(Culture);
                }
                else
                {
                    info = CultureInfo.CurrentCulture;
                }

                return info;
            }
        }

        protected override void WriteHtml(TextWriter writer)
        {
            if (string.IsNullOrEmpty(Format))
            {
                Format = CultureInfo.DateTimeFormat.ShortTimePattern;
            }

            var metadata = ExpressionMetadataProvider.FromStringExpression(Name, HtmlHelper.ViewData, HtmlHelper.MetadataProvider);
            var tag = Generator.GenerateTimeInput(ViewContext, metadata, Id, Name, Value, Format, HtmlAttributes);

            if (!Enabled)
            {
                tag.MergeAttribute("disabled", "disabled");
            }

            writer.Write(tag.ToString(TagRenderMode.SelfClosing));

            base.WriteHtml(writer);
        }

        public override void WriteInitializationScript(TextWriter writer)
        {
            var settings = SerializeSettings();

            var animation = Animation.ToJson();
            if (animation.Keys.Any())
            {
                settings["animation"] = animation["animation"];
            }

            writer.Write(Initializer.Initialize(Selector, "TimePicker", settings));
        }
    }
}

