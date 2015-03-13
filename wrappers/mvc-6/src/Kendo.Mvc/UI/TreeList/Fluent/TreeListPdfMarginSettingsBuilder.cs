using System;
using System.Collections.Generic;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring TreeListPdfMarginSettings
    /// </summary>
    public partial class TreeListPdfMarginSettingsBuilder<T>
        
    {
        public TreeListPdfMarginSettingsBuilder(TreeListPdfMarginSettings<T> container)
        {
            Container = container;
        }

        protected TreeListPdfMarginSettings<T> Container
        {
            get;
            private set;
        }

        // Place custom settings here
    }
}
