namespace Kendo.Mvc.UI.Fluent
{
    using System.Collections.Generic;
    using System.Collections;
    using System;
    using Kendo.Mvc.Extensions;

    /// <summary>
    /// Defines the fluent API for configuring the SpreadsheetSheetSortSettingsColumn settings.
    /// </summary>
    public class SpreadsheetSheetSortSettingsColumnBuilder: IHideObjectMembers
    {
        private readonly SpreadsheetSheetSortSettingsColumn container;

        public SpreadsheetSheetSortSettingsColumnBuilder(SpreadsheetSheetSortSettingsColumn settings)
        {
            container = settings;
        }

        //>> Fields
        
        /// <summary>
        /// 
        /// </summary>
        /// <param name="value">The value that configures the ascending.</param>
        public SpreadsheetSheetSortSettingsColumnBuilder Ascending(bool value)
        {
            container.Ascending = value;

            return this;
        }
        
        /// <summary>
        /// 
        /// </summary>
        /// <param name="value">The value that configures the index.</param>
        public SpreadsheetSheetSortSettingsColumnBuilder Index(double value)
        {
            container.Index = value;

            return this;
        }
        
        //<< Fields
    }
}

