using System;
using System.Collections.Generic;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring ChartPaneTitleMarginSettings
    /// </summary>
    public partial class ChartPaneTitleMarginSettingsBuilder
        
    {
        public ChartPaneTitleMarginSettingsBuilder(ChartPaneTitleMarginSettings container)
        {
            Container = container;
        }

        protected ChartPaneTitleMarginSettings Container
        {
            get;
            private set;
        }

        // Place custom settings here
    }
}
