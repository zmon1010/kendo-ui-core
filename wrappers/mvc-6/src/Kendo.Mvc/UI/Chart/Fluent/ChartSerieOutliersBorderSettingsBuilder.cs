using System;
using System.Collections.Generic;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring ChartSerieOutliersBorderSettings
    /// </summary>
    public partial class ChartSerieOutliersBorderSettingsBuilder
        
    {
        public ChartSerieOutliersBorderSettingsBuilder(ChartSerieOutliersBorderSettings container)
        {
            Container = container;
        }

        protected ChartSerieOutliersBorderSettings Container
        {
            get;
            private set;
        }

        // Place custom settings here
    }
}
