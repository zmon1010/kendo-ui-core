namespace Kendo.Mvc.UI.Fluent
{
    using System.Collections.Generic;
    using System.Collections;
    using System;
    using Kendo.Mvc.Extensions;

    /// <summary>
    /// Defines the fluent API for configuring the SpreadsheetSheetFilterSettings settings.
    /// </summary>
    public class SpreadsheetSheetFilterSettingsBuilder: IHideObjectMembers
    {
        private readonly SpreadsheetSheetFilterSettings container;

        public SpreadsheetSheetFilterSettingsBuilder(SpreadsheetSheetFilterSettings settings)
        {
            container = settings;
        }

        //>> Fields
        
        /// <summary>
        /// 
        /// </summary>
        /// <param name="configurator">The action that configures the columns.</param>
        public SpreadsheetSheetFilterSettingsBuilder Columns(Action<SpreadsheetSheetFilterSettingsColumnFactory> configurator)
        {
            configurator(new SpreadsheetSheetFilterSettingsColumnFactory(container.Columns));
            return this;
        }
        
        /// <summary>
        /// 
        /// </summary>
        /// <param name="value">The value that configures the ref.</param>
        public SpreadsheetSheetFilterSettingsBuilder Ref(string value)
        {
            container.Ref = value;

            return this;
        }
        
        //<< Fields
    }
}

