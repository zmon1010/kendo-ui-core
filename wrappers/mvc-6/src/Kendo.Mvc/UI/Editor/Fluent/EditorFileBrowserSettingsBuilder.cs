using System;
using System.Collections.Generic;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring EditorFileBrowserSettings
    /// </summary>
    public partial class EditorFileBrowserSettingsBuilder
        
    {
        public EditorFileBrowserSettingsBuilder(EditorFileBrowserSettings container)
        {
            Container = container;
        }

        protected EditorFileBrowserSettings Container
        {
            get;
            private set;
        }

        // Place custom settings here
    }
}
