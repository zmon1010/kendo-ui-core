using System;
using System.Collections.Generic;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring ChartTitlePaddingSettings
    /// </summary>
    public partial class ChartTitlePaddingSettingsBuilder
        
    {
        public ChartTitlePaddingSettingsBuilder(ChartTitlePaddingSettings container)
        {
            Container = container;
        }

        protected ChartTitlePaddingSettings Container
        {
            get;
            private set;
        }

        // Place custom settings here
    }
}
