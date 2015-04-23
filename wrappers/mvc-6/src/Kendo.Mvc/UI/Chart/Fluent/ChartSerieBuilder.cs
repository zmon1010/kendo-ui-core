using System;
using System.Collections.Generic;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring ChartSerie
    /// </summary>
    public partial class ChartSerieBuilder
        
    {
        public ChartSerieBuilder(ChartSerie container)
        {
            Container = container;
        }

        protected ChartSerie Container
        {
            get;
            private set;
        }

        // Place custom settings here
    }
}
