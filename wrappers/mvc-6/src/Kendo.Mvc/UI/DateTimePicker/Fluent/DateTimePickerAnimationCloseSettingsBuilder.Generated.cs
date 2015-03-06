using System;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring DateTimePickerAnimationCloseSettings
    /// </summary>
    public partial class DateTimePickerAnimationCloseSettingsBuilder
        
    {
        /// <summary>
        /// The effect(s) to use when playing the close animation. Multiple effects should be separated with a space.Complete list of available animations
        /// </summary>
        /// <param name="value">The value that configures the effects.</param>
        public DateTimePickerAnimationCloseSettingsBuilder Effects(string value)
        {
            Container.Effects = value;

            return this;
        }
        /// <summary>
        /// The duration of the close animation in milliseconds.
        /// </summary>
        /// <param name="value">The value that configures the duration.</param>
        public DateTimePickerAnimationCloseSettingsBuilder Duration(double value)
        {
            Container.Duration = value;

            return this;
        }

    }
}
