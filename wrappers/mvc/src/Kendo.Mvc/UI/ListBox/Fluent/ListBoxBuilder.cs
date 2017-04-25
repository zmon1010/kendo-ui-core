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
        /// If set to false the widget will not bind to the data source during initialization. In this case data binding will occur when the change event of the data source is fired. By default the widget will bind to the data source specified in the configuration.
        /// </summary>
        /// <param name="value">The value that configures the autobind.</param>
        public ListBoxBuilder AutoBind(bool value)
        {
            container.AutoBind = value;

            return this;
        }
        
        /// <summary>
        /// A selector which determines that the target ListBox should be used when items are transferred from and to the current ListBox. The connectWith option defines one-way relationship - if the developer wants a two-way connection, then the connectWith option should be set on both widgets.
        /// </summary>
        /// <param name="value">The value that configures the connectwith.</param>
        public ListBoxBuilder ConnectWith(string value)
        {
            container.ConnectWith = value;

            return this;
        }
        
        /// <summary>
        /// The field of the data item that provides the text content of the list items. The widget will filter the data source based on this field.
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
        /// Indicates if the widget items can be draged and droped.
        /// </summary>
        public ListBoxBuilder Draggable()
        {
            return Draggable(true);
        }

        /// <summary>
        /// Indicates if the widget items can be draged and droped.
        /// </summary>
        /// <param name="enabled">Enables or disables the draggable option.</param>
        public ListBoxBuilder Draggable(bool enabled)
        {
            container.Draggable.Enabled = enabled;
            return this;
        }

        
        /// <summary>
        /// Indicates if the widget items can be draged and droped.
        /// </summary>
        /// <param name="configurator">The action that configures the draggable.</param>
        public ListBoxBuilder Draggable(Action<ListBoxDraggableSettingsBuilder> configurator)
        {
            container.Draggable.Enabled = true;
            
            configurator(new ListBoxDraggableSettingsBuilder(container.Draggable));
            return this;
        }
        
        /// <summary>
        /// Array of id strings which determines the ListBox widgets that can drag and drop their items to the current ListBox widget. The dropSources option describes one way relationship, if the developer wants a two way connection then the dropSources option should be set on both widgets.
        /// </summary>
        /// <param name="value">The value that configures the dropsources.</param>
        public ListBoxBuilder DropSources(params string[] value)
        {
            container.DropSources = value;

            return this;
        }
        
        /// <summary>
        /// Indicates whether keyboard navigation is enabled/disabled.
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
        /// Specifies ListBox item template.
        /// </summary>
        /// <param name="value">The value that configures the template.</param>
        public ListBoxBuilder Template(string value)
        {
            container.Template = value;

            return this;
        }

        /// <summary>
        /// Specifies ListBox item template.
        /// </summary>
        /// <param name="value">The value that configures the template.</param>
        public ListBoxBuilder TemplateId(string value)
        {
            container.TemplateId = value;

            return this;
        }
        
        /// <summary>
        /// Defines settings for displaying a toolbar for the ListBox widget, which allows a set of predefined actions to be executed. By default, the toolbar isn't shown. Populating the tools array will show the toolbar and the corresponding tools.
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

