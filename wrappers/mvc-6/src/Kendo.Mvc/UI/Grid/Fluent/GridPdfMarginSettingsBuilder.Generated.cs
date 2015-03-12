using System;
using System.Collections.Generic;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring GridPdfMarginSettings
    /// </summary>
    public partial class GridPdfMarginSettingsBuilder<T>
        
    {
        /// <summary>
        /// The bottom margin. Numbers are considered as "pt" units.
        /// </summary>
        /// <param name="value">The value for Bottom</param>
        public GridPdfMarginSettingsBuilder<T> Bottom(double value)
        {
            Container.Bottom = value;
            return this;
        }

        /// <summary>
        /// The left margin. Numbers are considered as "pt" units.
        /// </summary>
        /// <param name="value">The value for Left</param>
        public GridPdfMarginSettingsBuilder<T> Left(double value)
        {
            Container.Left = value;
            return this;
        }

        /// <summary>
        /// The right margin. Numbers are considered as "pt" units.
        /// </summary>
        /// <param name="value">The value for Right</param>
        public GridPdfMarginSettingsBuilder<T> Right(double value)
        {
            Container.Right = value;
            return this;
        }

        /// <summary>
        /// The top margin. Numbers are considered as "pt" units.
        /// </summary>
        /// <param name="value">The value for Top</param>
        public GridPdfMarginSettingsBuilder<T> Top(double value)
        {
            Container.Top = value;
            return this;
        }

    }
}
