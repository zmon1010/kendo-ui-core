using System;
using System.Collections.Generic;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring ChartPane
    /// </summary>
    public partial class ChartPaneBuilder
        
    {
        public ChartPaneBuilder(ChartPane container)
        {
            Container = container;
        }

        protected ChartPane Container
        {
            get;
            private set;
        }

        // Place custom settings here
    }
}
