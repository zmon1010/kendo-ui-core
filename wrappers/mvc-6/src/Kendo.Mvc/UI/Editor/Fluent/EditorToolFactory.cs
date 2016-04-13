using System;
using System.Collections.Generic;
using System.ComponentModel;

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

        [Obsolete("The FontColor tool is deprecated. Please use the ForeColor tool instead.")]
        [EditorBrowsable(EditorBrowsableState.Never)]
        public EditorToolFactory FontColor()
        {
            AddTool("foreColor");
            return this;
        }

        [Obsolete("The FontColor tool is deprecated. Please use the ForeColor tool instead.")]
        [EditorBrowsable(EditorBrowsableState.Never)]
        public EditorToolFactory FontColor(Action<EditorToolBuilder> configurator)
        {
            AddTool("foreColor", configurator);
            return this;
        }
    }
}
