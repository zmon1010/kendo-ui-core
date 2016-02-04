using System;
using System.Collections.Generic;
using Kendo.Mvc.Extensions;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring ChartZoomableSettings
    /// </summary>
    public partial class ChartZoomableSettingsBuilder
        
    {
        /// <summary>
        /// Specifies if the chart can be zoomed using the mouse wheel.
        /// </summary>
        /// <param name="configurator">The configurator for the mousewheel setting.</param>
        public ChartZoomableSettingsBuilder Mousewheel(Action<ChartZoomableMousewheelSettingsBuilder> configurator)
        {
            Container.Mousewheel.Enabled = true;

            Container.Mousewheel.Chart = Container.Chart;
            configurator(new ChartZoomableMousewheelSettingsBuilder(Container.Mousewheel));

            return this;
        }

        /// <summary>
        /// Specifies if the chart can be zoomed using the mouse wheel.
        /// </summary>
        /// <param name="enabled">Enables or disables the mousewheel option.</param>
        public ChartZoomableSettingsBuilder Mousewheel(bool enabled)
        {
            Container.Mousewheel.Enabled = enabled;
            return this;
        }

        /// <summary>
        /// Specifies if the chart can be zoomed using selection.
        /// </summary>
        /// <param name="configurator">The configurator for the selection setting.</param>
        public ChartZoomableSettingsBuilder Selection(Action<ChartZoomableSelectionSettingsBuilder> configurator)
        {
            Container.Selection.Enabled = true;

            Container.Selection.Chart = Container.Chart;
            configurator(new ChartZoomableSelectionSettingsBuilder(Container.Selection));

            return this;
        }

        /// <summary>
        /// Specifies if the chart can be zoomed using selection.
        /// </summary>
        /// <param name="enabled">Enables or disables the selection option.</param>
        public ChartZoomableSettingsBuilder Selection(bool enabled)
        {
            Container.Selection.Enabled = enabled;
            return this;
        }

    }
}
