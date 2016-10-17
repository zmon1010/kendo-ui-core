namespace Kendo.Mvc.UI.Fluent
{
    using System.Collections.Generic;
    using System.Collections;
    using System;
    using Kendo.Mvc.Extensions;

    /// <summary>
    /// Defines the fluent API for configuring the SpreadsheetSheetRowCellValidationSettings settings.
    /// </summary>
    public class SpreadsheetSheetRowCellValidationSettingsBuilder: IHideObjectMembers
    {
        private readonly SpreadsheetSheetRowCellValidationSettings container;

        public SpreadsheetSheetRowCellValidationSettingsBuilder(SpreadsheetSheetRowCellValidationSettings settings)
        {
            container = settings;
        }

        //>> Fields
        
        /// <summary>
        /// Defines the validation type. The acceptable options are reject or warning
        /// </summary>
        /// <param name="value">The value that configures the type.</param>
        public SpreadsheetSheetRowCellValidationSettingsBuilder Type(string value)
        {
            container.Type = value;

            return this;
        }
        
        /// <summary>
        /// Defines the comparer type used to validate the cell value, e.g. "greaterThan", "between" and etc.
        /// </summary>
        /// <param name="value">The value that configures the comparertype.</param>
        public SpreadsheetSheetRowCellValidationSettingsBuilder ComparerType(string value)
        {
            container.ComparerType = value;

            return this;
        }
        
        /// <summary>
        /// Defines the data type of the cell value.
        /// </summary>
        /// <param name="value">The value that configures the datatype.</param>
        public SpreadsheetSheetRowCellValidationSettingsBuilder DataType(string value)
        {
            container.DataType = value;

            return this;
        }
        
        /// <summary>
        /// Defines a formula or value used for the comparison process. Used as only if comparer type does not require second argument.
        /// </summary>
        /// <param name="value">The value that configures the from.</param>
        public SpreadsheetSheetRowCellValidationSettingsBuilder From(string value)
        {
            container.From = value;

            return this;
        }
        
        /// <summary>
        /// A boolean value indicating if a button for selecting list items (dataType set to list) should be displayed.
        /// </summary>
        /// <param name="value">The value that configures the showbutton.</param>
        public SpreadsheetSheetRowCellValidationSettingsBuilder ShowButton(bool value)
        {
            container.ShowButton = value;

            return this;
        }
        
        /// <summary>
        /// Defines a formula or value used for the comparison process. Will be used if comparer type requires second argument.
        /// </summary>
        /// <param name="value">The value that configures the to.</param>
        public SpreadsheetSheetRowCellValidationSettingsBuilder To(string value)
        {
            container.To = value;

            return this;
        }
        
        /// <summary>
        /// Specifies whether to allow nulls.
        /// </summary>
        /// <param name="value">The value that configures the allownulls.</param>
        public SpreadsheetSheetRowCellValidationSettingsBuilder AllowNulls(bool value)
        {
            container.AllowNulls = value;

            return this;
        }
        
        /// <summary>
        /// Defines the hint message that will be displayed if value is invalid.The template is giving an access to the following variables: from{0}, to{1}, fromFormula{2}, toFormula{3}, dataType{4}, type{5} and comparerType{6}.
        /// </summary>
        /// <param name="value">The value that configures the messagetemplate.</param>
        public SpreadsheetSheetRowCellValidationSettingsBuilder MessageTemplate(string value)
        {
            container.MessageTemplate = value;

            return this;
        }

        /// <summary>
        /// Defines the hint message that will be displayed if value is invalid.The template is giving an access to the following variables: from{0}, to{1}, fromFormula{2}, toFormula{3}, dataType{4}, type{5} and comparerType{6}.
        /// </summary>
        /// <param name="value">The value that configures the messagetemplate.</param>
        public SpreadsheetSheetRowCellValidationSettingsBuilder MessageTemplateId(string value)
        {
            container.MessageTemplateId = value;

            return this;
        }
        
        /// <summary>
        /// Defines the hint title that will be displayed if value is invalid.
        /// </summary>
        /// <param name="value">The value that configures the titletemplate.</param>
        public SpreadsheetSheetRowCellValidationSettingsBuilder TitleTemplate(string value)
        {
            container.TitleTemplate = value;

            return this;
        }

        /// <summary>
        /// Defines the hint title that will be displayed if value is invalid.
        /// </summary>
        /// <param name="value">The value that configures the titletemplate.</param>
        public SpreadsheetSheetRowCellValidationSettingsBuilder TitleTemplateId(string value)
        {
            container.TitleTemplateId = value;

            return this;
        }
        
        //<< Fields
    }
}

