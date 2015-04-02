using System;
using System.Collections.Generic;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring SchedulerPdfMarginSettings
    /// </summary>
    public partial class SchedulerPdfMarginSettingsBuilder<T>
        where T : class, ISchedulerEvent 
    {
        public SchedulerPdfMarginSettingsBuilder(SchedulerPdfMarginSettings<T> container)
        {
            Container = container;
        }

        protected SchedulerPdfMarginSettings<T> Container
        {
            get;
            private set;
        }

        // Place custom settings here
    }
}
