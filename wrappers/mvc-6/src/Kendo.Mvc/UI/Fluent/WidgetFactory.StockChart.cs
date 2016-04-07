using System.Collections.Generic;

namespace Kendo.Mvc.UI.Fluent
{
    public partial class WidgetFactory<TModel>
    {
        /// <summary>
        /// Creates a <see cref="Kendo.Mvc.UI.StockChart{T}"/>
        /// </summary>
        /// <example>
        /// <code lang="CS">
        /// @(Html.Kendo().StockChart()
        ///             .Name("StockChart")
        /// );
        /// </code>
        /// </example>
        public virtual StockChartBuilder<T> StockChart<T>() where T : class
        {
            return new StockChartBuilder<T>(new StockChart<T>(HtmlHelper.ViewContext));
        }        
    }
}