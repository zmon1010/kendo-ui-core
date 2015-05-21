using System;
using System.Collections.Generic;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring ChartPaneBorderSettings
    /// </summary>
    public partial class ChartPaneBorderSettingsBuilder
        
    {
        public ChartPaneBorderSettingsBuilder(ChartPaneBorderSettings container)
        {
            Container = container;
        }

        protected ChartPaneBorderSettings Container
        {
            get;
            private set;
        }

        // Place custom settings here
    }
}
