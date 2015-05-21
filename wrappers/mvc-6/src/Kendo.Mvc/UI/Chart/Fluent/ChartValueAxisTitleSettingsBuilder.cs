using System;
using System.Collections.Generic;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring ChartValueAxisTitleSettings
    /// </summary>
    public partial class ChartValueAxisTitleSettingsBuilder
        
    {
        public ChartValueAxisTitleSettingsBuilder(ChartValueAxisTitleSettings container)
        {
            Container = container;
        }

        protected ChartValueAxisTitleSettings Container
        {
            get;
            private set;
        }

        // Place custom settings here
    }
}
