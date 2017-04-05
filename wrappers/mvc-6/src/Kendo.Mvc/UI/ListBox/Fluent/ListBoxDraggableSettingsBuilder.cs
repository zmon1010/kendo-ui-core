using System;
using System.Collections.Generic;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring ListBoxDraggableSettings
    /// </summary>
    public partial class ListBoxDraggableSettingsBuilder<T>
        where T : class 
    {
        public ListBoxDraggableSettingsBuilder(ListBoxDraggableSettings<T> container)
        {
            Container = container;
        }

        protected ListBoxDraggableSettings<T> Container
        {
            get;
            private set;
        }

        // Place custom settings here
    }
}
