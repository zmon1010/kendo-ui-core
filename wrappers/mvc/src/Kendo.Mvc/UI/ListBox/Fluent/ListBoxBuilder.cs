namespace Kendo.Mvc.UI.Fluent
{
    using System.Collections.Generic;
    using System.Collections;
    using System;
    using Fluent;
    using System.Web.Mvc;
    using System.Linq;

    /// <summary>
    /// Defines the fluent API for configuring the Kendo ListBox for ASP.NET MVC.
    /// </summary>
    public class ListBoxBuilder: WidgetBuilderBase<ListBox, ListBoxBuilder>
    {
        private readonly ListBox container;
        /// <summary>
        /// Initializes a new instance of the <see cref="ListBox"/> class.
        /// </summary>
        /// <param name="component">The component.</param>
        public ListBoxBuilder(ListBox component)
            : base(component)
        {
            container = component;
        }

        /// <summary>
        /// Represents the selectable options.
        /// </summary>
        /// <param name="value">The value for Selectable</param>
        public ListBoxBuilder Selectable(ListBoxSelectable value)
        {
            container.Selectable = value;
            return this;
        }


        //>> Fields
        
        /// <summary>
        /// If set to false, the widget will not bind to the data source during initialization. In this case, the data binding will occur when the change event of the data source is fired. By default, the ListBox will bind to the data source that is specified in the configuration.
        /// </summary>
        /// <param name="value">The value that configures the autobind.</param>
        public ListBoxBuilder AutoBind(bool value)
        {
            container.AutoBind = value;

            return this;
        }
        
        /// <summary>
        /// The id of the target ListBox to which items will be transferred to from the source ListBox and vice versa. In case the developer needs to transfer items from the target ListBox via its toolbar then its connectWith options should be also set.
        /// </summary>
        /// <param name="value">The value that configures the connectwith.</param>
        public ListBoxBuilder ConnectWith(string value)
        {
            container.ConnectWith = value;

            return this;
        }
        
        /// <summary>
        /// The field of the data item that provides the text content of the list items. Based on this field, the widget filters the data source.
        /// </summary>
        /// <param name="value">The value that configures the datatextfield.</param>
        public ListBoxBuilder DataTextField(string value)
        {
            container.DataTextField = value;

            return this;
        }
        
        /// <summary>
        /// The field of the data item that provides the value of the widget.
        /// </summary>
        /// <param name="value">The value that configures the datavaluefield.</param>
        public ListBoxBuilder DataValueField(string value)
        {
            container.DataValueField = value;

            return this;
        }
        
        /// <summary>
        /// Indicates whether the ListBox items can be dragged and dropped.
        /// </summary>
        public ListBoxBuilder Draggable()
        {
            return Draggable(true);
        }

        /// <summary>
        /// Indicates whether the ListBox items can be dragged and dropped.
        /// </summary>
        /// <param name="enabled">Enables or disables the draggable option.</param>
        public ListBoxBuilder Draggable(bool enabled)
        {
            container.Draggable.Enabled = enabled;
            return this;
        }

        
        /// <summary>
        /// Indicates whether the ListBox items can be dragged and dropped.
        /// </summary>
        /// <param name="configurator">The action that configures the draggable.</param>
        public ListBoxBuilder Draggable(Action<ListBoxDraggableSettingsBuilder> configurator)
        {
            container.Draggable.Enabled = true;
            
            configurator(new ListBoxDraggableSettingsBuilder(container.Draggable));
            return this;
        }
        
        /// <summary>
        /// Array of id strings which determines the ListBoxes that can drag and drop their items to the current ListBox. The dropSources option describes a one way relationship. If you want a two-way connection, then set the dropSources option on both widgets.
        /// </summary>
        /// <param name="value">The value that configures the dropsources.</param>
        public ListBoxBuilder DropSources(params string[] value)
        {
            container.DropSources = value;

            return this;
        }
        
        /// <summary>
        /// Indicates whether the keyboard navigation is enabled or disabled.
        /// </summary>
        /// <param name="value">The value that configures the navigatable.</param>
        public ListBoxBuilder Navigatable(bool value)
        {
            container.Navigatable = value;

            return this;
        }
        
        /// <summary>
        /// Defines the localization texts for the ListBox. Used primarily for localization.
        /// </summary>
        /// <param name="configurator">The action that configures the messages.</param>
        public ListBoxBuilder Messages(Action<ListBoxMessagesSettingsBuilder> configurator)
        {
            configurator(new ListBoxMessagesSettingsBuilder(container.Messages));
            return this;
        }
        
        /// <summary>
        /// Specifies the item template of the ListBox.
        /// </summary>
        /// <param name="value">The value that configures the template.</param>
        public ListBoxBuilder Template(string value)
        {
            container.Template = value;

            return this;
        }

        /// <summary>
        /// Specifies the item template of the ListBox.
        /// </summary>
        /// <param name="value">The value that configures the template.</param>
        public ListBoxBuilder TemplateId(string value)
        {
            container.TemplateId = value;

            return this;
        }
        
        /// <summary>
        /// Defines the settings for displaying the toolbar of the ListBox. The toolbar allows you to execute a set of predefined actions.By default, the toolbar is not displayed. If the tools array is populated, then the toolbar and the corresponding tools are displayed.
        /// </summary>
        /// <param name="configurator">The action that configures the toolbar.</param>
        public ListBoxBuilder Toolbar(Action<ListBoxToolbarSettingsBuilder> configurator)
        {
            configurator(new ListBoxToolbarSettingsBuilder(container.Toolbar));
            return this;
        }
        
        //<< Fields


        // Place custom settings here

        /// <summary>
        /// Binds the ListBox to an IEnumerable list.
        /// </summary>
        /// <param name="dataSource">The data source.</param>
        public ListBoxBuilder BindTo(IEnumerable data)
        {
            Component.DataSource.Data = data;

            return this;
        }

        /// <summary>
        /// Binds the ListBox to a list of SelectListItem.
        /// </summary>
        /// <param name="dataSource">The data source.</param>
        public ListBoxBuilder BindTo(IEnumerable<SelectListItem> dataSource)
        {
            if (string.IsNullOrEmpty(Component.DataValueField)
                && string.IsNullOrEmpty(Component.DataTextField))
            {
                DataValueField("Value");
                DataTextField("Text");
            }

            Component.DataSource.Data = dataSource
                .Select(item => new {
                    Text = item.Text,
                    Value = item.Value ?? item.Text,
                    Selected = item.Selected
                });

            return this;
        }

        /// <summary>
        /// Sets the data source configuration of the ListBox.
        /// </summary>
        /// <param name="configurator">The lambda which configures the data source</param>
        public ListBoxBuilder DataSource(Action<ReadOnlyDataSourceBuilder> configurator)
        {
            configurator(new ReadOnlyDataSourceBuilder(Component.DataSource, Component.ViewContext, Component.UrlGenerator));

            return this;
        }

        public ListBoxBuilder DataSource(string dataSourceId)
        {
            Component.DataSourceId = dataSourceId;
            return this;
        }

        /// <summary>
        /// Configures the client-side events.
        /// </summary>
        /// <param name="configurator">The client events action.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().ListBox()
        ///             .Name("ListBox")
        ///             .Events(events => events
        ///                 .Change("onChange")
        ///             )
        /// %&gt;
        /// </code>
        /// </example>
        public ListBoxBuilder Events(Action<ListBoxEventBuilder> configurator)
        {

            configurator(new ListBoxEventBuilder(Component.Events));

            return this;
        }

    }
}

