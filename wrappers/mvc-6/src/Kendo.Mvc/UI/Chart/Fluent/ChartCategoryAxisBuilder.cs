using System;
using System.Collections.Generic;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring ChartCategoryAxis
    /// </summary>
    public partial class ChartCategoryAxisBuilder
        
    {
        public ChartCategoryAxisBuilder(ChartCategoryAxis container)
        {
            Container = container;
        }

        protected ChartCategoryAxis Container
        {
            get;
            private set;
        }

        // Place custom settings here
    }
}
