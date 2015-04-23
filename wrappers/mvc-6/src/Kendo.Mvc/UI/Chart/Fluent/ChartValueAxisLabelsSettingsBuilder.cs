using System;
using System.Collections.Generic;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring ChartValueAxisLabelsSettings
    /// </summary>
    public partial class ChartValueAxisLabelsSettingsBuilder
        
    {
        public ChartValueAxisLabelsSettingsBuilder(ChartValueAxisLabelsSettings container)
        {
            Container = container;
        }

        protected ChartValueAxisLabelsSettings Container
        {
            get;
            private set;
        }

        // Place custom settings here
    }
}
