using System;
using System.Collections.Generic;
using Kendo.Mvc.Extensions;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring SchedulerToolbar
    /// </summary>
    public partial class SchedulerToolbarBuilder<T>
        where T : class, ISchedulerEvent 
    {
        /// <summary>
        /// The name of the command.
        /// </summary>
        /// <param name="value">The value for Name</param>
        public SchedulerToolbarBuilder<T> Name(string value)
        {
            Container.Name = value;
            return this;
        }

    }
}
