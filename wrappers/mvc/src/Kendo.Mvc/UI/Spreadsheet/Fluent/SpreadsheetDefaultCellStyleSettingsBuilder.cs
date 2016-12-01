namespace Kendo.Mvc.UI.Fluent
{
    using System.Collections.Generic;
    using System.Collections;
    using System;
    using Kendo.Mvc.Extensions;

    /// <summary>
    /// Defines the fluent API for configuring the SpreadsheetDefaultCellStyleSettings settings.
    /// </summary>
    public class SpreadsheetDefaultCellStyleSettingsBuilder: IHideObjectMembers
    {
        private readonly SpreadsheetDefaultCellStyleSettings container;

        public SpreadsheetDefaultCellStyleSettingsBuilder(SpreadsheetDefaultCellStyleSettings settings)
        {
            container = settings;
        }

        //>> Fields
        
        /// <summary>
        /// The background CSS color of the cell.
        /// </summary>
        /// <param name="value">The value that configures the background.</param>
        public SpreadsheetDefaultCellStyleSettingsBuilder Background(string value)
        {
            container.Background = value;

            return this;
        }
        
        /// <summary>
        /// The text CSS color of the cell.
        /// </summary>
        /// <param name="value">The value that configures the color.</param>
        public SpreadsheetDefaultCellStyleSettingsBuilder Color(string value)
        {
            container.Color = value;

            return this;
        }
        
        /// <summary>
        /// The font family for the cell.
        /// </summary>
        /// <param name="value">The value that configures the fontfamily.</param>
        public SpreadsheetDefaultCellStyleSettingsBuilder FontFamily(string value)
        {
            container.FontFamily = value;

            return this;
        }
        
        /// <summary>
        /// The font size of the cell in pixels.
        /// </summary>
        /// <param name="value">The value that configures the fontsize.</param>
        public SpreadsheetDefaultCellStyleSettingsBuilder FontSize(string value)
        {
            container.FontSize = value;

            return this;
        }
        
        /// <summary>
        /// Sets the cell font to italic, if set to true.
        /// </summary>
        /// <param name="value">The value that configures the italic.</param>
        public SpreadsheetDefaultCellStyleSettingsBuilder Italic(bool value)
        {
            container.Italic = value;

            return this;
        }
        
        /// <summary>
        /// Sets the cell font to bold, if set to true.
        /// </summary>
        /// <param name="value">The value that configures the bold.</param>
        public SpreadsheetDefaultCellStyleSettingsBuilder Bold(bool value)
        {
            container.Bold = value;

            return this;
        }
        
        /// <summary>
        /// Sets the cell font to underline, if set to true.
        /// </summary>
        /// <param name="value">The value that configures the underline.</param>
        public SpreadsheetDefaultCellStyleSettingsBuilder Underline(bool value)
        {
            container.Underline = value;

            return this;
        }
        
        /// <summary>
        /// Sets the cell wrap, if set to true.
        /// </summary>
        /// <param name="value">The value that configures the wrap.</param>
        public SpreadsheetDefaultCellStyleSettingsBuilder Wrap(bool value)
        {
            container.Wrap = value;

            return this;
        }
        
        //<< Fields
    }
}

