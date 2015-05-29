using System;
using System.Collections.Generic;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring ChartYAxis
    /// </summary>
    public partial class ChartYAxisBuilder
        
    {
        public ChartYAxisBuilder(ChartYAxis container)
        {
            Container = container;
        }

        protected ChartYAxis Container
        {
            get;
            private set;
        }

        /// <summary>
        /// Sets the axis type to date.
        /// </summary>
        public ChartYAxisBuilder Date()
        {
            Container.Type = "date";
            return this;
        }

        /// <summary>
        /// Sets the axis type to logarithmic.
        /// </summary>
        public ChartYAxisBuilder Logarithmic()
        {
            Container.Type = "log";
            return this;
        }

        /// <summary>
        /// Sets the axis type to numeric.
        /// </summary>
        public ChartYAxisBuilder Numeric()
        {
            Container.Type = "numeric";
            return this;
        }

        /// <summary>
        /// Sets the axis type to polar.
        /// </summary>
        public ChartYAxisBuilder Polar()
        {
            Container.Type = "polar";
            return this;
        }
    }
}
