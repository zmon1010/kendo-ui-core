using System;
using System.Collections.Generic;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring List<EditorTool>
    /// </summary>
    public partial class EditorToolFactory
        
    {
        public EditorToolFactory(List<EditorTool> container)
        {
            Container = container;
        }

        protected List<EditorTool> Container
        {
            get;
            private set;
        }

        // Place custom settings here
    }
}
