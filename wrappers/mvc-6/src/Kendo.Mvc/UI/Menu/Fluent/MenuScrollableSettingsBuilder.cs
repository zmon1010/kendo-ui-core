using System;
using System.Collections.Generic;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring MenuScrollableSettings
    /// </summary>
    public partial class MenuScrollableSettingsBuilder
        
    {
        public MenuScrollableSettingsBuilder(MenuScrollableSettings container)
        {
            Container = container;
        }

        protected MenuScrollableSettings Container
        {
            get;
            private set;
        }

        // Place custom settings here
    }
}
