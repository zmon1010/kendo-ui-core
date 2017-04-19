using System;
using System.Collections.Generic;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring ListBoxToolbarSettings
    /// </summary>
    public partial class ListBoxToolbarSettingsBuilder
    {
        public ListBoxToolbarSettingsBuilder(ListBoxToolbarSettings container)
        {
            Container = container;
        }

        protected ListBoxToolbarSettings Container
        {
            get;
            private set;
        }

        // Place custom settings here

        /// <summary>
        /// An collection of tools displayed in the ListBox's Toolbar. Tools can be built-in ("moveUp", "moveDown", "remove", "transferAllFrom", "transferAllTo", "transferFrom", "transferTo").The "moveUp" tool moves up the item that is currently selected by the end user.The "moveDown" tool moves down the item that is currently selected by the end user.The "remove" tool removes the item(s) that are currently selected by the end user.The "transferAllFrom" tool moves all items from current ListBox widget to the target widget related with connectWith option.The "transferAllTo" tool moves all items from target widget related with connectWith option to the current ListBox widget.The "transferFrom" tool moves all selected items from current ListBox widget to the target widget related with connectWith option.The "transferTo" tool moves all selected items from target widget related with connectWith option to the current ListBox widget.
        /// </summary>
        /// <param name="configurator">The configurator for the tools setting.</param>
        public ListBoxToolbarSettingsBuilder Tools(Action<ListBoxToolFactory> configurator)
        {
            configurator(new ListBoxToolFactory(Container.Tools));

            return this;
        }
    }
}
