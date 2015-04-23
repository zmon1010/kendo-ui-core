using System;
using System.Collections.Generic;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring ChartValueAxis
    /// </summary>
    public partial class ChartValueAxisBuilder
        
    {
        public ChartValueAxisBuilder(ChartValueAxis container)
        {
            Container = container;
        }

        protected ChartValueAxis Container
        {
            get;
            private set;
        }

        // Place custom settings here
    }
}
