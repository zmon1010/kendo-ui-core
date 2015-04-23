using System;
using System.Collections.Generic;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring ChartTitleBorderSettings
    /// </summary>
    public partial class ChartTitleBorderSettingsBuilder
        
    {
        public ChartTitleBorderSettingsBuilder(ChartTitleBorderSettings container)
        {
            Container = container;
        }

        protected ChartTitleBorderSettings Container
        {
            get;
            private set;
        }

        // Place custom settings here
    }
}
