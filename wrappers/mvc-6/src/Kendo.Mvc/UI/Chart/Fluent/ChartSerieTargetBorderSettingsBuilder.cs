using System;
using System.Collections.Generic;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring ChartSerieTargetBorderSettings
    /// </summary>
    public partial class ChartSerieTargetBorderSettingsBuilder
        
    {
        public ChartSerieTargetBorderSettingsBuilder(ChartSerieTargetBorderSettings container)
        {
            Container = container;
        }

        protected ChartSerieTargetBorderSettings Container
        {
            get;
            private set;
        }

        // Place custom settings here
    }
}
