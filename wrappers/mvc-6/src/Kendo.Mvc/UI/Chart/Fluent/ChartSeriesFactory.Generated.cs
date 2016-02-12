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
    public partial class ChartSeriesFactory<T> where T : class
    {
        /// <summary>
        /// Defines area series bound to inline data.
        /// </summary>
        /// <param name="data">
        /// The list of data items to bind to
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
        /// Defines area series bound to model member(s).
        /// </summary>
        /// <param name="expression">
        /// The expression used to extract the value from the model.
        /// </param>
        public virtual ChartSeriesBuilder<T>  Area<TValue>(
            Expression<Func<T, TValue>> expression)
        {
            return Area(expression.MemberWithoutInstance());
        }

        /// <summary>
        /// Defines area series bound to model member(s).
        /// </summary>
        /// <param name="expression">
        /// The expression used to extract the value from the model.
        /// </param>
        /// <param name="categoryExpression">
        /// The expression used to extract the category from the model.
        /// </param>
        public virtual ChartSeriesBuilder<T>  Area<TValue, TCategory>(
            Expression<Func<T, TValue>> expression,
            Expression<Func<T, TCategory>> categoryExpression)
        {
            return Area(expression.MemberWithoutInstance(), categoryExpression.MemberWithoutInstance());
        }

        /// <summary>
        /// Defines bound area series.
        /// </summary>
        /// <param name="memberName">
        /// The name of the value member.
        /// </param>
        /// <param name="categoryMemberName">
        /// The name of the category member. Optional.
        /// </param>
        public virtual ChartSeriesBuilder<T> Area(
            string memberName,
            string categoryMemberName = null)
        {
            var item = new ChartSeries<T>()
            {
                Chart = Chart,
                Type = "area",
                Name = memberName.AsTitle(),
                Field = memberName,
                CategoryField = categoryMemberName
            };

            Container.Add(item);

            return new ChartSeriesBuilder<T>(item);
        }
    }
}
