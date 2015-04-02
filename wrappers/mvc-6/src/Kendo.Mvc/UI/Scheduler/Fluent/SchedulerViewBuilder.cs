using System;
using System.Collections.Generic;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring SchedulerView
    /// </summary>
    public partial class SchedulerViewBuilder<T>
        where T : class, ISchedulerEvent 
    {
        public SchedulerViewBuilder(SchedulerView<T> container)
        {
            Container = container;
        }

        protected SchedulerView<T> Container
        {
            get;
            private set;
        }

        // Place custom settings here
    }
}
