using System;
using System.Collections.Generic;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring ChartPannableSettings
    /// </summary>
    public partial class ChartPannableSettingsBuilder
        
    {
        public ChartPannableSettingsBuilder(ChartPannableSettings container)
        {
            Container = container;
        }

        protected ChartPannableSettings Container
        {
            get;
            private set;
        }

        // Place custom settings here
    }
}
