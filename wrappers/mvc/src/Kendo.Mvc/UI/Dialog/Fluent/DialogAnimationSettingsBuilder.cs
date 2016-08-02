namespace Kendo.Mvc.UI.Fluent
{
    using System.Collections.Generic;
    using System.Collections;
    using System;
    using Kendo.Mvc.Extensions;

    /// <summary>
    /// Defines the fluent API for configuring the DialogAnimationSettings settings.
    /// </summary>
    public class DialogAnimationSettingsBuilder: IHideObjectMembers
    {
        private readonly DialogAnimationSettings container;

        public DialogAnimationSettingsBuilder(DialogAnimationSettings settings)
        {
            container = settings;
        }

        //>> Fields
        
        /// <summary>
        /// The animation that will be used when a Dialog closes.
        /// </summary>
        /// <param name="configurator">The action that configures the close.</param>
        public DialogAnimationSettingsBuilder Close(Action<DialogAnimationCloseSettingsBuilder> configurator)
        {
            configurator(new DialogAnimationCloseSettingsBuilder(container.Close));
            return this;
        }
        
        /// <summary>
        /// The animation that will be used when a Dialog opens.
        /// </summary>
        /// <param name="configurator">The action that configures the open.</param>
        public DialogAnimationSettingsBuilder Open(Action<DialogAnimationOpenSettingsBuilder> configurator)
        {
            configurator(new DialogAnimationOpenSettingsBuilder(container.Open));
            return this;
        }
        
        //<< Fields
    }
}

