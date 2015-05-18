using System;
using System.Collections.Generic;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring PivotGridMessagesSettings
    /// </summary>
    public partial class PivotGridMessagesSettingsBuilder<T>
        where T : class 
    {
        public PivotGridMessagesSettingsBuilder(PivotGridMessagesSettings<T> container)
        {
            Container = container;
        }

        protected PivotGridMessagesSettings<T> Container
        {
            get;
            private set;
        }

        // Place custom settings here
    }
}
