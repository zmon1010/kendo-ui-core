using System;
using System.Collections.Generic;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring ChartSeriesLabelsToPaddingSettings
    /// </summary>
    public partial class ChartSeriesLabelsToPaddingSettingsBuilder
        
    {
        public ChartSeriesLabelsToPaddingSettingsBuilder(ChartSeriesLabelsToPaddingSettings container)
        {
            Container = container;
        }

        protected ChartSeriesLabelsToPaddingSettings Container
        {
            get;
            private set;
        }

        // Place custom settings here
    }
}
