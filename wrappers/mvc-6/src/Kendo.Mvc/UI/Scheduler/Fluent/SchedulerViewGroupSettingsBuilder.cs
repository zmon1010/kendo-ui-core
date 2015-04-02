using System;
using System.Collections.Generic;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring SchedulerViewGroupSettings
    /// </summary>
    public partial class SchedulerViewGroupSettingsBuilder<T>
        where T : class, ISchedulerEvent 
    {
        public SchedulerViewGroupSettingsBuilder(SchedulerViewGroupSettings<T> container)
        {
            Container = container;
        }

        protected SchedulerViewGroupSettings<T> Container
        {
            get;
            private set;
        }

        // Place custom settings here
    }
}
