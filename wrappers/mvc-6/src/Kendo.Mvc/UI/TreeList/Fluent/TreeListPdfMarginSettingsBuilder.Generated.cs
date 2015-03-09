using System;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring TreeListPdfMarginSettings
    /// </summary>
    public partial class TreeListPdfMarginSettingsBuilder
        
    {
        /// <summary>
        /// The bottom margin. Numbers are considered as "pt" units.
        /// </summary>
        /// <param name="value">The value for Bottom</param>
        public TreeListPdfMarginSettingsBuilder Bottom(double value)
        {
            Container.Bottom = value;
            return this;
        }

        /// <summary>
        /// The left margin. Numbers are considered as "pt" units.
        /// </summary>
        /// <param name="value">The value for Left</param>
        public TreeListPdfMarginSettingsBuilder Left(double value)
        {
            Container.Left = value;
            return this;
        }

        /// <summary>
        /// The right margin. Numbers are considered as "pt" units.
        /// </summary>
        /// <param name="value">The value for Right</param>
        public TreeListPdfMarginSettingsBuilder Right(double value)
        {
            Container.Right = value;
            return this;
        }

        /// <summary>
        /// The top margin. Numbers are considered as "pt" units.
        /// </summary>
        /// <param name="value">The value for Top</param>
        public TreeListPdfMarginSettingsBuilder Top(double value)
        {
            Container.Top = value;
            return this;
        }


    }
}
