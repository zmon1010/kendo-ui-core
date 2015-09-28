namespace Kendo.Mvc.UI.Fluent
{
    using System.Collections.Generic;
    using System.Collections;
    using System;
    using Kendo.Mvc.Extensions;

    /// <summary>
    /// Defines the fluent API for configuring the SpreadsheetSheetRowCell settings.
    /// </summary>
    public class SpreadsheetSheetRowCellBuilder: IHideObjectMembers
    {
        private readonly SpreadsheetSheetRowCell container;

        public SpreadsheetSheetRowCellBuilder(SpreadsheetSheetRowCell settings)
        {
            container = settings;
        }

        //>> Fields
        
        /// <summary>
        /// 
        /// </summary>
        /// <param name="value">The value that configures the background.</param>
        public SpreadsheetSheetRowCellBuilder Background(string value)
        {
            container.Background = value;

            return this;
        }
        
        /// <summary>
        /// 
        /// </summary>
        /// <param name="value">The value that configures the color.</param>
        public SpreadsheetSheetRowCellBuilder Color(string value)
        {
            container.Color = value;

            return this;
        }
        
        /// <summary>
        /// 
        /// </summary>
        /// <param name="value">The value that configures the fontfamily.</param>
        public SpreadsheetSheetRowCellBuilder FontFamily(string value)
        {
            container.FontFamily = value;

            return this;
        }
        
        /// <summary>
        /// 
        /// </summary>
        /// <param name="value">The value that configures the fontsize.</param>
        public SpreadsheetSheetRowCellBuilder FontSize(double value)
        {
            container.FontSize = value;

            return this;
        }
        
        /// <summary>
        /// 
        /// </summary>
        /// <param name="value">The value that configures the italic.</param>
        public SpreadsheetSheetRowCellBuilder Italic(bool value)
        {
            container.Italic = value;

            return this;
        }
        
        /// <summary>
        /// 
        /// </summary>
        /// <param name="value">The value that configures the bold.</param>
        public SpreadsheetSheetRowCellBuilder Bold(bool value)
        {
            container.Bold = value;

            return this;
        }
        
        /// <summary>
        /// 
        /// </summary>
        /// <param name="value">The value that configures the format.</param>
        public SpreadsheetSheetRowCellBuilder Format(string value)
        {
            container.Format = value;

            return this;
        }
        
        /// <summary>
        /// 
        /// </summary>
        /// <param name="value">The value that configures the formula.</param>
        public SpreadsheetSheetRowCellBuilder Formula(string value)
        {
            container.Formula = value;

            return this;
        }
        
        /// <summary>
        /// 
        /// </summary>
        /// <param name="value">The value that configures the index.</param>
        public SpreadsheetSheetRowCellBuilder Index(int value)
        {
            container.Index = value;

            return this;
        }
        
        /// <summary>
        /// 
        /// </summary>
        /// <param name="value">The value that configures the textalign.</param>
        public SpreadsheetSheetRowCellBuilder TextAlign(string value)
        {
            container.TextAlign = value;

            return this;
        }
        
        /// <summary>
        /// 
        /// </summary>
        /// <param name="value">The value that configures the underline.</param>
        public SpreadsheetSheetRowCellBuilder Underline(bool value)
        {
            container.Underline = value;

            return this;
        }
        
        /// <summary>
        /// 
        /// </summary>
        /// <param name="value">The value that configures the verticalalign.</param>
        public SpreadsheetSheetRowCellBuilder VerticalAlign(string value)
        {
            container.VerticalAlign = value;

            return this;
        }
        
        /// <summary>
        /// 
        /// </summary>
        /// <param name="value">The value that configures the wrap.</param>
        public SpreadsheetSheetRowCellBuilder Wrap(bool value)
        {
            container.Wrap = value;

            return this;
        }
        
        //<< Fields

        /// <summary>
        /// Configures the value for the cell
        /// </summary>
        /// <param name="value">The cell value.</param>
        public SpreadsheetSheetRowCellBuilder Value(object value)
        {
            container.Value = value;

            return this;
        }
    }
}

