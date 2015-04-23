using System;
using System.Collections.Generic;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring ChartCategoryAxisSelectSettings
    /// </summary>
    public partial class ChartCategoryAxisSelectSettingsBuilder
        
    {
        public ChartCategoryAxisSelectSettingsBuilder(ChartCategoryAxisSelectSettings container)
        {
            Container = container;
        }

        protected ChartCategoryAxisSelectSettings Container
        {
            get;
            private set;
        }

        // Place custom settings here
    }
}
