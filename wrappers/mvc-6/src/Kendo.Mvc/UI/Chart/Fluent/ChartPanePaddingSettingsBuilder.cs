using System;
using System.Collections.Generic;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring ChartPanePaddingSettings
    /// </summary>
    public partial class ChartPanePaddingSettingsBuilder
        
    {
        public ChartPanePaddingSettingsBuilder(ChartPanePaddingSettings container)
        {
            Container = container;
        }

        protected ChartPanePaddingSettings Container
        {
            get;
            private set;
        }

        // Place custom settings here
    }
}
