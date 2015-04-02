using System;
using System.Collections.Generic;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring List<SchedulerView<T>>
    /// </summary>
    public partial class SchedulerViewFactory<T>
        where T : class, ISchedulerEvent 
    {
        public SchedulerViewFactory(List<SchedulerView<T>> container)
        {
            Container = container;
        }

        protected List<SchedulerView<T>> Container
        {
            get;
            private set;
        }

        // Place custom settings here
    }
}
