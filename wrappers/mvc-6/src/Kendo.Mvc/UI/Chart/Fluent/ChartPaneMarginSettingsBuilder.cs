using System;
using System.Collections.Generic;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring ChartPaneMarginSettings
    /// </summary>
    public partial class ChartPaneMarginSettingsBuilder
        
    {
        public ChartPaneMarginSettingsBuilder(ChartPaneMarginSettings container)
        {
            Container = container;
        }

        protected ChartPaneMarginSettings Container
        {
            get;
            private set;
        }

        // Place custom settings here
    }
}
