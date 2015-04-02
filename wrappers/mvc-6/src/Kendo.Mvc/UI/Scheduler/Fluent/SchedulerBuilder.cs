using System;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring the Kendo UI Scheduler
    /// </summary>
    public partial class SchedulerBuilder<T>: WidgetBuilderBase<Scheduler<T>, SchedulerBuilder<T>>
        where T : class, ISchedulerEvent 
    {
        public SchedulerBuilder(Scheduler<T> component) : base(component)
        {
        }

        // Place custom settings here
    }
}

