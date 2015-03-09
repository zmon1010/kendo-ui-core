using System;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring TreeListColumnMenuSettings
    /// </summary>
    public partial class TreeListColumnMenuSettingsBuilder
        
    {
        public TreeListColumnMenuSettingsBuilder(TreeListColumnMenuSettings container)
        {
            Container = container;
        }

        protected TreeListColumnMenuSettings Container
        {
            get;
            private set;
        }

        // Place custom settings here
    }
}
