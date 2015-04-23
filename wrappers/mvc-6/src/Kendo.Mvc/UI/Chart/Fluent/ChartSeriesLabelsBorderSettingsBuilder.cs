using System;
using System.Collections.Generic;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring ChartSeriesLabelsBorderSettings
    /// </summary>
    public partial class ChartSeriesLabelsBorderSettingsBuilder
        
    {
        public ChartSeriesLabelsBorderSettingsBuilder(ChartSeriesLabelsBorderSettings container)
        {
            Container = container;
        }

        protected ChartSeriesLabelsBorderSettings Container
        {
            get;
            private set;
        }

        // Place custom settings here
    }
}
