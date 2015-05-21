using System;
using System.Collections.Generic;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring ChartYAxisLabelsSettings
    /// </summary>
    public partial class ChartYAxisLabelsSettingsBuilder
        
    {
        public ChartYAxisLabelsSettingsBuilder(ChartYAxisLabelsSettings container)
        {
            Container = container;
        }

        protected ChartYAxisLabelsSettings Container
        {
            get;
            private set;
        }

        // Place custom settings here
    }
}
