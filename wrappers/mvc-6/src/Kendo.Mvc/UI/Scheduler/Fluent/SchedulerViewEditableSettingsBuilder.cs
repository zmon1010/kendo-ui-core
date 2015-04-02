using System;
using System.Collections.Generic;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring SchedulerViewEditableSettings
    /// </summary>
    public partial class SchedulerViewEditableSettingsBuilder<T>
        where T : class, ISchedulerEvent 
    {
        public SchedulerViewEditableSettingsBuilder(SchedulerViewEditableSettings<T> container)
        {
            Container = container;
        }

        protected SchedulerViewEditableSettings<T> Container
        {
            get;
            private set;
        }

        // Place custom settings here
    }
}
