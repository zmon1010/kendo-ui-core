namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// The fluent API for configuring Kendo UI Grid for ASP.NET MVC.
    /// </summary>
    public class GridBuilder<T> : WidgetBuilderBase<Grid<T>, GridBuilder<T>>
        where T : class
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="GridBuilder{T}"/> class.
        /// </summary>
        /// <param name="component">The component.</param>
        public GridBuilder(Grid<T> component)
            : base(component)
        {
        }
    }
}