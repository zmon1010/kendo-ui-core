using System;
using System.Collections.Generic;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring ChartPdfSettings
    /// </summary>
    public partial class ChartPdfSettingsBuilder
        
    {
        public ChartPdfSettingsBuilder(ChartPdfSettings container)
        {
            Container = container;
        }

        protected ChartPdfSettings Container
        {
            get;
            private set;
        }

        // Place custom settings here
    }
}
