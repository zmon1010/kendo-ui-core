using System;
using System.Collections.Generic;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring ChartSeriesOutliersBorderSettings
    /// </summary>
    public partial class ChartSeriesOutliersBorderSettingsBuilder
        
    {
        public ChartSeriesOutliersBorderSettingsBuilder(ChartSeriesOutliersBorderSettings container)
        {
            Container = container;
        }

        protected ChartSeriesOutliersBorderSettings Container
        {
            get;
            private set;
        }

        // Place custom settings here
    }
}
