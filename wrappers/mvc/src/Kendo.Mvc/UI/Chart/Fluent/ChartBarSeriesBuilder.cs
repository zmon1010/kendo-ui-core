namespace Kendo.Mvc.UI.Fluent
{
    using System;
    using Kendo.Mvc.UI;

    /// <summary>
    /// Defines the fluent interface for configuring bar series.
    /// </summary>
    /// <typeparam name="T">The type of the data item</typeparam>
    public class ChartBarSeriesBuilder<T> : ChartBarSeriesBuilderBase<IChartBarSeries, ChartBarSeriesBuilder<T>>
        where T : class
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="ChartBarSeriesBuilder{T}"/> class.
        /// </summary>
        /// <param name="series">The series.</param>
        public ChartBarSeriesBuilder(IChartBarSeries series)
            : base(series)
        {
        }

        /// <summary>
        /// Configures the series error bars
        /// </summary>
        /// <param name="configurator">The configuration action.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;%= Html.Kendo().Chart()
        ///            .Name("Chart")
        ///            .Series(series => series
        ///                .Bar(s => s.Sales)
        ///                .ErrorBars(e => e.Value(1))
        ///            )
        /// %&gt;
        /// </code>
        /// </example>   
        public ChartBarSeriesBuilder<T> ErrorBars(Action<CategoricalErrorBarsBuilder> configurator)
        {
            configurator(new CategoricalErrorBarsBuilder(Series.ErrorBars));
            return this;
        }

        /// <summary>
        /// Sets the series visual handler
        /// </summary>
        /// <param name="handler">The handler name.</param>  
        public ChartBarSeriesBuilder<T> Visual(string handler)
        {
            Series.Visual = new ClientHandlerDescriptor
            {
                HandlerName = handler
            };
            return this;
        }

        /// <summary>
        /// Sets the series visual handler
        /// </summary>
        /// <param name="handler">The handler</param>  
        public ChartBarSeriesBuilder<T> Visual(Func<object, object> handler)
        {
            Series.Visual = new ClientHandlerDescriptor
            {
                TemplateDelegate = handler
            };
            return this;
        }
    }
}