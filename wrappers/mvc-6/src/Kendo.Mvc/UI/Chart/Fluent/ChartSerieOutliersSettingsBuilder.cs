using System;
using System.Collections.Generic;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring ChartSerieOutliersSettings
    /// </summary>
    public partial class ChartSerieOutliersSettingsBuilder
        
    {
        public ChartSerieOutliersSettingsBuilder(ChartSerieOutliersSettings container)
        {
            Container = container;
        }

        protected ChartSerieOutliersSettings Container
        {
            get;
            private set;
        }

        // Place custom settings here
    }
}
