using System;
using System.Collections.Generic;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring List<ChartSerie>
    /// </summary>
    public partial class ChartSerieFactory
        
    {
        public ChartSerieFactory(List<ChartSerie> container)
        {
            Container = container;
        }

        protected List<ChartSerie> Container
        {
            get;
            private set;
        }

        // Place custom settings here
    }
}
