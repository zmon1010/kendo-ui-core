using System;
using System.Collections.Generic;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring ChartSerieExtremesSettings
    /// </summary>
    public partial class ChartSerieExtremesSettingsBuilder
        
    {
        public ChartSerieExtremesSettingsBuilder(ChartSerieExtremesSettings container)
        {
            Container = container;
        }

        protected ChartSerieExtremesSettings Container
        {
            get;
            private set;
        }

        // Place custom settings here
    }
}
