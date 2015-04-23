using System;
using System.Collections.Generic;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring ChartYAxis
    /// </summary>
    public partial class ChartYAxisBuilder
        
    {
        public ChartYAxisBuilder(ChartYAxis container)
        {
            Container = container;
        }

        protected ChartYAxis Container
        {
            get;
            private set;
        }

        // Place custom settings here
    }
}
