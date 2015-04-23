using System;
using System.Collections.Generic;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring List<ChartXAxis>
    /// </summary>
    public partial class ChartXAxisFactory
        
    {
        public ChartXAxisFactory(List<ChartXAxis> container)
        {
            Container = container;
        }

        protected List<ChartXAxis> Container
        {
            get;
            private set;
        }

        // Place custom settings here
    }
}
