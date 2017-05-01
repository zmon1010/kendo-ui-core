namespace Kendo.Mvc.UI.Fluent
{
    using System.Collections.Generic;
    using System.Collections;
    using System;
    using Kendo.Mvc.Extensions;

    /// <summary>
    /// Defines the fluent API for configuring the ListBoxMessagesToolsSettings settings.
    /// </summary>
    public class ListBoxMessagesToolsSettingsBuilder: IHideObjectMembers
    {
        private readonly ListBoxMessagesToolsSettings container;

        public ListBoxMessagesToolsSettingsBuilder(ListBoxMessagesToolsSettings settings)
        {
            container = settings;
        }

        //>> Fields
        
        /// <summary>
        /// Defines the text of the Move Down button that is located in the toolbar of the ListBox.
        /// </summary>
        /// <param name="value">The value that configures the movedown.</param>
        public ListBoxMessagesToolsSettingsBuilder MoveDown(string value)
        {
            container.MoveDown = value;

            return this;
        }
        
        /// <summary>
        /// Defines the text of the Move Up button that is located in the toolbar of the ListBox.
        /// </summary>
        /// <param name="value">The value that configures the moveup.</param>
        public ListBoxMessagesToolsSettingsBuilder MoveUp(string value)
        {
            container.MoveUp = value;

            return this;
        }
        
        /// <summary>
        /// Defines the text of the Delete button that is located in the toolbar of the ListBox.
        /// </summary>
        /// <param name="value">The value that configures the remove.</param>
        public ListBoxMessagesToolsSettingsBuilder Remove(string value)
        {
            container.Remove = value;

            return this;
        }
        
        /// <summary>
        /// Defines the text of the Transfer All From button that is located in the toolbar of the ListBox.
        /// </summary>
        /// <param name="value">The value that configures the transferallfrom.</param>
        public ListBoxMessagesToolsSettingsBuilder TransferAllFrom(string value)
        {
            container.TransferAllFrom = value;

            return this;
        }
        
        /// <summary>
        /// Defines the text of the Transfer All To button that is located in the toolbar of the ListBox.
        /// </summary>
        /// <param name="value">The value that configures the transferallto.</param>
        public ListBoxMessagesToolsSettingsBuilder TransferAllTo(string value)
        {
            container.TransferAllTo = value;

            return this;
        }
        
        /// <summary>
        /// Defines the text of the Transfer From button that is located in the toolbar of the ListBox.
        /// </summary>
        /// <param name="value">The value that configures the transferfrom.</param>
        public ListBoxMessagesToolsSettingsBuilder TransferFrom(string value)
        {
            container.TransferFrom = value;

            return this;
        }
        
        /// <summary>
        /// Defines the text of the Transfer To button that is located in the toolbar of the ListBox.
        /// </summary>
        /// <param name="value">The value that configures the transferto.</param>
        public ListBoxMessagesToolsSettingsBuilder TransferTo(string value)
        {
            container.TransferTo = value;

            return this;
        }
        
        //<< Fields
    }
}

