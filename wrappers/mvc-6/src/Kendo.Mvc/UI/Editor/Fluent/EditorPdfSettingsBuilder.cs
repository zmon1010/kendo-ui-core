using System;
using System.Collections.Generic;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring EditorPdfSettings
    /// </summary>
    public partial class EditorPdfSettingsBuilder
        
    {
        public EditorPdfSettingsBuilder(EditorPdfSettings container)
        {
            Container = container;
        }

        protected EditorPdfSettings Container
        {
            get;
            private set;
        }

        // Place custom settings here
    }
}
