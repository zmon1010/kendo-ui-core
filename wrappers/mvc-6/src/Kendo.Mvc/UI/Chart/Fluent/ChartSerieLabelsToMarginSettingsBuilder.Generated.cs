using System;
using System.Collections.Generic;
using Kendo.Mvc.Extensions;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring ChartSerieLabelsToMarginSettings
    /// </summary>
    public partial class ChartSerieLabelsToMarginSettingsBuilder
        
    {
        /// <summary>
        /// The bottom margin of the to labels.
        /// </summary>
        /// <param name="value">The value for Bottom</param>
        public ChartSerieLabelsToMarginSettingsBuilder Bottom(double value)
        {
            Container.Bottom = value;
            return this;
        }

        /// <summary>
        /// The left margin of the to labels.
        /// </summary>
        /// <param name="value">The value for Left</param>
        public ChartSerieLabelsToMarginSettingsBuilder Left(double value)
        {
            Container.Left = value;
            return this;
        }

        /// <summary>
        /// The right margin of the to labels.
        /// </summary>
        /// <param name="value">The value for Right</param>
        public ChartSerieLabelsToMarginSettingsBuilder Right(double value)
        {
            Container.Right = value;
            return this;
        }

        /// <summary>
        /// The top margin of the to labels.
        /// </summary>
        /// <param name="value">The value for Top</param>
        public ChartSerieLabelsToMarginSettingsBuilder Top(double value)
        {
            Container.Top = value;
            return this;
        }

    }
}
