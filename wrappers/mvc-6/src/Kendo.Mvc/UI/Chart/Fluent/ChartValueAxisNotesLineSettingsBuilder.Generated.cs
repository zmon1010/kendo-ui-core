using System;
using System.Collections.Generic;
using Kendo.Mvc.Extensions;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring ChartValueAxisNotesLineSettings
    /// </summary>
    public partial class ChartValueAxisNotesLineSettingsBuilder
        
    {
        /// <summary>
        /// The line width of the notes.
        /// </summary>
        /// <param name="value">The value for Width</param>
        public ChartValueAxisNotesLineSettingsBuilder Width(double value)
        {
            Container.Width = value;
            return this;
        }

        /// <summary>
        /// The line color of the notes.
        /// </summary>
        /// <param name="value">The value for Color</param>
        public ChartValueAxisNotesLineSettingsBuilder Color(string value)
        {
            Container.Color = value;
            return this;
        }

        /// <summary>
        /// The length of the connecting lines in pixels.
        /// </summary>
        /// <param name="value">The value for Length</param>
        public ChartValueAxisNotesLineSettingsBuilder Length(double value)
        {
            Container.Length = value;
            return this;
        }

    }
}
