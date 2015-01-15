using Microsoft.AspNet.Mvc;
using System;
using System.Collections.Generic;
using System.IO;

namespace Kendo.Mvc.UI
{
    public class DateTimePicker : WidgetBase
    {
        public DateTimePicker(ViewContext viewContext) : base(viewContext)
        {

        }

        public DateTime? Value
        {
            get;
            set;
        }

        public override void WriteInitializationScript(TextWriter writer)
        {
            var options = new Dictionary<string, object>(Events);

            writer.Write(Initializer.Initialize(Selector, "DateTimePicker", options));

            base.WriteInitializationScript(writer);
        }
    }
}