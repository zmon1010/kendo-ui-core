using System;
using System.Collections.Generic;
using Kendo.Mvc.Extensions;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring GanttEditableSettings
    /// </summary>
    public partial class GanttEditableSettingsBuilder<TTaskModel, TDependenciesModel>
        where TTaskModel : class, IGanttTask  where TDependenciesModel : class, IGanttDependency 
    {
        /// <summary>
        /// If set to true the Gantt will display a confirmation dialog when the user deletes a task or a dependency.
        /// </summary>
        /// <param name="value">The value for Confirmation</param>
        public GanttEditableSettingsBuilder<TTaskModel, TDependenciesModel> Confirmation(bool value)
        {
            Container.Confirmation = value;
            return this;
        }

        /// <summary>
        /// The template which renders the editor.The template should contain elements whose name HTML attributes are set as the editable fields. This is how the Gantt will know
		/// which field to update. The other option is to use MVVM bindings in order to bind HTML elements to data item fields.
        /// </summary>
        /// <param name="value">The value for Template</param>
        public GanttEditableSettingsBuilder<TTaskModel, TDependenciesModel> Template(string value)
        {
            Container.Template = value;
            return this;
        }

        /// <summary>
        /// The template which renders the editor.The template should contain elements whose name HTML attributes are set as the editable fields. This is how the Gantt will know
		/// which field to update. The other option is to use MVVM bindings in order to bind HTML elements to data item fields.
        /// </summary>
        /// <param name="value">The ID of the template element for Template</param>
        public GanttEditableSettingsBuilder<TTaskModel, TDependenciesModel> TemplateId(string templateId)
        {
            Container.TemplateId = templateId;
            return this;
        }

    }
}
