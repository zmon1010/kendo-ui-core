using System;
using System.Collections.Generic;
using Kendo.Mvc.Extensions;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring ChartSerieStackSettings
    /// </summary>
    public partial class ChartSerieStackSettingsBuilder
        
    {
        /// <summary>
        /// The type of stack to plot. The following types are supported:
        /// </summary>
        /// <param name="value">The value for Type</param>
        public ChartSerieStackSettingsBuilder Type(string value)
        {
            Container.Type = value;
            return this;
        }

        /// <summary>
        /// Indicates that the series should be stacked in a group with the specified name.
        /// </summary>
        /// <param name="value">The value for Group</param>
        public ChartSerieStackSettingsBuilder Group(string value)
        {
            Container.Group = value;
            return this;
        }

    }
}
