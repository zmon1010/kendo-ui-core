using System;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring TreeListSortableSettings
    /// </summary>
    public partial class TreeListSortableSettingsBuilder
        
    {
        public TreeListSortableSettingsBuilder(TreeListSortableSettings container)
        {
            Container = container;
        }

        protected TreeListSortableSettings Container
        {
            get;
            private set;
        }

        // Place custom settings here
    }
}
