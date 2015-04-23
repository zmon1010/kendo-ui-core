using System;
using System.Collections.Generic;
using Kendo.Mvc.Extensions;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring ChartSerieNegativeValuesSettings
    /// </summary>
    public partial class ChartSerieNegativeValuesSettingsBuilder
        
    {
        /// <summary>
        /// The color of the chart negative bubble values.
        /// </summary>
        /// <param name="value">The value for Color</param>
        public ChartSerieNegativeValuesSettingsBuilder Color(string value)
        {
            Container.Color = value;
            return this;
        }

        /// <summary>
        /// If set to true the chart will display the negative bubbles. By default the negative bubbles are not displayed.
        /// </summary>
        /// <param name="value">The value for Visible</param>
        public ChartSerieNegativeValuesSettingsBuilder Visible(bool value)
        {
            Container.Visible = value;
            return this;
        }

        /// <summary>
        /// If set to true the chart will display the negative bubbles. By default the negative bubbles are not displayed.
        /// </summary>
        public ChartSerieNegativeValuesSettingsBuilder Visible()
        {
            Container.Visible = true;
            return this;
        }

    }
}
