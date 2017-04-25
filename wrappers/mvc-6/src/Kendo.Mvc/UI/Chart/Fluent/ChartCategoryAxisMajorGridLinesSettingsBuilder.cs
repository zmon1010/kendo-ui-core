using System;
using System.Collections.Generic;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring ChartCategoryAxisMajorGridLinesSettings
    /// </summary>
    public partial class ChartCategoryAxisMajorGridLinesSettingsBuilder<T>
        where T : class
    {
        public ChartCategoryAxisMajorGridLinesSettingsBuilder(ChartCategoryAxisMajorGridLinesSettings<T> container)
        {
            Container = container;
        }

        protected ChartCategoryAxisMajorGridLinesSettings<T> Container
        {
            get;
            private set;
        }

        // Place custom settings here

        /// <summary>
        /// Makes the major grid lines visible.
        /// </summary>
        public ChartCategoryAxisMajorGridLinesSettingsBuilder<T> Visible()
        {
            Container.Visible = true;
            return this;
        }
    }
}
