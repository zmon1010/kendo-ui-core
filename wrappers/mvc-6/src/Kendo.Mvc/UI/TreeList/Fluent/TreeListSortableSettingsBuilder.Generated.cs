using System;
using System.Collections.Generic;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring TreeListSortableSettings
    /// </summary>
    public partial class TreeListSortableSettingsBuilder<T>
        
    {
        /// <summary>
        /// If set to true the user can get the treelist in its unsorted state by clicking the sorted column header.
        /// </summary>
        /// <param name="value">The value for AllowUnsort</param>
        public TreeListSortableSettingsBuilder<T> AllowUnsort(bool value)
        {
            Container.AllowUnsort = value;
            return this;
        }

        /// <summary>
        /// The sorting mode. If set to "single" the user can sort by one column. If set to "multiple" the user can sort by multiple columns.
        /// </summary>
        /// <param name="value">The value for Mode</param>
        public TreeListSortableSettingsBuilder<T> Mode(string value)
        {
            Container.Mode = value;
            return this;
        }

    }
}
