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
        /// 
        /// </summary>
        /// <param name="value">The value that configures the criteria.</param>
        public SpreadsheetSheetFilterSettingsColumnBuilder Criteria(string value)
        {
            container.Criteria = value;

            return this;
        }
        
        /// <summary>
        /// 
        /// </summary>
        /// <param name="value">The value that configures the filter.</param>
        public SpreadsheetSheetFilterSettingsColumnBuilder Filter(string value)
        {
            container.Filter = value;

            return this;
        }
        
        /// <summary>
        /// 
        /// </summary>
        /// <param name="value">The value that configures the index.</param>
        public SpreadsheetSheetFilterSettingsColumnBuilder Index(double value)
        {
            container.Index = value;

            return this;
        }
        
        /// <summary>
        /// 
        /// </summary>
        /// <param name="value">The value that configures the logic.</param>
        public SpreadsheetSheetFilterSettingsColumnBuilder Logic(string value)
        {
            container.Logic = value;

            return this;
        }
        
        /// <summary>
        /// 
        /// </summary>
        /// <param name="value">The value that configures the type.</param>
        public SpreadsheetSheetFilterSettingsColumnBuilder Type(string value)
        {
            container.Type = value;

            return this;
        }
        
        /// <summary>
        /// 
        /// </summary>
        /// <param name="value">The value that configures the value.</param>
        public SpreadsheetSheetFilterSettingsColumnBuilder Value(double value)
        {
            container.Value = value;

            return this;
        }
        
        /// <summary>
        /// 
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

