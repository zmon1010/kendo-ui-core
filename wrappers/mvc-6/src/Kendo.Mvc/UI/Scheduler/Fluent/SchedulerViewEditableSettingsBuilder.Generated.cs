using System;
using System.Collections.Generic;
using Kendo.Mvc.Extensions;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring SchedulerViewEditableSettings
    /// </summary>
    public partial class SchedulerViewEditableSettingsBuilder<T>
        where T : class, ISchedulerEvent 
    {
        /// <summary>
        /// If set to true the user can create new events. Creating is enabled by default.
        /// </summary>
        /// <param name="value">The value for Create</param>
        public SchedulerViewEditableSettingsBuilder<T> Create(bool value)
        {
            Container.Create = value;
            return this;
        }

        /// <summary>
        /// If set to true the user can delete events from the view by clicking the "destroy" button. Deleting is enabled by default.
        /// </summary>
        /// <param name="value">The value for Destroy</param>
        public SchedulerViewEditableSettingsBuilder<T> Destroy(bool value)
        {
            Container.Destroy = value;
            return this;
        }

        /// <summary>
        /// If set to true the user can update events. Updating is enabled by default.
        /// </summary>
        /// <param name="value">The value for Update</param>
        public SchedulerViewEditableSettingsBuilder<T> Update(bool value)
        {
            Container.Update = value;
            return this;
        }

    }
}
