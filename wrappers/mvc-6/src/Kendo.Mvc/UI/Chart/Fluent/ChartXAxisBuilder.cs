using System;
using System.Collections.Generic;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring ChartXAxis
    /// </summary>
    public partial class ChartXAxisBuilder
        
    {
        public ChartXAxisBuilder(ChartXAxis container)
        {
            Container = container;
        }

        protected ChartXAxis Container
        {
            get;
            private set;
        }

        /// <summary>
        /// Sets the axis type to date.
        /// </summary>
        public ChartXAxisBuilder Date()
        {
            Container.Type = "date";
            return this;
        }

        /// <summary>
        /// Sets the axis type to logarithmic.
        /// </summary>
        public ChartXAxisBuilder Logarithmic()
        {
            Container.Type = "log";
            return this;
        }

        /// <summary>
        /// Sets the axis type to numeric.
        /// </summary>
        public ChartXAxisBuilder Numeric()
        {
            Container.Type = "numeric";
            return this;
        }

        /// <summary>
        /// Sets the axis type to polar.
        /// </summary>
        public ChartXAxisBuilder Polar()
        {
            Container.Type = "polar";
            return this;
        }
    }
}
