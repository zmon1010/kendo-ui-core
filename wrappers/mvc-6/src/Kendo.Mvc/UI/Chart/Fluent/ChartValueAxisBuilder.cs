using System;
using System.Collections.Generic;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring ChartValueAxis
    /// </summary>
    public partial class ChartValueAxisBuilder<T>
        where T : class 
    {
        public ChartValueAxisBuilder(ChartValueAxis<T> container)
        {
            Container = container;
        }

        protected ChartValueAxis<T> Container
        {
            get;
            private set;
        }

        /// <summary>
        /// Sets the axis type to date.
        /// </summary>
        public ChartValueAxisBuilder<T> Date()
        {
            Container.Type = "date";
            return this;
        }

        /// <summary>
        /// Sets the axis type to logarithmic.
        /// </summary>
        public ChartValueAxisBuilder<T> Logarithmic()
        {
            Container.Type = "log";
            return this;
        }

        /// <summary>
        /// Sets the axis type to numeric.
        /// </summary>
        public ChartValueAxisBuilder<T> Numeric()
        {
            Container.Type = "numeric";
            return this;
        }

        /// <summary>
        /// Sets the axis type to polar.
        /// </summary>
        public ChartValueAxisBuilder<T> Polar()
        {
            Container.Type = "polar";
            return this;
        }
    }
}
