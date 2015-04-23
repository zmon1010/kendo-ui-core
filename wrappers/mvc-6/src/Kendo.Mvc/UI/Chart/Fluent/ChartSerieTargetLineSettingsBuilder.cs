using System;
using System.Collections.Generic;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring ChartSerieTargetLineSettings
    /// </summary>
    public partial class ChartSerieTargetLineSettingsBuilder
        
    {
        public ChartSerieTargetLineSettingsBuilder(ChartSerieTargetLineSettings container)
        {
            Container = container;
        }

        protected ChartSerieTargetLineSettings Container
        {
            get;
            private set;
        }

        // Place custom settings here
    }
}
