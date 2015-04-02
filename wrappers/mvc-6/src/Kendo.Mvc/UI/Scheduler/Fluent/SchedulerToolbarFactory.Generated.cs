using System;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for adding items to Kendo UI Scheduler
    /// </summary>
    public partial class SchedulerToolbarFactory<T>
        where T : class, ISchedulerEvent 
    {

        public Scheduler<T> Scheduler { get; set; }

        /// <summary>
        /// Adds an item to the collection
        /// </summary>
        public virtual SchedulerToolbarBuilder<T> Add()
        {
            var item = new SchedulerToolbar<T>();
            item.Scheduler = Scheduler;
            Container.Add(item);

            return new SchedulerToolbarBuilder<T>(item);
        }
    }
}
