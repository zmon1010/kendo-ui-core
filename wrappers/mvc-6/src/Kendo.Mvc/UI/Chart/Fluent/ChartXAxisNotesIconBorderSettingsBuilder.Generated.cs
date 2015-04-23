using System;
using System.Collections.Generic;
using Kendo.Mvc.Extensions;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring ChartXAxisNotesIconBorderSettings
    /// </summary>
    public partial class ChartXAxisNotesIconBorderSettingsBuilder
        
    {
        /// <summary>
        /// The border color of the icon.
        /// </summary>
        /// <param name="value">The value for Color</param>
        public ChartXAxisNotesIconBorderSettingsBuilder Color(string value)
        {
            Container.Color = value;
            return this;
        }

        /// <summary>
        /// The border width of the icon.
        /// </summary>
        /// <param name="value">The value for Width</param>
        public ChartXAxisNotesIconBorderSettingsBuilder Width(double value)
        {
            Container.Width = value;
            return this;
        }

    }
}
