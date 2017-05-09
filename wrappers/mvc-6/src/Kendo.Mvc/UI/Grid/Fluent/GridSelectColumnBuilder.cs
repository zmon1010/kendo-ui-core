namespace Kendo.Mvc.UI.Fluent
{

    /// <summary>
    /// Defines the fluent interface for enabling the select column component.
    /// </summary>
    public class GridSelectColumnBuilder : GridColumnBuilderBase<IGridColumn, GridSelectColumnBuilder>
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="GridSelectColumnBuilder"/> class.
        /// </summary>
        /// <param name="column">The column.</param>
        public GridSelectColumnBuilder(IGridColumn column) : base(column)
        {
        }
    }
}
