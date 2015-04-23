using System;
using System.Collections.Generic;
using Kendo.Mvc.Extensions;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring ChartLegendInactiveItemsSettings
    /// </summary>
    public partial class ChartLegendInactiveItemsSettingsBuilder
        
    {
        /// <summary>
        /// The chart legend label configuration.
        /// </summary>
        /// <param name="configurator">The configurator for the labels setting.</param>
        public ChartLegendInactiveItemsSettingsBuilder Labels(Action<ChartLegendInactiveItemsLabelsSettingsBuilder> configurator)
        {

            Container.Labels.Chart = Container.Chart;
            configurator(new ChartLegendInactiveItemsLabelsSettingsBuilder(Container.Labels));

            return this;
        }

    }
}
