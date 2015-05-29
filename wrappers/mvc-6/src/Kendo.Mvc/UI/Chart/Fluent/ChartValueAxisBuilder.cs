using System;
using System.Collections.Generic;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring ChartValueAxis
    /// </summary>
    public partial class ChartValueAxisBuilder
        
    {
        public ChartValueAxisBuilder(ChartValueAxis container)
        {
            Container = container;
        }

        protected ChartValueAxis Container
        {
            get;
            private set;
        }

        /// <summary>
        /// Sets the axis type to date.
        /// </summary>
        public ChartValueAxisBuilder Date()
        {
            Container.Type = "date";
            return this;
        }

        /// <summary>
        /// Sets the axis type to logarithmic.
        /// </summary>
        public ChartValueAxisBuilder Logarithmic()
        {
            Container.Type = "log";
            return this;
        }

        /// <summary>
        /// Sets the axis type to numeric.
        /// </summary>
        public ChartValueAxisBuilder Numeric()
        {
            Container.Type = "numeric";
            return this;
        }

        /// <summary>
        /// Sets the axis type to polar.
        /// </summary>
        public ChartValueAxisBuilder Polar()
        {
            Container.Type = "polar";
            return this;
        }
    }
}
