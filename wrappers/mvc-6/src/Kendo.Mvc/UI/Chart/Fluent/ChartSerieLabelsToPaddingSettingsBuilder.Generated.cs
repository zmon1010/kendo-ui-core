using System;
using System.Collections.Generic;
using Kendo.Mvc.Extensions;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring ChartSerieLabelsToPaddingSettings
    /// </summary>
    public partial class ChartSerieLabelsToPaddingSettingsBuilder
        
    {
        /// <summary>
        /// The bottom padding of the to labels.
        /// </summary>
        /// <param name="value">The value for Bottom</param>
        public ChartSerieLabelsToPaddingSettingsBuilder Bottom(double value)
        {
            Container.Bottom = value;
            return this;
        }

        /// <summary>
        /// The left padding of the to labels.
        /// </summary>
        /// <param name="value">The value for Left</param>
        public ChartSerieLabelsToPaddingSettingsBuilder Left(double value)
        {
            Container.Left = value;
            return this;
        }

        /// <summary>
        /// The right padding of the to labels.
        /// </summary>
        /// <param name="value">The value for Right</param>
        public ChartSerieLabelsToPaddingSettingsBuilder Right(double value)
        {
            Container.Right = value;
            return this;
        }

        /// <summary>
        /// The top padding of the to labels.
        /// </summary>
        /// <param name="value">The value for Top</param>
        public ChartSerieLabelsToPaddingSettingsBuilder Top(double value)
        {
            Container.Top = value;
            return this;
        }

    }
}
