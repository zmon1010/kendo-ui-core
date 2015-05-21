using System;
using System.Collections.Generic;
using Kendo.Mvc.Extensions;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring ChartSeriesLabelsFromPaddingSettings
    /// </summary>
    public partial class ChartSeriesLabelsFromPaddingSettingsBuilder
        
    {
        /// <summary>
        /// The bottom padding of the from labels.
        /// </summary>
        /// <param name="value">The value for Bottom</param>
        public ChartSeriesLabelsFromPaddingSettingsBuilder Bottom(double value)
        {
            Container.Bottom = value;
            return this;
        }

        /// <summary>
        /// The left padding of the from labels.
        /// </summary>
        /// <param name="value">The value for Left</param>
        public ChartSeriesLabelsFromPaddingSettingsBuilder Left(double value)
        {
            Container.Left = value;
            return this;
        }

        /// <summary>
        /// The right padding of the from labels.
        /// </summary>
        /// <param name="value">The value for Right</param>
        public ChartSeriesLabelsFromPaddingSettingsBuilder Right(double value)
        {
            Container.Right = value;
            return this;
        }

        /// <summary>
        /// The top padding of the from labels.
        /// </summary>
        /// <param name="value">The value for Top</param>
        public ChartSeriesLabelsFromPaddingSettingsBuilder Top(double value)
        {
            Container.Top = value;
            return this;
        }

    }
}
