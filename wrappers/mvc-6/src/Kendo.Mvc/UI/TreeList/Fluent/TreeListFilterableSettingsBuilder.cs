using System;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring TreeListFilterableSettings
    /// </summary>
    public partial class TreeListFilterableSettingsBuilder
        
    {
        public TreeListFilterableSettingsBuilder(TreeListFilterableSettings container)
        {
            Container = container;
        }

        protected TreeListFilterableSettings Container
        {
            get;
            private set;
        }

        // Place custom settings here
    }
}
