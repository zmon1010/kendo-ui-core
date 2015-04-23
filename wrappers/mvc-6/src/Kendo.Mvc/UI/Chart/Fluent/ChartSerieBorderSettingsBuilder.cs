using System;
using System.Collections.Generic;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring ChartSerieBorderSettings
    /// </summary>
    public partial class ChartSerieBorderSettingsBuilder
        
    {
        public ChartSerieBorderSettingsBuilder(ChartSerieBorderSettings container)
        {
            Container = container;
        }

        protected ChartSerieBorderSettings Container
        {
            get;
            private set;
        }

        // Place custom settings here
    }
}
