using System;
using System.Collections.Generic;
using Kendo.Mvc.Extensions;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring ChartCategoryAxisNotesIconBorderSettings
    /// </summary>
    public partial class ChartCategoryAxisNotesIconBorderSettingsBuilder
        
    {
        /// <summary>
        /// The border color of the icon.
        /// </summary>
        /// <param name="value">The value for Color</param>
        public ChartCategoryAxisNotesIconBorderSettingsBuilder Color(string value)
        {
            Container.Color = value;
            return this;
        }

        /// <summary>
        /// The border width of the icon.
        /// </summary>
        /// <param name="value">The value for Width</param>
        public ChartCategoryAxisNotesIconBorderSettingsBuilder Width(double value)
        {
            Container.Width = value;
            return this;
        }

    }
}
