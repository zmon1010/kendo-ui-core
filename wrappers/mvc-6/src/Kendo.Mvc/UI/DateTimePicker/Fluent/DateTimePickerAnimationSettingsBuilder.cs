using System;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring DateTimePickerAnimationSettings
    /// </summary>
    public partial class DateTimePickerAnimationSettingsBuilder
        
    {
        public DateTimePickerAnimationSettingsBuilder(DateTimePickerAnimationSettings container)
        {
            Container = container;
        }

        protected DateTimePickerAnimationSettings Container
        {
            get;
            private set;
        }

        // Place custom settings here
    }
}
