using System;
using System.Collections.Generic;
using Kendo.Mvc.Extensions;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring ChartLegendPaddingSettings
    /// </summary>
    public partial class ChartLegendPaddingSettingsBuilder
        
    {
        /// <summary>
        /// The bottom padding of the chart legend.
        /// </summary>
        /// <param name="value">The value for Bottom</param>
        public ChartLegendPaddingSettingsBuilder Bottom(double value)
        {
            Container.Bottom = value;
            return this;
        }

        /// <summary>
        /// The left padding of the chart legend.
        /// </summary>
        /// <param name="value">The value for Left</param>
        public ChartLegendPaddingSettingsBuilder Left(double value)
        {
            Container.Left = value;
            return this;
        }

        /// <summary>
        /// The right padding of the chart legend.
        /// </summary>
        /// <param name="value">The value for Right</param>
        public ChartLegendPaddingSettingsBuilder Right(double value)
        {
            Container.Right = value;
            return this;
        }

        /// <summary>
        /// The top padding of the chart legend.
        /// </summary>
        /// <param name="value">The value for Top</param>
        public ChartLegendPaddingSettingsBuilder Top(double value)
        {
            Container.Top = value;
            return this;
        }

    }
}
