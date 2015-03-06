using System;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring DateTimePickerMonthSettings
    /// </summary>
    public partial class DateTimePickerMonthSettingsBuilder
        
    {
        public DateTimePickerMonthSettingsBuilder(DateTimePickerMonthSettings container)
        {
            Container = container;
        }

        protected DateTimePickerMonthSettings Container
        {
            get;
            private set;
        }

        // Place custom settings here
    }
}
