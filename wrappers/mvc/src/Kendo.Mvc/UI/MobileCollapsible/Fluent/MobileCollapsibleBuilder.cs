namespace Kendo.Mvc.UI.Fluent
{
    using System.Collections.Generic;
    using System.Collections;
    using System;

    /// <summary>
    /// Defines the fluent API for configuring the Kendo MobileCollapsible for ASP.NET MVC.
    /// </summary>
    public class MobileCollapsibleBuilder: WidgetBuilderBase<MobileCollapsible, MobileCollapsibleBuilder>
    {
        private readonly MobileCollapsible container;
        /// <summary>
        /// Initializes a new instance of the <see cref="MobileCollapsible"/> class.
        /// </summary>
        /// <param name="component">The component.</param>
        public MobileCollapsibleBuilder(MobileCollapsible component)
            : base(component)
        {
            container = component;
        }

        //>> Fields
        
        /// <summary>
        /// Turns on or off the animation of the widget.
        /// </summary>
        /// <param name="value">The value that configures the animation.</param>
        public MobileCollapsibleBuilder Animation(bool value)
        {
            container.Animation = value;

            return this;
        }
        
        /// <summary>
        /// If set to false the widget content will be expanded initially. The content of the widget is collapsed by default.
        /// </summary>
        /// <param name="value">The value that configures the collapsed.</param>
        public MobileCollapsibleBuilder Collapsed(bool value)
        {
            container.Collapsed = value;

            return this;
        }
        
        /// <summary>
        /// Sets the icon for the header of the collapsible widget when it is in a expanded state.
        /// </summary>
        /// <param name="value">The value that configures the expandicon.</param>
        public MobileCollapsibleBuilder ExpandIcon(string value)
        {
            container.ExpandIcon = value;

            return this;
        }
        
        //<< Fields


        
        /// <summary>
        /// Configures the client-side events.
        /// </summary>
        /// <param name="configurator">The client events action.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().MobileCollapsible()
        ///             .Name("MobileCollapsible")
        ///             .Events(events => events
        ///                 .Collapse("onCollapse")
        ///             )
        /// %&gt;
        /// </code>
        /// </example>
        public MobileCollapsibleBuilder Events(Action<MobileCollapsibleEventBuilder> configurator)
        {

            configurator(new MobileCollapsibleEventBuilder(Component.Events));

            return this;
        }
        
    }
}

