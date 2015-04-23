using System;
using System.Collections.Generic;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring List<ChartYAxis>
    /// </summary>
    public partial class ChartYAxisFactory
        
    {
        public ChartYAxisFactory(List<ChartYAxis> container)
        {
            Container = container;
        }

        protected List<ChartYAxis> Container
        {
            get;
            private set;
        }

        // Place custom settings here
    }
}
