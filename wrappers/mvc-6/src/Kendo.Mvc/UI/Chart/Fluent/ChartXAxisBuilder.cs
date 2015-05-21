using System;
using System.Collections.Generic;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring ChartXAxis
    /// </summary>
    public partial class ChartXAxisBuilder
        
    {
        public ChartXAxisBuilder(ChartXAxis container)
        {
            Container = container;
        }

        protected ChartXAxis Container
        {
            get;
            private set;
        }

        // Place custom settings here
    }
}
