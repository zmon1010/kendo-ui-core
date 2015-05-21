using System;
using System.Collections.Generic;
using Kendo.Mvc.Extensions;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring ChartPlotAreaMarginSettings
    /// </summary>
    public partial class ChartPlotAreaMarginSettingsBuilder
        
    {
        /// <summary>
        /// The bottom margin of the chart plot area.
        /// </summary>
        /// <param name="value">The value for Bottom</param>
        public ChartPlotAreaMarginSettingsBuilder Bottom(double value)
        {
            Container.Bottom = value;
            return this;
        }

        /// <summary>
        /// The left margin of the chart plot area.
        /// </summary>
        /// <param name="value">The value for Left</param>
        public ChartPlotAreaMarginSettingsBuilder Left(double value)
        {
            Container.Left = value;
            return this;
        }

        /// <summary>
        /// The right margin of the chart plot area.
        /// </summary>
        /// <param name="value">The value for Right</param>
        public ChartPlotAreaMarginSettingsBuilder Right(double value)
        {
            Container.Right = value;
            return this;
        }

        /// <summary>
        /// The top margin of the chart plot area.
        /// </summary>
        /// <param name="value">The value for Top</param>
        public ChartPlotAreaMarginSettingsBuilder Top(double value)
        {
            Container.Top = value;
            return this;
        }

    }
}
