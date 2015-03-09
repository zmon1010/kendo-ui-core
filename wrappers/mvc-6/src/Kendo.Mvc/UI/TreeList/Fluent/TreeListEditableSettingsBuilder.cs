using System;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring TreeListEditableSettings
    /// </summary>
    public partial class TreeListEditableSettingsBuilder
        
    {
        public TreeListEditableSettingsBuilder(TreeListEditableSettings container)
        {
            Container = container;
        }

        protected TreeListEditableSettings Container
        {
            get;
            private set;
        }

        // Place custom settings here
    }
}
