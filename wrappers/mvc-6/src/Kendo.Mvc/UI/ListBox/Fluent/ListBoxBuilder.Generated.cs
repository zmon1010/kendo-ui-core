using System;
using Kendo.Mvc.Extensions;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring the Kendo UI ListBox
    /// </summary>
    public partial class ListBoxBuilder
        
    {
        /// <summary>
        /// If set to false, the widget will not bind to the data source during initialization. In this case, the data binding will occur when the change event of the data source is fired. By default, the ListBox will bind to the data source that is specified in the configuration.
        /// </summary>
        /// <param name="value">The value for AutoBind</param>
        public ListBoxBuilder AutoBind(bool value)
        {
            Container.AutoBind = value;
            return this;
        }

        /// <summary>
        /// A selector which determines whether the target ListBox should be used when items are transferred from and to the current ListBox. The connectWith option defines a one-way relationship. If you want a two-way connection, then set the connectWith option on both widgets.
        /// </summary>
        /// <param name="value">The value for ConnectWith</param>
        public ListBoxBuilder ConnectWith(string value)
        {
            Container.ConnectWith = value;
            return this;
        }

        /// <summary>
        /// The field of the data item that provides the text content of the list items. Based on this field, the widget filters the data source.
        /// </summary>
        /// <param name="value">The value for DataTextField</param>
        public ListBoxBuilder DataTextField(string value)
        {
            Container.DataTextField = value;
            return this;
        }

        /// <summary>
        /// The field of the data item that provides the value of the widget.
        /// </summary>
        /// <param name="value">The value for DataValueField</param>
        public ListBoxBuilder DataValueField(string value)
        {
            Container.DataValueField = value;
            return this;
        }

        /// <summary>
        /// Indicates whether the ListBox items can be dragged and dropped.
        /// </summary>
        /// <param name="configurator">The configurator for the draggable setting.</param>
        public ListBoxBuilder Draggable(Action<ListBoxDraggableSettingsBuilder> configurator)
        {
            Container.Draggable.Enabled = true;

            Container.Draggable.ListBox = Container;
            configurator(new ListBoxDraggableSettingsBuilder(Container.Draggable));

            return this;
        }

        /// <summary>
        /// Indicates whether the ListBox items can be dragged and dropped.
        /// </summary>
        public ListBoxBuilder Draggable()
        {
            Container.Draggable.Enabled = true;
            return this;
        }

        /// <summary>
        /// Indicates whether the ListBox items can be dragged and dropped.
        /// </summary>
        /// <param name="enabled">Enables or disables the draggable option.</param>
        public ListBoxBuilder Draggable(bool enabled)
        {
            Container.Draggable.Enabled = enabled;
            return this;
        }

        /// <summary>
        /// Array of id strings which determines the ListBoxes that can drag and drop their items to the current ListBox. The dropSources option describes a one way relationship. If you want a two-way connection, then set the dropSources option on both widgets.
        /// </summary>
        /// <param name="value">The value for DropSources</param>
        public ListBoxBuilder DropSources(params string[] value)
        {
            Container.DropSources = value;
            return this;
        }

        /// <summary>
        /// Indicates whether the keyboard navigation is enabled or disabled.
        /// </summary>
        /// <param name="value">The value for Navigatable</param>
        public ListBoxBuilder Navigatable(bool value)
        {
            Container.Navigatable = value;
            return this;
        }

        /// <summary>
        /// Indicates whether the keyboard navigation is enabled or disabled.
        /// </summary>
        public ListBoxBuilder Navigatable()
        {
            Container.Navigatable = true;
            return this;
        }

        /// <summary>
        /// Defines the localization texts for the ListBox. Used primarily for localization.
        /// </summary>
        /// <param name="configurator">The configurator for the messages setting.</param>
        public ListBoxBuilder Messages(Action<ListBoxMessagesSettingsBuilder> configurator)
        {

            Container.Messages.ListBox = Container;
            configurator(new ListBoxMessagesSettingsBuilder(Container.Messages));

            return this;
        }

        /// <summary>
        /// Specifies the item template of the ListBox.
        /// </summary>
        /// <param name="value">The value for Template</param>
        public ListBoxBuilder Template(string value)
        {
            Container.Template = value;
            return this;
        }

        /// <summary>
        /// Specifies the item template of the ListBox.
        /// </summary>
        /// <param name="value">The ID of the template element for Template</param>
        public ListBoxBuilder TemplateId(string templateId)
        {
            Container.TemplateId = templateId;
            return this;
        }

        /// <summary>
        /// Defines the settings for displaying the toolbar of the ListBox. The toolbar allows you to execute a set of predefined actions.By default, the toolbar is not displayed. If the tools array is populated, then the toolbar and the corresponding tools are displayed.
        /// </summary>
        /// <param name="configurator">The configurator for the toolbar setting.</param>
        public ListBoxBuilder Toolbar(Action<ListBoxToolbarSettingsBuilder> configurator)
        {

            Container.Toolbar.ListBox = Container;
            configurator(new ListBoxToolbarSettingsBuilder(Container.Toolbar));

            return this;
        }

        /// <summary>
        /// Represents the selectable options.
        /// </summary>
        /// <param name="value">The value for Selectable</param>
        public ListBoxBuilder Selectable(ListBoxSelectable value)
        {
            Container.Selectable = value;
            return this;
        }


        
        /// <summary>
        /// Configures the client-side events.
        /// </summary>
        /// <param name="configurator">The client events action.</param>
        /// <example>
        /// <code lang="CS">
        /// @(Html.Kendo().ListBox()
        ///       .Name("ListBox")
        ///       .Events(events => events
        ///           .Add("onAdd")
        ///       )
        /// )
        /// </code>
        /// </example>
        public ListBoxBuilder Events(Action<ListBoxEventBuilder> configurator)
        {
            configurator(new ListBoxEventBuilder(Container.Events));
            return this;
        }
        
    }
}

