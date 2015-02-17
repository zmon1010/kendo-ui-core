using System;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring the Kendo UI DateTimePicker
    /// </summary>
    public partial class DateTimePickerBuilder : WidgetBuilderBase<DateTimePicker, DateTimePickerBuilder>
    {
        public DateTimePickerBuilder(DateTimePicker component) : base(component)
        {
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

