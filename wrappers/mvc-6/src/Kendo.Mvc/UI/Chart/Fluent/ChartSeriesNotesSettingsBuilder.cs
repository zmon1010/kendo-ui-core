using System;
using System.Collections.Generic;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring ChartSeriesNotesSettings
    /// </summary>
    public partial class ChartSeriesNotesSettingsBuilder
        
    {
        public ChartSeriesNotesSettingsBuilder(ChartSeriesNotesSettings container)
        {
            Container = container;
        }

        protected ChartSeriesNotesSettings Container
        {
            get;
            private set;
        }

        // Place custom settings here
    }
}
