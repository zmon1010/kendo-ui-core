using System;
using System.Collections.Generic;
using Kendo.Mvc.Extensions;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring ChartValueAxisCrosshairTooltipPaddingSettings
    /// </summary>
    public partial class ChartValueAxisCrosshairTooltipPaddingSettingsBuilder
        
    {
        /// <summary>
        /// The bottom padding of the crosshair tooltip.
        /// </summary>
        /// <param name="value">The value for Bottom</param>
        public ChartValueAxisCrosshairTooltipPaddingSettingsBuilder Bottom(double value)
        {
            Container.Bottom = value;
            return this;
        }

        /// <summary>
        /// The left padding of the crosshair tooltip.
        /// </summary>
        /// <param name="value">The value for Left</param>
        public ChartValueAxisCrosshairTooltipPaddingSettingsBuilder Left(double value)
        {
            Container.Left = value;
            return this;
        }

        /// <summary>
        /// The right padding of the crosshair tooltip.
        /// </summary>
        /// <param name="value">The value for Right</param>
        public ChartValueAxisCrosshairTooltipPaddingSettingsBuilder Right(double value)
        {
            Container.Right = value;
            return this;
        }

        /// <summary>
        /// The top padding of the crosshair tooltip.
        /// </summary>
        /// <param name="value">The value for Top</param>
        public ChartValueAxisCrosshairTooltipPaddingSettingsBuilder Top(double value)
        {
            Container.Top = value;
            return this;
        }

    }
}
