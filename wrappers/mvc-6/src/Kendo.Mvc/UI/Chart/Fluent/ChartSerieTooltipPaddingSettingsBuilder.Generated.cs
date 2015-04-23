using System;
using System.Collections.Generic;
using Kendo.Mvc.Extensions;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring ChartSerieTooltipPaddingSettings
    /// </summary>
    public partial class ChartSerieTooltipPaddingSettingsBuilder
        
    {
        /// <summary>
        /// The bottom padding of the tooltip.
        /// </summary>
        /// <param name="value">The value for Bottom</param>
        public ChartSerieTooltipPaddingSettingsBuilder Bottom(double value)
        {
            Container.Bottom = value;
            return this;
        }

        /// <summary>
        /// The left padding of the tooltip.
        /// </summary>
        /// <param name="value">The value for Left</param>
        public ChartSerieTooltipPaddingSettingsBuilder Left(double value)
        {
            Container.Left = value;
            return this;
        }

        /// <summary>
        /// The right padding of the tooltip.
        /// </summary>
        /// <param name="value">The value for Right</param>
        public ChartSerieTooltipPaddingSettingsBuilder Right(double value)
        {
            Container.Right = value;
            return this;
        }

        /// <summary>
        /// The top padding of the tooltip.
        /// </summary>
        /// <param name="value">The value for Top</param>
        public ChartSerieTooltipPaddingSettingsBuilder Top(double value)
        {
            Container.Top = value;
            return this;
        }

    }
}
