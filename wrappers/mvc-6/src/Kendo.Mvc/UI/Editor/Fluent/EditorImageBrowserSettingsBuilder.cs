using System;
using System.Collections.Generic;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring EditorImageBrowserSettings
    /// </summary>
    public partial class EditorImageBrowserSettingsBuilder
        
    {
        public EditorImageBrowserSettingsBuilder(EditorImageBrowserSettings container)
        {
            Container = container;
        }

        protected EditorImageBrowserSettings Container
        {
            get;
            private set;
        }

        // Place custom settings here
    }
}
