using System;
using System.Collections.Generic;
using Kendo.Mvc.Extensions;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring ChartCategoryAxisLabelsDateFormatsSettings
    /// </summary>
    public partial class ChartCategoryAxisLabelsDateFormatsSettingsBuilder
        
    {
        /// <summary>
        /// The format used when categoryAxis.baseUnit is set to "days".
        /// </summary>
        /// <param name="value">The value for Days</param>
        public ChartCategoryAxisLabelsDateFormatsSettingsBuilder Days(string value)
        {
            Container.Days = value;
            return this;
        }

        /// <summary>
        /// The format used when categoryAxis.baseUnit is set to "hours".
        /// </summary>
        /// <param name="value">The value for Hours</param>
        public ChartCategoryAxisLabelsDateFormatsSettingsBuilder Hours(string value)
        {
            Container.Hours = value;
            return this;
        }

        /// <summary>
        /// The format used when categoryAxis.baseUnit is set to "months".
        /// </summary>
        /// <param name="value">The value for Months</param>
        public ChartCategoryAxisLabelsDateFormatsSettingsBuilder Months(string value)
        {
            Container.Months = value;
            return this;
        }

        /// <summary>
        /// The format used when categoryAxis.baseUnit is set to "weeks".
        /// </summary>
        /// <param name="value">The value for Weeks</param>
        public ChartCategoryAxisLabelsDateFormatsSettingsBuilder Weeks(string value)
        {
            Container.Weeks = value;
            return this;
        }

        /// <summary>
        /// The format used when categoryAxis.baseUnit is set to "years".
        /// </summary>
        /// <param name="value">The value for Years</param>
        public ChartCategoryAxisLabelsDateFormatsSettingsBuilder Years(string value)
        {
            Container.Years = value;
            return this;
        }

    }
}
