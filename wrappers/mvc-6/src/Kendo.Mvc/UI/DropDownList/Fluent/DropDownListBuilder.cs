using Microsoft.AspNet.Mvc.Rendering;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring the Kendo UI DropDownList
    /// </summary>
    public partial class DropDownListBuilder: WidgetBuilderBase<DropDownList, DropDownListBuilder>
        
    {
        public DropDownListBuilder(DropDownList component) : base(component)
        {
        }

        /// <summary>
        /// Binds the DropDownList to an IEnumerable list.
        /// </summary>
        /// <param name="dataSource">The data source.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().DropDownList()
        ///             .Name("DropDownList")
        ///             .DataTextField("CompanyName")
        ///             .DataValueField("CompanyID")
        ///             .BindTo(new List<Company>
        ///             {
        ///                 new Company {
        ///                     CompanyName = "Text1",
        ///                     CompanyID = "Value1"
        ///                 },
        ///                 new Company {
        ///                     CompanyName = "Text2",
        ///                     CompanyID = "Value2"
        ///                 }
        ///             })
        /// %&gt;
        /// </code>
        /// </example>
        public DropDownListBuilder BindTo(IEnumerable data)
        {
            Component.DataSource.Data = data;

            return this;
        }

        /// <summary>
        /// Binds the DropDownList to a list of SelectListItem.
        /// </summary>
        /// <param name="dataSource">The data source.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().DropDownList()
        ///             .Name("DropDownList")
        ///             .BindTo(new List<SelectListItem>
        ///             {
        ///                 new SelectListItem{
        ///                     Text = "Text1",
        ///                     Value = "Value1"
        ///                 },
        ///                 new SelectListItem{
        ///                     Text = "Text2",
        ///                     Value = "Value2"
        ///                 }
        ///             })
        /// %&gt;
        /// </code>
        /// </example>
        public DropDownListBuilder BindTo(IEnumerable<SelectListItem> dataSource)
        {
            return BindTo(dataSource.Select(item => new
            {
                Text = item.Text,
                Value = item.Value ?? item.Text,
                Selected = item.Selected
            }));
        }

        /// <summary>
        /// Sets the data source configuration of the DropDownList.
        /// </summary>
        /// <param name="configurator">The lambda which configures the data source</param>
        public DropDownListBuilder DataSource(Action<ReadOnlyDataSourceBuilder> configurator)
        {
            configurator(new ReadOnlyDataSourceBuilder(Component.DataSource, Component.ViewContext, Component.UrlGenerator));

            return this;
        }

        /// <summary>
        /// Use it to enable filtering of items.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().DropDownList()
        ///             .Name("DropDownList")
        ///             .Filter(FilterType.Contains);
        /// %&gt;
        /// </code>
        /// </example>
        public DropDownListBuilder Filter(FilterType filter)
        {
            Component.Filter = filter.ToString().ToLower();

            return this;
        }
    }
}

