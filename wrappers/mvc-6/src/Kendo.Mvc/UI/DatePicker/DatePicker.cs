using System;
using System.Globalization;
using System.IO;
using System.Linq;
using Kendo.Mvc.Extensions;
using Kendo.Mvc.Resources;
using Microsoft.AspNet.Mvc;
using Microsoft.AspNet.Mvc.Rendering;
using Microsoft.AspNet.Mvc.Rendering.Expressions;

namespace Kendo.Mvc.UI
{
    /// <summary>
    /// Kendo UI DatePicker component
    /// </summary>
    public partial class DatePicker : WidgetBase
        
    {
        public DatePicker(ViewContext viewContext) : base(viewContext)
        {
            Animation = new PopupAnimation();
            Enabled = true;
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

        public bool Enabled
        {
            get;
            set;
        }

        public string FooterId
        {
            get;
            set;
        }

        public bool EnableFooter
        {
            get;
            set;
        }

        protected override void WriteHtml(TextWriter writer)
        {
            if (string.IsNullOrEmpty(Format))
            {
                Format = CultureInfo.DateTimeFormat.ShortDatePattern;
            }

            var metadata = ExpressionMetadataProvider.FromStringExpression(Name, HtmlHelper.ViewData, HtmlHelper.MetadataProvider).Metadata;
            var tag = Generator.GenerateDateInput(ViewContext, metadata, Id, Name, Value, Format, HtmlAttributes);

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

            var idPrefix = "#";
            if (IsInClientTemplate)
            {
                idPrefix = "\\" + idPrefix;
            }

            var animation = Animation.ToJson();

            if (animation.Keys.Any())
            {
                settings["animation"] = animation["animation"];
            }

            if (Culture.HasValue())
            {
                settings["culture"] = Culture;
            }

            if (EnableFooter)
            {
                if (FooterId.HasValue())
                {
                    settings["footer"] = new ClientHandlerDescriptor { HandlerName = string.Format("jQuery('{0}{1}').html()", idPrefix, FooterId) };
                }
                else if (Footer.HasValue())
                {
                    settings["footer"] = Footer;
                }
            }
            else
            {
                settings["footer"] = EnableFooter;
            }

            var month = MonthTemplate.Serialize();
            if (month.Any())
            {
                settings["month"] = month;
            }

            writer.Write(Initializer.Initialize(Selector, "DatePicker", settings));
        }

        public override void VerifySettings()
        {
            base.VerifySettings();

            if (Min > Max)
            {
                throw new ArgumentException(Exceptions.MinPropertyMustBeLessThenMaxProperty.FormatWith("Min", "Max"));
            }
        }
    }
}

