using System;
using System.Collections.Generic;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring ChartValueAxisLineSettings
    /// </summary>
    public partial class ChartValueAxisLineSettingsBuilder
        
    {
        public ChartValueAxisLineSettingsBuilder(ChartValueAxisLineSettings container)
        {
            Container = container;
        }

        protected ChartValueAxisLineSettings Container
        {
            get;
            private set;
        }

        // Place custom settings here
    }
}
