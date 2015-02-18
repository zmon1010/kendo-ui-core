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
        /// Sets the date format, which will be used to parse and format the machine date. Defaults to CultureInfo.DateTimeFormat.ShortDatePattern.
        /// </summary>
        public DateTimePickerBuilder Format(string format)
        {
            Component.Format = format;

            return this;
        }

        /// <summary>
        /// Sets the minimal date, which can be selected in picker.
        /// </summary>
        public DateTimePickerBuilder Min(DateTime date)
        {
            Component.Min = date;

            return this;
        }

        /// <summary>
        /// Sets the maximal date, which can be selected in picker.
        /// </summary>
        public DateTimePickerBuilder Max(DateTime date)
        {
            Component.Max = date;

            return this;
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

