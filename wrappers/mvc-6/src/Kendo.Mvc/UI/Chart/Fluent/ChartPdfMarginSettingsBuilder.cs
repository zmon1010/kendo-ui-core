using System;
using System.Collections.Generic;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring ChartPdfMarginSettings
    /// </summary>
    public partial class ChartPdfMarginSettingsBuilder
        
    {
        public ChartPdfMarginSettingsBuilder(ChartPdfMarginSettings container)
        {
            Container = container;
        }

        protected ChartPdfMarginSettings Container
        {
            get;
            private set;
        }

        // Place custom settings here
    }
}
