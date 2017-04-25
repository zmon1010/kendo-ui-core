namespace Kendo.Mvc.UI.Fluent
{
    using System.Collections.Generic;
    using System.Collections;
    using System;
    using Kendo.Mvc.Extensions;

    /// <summary>
    /// Defines the fluent API for configuring the ListBoxMessagesSettings settings.
    /// </summary>
    public class ListBoxMessagesSettingsBuilder: IHideObjectMembers
    {
        private readonly ListBoxMessagesSettings container;

        public ListBoxMessagesSettingsBuilder(ListBoxMessagesSettings settings)
        {
            container = settings;
        }

        //>> Fields
        
        /// <summary>
        /// Defines the localization texts for tools in the ListBox. Texts are used for tooltip and accessibility purpose.
        /// </summary>
        /// <param name="configurator">The action that configures the tools.</param>
        public ListBoxMessagesSettingsBuilder Tools(Action<ListBoxMessagesToolsSettingsBuilder> configurator)
        {
            configurator(new ListBoxMessagesToolsSettingsBuilder(container.Tools));
            return this;
        }
        
        //<< Fields
    }
}

