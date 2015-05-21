using System;
using System.Collections.Generic;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring ChartTitleMarginSettings
    /// </summary>
    public partial class ChartTitleMarginSettingsBuilder
        
    {
        public ChartTitleMarginSettingsBuilder(ChartTitleMarginSettings container)
        {
            Container = container;
        }

        protected ChartTitleMarginSettings Container
        {
            get;
            private set;
        }

        // Place custom settings here
    }
}
