using System;
using System.Collections.Generic;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring ListBoxToolbarSettings
    /// </summary>
    public partial class ListBoxToolbarSettingsBuilder
    {
        public ListBoxToolbarSettingsBuilder(ListBoxToolbarSettings container)
        {
            Container = container;
        }

        protected ListBoxToolbarSettings Container
        {
            get;
            private set;
        }

        // Place custom settings here
    }
}
