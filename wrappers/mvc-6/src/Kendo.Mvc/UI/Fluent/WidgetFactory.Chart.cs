using System.Collections.Generic;

namespace Kendo.Mvc.UI.Fluent
{
    public partial class WidgetFactory<TModel>
    {
        /// <summary>
        /// Creates a new unbound <see cref="Chart"/>.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        /// @(Html.Kendo().Chart()
        ///             .Name("Chart")
        ///             .Series(series => {
        ///                 series.Bar(new int[] { 1, 2, 3 }).Name("Total Sales");
        ///             })
        /// )
        /// </code>
        /// </example>
        public virtual ChartBuilder<object> Chart()
        {
            return new ChartBuilder<object>(new Chart<object>(HtmlHelper.ViewContext));
        }
        
        /// <summary>
        /// Creates a <see cref="Kendo.Mvc.UI.Chart{T}"/> bound to the specified data item type.
        /// </summary>
        public virtual ChartBuilder<T> Chart<T>() where T : class
        {
            return new ChartBuilder<T>(new Chart<T>(HtmlHelper.ViewContext));
        }
    }
}