using System;
using System.Collections.Generic;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring ChartSeriesExtremesBorderSettings
    /// </summary>
    public partial class ChartSeriesExtremesBorderSettingsBuilder
        
    {
        public ChartSeriesExtremesBorderSettingsBuilder(ChartSeriesExtremesBorderSettings container)
        {
            Container = container;
        }

        protected ChartSeriesExtremesBorderSettings Container
        {
            get;
            private set;
        }

        // Place custom settings here
    }
}
