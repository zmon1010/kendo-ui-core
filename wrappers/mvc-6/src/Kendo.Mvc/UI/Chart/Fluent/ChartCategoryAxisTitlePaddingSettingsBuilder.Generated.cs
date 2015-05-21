using System;
using System.Collections.Generic;
using Kendo.Mvc.Extensions;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring ChartCategoryAxisTitlePaddingSettings
    /// </summary>
    public partial class ChartCategoryAxisTitlePaddingSettingsBuilder
        
    {
        /// <summary>
        /// The bottom padding of the title.
        /// </summary>
        /// <param name="value">The value for Bottom</param>
        public ChartCategoryAxisTitlePaddingSettingsBuilder Bottom(double value)
        {
            Container.Bottom = value;
            return this;
        }

        /// <summary>
        /// The left padding of the title.
        /// </summary>
        /// <param name="value">The value for Left</param>
        public ChartCategoryAxisTitlePaddingSettingsBuilder Left(double value)
        {
            Container.Left = value;
            return this;
        }

        /// <summary>
        /// The right padding of the title.
        /// </summary>
        /// <param name="value">The value for Right</param>
        public ChartCategoryAxisTitlePaddingSettingsBuilder Right(double value)
        {
            Container.Right = value;
            return this;
        }

        /// <summary>
        /// The top padding of the title.
        /// </summary>
        /// <param name="value">The value for Top</param>
        public ChartCategoryAxisTitlePaddingSettingsBuilder Top(double value)
        {
            Container.Top = value;
            return this;
        }

    }
}
