using System;
using System.Collections.Generic;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring ChartSeriesBorderSettings
    /// </summary>
    public partial class ChartSeriesBorderSettingsBuilder
        
    {
        public ChartSeriesBorderSettingsBuilder(ChartSeriesBorderSettings container)
        {
            Container = container;
        }

        protected ChartSeriesBorderSettings Container
        {
            get;
            private set;
        }

        // Place custom settings here
    }
}
