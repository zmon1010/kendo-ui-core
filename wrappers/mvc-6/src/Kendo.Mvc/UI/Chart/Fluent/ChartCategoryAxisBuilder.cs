using System;
using System.Collections.Generic;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring ChartCategoryAxis
    /// </summary>
    public partial class ChartCategoryAxisBuilder
        
    {
        public ChartCategoryAxisBuilder(ChartCategoryAxis container)
        {
            Container = container;
        }

        protected ChartCategoryAxis Container
        {
            get;
            private set;
        }

        /// <summary>
        /// Sets the axis type to date.
        /// </summary>
        public ChartCategoryAxisBuilder Date()
        {
            Container.Type = "date";
            return this;
        }
    }
}
