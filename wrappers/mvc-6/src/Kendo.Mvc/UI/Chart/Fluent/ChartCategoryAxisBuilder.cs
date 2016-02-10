using System;
using System.Collections.Generic;

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
    }
}
