using System;
using System.Collections.Generic;
using Kendo.Mvc.Extensions;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring SpreadsheetToolbarSettings
    /// </summary>
    public partial class SpreadsheetToolbarSettingsBuilder
        
    {
        /// <summary>
        /// A boolean value indicating if the "home" tab should be displayed or a collection of tools that will be shown in the "home" tab.The available tools are: open; exportAs; [cut, copy, paste]; [bold, italic, underline]; backgroundColor, textColor; borders; fontSize, fontFamily; alignment; textWrap; [formatDecreaseDecimal, formatIncreaseDecimal]; format; merge; freeze or filter. Those tools which are part of a tool group are defined as array. For example ["bold", "italic", "underline"]
        /// </summary>
        /// <param name="value">The value for Home</param>
        public SpreadsheetToolbarSettingsBuilder Home(bool value)
        {
            Container.Home = value;
            return this;
        }

        /// <summary>
        /// A boolean value indicating if the "insert" tab should be displayed or a collection of tools that will be shown in the "insert" tab.The available tools are: [ addColumnLeft, addColumnRight, addRowBelow, addRowAbove ] or [ deleteColumn, deleteRow ]. Those tools which are part of a tool group are defined as array. For example ["deleteColumn", "deleteRow"]
        /// </summary>
        /// <param name="value">The value for Insert</param>
        public SpreadsheetToolbarSettingsBuilder Insert(bool value)
        {
            Container.Insert = value;
            return this;
        }

        /// <summary>
        /// A boolean value indicating if the "insert" tab should be displayed or a collection of tools that will be shown in the "insert" tab.The available tools are: sort; filter or validation.
        /// </summary>
        /// <param name="value">The value for Data</param>
        public SpreadsheetToolbarSettingsBuilder Data(bool value)
        {
            Container.Data = value;
            return this;
        }

    }
}
