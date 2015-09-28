namespace Kendo.Mvc.UI.Fluent
{
    using System.Collections.Generic;
    using System.Collections;
    using System;
    using Kendo.Mvc.Extensions;

    /// <summary>
    /// Defines the fluent API for configuring the SpreadsheetSheet settings.
    /// </summary>
    public class SpreadsheetSheetBuilder: IHideObjectMembers
    {
        private readonly SpreadsheetSheet container;

        public SpreadsheetSheetBuilder(SpreadsheetSheet settings)
        {
            container = settings;
        }

        //>> Fields
        
        /// <summary>
        /// The active cell in the sheet, e.g. "A1".
        /// </summary>
        /// <param name="value">The value that configures the activecell.</param>
        public SpreadsheetSheetBuilder ActiveCell(string value)
        {
            container.ActiveCell = value;

            return this;
        }
        
        /// <summary>
        /// The name of the sheet.
        /// </summary>
        /// <param name="value">The value that configures the name.</param>
        public SpreadsheetSheetBuilder Name(string value)
        {
            container.Name = value;

            return this;
        }
        
        /// <summary>
        /// 
        /// </summary>
        /// <param name="configurator">The action that configures the columns.</param>
        public SpreadsheetSheetBuilder Columns(Action<SpreadsheetSheetColumnFactory> configurator)
        {
            configurator(new SpreadsheetSheetColumnFactory(container.Columns));
            return this;
        }
        
        /// <summary>
        /// 
        /// </summary>
        /// <param name="configurator">The action that configures the filter.</param>
        public SpreadsheetSheetBuilder Filter(Action<SpreadsheetSheetFilterSettingsBuilder> configurator)
        {
            configurator(new SpreadsheetSheetFilterSettingsBuilder(container.Filter));
            return this;
        }
        
        /// <summary>
        /// 
        /// </summary>
        /// <param name="value">The value that configures the frozencolumns.</param>
        public SpreadsheetSheetBuilder FrozenColumns(int value)
        {
            container.FrozenColumns = value;

            return this;
        }
        
        /// <summary>
        /// 
        /// </summary>
        /// <param name="value">The value that configures the frozenrows.</param>
        public SpreadsheetSheetBuilder FrozenRows(int value)
        {
            container.FrozenRows = value;

            return this;
        }
        
        /// <summary>
        /// 
        /// </summary>
        /// <param name="value">The value that configures the mergedcells.</param>
        public SpreadsheetSheetBuilder MergedCells(params string[] value)
        {
            container.MergedCells = value;

            return this;
        }
        
        /// <summary>
        /// 
        /// </summary>
        /// <param name="configurator">The action that configures the rows.</param>
        public SpreadsheetSheetBuilder Rows(Action<SpreadsheetSheetRowFactory> configurator)
        {
            configurator(new SpreadsheetSheetRowFactory(container.Rows));
            return this;
        }
        
        /// <summary>
        /// The selected range in the sheet, e.g. "A1:B10".
        /// </summary>
        /// <param name="value">The value that configures the selection.</param>
        public SpreadsheetSheetBuilder Selection(string value)
        {
            container.Selection = value;

            return this;
        }
        
        /// <summary>
        /// 
        /// </summary>
        /// <param name="configurator">The action that configures the sort.</param>
        public SpreadsheetSheetBuilder Sort(Action<SpreadsheetSheetSortSettingsBuilder> configurator)
        {
            configurator(new SpreadsheetSheetSortSettingsBuilder(container.Sort));
            return this;
        }
        
        //<< Fields
    }
}

