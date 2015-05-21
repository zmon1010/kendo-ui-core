using System;
using System.Collections.Generic;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring ChartTitleSettings
    /// </summary>
    public partial class ChartTitleSettingsBuilder
        
    {
        public ChartTitleSettingsBuilder(ChartTitleSettings container)
        {
            Container = container;
        }

        protected ChartTitleSettings Container
        {
            get;
            private set;
        }

        // Place custom settings here
    }
}
