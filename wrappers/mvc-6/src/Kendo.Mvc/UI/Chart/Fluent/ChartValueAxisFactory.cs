using System;
using System.Collections.Generic;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring List<ChartValueAxis>
    /// </summary>
    public partial class ChartValueAxisFactory
        
    {
        public ChartValueAxisFactory(List<ChartValueAxis> container)
        {
            Container = container;
        }

        protected List<ChartValueAxis> Container
        {
            get;
            private set;
        }

        // Place custom settings here
    }
}
