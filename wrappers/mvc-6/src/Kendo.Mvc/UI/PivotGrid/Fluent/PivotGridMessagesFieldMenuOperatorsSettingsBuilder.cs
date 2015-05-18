using System;
using System.Collections.Generic;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring PivotGridMessagesFieldMenuOperatorsSettings
    /// </summary>
    public partial class PivotGridMessagesFieldMenuOperatorsSettingsBuilder<T>
        where T : class 
    {
        public PivotGridMessagesFieldMenuOperatorsSettingsBuilder(PivotGridMessagesFieldMenuOperatorsSettings<T> container)
        {
            Container = container;
        }

        protected PivotGridMessagesFieldMenuOperatorsSettings<T> Container
        {
            get;
            private set;
        }

        // Place custom settings here
    }
}
