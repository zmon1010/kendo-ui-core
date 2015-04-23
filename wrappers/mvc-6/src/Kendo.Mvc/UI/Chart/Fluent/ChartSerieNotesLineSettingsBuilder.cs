using System;
using System.Collections.Generic;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring ChartSerieNotesLineSettings
    /// </summary>
    public partial class ChartSerieNotesLineSettingsBuilder
        
    {
        public ChartSerieNotesLineSettingsBuilder(ChartSerieNotesLineSettings container)
        {
            Container = container;
        }

        protected ChartSerieNotesLineSettings Container
        {
            get;
            private set;
        }

        // Place custom settings here
    }
}
