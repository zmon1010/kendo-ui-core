using System;
using System.Collections.Generic;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring ListBoxMessagesSettings
    /// </summary>
    public partial class ListBoxMessagesSettingsBuilder
        
    {
        public ListBoxMessagesSettingsBuilder(ListBoxMessagesSettings container)
        {
            Container = container;
        }

        protected ListBoxMessagesSettings Container
        {
            get;
            private set;
        }

        // Place custom settings here
    }
}
