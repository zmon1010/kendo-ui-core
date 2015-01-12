using Microsoft.AspNet.Mvc;
using System;

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
    }
}