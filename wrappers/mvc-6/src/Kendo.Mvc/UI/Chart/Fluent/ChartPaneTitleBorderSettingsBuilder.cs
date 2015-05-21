using System;
using System.Collections.Generic;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring ChartPaneTitleBorderSettings
    /// </summary>
    public partial class ChartPaneTitleBorderSettingsBuilder
        
    {
        public ChartPaneTitleBorderSettingsBuilder(ChartPaneTitleBorderSettings container)
        {
            Container = container;
        }

        protected ChartPaneTitleBorderSettings Container
        {
            get;
            private set;
        }

        // Place custom settings here
    }
}
