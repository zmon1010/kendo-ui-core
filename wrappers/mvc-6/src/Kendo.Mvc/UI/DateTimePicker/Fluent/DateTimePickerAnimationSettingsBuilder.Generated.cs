using System;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring DateTimePickerAnimationSettings
    /// </summary>
    public partial class DateTimePickerAnimationSettingsBuilder
        
    {
        /// <summary>
        /// The animation played when a popup is closed.
        /// </summary>
        /// <param name="configurator">The configurator for the close setting.</param>
        public DateTimePickerAnimationSettingsBuilder Close(Action<DateTimePickerAnimationCloseSettingsBuilder> configurator)
        {
            configurator(new DateTimePickerAnimationCloseSettingsBuilder(Container.Close));
            return this;
        }

        /// <summary>
        /// The animation played when the popup is opened.
        /// </summary>
        /// <param name="configurator">The configurator for the open setting.</param>
        public DateTimePickerAnimationSettingsBuilder Open(Action<DateTimePickerAnimationOpenSettingsBuilder> configurator)
        {
            configurator(new DateTimePickerAnimationOpenSettingsBuilder(Container.Open));
            return this;
        }


    }
}
