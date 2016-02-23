using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq.Expressions;
using Kendo.Mvc.Extensions;
using Kendo.Mvc.Resources;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring ChartCategoryAxis
    /// </summary>
    public partial class ChartCategoryAxisBuilder<T>
        where T : class 
    {
        public ChartCategoryAxisBuilder(ChartCategoryAxis<T> container)
        {
            Container = container;
        }

        protected ChartCategoryAxis<T> Container
        {
            get;
            private set;
        }

        /// <summary>
        /// Sets the axis type to date.
        /// </summary>
        public ChartCategoryAxisBuilder<T> Date()
        {
            Container.Type = "date";
            return this;
        }
        
        /// <summary>
        /// Defines bound categories.
        /// </summary>
        /// <param name="expression">
        /// The expression used to extract the categories value from the chart model.
        /// </param>
        public ChartCategoryAxisBuilder<T> Categories<TValue>(Expression<Func<T, TValue>> expression)
        {
            if (typeof(T).IsPlainType() && !expression.IsBindable())
            {
                throw new InvalidOperationException(Exceptions.MemberExpressionRequired);
            }

            Container.Field = expression.MemberWithoutInstance();

            return this;
        }
    }
}
