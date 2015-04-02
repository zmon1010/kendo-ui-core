using System;
using System.Collections.Generic;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring SchedulerToolbar
    /// </summary>
    public partial class SchedulerToolbarBuilder<T>
        where T : class, ISchedulerEvent 
    {
        public SchedulerToolbarBuilder(SchedulerToolbar<T> container)
        {
            Container = container;
        }

        protected SchedulerToolbar<T> Container
        {
            get;
            private set;
        }

        // Place custom settings here
    }
}
