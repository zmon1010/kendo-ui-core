using System;
using System.Collections.Generic;
using Kendo.Mvc.Extensions;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring ChartCategoryAxisNotesLineSettings
    /// </summary>
    public partial class ChartCategoryAxisNotesLineSettingsBuilder<T>
        where T : class 
    {
        /// <summary>
        /// The line width of the notes.
        /// </summary>
        /// <param name="value">The value for Width</param>
        public ChartCategoryAxisNotesLineSettingsBuilder<T> Width(double value)
        {
            Container.Width = value;
            return this;
        }

        /// <summary>
        /// The line color of the notes.
        /// </summary>
        /// <param name="value">The value for Color</param>
        public ChartCategoryAxisNotesLineSettingsBuilder<T> Color(string value)
        {
            Container.Color = value;
            return this;
        }

        /// <summary>
        /// The length of the connecting lines in pixels.
        /// </summary>
        /// <param name="value">The value for Length</param>
        public ChartCategoryAxisNotesLineSettingsBuilder<T> Length(double value)
        {
            Container.Length = value;
            return this;
        }

    }
}
