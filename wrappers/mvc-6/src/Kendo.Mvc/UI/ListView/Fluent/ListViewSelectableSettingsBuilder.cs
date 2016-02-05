using System;
using System.Collections.Generic;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring ListViewSelectableSettings
    /// </summary>
    public partial class ListViewSelectableSettingsBuilder<T>
        where T : class 
    {
        public ListViewSelectableSettingsBuilder(ListViewSelectableSettings<T> container)
        {
            Container = container;
        }

        protected ListViewSelectableSettings<T> Container
        {
            get;
            private set;
        }

        // Place custom settings here
    }
}
