using System;
using System.Collections.Generic;
using Kendo.Mvc.Extensions;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring ChartSeriesTargetSettings
    /// </summary>
    public partial class ChartSeriesTargetSettingsBuilder
        
    {
        /// <summary>
        /// The border of the target.
        /// </summary>
        /// <param name="configurator">The configurator for the border setting.</param>
        public ChartSeriesTargetSettingsBuilder Border(Action<ChartSeriesTargetBorderSettingsBuilder> configurator)
        {

            Container.Border.Chart = Container.Chart;
            configurator(new ChartSeriesTargetBorderSettingsBuilder(Container.Border));

            return this;
        }

        /// <summary>
        /// The target color.
        /// </summary>
        /// <param name="value">The value for Color</param>
        public ChartSeriesTargetSettingsBuilder Color(string value)
        {
            Container.Color = value;
            return this;
        }

        /// <summary>
        /// The target line options.
        /// </summary>
        /// <param name="configurator">The configurator for the line setting.</param>
        public ChartSeriesTargetSettingsBuilder Line(Action<ChartSeriesTargetLineSettingsBuilder> configurator)
        {

            Container.Line.Chart = Container.Chart;
            configurator(new ChartSeriesTargetLineSettingsBuilder(Container.Line));

            return this;
        }

    }
}
