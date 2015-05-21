using Kendo.Mvc.Extensions;
using Microsoft.AspNet.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using Kendo.Mvc.Resources;

namespace Kendo.Mvc.UI
{
    /// <summary>
    /// Kendo UI Calendar component
    /// </summary>
    public partial class Calendar : WidgetBase
        
    {
        public Calendar(ViewContext viewContext) : base(viewContext)
        {            
        }

        [Activate]
        public IUrlGenerator UrlGenerator
        {
            get;
            private set;
        }

        public string FooterId
        {
            get;
            set;
        }

        public bool EnableFooter { get; set; } = true;

        public CalendarSelectionSettings SelectionSettings { get; } = new CalendarSelectionSettings();

        protected override void WriteHtml(TextWriter writer)
        {
            HtmlAttributes.AppendInValue("class", " ", "k-widget k-calendar");

            var tag = Generator.GenerateTag("div", ViewContext, Id, Name, HtmlAttributes);

            writer.Write(tag.ToString());

            base.WriteHtml(writer);
        }

        public override void VerifySettings()
        {
            base.VerifySettings();

            if (Min > Max)
            {
                throw new ArgumentException(Exceptions.MinPropertyMustBeLessThenMaxProperty.FormatWith("Min", "Max"));
            }
        }

        public override void WriteInitializationScript(TextWriter writer)
        {
            var settings = SerializeSettings();

            var idPrefix = "#";
            if (IsInClientTemplate)
            {
                idPrefix = "\\" + idPrefix;
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

            if (SelectionSettings.Dates.Any())
            {
                settings["dates"] = SelectionSettings.Dates;
            }

            var url = SelectionSettings.GenerateUrl(ViewContext, UrlGenerator);

            if (url.HasValue())
            {
                settings["url"] = url;
            }

            writer.Write(Initializer.Initialize(Selector, "Calendar", settings));
        }
    }
}

