using System;
using System.Collections.Generic;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring ChartValueAxisMinorTicksSettings
    /// </summary>
    public partial class ChartValueAxisMinorTicksSettingsBuilder
        
    {
        public ChartValueAxisMinorTicksSettingsBuilder(ChartValueAxisMinorTicksSettings container)
        {
            Container = container;
        }

        protected ChartValueAxisMinorTicksSettings Container
        {
            get;
            private set;
        }

        // Place custom settings here
    }
}
