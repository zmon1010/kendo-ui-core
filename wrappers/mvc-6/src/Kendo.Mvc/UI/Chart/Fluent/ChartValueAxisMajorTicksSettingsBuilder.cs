using System;
using System.Collections.Generic;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring ChartValueAxisMajorTicksSettings
    /// </summary>
    public partial class ChartValueAxisMajorTicksSettingsBuilder
        
    {
        public ChartValueAxisMajorTicksSettingsBuilder(ChartValueAxisMajorTicksSettings container)
        {
            Container = container;
        }

        protected ChartValueAxisMajorTicksSettings Container
        {
            get;
            private set;
        }

        // Place custom settings here
    }
}
