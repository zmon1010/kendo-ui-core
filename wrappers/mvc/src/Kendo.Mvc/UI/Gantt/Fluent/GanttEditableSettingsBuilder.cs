namespace Kendo.Mvc.UI.Fluent
{
    using System.Collections.Generic;
    using System.Collections;
    using System;
    using Kendo.Mvc.Extensions;

    /// <summary>
    /// Defines the fluent API for configuring the GanttEditableSettings settings.
    /// </summary>
    public class GanttEditableSettingsBuilder: IHideObjectMembers
    {
        private readonly GanttEditableSettings container;

        public GanttEditableSettingsBuilder(GanttEditableSettings settings)
        {
            container = settings;
        }

        //>> Fields
        
        /// <summary>
        /// If set to true the Gantt will display a confirmation dialog when the user deletes a task or a dependency.
        /// </summary>
        /// <param name="value">The value that configures the confirmation.</param>
        public GanttEditableSettingsBuilder Confirmation(bool value)
        {
            container.Confirmation = value;

            return this;
        }
        
        /// <summary>
        /// If set to false the user won't be able to create tasks.
        /// </summary>
        /// <param name="value">The value that configures the create.</param>
        public GanttEditableSettingsBuilder Create(bool value)
        {
            container.Create = value;

            return this;
        }
        
        /// <summary>
        /// If set to false the user won't be able to create dependencies.
        /// </summary>
        /// <param name="value">The value that configures the dependencycreate.</param>
        public GanttEditableSettingsBuilder DependencyCreate(bool value)
        {
            container.DependencyCreate = value;

            return this;
        }
        
        /// <summary>
        /// If set to false the user won't be able to delete dependencies.
        /// </summary>
        /// <param name="value">The value that configures the dependencydestroy.</param>
        public GanttEditableSettingsBuilder DependencyDestroy(bool value)
        {
            container.DependencyDestroy = value;

            return this;
        }
        
        /// <summary>
        /// If set to false the user won't be able to edit the percentComplete of the tasks.
        /// </summary>
        /// <param name="value">The value that configures the dragpercentcomplete.</param>
        public GanttEditableSettingsBuilder DragPercentComplete(bool value)
        {
            container.DragPercentComplete = value;

            return this;
        }
        
        /// <summary>
        /// If set to false the user won't be able to delete tasks.
        /// </summary>
        /// <param name="value">The value that configures the destroy.</param>
        public GanttEditableSettingsBuilder Destroy(bool value)
        {
            container.Destroy = value;

            return this;
        }
        
        /// <summary>
        /// If set to false the user won't be able to move tasks.
        /// </summary>
        /// <param name="value">The value that configures the move.</param>
        public GanttEditableSettingsBuilder Move(bool value)
        {
            container.Move = value;

            return this;
        }
        
        /// <summary>
        /// If set to false the user won't be able to reorder tasks in the task list.
        /// </summary>
        /// <param name="value">The value that configures the reorder.</param>
        public GanttEditableSettingsBuilder Reorder(bool value)
        {
            container.Reorder = value;

            return this;
        }
        
        /// <summary>
        /// If set to false the user won't be able to resize tasks.
        /// </summary>
        /// <param name="value">The value that configures the resize.</param>
        public GanttEditableSettingsBuilder Resize(bool value)
        {
            container.Resize = value;

            return this;
        }
        
        /// <summary>
        /// The template which renders the editor.The template should contain elements whose name HTML attributes are set as the editable fields. This is how the Gantt will know
		/// which field to update. The other option is to use MVVM bindings in order to bind HTML elements to data item fields.
        /// </summary>
        /// <param name="value">The value that configures the template.</param>
        public GanttEditableSettingsBuilder Template(string value)
        {
            container.Template = value;

            return this;
        }

        /// <summary>
        /// The template which renders the editor.The template should contain elements whose name HTML attributes are set as the editable fields. This is how the Gantt will know
		/// which field to update. The other option is to use MVVM bindings in order to bind HTML elements to data item fields.
        /// </summary>
        /// <param name="value">The value that configures the template.</param>
        public GanttEditableSettingsBuilder TemplateId(string value)
        {
            container.TemplateId = value;

            return this;
        }
        
        /// <summary>
        /// If set to false the user won't be able to update tasks.
        /// </summary>
        /// <param name="value">The value that configures the update.</param>
        public GanttEditableSettingsBuilder Update(bool value)
        {
            container.Update = value;

            return this;
        }
        
        //<< Fields
    }
}

