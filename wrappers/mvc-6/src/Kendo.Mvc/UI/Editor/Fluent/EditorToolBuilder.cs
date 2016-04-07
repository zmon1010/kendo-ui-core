using System;
using System.Collections.Generic;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring EditorTool
    /// </summary>
    public partial class EditorToolBuilder
        
    {
        public EditorToolBuilder(EditorTool container)
        {
            Container = container;
        }

        protected EditorTool Container
        {
            get;
            private set;
        }

        // Place custom settings here
    }
}
