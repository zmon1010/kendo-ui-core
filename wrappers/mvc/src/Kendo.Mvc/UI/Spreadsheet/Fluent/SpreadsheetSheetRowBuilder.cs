namespace Kendo.Mvc.UI.Fluent
{
    using System.Collections.Generic;
    using System.Collections;
    using System;
    using Kendo.Mvc.Extensions;

    /// <summary>
    /// Defines the fluent API for configuring the SpreadsheetSheetRow settings.
    /// </summary>
    public class SpreadsheetSheetRowBuilder: IHideObjectMembers
    {
        private readonly SpreadsheetSheetRow container;

        public SpreadsheetSheetRowBuilder(SpreadsheetSheetRow settings)
        {
            container = settings;
        }

        //>> Fields
        
        /// <summary>
        /// 
        /// </summary>
        /// <param name="configurator">The action that configures the cells.</param>
        public SpreadsheetSheetRowBuilder Cells(Action<SpreadsheetSheetRowCellFactory> configurator)
        {
            configurator(new SpreadsheetSheetRowCellFactory(container.Cells));
            return this;
        }
        
        /// <summary>
        /// 
        /// </summary>
        /// <param name="value">The value that configures the height.</param>
        public SpreadsheetSheetRowBuilder Height(double value)
        {
            container.Height = value;

            return this;
        }
        
        /// <summary>
        /// 
        /// </summary>
        /// <param name="value">The value that configures the index.</param>
        public SpreadsheetSheetRowBuilder Index(int value)
        {
            container.Index = value;

            return this;
        }
        
        //<< Fields
    }
}

