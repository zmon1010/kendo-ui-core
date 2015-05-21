using System;
using System.Collections.Generic;
using Kendo.Mvc.Extensions;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring ChartValueAxisLabelsMarginSettings
    /// </summary>
    public partial class ChartValueAxisLabelsMarginSettingsBuilder
        
    {
        /// <summary>
        /// The bottom margin of the labels.
        /// </summary>
        /// <param name="value">The value for Bottom</param>
        public ChartValueAxisLabelsMarginSettingsBuilder Bottom(double value)
        {
            Container.Bottom = value;
            return this;
        }

        /// <summary>
        /// The left margin of the labels.
        /// </summary>
        /// <param name="value">The value for Left</param>
        public ChartValueAxisLabelsMarginSettingsBuilder Left(double value)
        {
            Container.Left = value;
            return this;
        }

        /// <summary>
        /// The right margin of the labels.
        /// </summary>
        /// <param name="value">The value for Right</param>
        public ChartValueAxisLabelsMarginSettingsBuilder Right(double value)
        {
            Container.Right = value;
            return this;
        }

        /// <summary>
        /// The top margin of the labels.
        /// </summary>
        /// <param name="value">The value for Top</param>
        public ChartValueAxisLabelsMarginSettingsBuilder Top(double value)
        {
            Container.Top = value;
            return this;
        }

    }
}
