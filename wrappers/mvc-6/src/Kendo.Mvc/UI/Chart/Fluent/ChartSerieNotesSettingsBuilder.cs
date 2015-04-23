using System;
using System.Collections.Generic;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring ChartSerieNotesSettings
    /// </summary>
    public partial class ChartSerieNotesSettingsBuilder
        
    {
        public ChartSerieNotesSettingsBuilder(ChartSerieNotesSettings container)
        {
            Container = container;
        }

        protected ChartSerieNotesSettings Container
        {
            get;
            private set;
        }

        // Place custom settings here
    }
}
