using System;
using System.Collections.Generic;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring ChartPaneTitleSettings
    /// </summary>
    public partial class ChartPaneTitleSettingsBuilder
        
    {
        public ChartPaneTitleSettingsBuilder(ChartPaneTitleSettings container)
        {
            Container = container;
        }

        protected ChartPaneTitleSettings Container
        {
            get;
            private set;
        }

        // Place custom settings here
    }
}
