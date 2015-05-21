using System;
using System.Collections.Generic;
using Kendo.Mvc.Extensions;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring ChartXAxisLabelsPaddingSettings
    /// </summary>
    public partial class ChartXAxisLabelsPaddingSettingsBuilder
        
    {
        /// <summary>
        /// The bottom padding of the labels.
        /// </summary>
        /// <param name="value">The value for Bottom</param>
        public ChartXAxisLabelsPaddingSettingsBuilder Bottom(double value)
        {
            Container.Bottom = value;
            return this;
        }

        /// <summary>
        /// The left padding of the labels.
        /// </summary>
        /// <param name="value">The value for Left</param>
        public ChartXAxisLabelsPaddingSettingsBuilder Left(double value)
        {
            Container.Left = value;
            return this;
        }

        /// <summary>
        /// The right padding of the labels.
        /// </summary>
        /// <param name="value">The value for Right</param>
        public ChartXAxisLabelsPaddingSettingsBuilder Right(double value)
        {
            Container.Right = value;
            return this;
        }

        /// <summary>
        /// The top padding of the labels.
        /// </summary>
        /// <param name="value">The value for Top</param>
        public ChartXAxisLabelsPaddingSettingsBuilder Top(double value)
        {
            Container.Top = value;
            return this;
        }

    }
}
