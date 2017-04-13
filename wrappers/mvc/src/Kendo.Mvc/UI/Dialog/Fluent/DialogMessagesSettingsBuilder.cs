namespace Kendo.Mvc.UI.Fluent
{
    using System.Collections.Generic;
    using System.Collections;
    using System;
    using Kendo.Mvc.Extensions;

    /// <summary>
    /// Defines the fluent API for configuring the DialogMessagesSettings settings.
    /// </summary>
    public class DialogMessagesSettingsBuilder: IHideObjectMembers
    {
        private readonly DialogMessagesSettings container;

        public DialogMessagesSettingsBuilder(DialogMessagesSettings settings)
        {
            container = settings;
        }

        //>> Fields
        
        /// <summary>
        /// The title of the close button.
        /// </summary>
        /// <param name="value">The value that configures the close.</param>
        public DialogMessagesSettingsBuilder Close(string value)
        {
            container.Close = value;

            return this;
        }
        
        /// <summary>
        /// The title of the prompt input.
        /// </summary>
        /// <param name="value">The value that configures the promptinput.</param>
        public DialogMessagesSettingsBuilder PromptInput(string value)
        {
            container.PromptInput = value;

            return this;
        }
        
        //<< Fields
    }
}

