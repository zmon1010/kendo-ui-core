using System;
using System.Collections.Generic;
using Kendo.Mvc.Extensions;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring ListBoxMessagesSettings
    /// </summary>
    public partial class ListBoxMessagesSettingsBuilder
        
    {
        /// <summary>
        /// Defines the localization texts for tools in the ListBox. Texts are used when you configure the tooltip and accessibility support.
        /// </summary>
        /// <param name="configurator">The configurator for the tools setting.</param>
        public ListBoxMessagesSettingsBuilder Tools(Action<ListBoxMessagesToolsSettingsBuilder> configurator)
        {

            Container.Tools.ListBox = Container.ListBox;
            configurator(new ListBoxMessagesToolsSettingsBuilder(Container.Tools));

            return this;
        }

    }
}
