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
        /// An collection of tools displayed in the ListBox's Toolbar. Tools can be built-in ("moveUp", "moveDown", "remove", "transferAllFrom", "transferAllTo", "transferFrom", "transferTo").The "moveUp" tool moves up the item that is currently selected by the end user.The "moveDown" tool moves down the item that is currently selected by the end user.The "remove" tool removes the item(s) that are currently selected by the end user.The "transferAllFrom" tool moves all items from current ListBox widget to the target widget related with connectWith option.The "transferAllTo" tool moves all items from target widget related with connectWith option to the current ListBox widget.The "transferFrom" tool moves all selected items from current ListBox widget to the target widget related with connectWith option.The "transferTo" tool moves all selected items from target widget related with connectWith option to the current ListBox widget.
        /// </summary>
        /// <param name="configurator">The configurator for the tools setting.</param>
        public ListBoxToolbarSettingsBuilder Tools(Action<ListBoxToolFactory> configurator)
        {
            configurator(new ListBoxToolFactory(container.Tools));

            return this;
        }
    }
}