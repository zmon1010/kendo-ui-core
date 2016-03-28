using System;
using System.Collections.Generic;
using Kendo.Mvc.Extensions;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring ChartPannableSettings
    /// </summary>
    public partial class ChartPannableSettingsBuilder<T>
        where T : class 
    {
        /// <summary>
        /// Specifies the key that should be pressed to activate panning. The supported values are:
        /// </summary>
        /// <param name="value">The value for Key</param>
        public ChartPannableSettingsBuilder<T> Key(string value)
        {
            Container.Key = value;
            return this;
        }

        /// <summary>
        /// Specifies an axis that should not be panned. The supported values are none, x and y.
        /// </summary>
        /// <param name="value">The value for Lock</param>
        public ChartPannableSettingsBuilder<T> Lock(string value)
        {
            Container.Lock = value;
            return this;
        }

    }
}
