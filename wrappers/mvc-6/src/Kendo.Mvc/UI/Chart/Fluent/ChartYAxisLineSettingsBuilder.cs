using System;
using System.Collections.Generic;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring ChartYAxisLineSettings
    /// </summary>
    public partial class ChartYAxisLineSettingsBuilder
        
    {
        public ChartYAxisLineSettingsBuilder(ChartYAxisLineSettings container)
        {
            Container = container;
        }

        protected ChartYAxisLineSettings Container
        {
            get;
            private set;
        }

        // Place custom settings here
    }
}
