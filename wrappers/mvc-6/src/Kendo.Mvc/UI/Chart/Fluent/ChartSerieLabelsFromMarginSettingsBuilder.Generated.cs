using System;
using System.Collections.Generic;
using Kendo.Mvc.Extensions;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring ChartSerieLabelsFromMarginSettings
    /// </summary>
    public partial class ChartSerieLabelsFromMarginSettingsBuilder
        
    {
        /// <summary>
        /// The bottom margin of the from labels.
        /// </summary>
        /// <param name="value">The value for Bottom</param>
        public ChartSerieLabelsFromMarginSettingsBuilder Bottom(double value)
        {
            Container.Bottom = value;
            return this;
        }

        /// <summary>
        /// The left margin of the from labels.
        /// </summary>
        /// <param name="value">The value for Left</param>
        public ChartSerieLabelsFromMarginSettingsBuilder Left(double value)
        {
            Container.Left = value;
            return this;
        }

        /// <summary>
        /// The right margin of the from labels.
        /// </summary>
        /// <param name="value">The value for Right</param>
        public ChartSerieLabelsFromMarginSettingsBuilder Right(double value)
        {
            Container.Right = value;
            return this;
        }

        /// <summary>
        /// The top margin of the from labels.
        /// </summary>
        /// <param name="value">The value for Top</param>
        public ChartSerieLabelsFromMarginSettingsBuilder Top(double value)
        {
            Container.Top = value;
            return this;
        }

    }
}
