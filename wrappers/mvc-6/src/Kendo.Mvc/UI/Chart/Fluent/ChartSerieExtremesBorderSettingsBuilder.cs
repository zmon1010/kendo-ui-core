using System;
using System.Collections.Generic;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring ChartSerieExtremesBorderSettings
    /// </summary>
    public partial class ChartSerieExtremesBorderSettingsBuilder
        
    {
        public ChartSerieExtremesBorderSettingsBuilder(ChartSerieExtremesBorderSettings container)
        {
            Container = container;
        }

        protected ChartSerieExtremesBorderSettings Container
        {
            get;
            private set;
        }

        // Place custom settings here
    }
}
