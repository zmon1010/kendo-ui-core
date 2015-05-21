using System;
using System.Collections.Generic;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring List<ChartPane>
    /// </summary>
    public partial class ChartPaneFactory
        
    {
        public ChartPaneFactory(List<ChartPane> container)
        {
            Container = container;
        }

        protected List<ChartPane> Container
        {
            get;
            private set;
        }

        // Place custom settings here
    }
}
