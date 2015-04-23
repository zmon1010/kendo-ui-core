using System;
using System.Collections.Generic;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring ChartSerieTargetSettings
    /// </summary>
    public partial class ChartSerieTargetSettingsBuilder
        
    {
        public ChartSerieTargetSettingsBuilder(ChartSerieTargetSettings container)
        {
            Container = container;
        }

        protected ChartSerieTargetSettings Container
        {
            get;
            private set;
        }

        // Place custom settings here
    }
}
