using System;
using System.Collections.Generic;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring ListBoxToolbarSettings
    /// </summary>
    public partial class ListBoxToolbarSettingsBuilder<T>
        where T : class 
    {
        public ListBoxToolbarSettingsBuilder(ListBoxToolbarSettings<T> container)
        {
            Container = container;
        }

        protected ListBoxToolbarSettings<T> Container
        {
            get;
            private set;
        }

        // Place custom settings here
    }
}
