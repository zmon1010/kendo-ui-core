using System;
using System.Collections.Generic;
using Kendo.Mvc.Extensions;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring ChartSerieNotesIconBorderSettings
    /// </summary>
    public partial class ChartSerieNotesIconBorderSettingsBuilder
        
    {
        /// <summary>
        /// The border color of the icon.
        /// </summary>
        /// <param name="value">The value for Color</param>
        public ChartSerieNotesIconBorderSettingsBuilder Color(string value)
        {
            Container.Color = value;
            return this;
        }

        /// <summary>
        /// The border width of the icon.
        /// </summary>
        /// <param name="value">The value for Width</param>
        public ChartSerieNotesIconBorderSettingsBuilder Width(double value)
        {
            Container.Width = value;
            return this;
        }

    }
}
