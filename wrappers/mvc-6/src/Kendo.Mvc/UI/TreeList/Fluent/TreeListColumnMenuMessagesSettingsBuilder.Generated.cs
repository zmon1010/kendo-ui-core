using System;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring TreeListColumnMenuMessagesSettings
    /// </summary>
    public partial class TreeListColumnMenuMessagesSettingsBuilder
        
    {
        /// <summary>
        /// The text message displayed for the column selection menu item.
        /// </summary>
        /// <param name="value">The value for Columns</param>
        public TreeListColumnMenuMessagesSettingsBuilder Columns(string value)
        {
            Container.Columns = value;
            return this;
        }

        /// <summary>
        /// The text message displayed for the filter menu item.
        /// </summary>
        /// <param name="value">The value for Filter</param>
        public TreeListColumnMenuMessagesSettingsBuilder Filter(string value)
        {
            Container.Filter = value;
            return this;
        }

        /// <summary>
        /// The text message displayed for the menu item which performs ascending sort.
        /// </summary>
        /// <param name="value">The value for SortAscending</param>
        public TreeListColumnMenuMessagesSettingsBuilder SortAscending(string value)
        {
            Container.SortAscending = value;
            return this;
        }

        /// <summary>
        /// The text message displayed for the menu item which performs descending sort.
        /// </summary>
        /// <param name="value">The value for SortDescending</param>
        public TreeListColumnMenuMessagesSettingsBuilder SortDescending(string value)
        {
            Container.SortDescending = value;
            return this;
        }


    }
}
