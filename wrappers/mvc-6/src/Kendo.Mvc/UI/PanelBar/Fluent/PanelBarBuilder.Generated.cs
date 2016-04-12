using System;
using Kendo.Mvc.Extensions;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring the Kendo UI PanelBar
    /// </summary>
    public partial class PanelBarBuilder
        
    {
        /// <summary>
        /// Specifies how the PanelBar items are displayed when opened and closed.
        /// </summary>
        /// <param name="value">The value for ExpandMode</param>
        public PanelBarBuilder ExpandMode(PanelBarExpandMode value)
        {
            Container.ExpandMode = value;
            return this;
        }


        
        /// <summary>
        /// Configures the client-side events.
        /// </summary>
        /// <param name="configurator">The client events action.</param>
        /// <example>
        /// <code lang="CS">
        /// @(Html.Kendo().PanelBar()
        ///       .Name("PanelBar")
        ///       .Events(events => events
        ///           .Activate("onActivate")
        ///       )
        /// )
        /// </code>
        /// </example>
        public PanelBarBuilder Events(Action<PanelBarEventBuilder> configurator)
        {
            configurator(new PanelBarEventBuilder(Container.Events));
            return this;
        }
        
    }
}

