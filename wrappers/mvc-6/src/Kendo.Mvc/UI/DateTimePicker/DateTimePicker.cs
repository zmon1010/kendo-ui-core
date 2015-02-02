using Kendo.Mvc.Extensions;
using Microsoft.AspNet.Mvc;
using Microsoft.AspNet.Mvc.Rendering;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;

namespace Kendo.Mvc.UI
{
    public partial class DateTimePicker : WidgetBase, IInputComponent<DateTime>
    {
        static internal DateTime defaultMinDate = new DateTime(1800, 1, 1);
        static internal DateTime defaultMaxDate = new DateTime(2099, 12, 31);

        public DateTimePicker(ViewContext viewContext) : base(viewContext)
        {
            Value = null;
            Enabled = true;
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

        public IList<DateTime> Dates
        {
            get;
            set;
        }

        protected override void WriteHtml(TextWriter writer)
        {
            var tag = Generator.GenerateDateTimeInput(ViewContext, ModelMetadata, Id, Name, Value, Format, HtmlAttributes);

            if (!Enabled)
            {
                tag.MergeAttribute("disabled", "disabled");
            }

            writer.Write(tag.ToString(TagRenderMode.SelfClosing));

            base.WriteHtml(writer);
        }

        protected override Dictionary<string, object> SerializeSettings()
        {
            var settings = base.SerializeSettings();

            // Do custom serialization here

            return settings;
        }
    }
}
