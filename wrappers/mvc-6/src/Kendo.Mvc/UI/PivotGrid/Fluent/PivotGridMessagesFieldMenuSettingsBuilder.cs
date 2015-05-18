using System;
using System.Collections.Generic;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring PivotGridMessagesFieldMenuSettings
    /// </summary>
    public partial class PivotGridMessagesFieldMenuSettingsBuilder<T>
        where T : class 
    {
        public PivotGridMessagesFieldMenuSettingsBuilder(PivotGridMessagesFieldMenuSettings<T> container)
        {
            Container = container;
        }

        protected PivotGridMessagesFieldMenuSettings<T> Container
        {
            get;
            private set;
        }

        // Place custom settings here
    }
}
