namespace Kendo.Mvc.UI.Fluent
{
    using System.Collections.Generic;
    using System.Collections;
    using System;
    using Kendo.Mvc.Extensions;

    /// <summary>
    /// Defines the fluent API for configuring the SpreadsheetSheetFilterSettingsColumn settings.
    /// </summary>
    public class SpreadsheetSheetFilterSettingsColumnBuilder: IHideObjectMembers
    {
        private readonly SpreadsheetSheetFilterSettingsColumn container;

        public SpreadsheetSheetFilterSettingsColumnBuilder(SpreadsheetSheetFilterSettingsColumn settings)
        {
            container = settings;
        }

        //>> Fields
        
        /// <summary>
        /// An array of filter criteria for custom filters.
        /// </summary>
        /// <param name="configurator">The action that configures the criteria.</param>
        public SpreadsheetSheetFilterSettingsColumnBuilder Criteria(Action<SpreadsheetSheetFilterSettingsColumnCriteriaFactory> configurator)
        {
            configurator(new SpreadsheetSheetFilterSettingsColumnCriteriaFactory(container.Criteria));
            return this;
        }
        
        /// <summary>
        /// The filter to apply to this column.The supported filters are:
		///   * value - filters based on unique values
		///   * custom - applies custom filtering criteria
		///   * top - filters the top or bottom records
		///   * dynamic - filters based on dynamic criteria
        /// </summary>
        /// <param name="value">The value that configures the filter.</param>
        public SpreadsheetSheetFilterSettingsColumnBuilder Filter(string value)
        {
            container.Filter = value;

            return this;
        }
        
        /// <summary>
        /// The index of the column relative to the filter range.
        /// </summary>
        /// <param name="value">The value that configures the index.</param>
        public SpreadsheetSheetFilterSettingsColumnBuilder Index(double value)
        {
            container.Index = value;

            return this;
        }
        
        /// <summary>
        /// The logical operator to apply to filter criteria.Possible values are and, or.
        /// </summary>
        /// <param name="value">The value that configures the logic.</param>
        public SpreadsheetSheetFilterSettingsColumnBuilder Logic(string value)
        {
            container.Logic = value;

            return this;
        }
        
        /// <summary>
        /// The filter sub-type, if any.Applicable types according to the main filter.
		/// * top
		///     * topNumber
		///     * topPercent
		///     * bottomNumber
		///     * bottomPercent
		/// * dynamic
		///     * aboveAverage
		///     * belowAverage
		///     * tomorrow
		///     * today
		///     * yesterday
		///     * nextWeek
		///     * thisWeek
		///     * lastWeek
		///     * nextMonth
		///     * thisMonth
		///     * lastMonth
		///     * nextQuarter
		///     * thisQuarter
		///     * lastQuarter
		///     * nextYear
		///     * thisYear
		///     * lastYear
		///     * yearToDate
        /// </summary>
        /// <param name="value">The value that configures the type.</param>
        public SpreadsheetSheetFilterSettingsColumnBuilder Type(string value)
        {
            container.Type = value;

            return this;
        }
        
        /// <summary>
        /// The filter value for filters that require a single value, e.g. "top".
        /// </summary>
        /// <param name="value">The value that configures the value.</param>
        public SpreadsheetSheetFilterSettingsColumnBuilder Value(double value)
        {
            container.Value = value;

            return this;
        }
        
        /// <summary>
        /// The filter values for filters that support multiple values.
        /// </summary>
        /// <param name="value">The value that configures the values.</param>
        public SpreadsheetSheetFilterSettingsColumnBuilder Values(params object[] value)
        {
            container.Values = value;

            return this;
        }
        
        //<< Fields
    }
}

