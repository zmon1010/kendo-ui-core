using System;
using System.Collections.Generic;
using Kendo.Mvc.Extensions;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring ChartSerieTargetSettings
    /// </summary>
    public partial class ChartSerieTargetSettingsBuilder
        
    {
        /// <summary>
        /// The border of the target.
        /// </summary>
        /// <param name="configurator">The configurator for the border setting.</param>
        public ChartSerieTargetSettingsBuilder Border(Action<ChartSerieTargetBorderSettingsBuilder> configurator)
        {

            Container.Border.Chart = Container.Chart;
            configurator(new ChartSerieTargetBorderSettingsBuilder(Container.Border));

            return this;
        }

        /// <summary>
        /// The target color.
        /// </summary>
        /// <param name="value">The value for Color</param>
        public ChartSerieTargetSettingsBuilder Color(string value)
        {
            Container.Color = value;
            return this;
        }

        /// <summary>
        /// The target line options.
        /// </summary>
        /// <param name="configurator">The configurator for the line setting.</param>
        public ChartSerieTargetSettingsBuilder Line(Action<ChartSerieTargetLineSettingsBuilder> configurator)
        {

            Container.Line.Chart = Container.Chart;
            configurator(new ChartSerieTargetLineSettingsBuilder(Container.Line));

            return this;
        }

    }
}
