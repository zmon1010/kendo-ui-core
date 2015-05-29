using System;
using System.Collections.Generic;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring ChartTitleSettings
    /// </summary>
    public partial class ChartSeriesDefaultsSettingsBuilder
        
    {
        public ChartSeriesDefaultsSettingsBuilder(ChartSeriesDefaultsSettings container)
        {
            Container = container;
        }

        protected ChartSeriesDefaultsSettings Container
        {
            get;
            private set;
        }

        /// <summary>
        /// The border of the series.
        /// </summary>
        /// <param name="configurator">The configurator for the border setting.</param>
        public ChartSeriesBuilder Area()
        {
            return new ChartSeriesBuilder(Container.Area);
        }
    }
}
