using System;
using System.Collections.Generic;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring ChartSerieLabelsPaddingSettings
    /// </summary>
    public partial class ChartSerieLabelsPaddingSettingsBuilder
        
    {
        public ChartSerieLabelsPaddingSettingsBuilder(ChartSerieLabelsPaddingSettings container)
        {
            Container = container;
        }

        protected ChartSerieLabelsPaddingSettings Container
        {
            get;
            private set;
        }

        // Place custom settings here
    }
}
