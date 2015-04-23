using System;
using System.Collections.Generic;
using Kendo.Mvc.Extensions;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring ChartXAxisLabelsDateFormatsSettings
    /// </summary>
    public partial class ChartXAxisLabelsDateFormatsSettingsBuilder
        
    {
        /// <summary>
        /// The format used when xAxis.baseUnit is set to "days".
        /// </summary>
        /// <param name="value">The value for Days</param>
        public ChartXAxisLabelsDateFormatsSettingsBuilder Days(string value)
        {
            Container.Days = value;
            return this;
        }

        /// <summary>
        /// The format used when xAxis.baseUnit is set to "hours".
        /// </summary>
        /// <param name="value">The value for Hours</param>
        public ChartXAxisLabelsDateFormatsSettingsBuilder Hours(string value)
        {
            Container.Hours = value;
            return this;
        }

        /// <summary>
        /// The format used when xAxis.baseUnit is set to "months".
        /// </summary>
        /// <param name="value">The value for Months</param>
        public ChartXAxisLabelsDateFormatsSettingsBuilder Months(string value)
        {
            Container.Months = value;
            return this;
        }

        /// <summary>
        /// The format used when xAxis.baseUnit is set to "weeks".
        /// </summary>
        /// <param name="value">The value for Weeks</param>
        public ChartXAxisLabelsDateFormatsSettingsBuilder Weeks(string value)
        {
            Container.Weeks = value;
            return this;
        }

        /// <summary>
        /// The format used when xAxis.baseUnit is set to "years".
        /// </summary>
        /// <param name="value">The value for Years</param>
        public ChartXAxisLabelsDateFormatsSettingsBuilder Years(string value)
        {
            Container.Years = value;
            return this;
        }

    }
}
