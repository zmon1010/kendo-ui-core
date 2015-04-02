using System;
using System.Collections.Generic;
using Kendo.Mvc.Extensions;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring SchedulerViewGroupSettings
    /// </summary>
    public partial class SchedulerViewGroupSettingsBuilder<T>
        where T : class, ISchedulerEvent 
    {
        /// <summary>
        /// The orientation of the group headers. Supported values are horizontal or vertical. Note that the agenda view is always in vertical orientation.
        /// </summary>
        /// <param name="value">The value for Orientation</param>
        public SchedulerViewGroupSettingsBuilder<T> Orientation(string value)
        {
            Container.Orientation = value;
            return this;
        }

    }
}
