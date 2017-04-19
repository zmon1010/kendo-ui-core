using System;
using System.Collections.Generic;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring ListBoxDraggableSettings
    /// </summary>
    public partial class ListBoxDraggableSettingsBuilder
    {
        public ListBoxDraggableSettingsBuilder(ListBoxDraggableSettings container)
        {
            Container = container;
        }

        protected ListBoxDraggableSettings Container
        {
            get;
            private set;
        }

        // Place custom settings here
    }
}
