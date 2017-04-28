namespace Kendo.Mvc.UI.Fluent
{
    using System.Collections.Generic;
    using System.Collections;
    using System;
    using Kendo.Mvc.Extensions;

    /// <summary>
    /// Defines the fluent API for configuring the ListBoxToolbarSettings settings.
    /// </summary>
    public class ListBoxToolbarSettingsBuilder: IHideObjectMembers
    {
        private readonly ListBoxToolbarSettings container;

        public ListBoxToolbarSettingsBuilder(ListBoxToolbarSettings settings)
        {
            container = settings;
        }

        /// <summary>
        /// The position relative to the ListBox element, at which the toolbar will be shown. Predefined values are "bottom", "top", "left", "right".
        /// </summary>
        /// <param name="value">The value that configures the position.</param>
        public ListBoxToolbarSettingsBuilder Position(ListBoxToolbarPosition value)
        {
            container.Position = value;

            return this;
        }

        //>> Fields
        
        //<< Fields

        /// <summary>
        /// A collection of tools that are used to interact with the ListBox.
        /// The built-in tools are:
        /// - "moveUp" - Moves up the selected ListBox items.
        /// - "moveDown" - Moves down the selected ListBox items.
        /// - "remove" - Removes the selected ListBox items.
        /// - "transferTo" - Moves the selected items from the current ListBox to the target that is defined in the connectWith option.
        /// - "transferFrom" - Moves the selected items from the ListBox that is defined in the connectWith option to the current ListBox.
        /// - "transferAllTo" - Moves all items from the current ListBox to the target that is defined in the connectWith option.
        /// - "transferAllFrom" - Moves all items from the ListBox that is defined in the connectWith option to the current ListBox.
        /// </summary>
        /// <param name="configurator">The configurator for the tools setting.</param>
        public ListBoxToolbarSettingsBuilder Tools(Action<ListBoxToolFactory> configurator)
        {
            configurator(new ListBoxToolFactory(container.Tools));

            return this;
        }
    }
}