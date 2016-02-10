using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq.Expressions;
using Kendo.Mvc.Extensions;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring List<ChartSeries<T>>
    /// </summary>
    public partial class ChartSeriesFactory<T>
        where T : class 
    {
        public ChartSeriesFactory(List<ChartSeries<T>> container)
        {
            Container = container;
        }

        protected List<ChartSeries<T>> Container
        {
            get;
            private set;
        }

        /// <summary>
        /// Defines area series bound to inline data.
        /// </summary>
        /// <param name="data">
        /// The data to bind to
        /// </param>
        public virtual ChartSeriesBuilder<T> Area(IEnumerable data)
        {
            var item = new ChartSeries<T>()
            {
                Type = "area",
                Data = data
            };

            item.Chart = Chart;
            Container.Add(item);

            return new ChartSeriesBuilder<T>(item);
        }

        /// <summary>
        /// Defines bound area series.
        /// </summary>
        /// <param name="expression">
        /// The expression used to extract the value from the chart model.
        /// </param>
        /// <param name="noteTextExpression">
        /// The expression used to extract the note text from the chart model.
        /// </param>
        public virtual ChartSeriesBuilder<T> Area<TValue>(
            Expression<Func<T, TValue>> expression)
        {
            var item = new ChartSeries<T>()
            {
                Type = "area",
                Field = expression.MemberWithoutInstance()
            };

            item.Chart = Chart;
            Container.Add(item);

            return new ChartSeriesBuilder<T>(item);
        }
    }
}
