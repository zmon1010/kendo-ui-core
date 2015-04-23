using System;
using System.Collections.Generic;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring ChartXAxisLineSettings
    /// </summary>
    public partial class ChartXAxisLineSettingsBuilder
        
    {
        public ChartXAxisLineSettingsBuilder(ChartXAxisLineSettings container)
        {
            Container = container;
        }

        protected ChartXAxisLineSettings Container
        {
            get;
            private set;
        }

        // Place custom settings here
    }
}
