using System;
using System.Collections.Generic;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring List<SchedulerToolbar<T>>
    /// </summary>
    public partial class SchedulerToolbarFactory<T>
        where T : class, ISchedulerEvent 
    {
        public SchedulerToolbarFactory(List<SchedulerToolbar<T>> container)
        {
            Container = container;
        }

        protected List<SchedulerToolbar<T>> Container
        {
            get;
            private set;
        }

        // Place custom settings here
    }
}
