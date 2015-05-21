using System;
using System.Collections.Generic;
using Kendo.Mvc.Extensions;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring ChartSeriesMarginSettings
    /// </summary>
    public partial class ChartSeriesMarginSettingsBuilder
        
    {
        /// <summary>
        /// The bottom margin of the labels.
        /// </summary>
        /// <param name="value">The value for Bottom</param>
        public ChartSeriesMarginSettingsBuilder Bottom(double value)
        {
            Container.Bottom = value;
            return this;
        }

        /// <summary>
        /// The left margin of the labels.
        /// </summary>
        /// <param name="value">The value for Left</param>
        public ChartSeriesMarginSettingsBuilder Left(double value)
        {
            Container.Left = value;
            return this;
        }

        /// <summary>
        /// The right margin of the labels.
        /// </summary>
        /// <param name="value">The value for Right</param>
        public ChartSeriesMarginSettingsBuilder Right(double value)
        {
            Container.Right = value;
            return this;
        }

        /// <summary>
        /// The top margin of the labels.
        /// </summary>
        /// <param name="value">The value for Top</param>
        public ChartSeriesMarginSettingsBuilder Top(double value)
        {
            Container.Top = value;
            return this;
        }

    }
}
