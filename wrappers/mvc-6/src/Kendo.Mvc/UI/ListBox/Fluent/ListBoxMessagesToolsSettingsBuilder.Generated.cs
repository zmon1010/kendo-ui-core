using System;
using System.Collections.Generic;
using Kendo.Mvc.Extensions;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring ListBoxMessagesToolsSettings
    /// </summary>
    public partial class ListBoxMessagesToolsSettingsBuilder
        
    {
        /// <summary>
        /// Defines the text of the Move Down button that is located in the toolbar of the ListBox.
        /// </summary>
        /// <param name="value">The value for MoveDown</param>
        public ListBoxMessagesToolsSettingsBuilder MoveDown(string value)
        {
            Container.MoveDown = value;
            return this;
        }

        /// <summary>
        /// Defines the text of the Move Up button that is located in the toolbar of the ListBox.
        /// </summary>
        /// <param name="value">The value for MoveUp</param>
        public ListBoxMessagesToolsSettingsBuilder MoveUp(string value)
        {
            Container.MoveUp = value;
            return this;
        }

        /// <summary>
        /// Defines the text of the Delete button that is located in the toolbar of the ListBox.
        /// </summary>
        /// <param name="value">The value for Remove</param>
        public ListBoxMessagesToolsSettingsBuilder Remove(string value)
        {
            Container.Remove = value;
            return this;
        }

        /// <summary>
        /// Defines the text of the Transfer All From button that is located in the toolbar of the ListBox.
        /// </summary>
        /// <param name="value">The value for TransferAllFrom</param>
        public ListBoxMessagesToolsSettingsBuilder TransferAllFrom(string value)
        {
            Container.TransferAllFrom = value;
            return this;
        }

        /// <summary>
        /// Defines the text of the Transfer All To button that is located in the toolbar of the ListBox.
        /// </summary>
        /// <param name="value">The value for TransferAllTo</param>
        public ListBoxMessagesToolsSettingsBuilder TransferAllTo(string value)
        {
            Container.TransferAllTo = value;
            return this;
        }

        /// <summary>
        /// Defines the text of the Transfer From button that is located in the toolbar of the ListBox.
        /// </summary>
        /// <param name="value">The value for TransferFrom</param>
        public ListBoxMessagesToolsSettingsBuilder TransferFrom(string value)
        {
            Container.TransferFrom = value;
            return this;
        }

        /// <summary>
        /// Defines the text of the Transfer All To button that is located in the toolbar of the ListBox.
        /// </summary>
        /// <param name="value">The value for TransferTo</param>
        public ListBoxMessagesToolsSettingsBuilder TransferTo(string value)
        {
            Container.TransferTo = value;
            return this;
        }

    }
}
