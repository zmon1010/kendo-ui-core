using System;
using System.Collections.Generic;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring DateInputMessagesSettings
    /// </summary>
    public partial class DateInputMessagesSettingsBuilder
        
    {
        public DateInputMessagesSettingsBuilder(DateInputMessagesSettings container)
        {
            Container = container;
        }

        protected DateInputMessagesSettings Container
        {
            get;
            private set;
        }

        // Place custom settings here
    }
}
