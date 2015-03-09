using System;
using System.Collections.Generic;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring TreeListEditableSettings
    /// </summary>
    public partial class TreeListEditableSettingsBuilder<T>
        
    {
        /// <summary>
        /// The editing mode to use. The supported editing modes are "inline" and "popup".
        /// </summary>
        /// <param name="value">The value for Mode</param>
        public TreeListEditableSettingsBuilder<T> Mode(string value)
        {
            Container.Mode = value;
            return this;
        }

        /// <summary>
        /// The template which renders the popup editor.The template should contain elements whose name HTML attributes are set as the editable fields. This is how the treelist will know
		/// which field to update. The other option is to use MVVM bindings in order to bind HTML elements to data item fields.
        /// </summary>
        /// <param name="value">The value for Template</param>
        public TreeListEditableSettingsBuilder<T> Template(string value)
        {
            Container.Template = value;
            return this;
        }

        /// <summary>
        /// The template which renders the popup editor.The template should contain elements whose name HTML attributes are set as the editable fields. This is how the treelist will know
		/// which field to update. The other option is to use MVVM bindings in order to bind HTML elements to data item fields.
        /// </summary>
        /// <param name="value">The ID of the template element for Template</param>
        public TreeListEditableSettingsBuilder<T> TemplateId(string templateId)
        {
            Container.TemplateId = templateId;
            return this;
        }

    }
}
