using System;
using System.Collections.Generic;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring ChartSeriesNotesLineSettings
    /// </summary>
    public partial class ChartSeriesNotesLineSettingsBuilder
        
    {
        public ChartSeriesNotesLineSettingsBuilder(ChartSeriesNotesLineSettings container)
        {
            Container = container;
        }

        protected ChartSeriesNotesLineSettings Container
        {
            get;
            private set;
        }

        // Place custom settings here
    }
}
