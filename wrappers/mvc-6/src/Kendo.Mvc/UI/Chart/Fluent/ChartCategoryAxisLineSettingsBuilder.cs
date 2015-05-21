using System;
using System.Collections.Generic;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring ChartCategoryAxisLineSettings
    /// </summary>
    public partial class ChartCategoryAxisLineSettingsBuilder
        
    {
        public ChartCategoryAxisLineSettingsBuilder(ChartCategoryAxisLineSettings container)
        {
            Container = container;
        }

        protected ChartCategoryAxisLineSettings Container
        {
            get;
            private set;
        }

        // Place custom settings here
    }
}
