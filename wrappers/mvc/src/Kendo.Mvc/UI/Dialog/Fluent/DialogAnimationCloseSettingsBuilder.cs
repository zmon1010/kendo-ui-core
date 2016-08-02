namespace Kendo.Mvc.UI.Fluent
{
    using System.Collections.Generic;
    using System.Collections;
    using System;
    using Kendo.Mvc.Extensions;

    /// <summary>
    /// Defines the fluent API for configuring the DialogAnimationCloseSettings settings.
    /// </summary>
    public class DialogAnimationCloseSettingsBuilder: IHideObjectMembers
    {
        private readonly DialogAnimationCloseSettings container;

        public DialogAnimationCloseSettingsBuilder(DialogAnimationCloseSettings settings)
        {
            container = settings;
        }

        //>> Fields
        
        /// <summary>
        /// Effect to be used for closing of the popup.
        /// </summary>
        /// <param name="value">The value that configures the effects.</param>
        public DialogAnimationCloseSettingsBuilder Effects(string value)
        {
            container.Effects = value;

            return this;
        }
        
        /// <summary>
        /// Defines the close animation duration.
        /// </summary>
        /// <param name="value">The value that configures the duration.</param>
        public DialogAnimationCloseSettingsBuilder Duration(double value)
        {
            container.Duration = value;

            return this;
        }
        
        //<< Fields
    }
}

