using System;
using System.Collections.Generic;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring ChartYAxisMajorTicksSettings
    /// </summary>
    public partial class ChartYAxisMajorTicksSettingsBuilder
        
    {
        public ChartYAxisMajorTicksSettingsBuilder(ChartYAxisMajorTicksSettings container)
        {
            Container = container;
        }

        protected ChartYAxisMajorTicksSettings Container
        {
            get;
            private set;
        }

        // Place custom settings here
    }
}
