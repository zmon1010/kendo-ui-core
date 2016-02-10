using System;
using System.Collections.Generic;
using Kendo.Mvc.Extensions;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring ChartZoomableSelectionSettings
    /// </summary>
    public partial class ChartZoomableSelectionSettingsBuilder<T>
        where T : class 
    {
        /// <summary>
        /// Specifies a keyboard key that should be pressed to activate the selection. The supported values are:
        /// </summary>
        /// <param name="value">The value for Key</param>
        public ChartZoomableSelectionSettingsBuilder<T> Key(string value)
        {
            Container.Key = value;
            return this;
        }

        /// <summary>
        /// Specifies an axis that should not be zoomed. The supported values are none, x and y.
        /// </summary>
        /// <param name="value">The value for Lock</param>
        public ChartZoomableSelectionSettingsBuilder<T> Lock(string value)
        {
            Container.Lock = value;
            return this;
        }

    }
}
