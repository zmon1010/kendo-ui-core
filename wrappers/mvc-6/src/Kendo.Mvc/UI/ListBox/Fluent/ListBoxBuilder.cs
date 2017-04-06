using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc.Rendering;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring the Kendo UI ListBox
    /// </summary>
    public partial class ListBoxBuilder: WidgetBuilderBase<ListBox, ListBoxBuilder>
    {
        public ListBoxBuilder(ListBox component) : base(component)
        {
        }

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
    }
}
