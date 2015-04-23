using System;
using System.Collections.Generic;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring List<ChartCategoryAxis>
    /// </summary>
    public partial class ChartCategoryAxisFactory
        
    {
        public ChartCategoryAxisFactory(List<ChartCategoryAxis> container)
        {
            Container = container;
        }

        protected List<ChartCategoryAxis> Container
        {
            get;
            private set;
        }

        // Place custom settings here
    }
}
