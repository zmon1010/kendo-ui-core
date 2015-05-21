using System;
using System.Collections.Generic;
using Kendo.Mvc.Extensions;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring ChartSeriesTooltipPaddingSettings
    /// </summary>
    public partial class ChartSeriesTooltipPaddingSettingsBuilder
        
    {
        /// <summary>
        /// The bottom padding of the tooltip.
        /// </summary>
        /// <param name="value">The value for Bottom</param>
        public ChartSeriesTooltipPaddingSettingsBuilder Bottom(double value)
        {
            Container.Bottom = value;
            return this;
        }

        /// <summary>
        /// The left padding of the tooltip.
        /// </summary>
        /// <param name="value">The value for Left</param>
        public ChartSeriesTooltipPaddingSettingsBuilder Left(double value)
        {
            Container.Left = value;
            return this;
        }

        /// <summary>
        /// The right padding of the tooltip.
        /// </summary>
        /// <param name="value">The value for Right</param>
        public ChartSeriesTooltipPaddingSettingsBuilder Right(double value)
        {
            Container.Right = value;
            return this;
        }

        /// <summary>
        /// The top padding of the tooltip.
        /// </summary>
        /// <param name="value">The value for Top</param>
        public ChartSeriesTooltipPaddingSettingsBuilder Top(double value)
        {
            Container.Top = value;
            return this;
        }

    }
}
