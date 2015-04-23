using System;
using System.Collections.Generic;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring ChartCategoryAxisLabelsSettings
    /// </summary>
    public partial class ChartCategoryAxisLabelsSettingsBuilder
        
    {
        public ChartCategoryAxisLabelsSettingsBuilder(ChartCategoryAxisLabelsSettings container)
        {
            Container = container;
        }

        protected ChartCategoryAxisLabelsSettings Container
        {
            get;
            private set;
        }

        // Place custom settings here
    }
}
