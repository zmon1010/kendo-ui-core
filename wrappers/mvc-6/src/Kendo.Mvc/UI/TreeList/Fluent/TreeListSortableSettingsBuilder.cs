using System;
using System.Collections.Generic;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring TreeListSortableSettings
    /// </summary>
    public partial class TreeListSortableSettingsBuilder<T>
        
    {
        public TreeListSortableSettingsBuilder(TreeListSortableSettings<T> container)
        {
            Container = container;
        }

        protected TreeListSortableSettings<T> Container
        {
            get;
            private set;
        }

        // Place custom settings here
    }
}
