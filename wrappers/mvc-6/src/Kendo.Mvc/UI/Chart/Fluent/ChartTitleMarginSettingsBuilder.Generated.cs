using System;
using System.Collections.Generic;
using Kendo.Mvc.Extensions;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring ChartTitleMarginSettings
    /// </summary>
    public partial class ChartTitleMarginSettingsBuilder
        
    {
        /// <summary>
        /// The bottom margin of the title.
        /// </summary>
        /// <param name="value">The value for Bottom</param>
        public ChartTitleMarginSettingsBuilder Bottom(double value)
        {
            Container.Bottom = value;
            return this;
        }

        /// <summary>
        /// The left margin of the title.
        /// </summary>
        /// <param name="value">The value for Left</param>
        public ChartTitleMarginSettingsBuilder Left(double value)
        {
            Container.Left = value;
            return this;
        }

        /// <summary>
        /// The right margin of the title.
        /// </summary>
        /// <param name="value">The value for Right</param>
        public ChartTitleMarginSettingsBuilder Right(double value)
        {
            Container.Right = value;
            return this;
        }

        /// <summary>
        /// The top margin of the title.
        /// </summary>
        /// <param name="value">The value for Top</param>
        public ChartTitleMarginSettingsBuilder Top(double value)
        {
            Container.Top = value;
            return this;
        }

    }
}
