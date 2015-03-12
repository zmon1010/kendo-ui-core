using System;
using System.Collections.Generic;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring GridPdfMarginSettings
    /// </summary>
    public partial class GridPdfMarginSettingsBuilder<T>
        
    {
        public GridPdfMarginSettingsBuilder(GridPdfMarginSettings<T> container)
        {
            Container = container;
        }

        protected GridPdfMarginSettings<T> Container
        {
            get;
            private set;
        }

        // Place custom settings here
    }
}
