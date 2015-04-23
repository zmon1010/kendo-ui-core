using System;
using System.Collections.Generic;
using Kendo.Mvc.Extensions;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring ChartSerieLabelsFromPaddingSettings
    /// </summary>
    public partial class ChartSerieLabelsFromPaddingSettingsBuilder
        
    {
        /// <summary>
        /// The bottom padding of the from labels.
        /// </summary>
        /// <param name="value">The value for Bottom</param>
        public ChartSerieLabelsFromPaddingSettingsBuilder Bottom(double value)
        {
            Container.Bottom = value;
            return this;
        }

        /// <summary>
        /// The left padding of the from labels.
        /// </summary>
        /// <param name="value">The value for Left</param>
        public ChartSerieLabelsFromPaddingSettingsBuilder Left(double value)
        {
            Container.Left = value;
            return this;
        }

        /// <summary>
        /// The right padding of the from labels.
        /// </summary>
        /// <param name="value">The value for Right</param>
        public ChartSerieLabelsFromPaddingSettingsBuilder Right(double value)
        {
            Container.Right = value;
            return this;
        }

        /// <summary>
        /// The top padding of the from labels.
        /// </summary>
        /// <param name="value">The value for Top</param>
        public ChartSerieLabelsFromPaddingSettingsBuilder Top(double value)
        {
            Container.Top = value;
            return this;
        }

    }
}
