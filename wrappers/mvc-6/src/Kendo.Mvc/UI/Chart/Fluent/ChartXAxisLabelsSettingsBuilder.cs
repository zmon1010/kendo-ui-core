using System;
using System.Collections.Generic;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring ChartXAxisLabelsSettings
    /// </summary>
    public partial class ChartXAxisLabelsSettingsBuilder
        
    {
        public ChartXAxisLabelsSettingsBuilder(ChartXAxisLabelsSettings container)
        {
            Container = container;
        }

        protected ChartXAxisLabelsSettings Container
        {
            get;
            private set;
        }

        // Place custom settings here
    }
}
