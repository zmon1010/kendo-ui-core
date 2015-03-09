using System;
using System.Collections.Generic;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring TreeListEditableSettings
    /// </summary>
    public partial class TreeListEditableSettingsBuilder<T>
        
    {
        public TreeListEditableSettingsBuilder(TreeListEditableSettings<T> container)
        {
            Container = container;
        }

        protected TreeListEditableSettings<T> Container
        {
            get;
            private set;
        }

        // Place custom settings here
    }
}
