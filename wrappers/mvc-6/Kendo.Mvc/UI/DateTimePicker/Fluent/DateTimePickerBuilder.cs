using Microsoft.AspNet.Mvc;
using System;

namespace Kendo.Mvc.UI.Fluent
{
    public class DateTimePickerBuilder : WidgetBuilderBase<DateTimePicker, DateTimePickerBuilder>
    {
        public DateTimePickerBuilder(DateTimePicker component) : base(component)
        {

        }

        /// <summary>
        /// Sets the value of the picker input
        /// </summary>
        public DateTimePickerBuilder Value(DateTime? date)
        {
            Component.Value = date;

            return this as DateTimePickerBuilder;
        }

        /// <summary>
        /// Sets the value of the picker input
        /// </summary>
        public DateTimePickerBuilder Value(string date)
        {
            DateTime result;

            if (DateTime.TryParse(date, out result))
            {
                Component.Value = result;
            }
            else
            {
                Component.Value = null;
            }

            return this;
        }
    }
}