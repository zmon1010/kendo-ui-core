namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent interface for configuring the <see cref="SchedulerCustomView"/>.
    /// </summary>
    public class SchedulerCustomViewBuilder<TView> : SchedulerBaseViewBuilder<TView, SchedulerCustomViewBuilder<TView>>
        where TView : SchedulerCustomView
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="SchedulerCustomViewBuilder{TView, TViewBuilder}"/> class.
        /// </summary>
        /// <param name="view">The resource</param>
        public SchedulerCustomViewBuilder(TView view)
            : base(view)
        {
        }
    }
}