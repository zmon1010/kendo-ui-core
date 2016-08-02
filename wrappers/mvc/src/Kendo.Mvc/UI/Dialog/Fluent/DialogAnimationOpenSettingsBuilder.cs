namespace Kendo.Mvc.UI.Fluent
{
    using System.Collections.Generic;
    using System.Collections;
    using System;
    using Kendo.Mvc.Extensions;

    /// <summary>
    /// Defines the fluent API for configuring the DialogAnimationOpenSettings settings.
    /// </summary>
    public class DialogAnimationOpenSettingsBuilder: IHideObjectMembers
    {
        private readonly DialogAnimationOpenSettings container;

        public DialogAnimationOpenSettingsBuilder(DialogAnimationOpenSettings settings)
        {
            container = settings;
        }

        //>> Fields
        
        /// <summary>
        /// Effect to be used for opening of the popup.
        /// </summary>
        /// <param name="value">The value that configures the effects.</param>
        public DialogAnimationOpenSettingsBuilder Effects(string value)
        {
            container.Effects = value;

            return this;
        }
        
        /// <summary>
        /// Defines the open animation duration.
        /// </summary>
        /// <param name="value">The value that configures the duration.</param>
        public DialogAnimationOpenSettingsBuilder Duration(double value)
        {
            container.Duration = value;

            return this;
        }
        
        //<< Fields
    }
}

