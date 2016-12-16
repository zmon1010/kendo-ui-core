namespace Kendo.Mvc.UI.Fluent
{
    using System;
    using System.Collections;
    using System.Collections.Generic;
    using Infrastructure;
    /// <summary>
    /// Defines the fluent interface for configuring the <see cref="PanelBar"/> component.
    /// </summary>
    public class PanelBarBuilder : WidgetBuilderBase<PanelBar, PanelBarBuilder>, IHideObjectMembers
    {
        private PanelBar container;
        /// <summary>
        /// Initializes a new instance of the <see cref="PanelBarBuilder"/> class.
        /// </summary>
        /// <param name="component">The component.</param>
        public PanelBarBuilder(PanelBar component)
            : base(component)
        {
            container = component;
        }

        /// <summary>
        /// Defines the items in the panelbar
        /// </summary>
        /// <param name="addAction">The add action.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().PanelBar()
        ///             .Name("PanelBar")
        ///             .Items(items =>
        ///             {
        ///                 items.Add().Text("First Item");
        ///                 items.Add().Text("Second Item");
        ///             })
        /// %&gt;
        /// </code>
        /// </example>
        public PanelBarBuilder Items(Action<PanelBarItemFactory> addAction)
        {

            var factory = new PanelBarItemFactory(Component, Component.ViewContext);

            addAction(factory);

            return this;
        }

        /// <summary>
        /// Controls whether to bind the widget to the DataSource on initialization.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().PanelBar()
        ///             .Name("PanelBar")
        ///             .AutoBind(false)
        /// %&gt;
        /// </code>
        /// </example>
        public PanelBarBuilder AutoBind(bool autoBind)
        {
            Component.AutoBind = autoBind;

            return this;
        }

        /// <summary>
        /// Template to be used for rendering the items in the panelbar.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().PanelBar()
        ///             .Name("PanelBar")
        ///             .Template("#= data #")
        /// %&gt;
        /// </code>
        /// </example>
        public PanelBarBuilder Template(string template)
        {
            Component.Template = template;

            return this;
        }

        /// <summary>
        /// Id of the template element to be used for rendering the items in the panelbar.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().PanelBar()
        ///             .Name("PanelBar")
        ///             .TemplateId("widgetTemplateId")
        /// %&gt;
        /// </code>
        /// </example>
        public PanelBarBuilder TemplateId(string templateId)
        {
            Component.TemplateId = templateId;

            return this;
        }

        /// <summary>
        /// Configures the client-side events.
        /// </summary>
        /// <param name="clientEventsAction">The client events action.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().PanelBar()
        ///             .Name("PanelBar")
        ///             .Events(events =>
        ///                 events.Expand("expand").Collapse("collapse")
        ///             )
        /// %&gt;
        /// </code>
        /// </example>
        public PanelBarBuilder Events(Action<PanelBarEventBuilder> clientEventsAction)
        {

            clientEventsAction(new PanelBarEventBuilder(Component.Events));

            return this;
        }

        /// <summary>
        /// Binds the panelbar to a sitemap
        /// </summary>
        /// <param name="viewDataKey">The view data key.</param>
        /// <param name="siteMapAction">The action to configure the item.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().PanelBar()
        ///             .Name("PanelBar")
        ///             .BindTo("examples", (item, siteMapNode) =>
        ///             {
        ///             })
        /// %&gt;
        /// </code>
        /// </example>
        public PanelBarBuilder BindTo(string viewDataKey, Action<PanelBarItem, SiteMapNode> siteMapAction)
        {

            Component.BindTo(viewDataKey, siteMapAction);

            return this;
        }

        /// <summary>
        /// Binds the panelbar to a sitemap.
        /// </summary>
        /// <param name="viewDataKey">The view data key.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().PanelBar()
        ///             .Name("PanelBar")
        ///             .BindTo("examples")
        /// %&gt;
        /// </code>
        /// </example>
        public PanelBarBuilder BindTo(string viewDataKey)
        {

            Component.BindTo(viewDataKey);

            return this;
        }

        /// <summary>
        /// Binds the PanelBar to a list of items.
        /// Use if a hierarchy of items is being sent from the controller; to bind the PanelBar declaratively, use the Items() method.
        /// </summary>
        /// <param name="items">The list of items</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().PanelBar()
        ///             .Name("PanelBar")
        ///             .BindTo(model)
        /// %&gt;
        /// </code>
        /// </example>
        public PanelBarBuilder BindTo(IEnumerable<PanelBarItemModel> items)
        {

            Component.BindTo(items, mapping => mapping
                .For<PanelBarItemModel>(binding => binding
                    .ItemDataBound((item, node) =>
                    {
                        item.Text = node.Text;
                        item.Enabled = node.Enabled;
                        item.Expanded = node.Expanded;
                        item.Encoded = node.Encoded;
                        item.Id = node.Id;
                        item.Selected = node.Selected;
                        item.SpriteCssClasses = node.SpriteCssClass;

                        item.Url = node.Url;
                        item.ImageUrl = node.ImageUrl;
                        foreach (var key in node.ImageHtmlAttributes.Keys)
                        {
                            item.ImageHtmlAttributes[key] = node.ImageHtmlAttributes[key];
                        }
                        foreach (var key in node.HtmlAttributes.Keys)
                        {
                            item.HtmlAttributes[key] = node.HtmlAttributes[key];
                        }
                        foreach (var key in node.LinkHtmlAttributes.Keys)
                        {
                            item.LinkHtmlAttributes[key] = node.LinkHtmlAttributes[key];
                        }
                    })
                    .Children(item => item.Items)
                )
            );

            return this;
        }

        /// <summary>
        /// Binds the panelbar to a list of objects
        /// </summary>
        /// <typeparam name="T">The type of the data item</typeparam>
        /// <param name="dataSource">The data source.</param>
        /// <param name="itemDataBound">The action executed for every data bound item.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().PanelBar()
        ///             .Name("PanelBar")
        ///             .BindTo(new []{"First", "Second"}, (item, value) =>
        ///             {
        ///                item.Text = value;
        ///             })
        /// %&gt;
        /// </code>
        /// </example>
        public PanelBarBuilder BindTo<T>(IEnumerable<T> dataSource, Action<PanelBarItem, T> itemDataBound)
        {
            Component.BindTo(dataSource, itemDataBound);

            return this;
        }

        /// <summary>
        /// Binds the panelbar to a list of objects. The panelbar will create a hierarchy of items using the specified mappings.
        /// </summary>
        /// <typeparam name="T">The type of the data item</typeparam>
        /// <param name="dataSource">The data source.</param>
        /// <param name="factoryAction">The action which will configure the mappings</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().PanelBar()
        ///             .Name("PanelBar")
        ///             .BindTo(Model, mapping => mapping
        ///                     .For&lt;Customer&gt;(binding => binding
        ///                         .Children(c => c.Orders) // The "child" items will be bound to the the "Orders" property
        ///                         .ItemDataBound((item, c) => item.Text = c.ContactName) // Map "Customer" properties to PanelBarItem properties
        ///                     )
        ///                     .For&lt;Order&lt;(binding => binding
        ///                         .Children(o => null) // "Orders" do not have child objects so return "null"
        ///                         .ItemDataBound((item, o) => item.Text = o.OrderID.ToString()) // Map "Order" properties to PanelBarItem properties
        ///                     )
        ///             )
        /// %&gt;
        /// </code>
        /// </example>
        public PanelBarBuilder BindTo(IEnumerable dataSource, Action<NavigationBindingFactory<PanelBarItem>> factoryAction)
        {
            Component.BindTo(dataSource, factoryAction);

            return this;
        }

        /// <summary>
        /// Configure the DataSource of the component
        /// </summary>
        /// <param name="configurator">The action that configures the <see cref="DataSource"/>.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().PanelBar()
        ///     .Name("PanelBar")
        ///     .DataSource(dataSource => dataSource
        ///         .Read(read => read
        ///             .Action("Employees", "PanelBar")
        ///         )
        ///     )
        ///  %&gt;
        /// </code>
        /// </example>
        public PanelBarBuilder DataSource(Action<HierarchicalDataSourceBuilder<object>> configurator)
        {
            configurator(new HierarchicalDataSourceBuilder<object>(Component.DataSource, this.Component.ViewContext, this.Component.UrlGenerator));

            return this;
        }

        public PanelBarBuilder DataSource(string dataSourceId)
        {
            Component.DataSourceId = dataSourceId;

            return this;
        }

        /// <summary>
        /// Allows the panelbar to fetch the entire datasource at initialization time.
        /// </summary>
        /// <param name="field">Whether the datasource should be loaded on demand.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().PanelBar()
        ///             .Name("PanelBar")
        ///             .LoadOnDemand(false)
        /// %&gt;
        /// </code>
        /// </example>
        public PanelBarBuilder LoadOnDemand(bool value)
        {
            Component.LoadOnDemand = value;

            return this;
        }

        /// <summary>
        /// Sets the field of the data item that provides the image URL of the PanelBar nodes.
        /// </summary>
        /// <param name="value">The value that configures the dataimageurlfield.</param>
        public PanelBarBuilder DataImageUrlField(string value)
        {
            container.DataImageUrlField = value;

            return this;
        }

        /// <summary>
        /// Sets the field of the data item that provides the sprite CSS class of the nodes.
        /// If an array, each level uses the field that is at the same index in the array, or the last item in the array.
        /// </summary>
        /// <param name="value">The value that configures the dataspritecssclassfield.</param>
        public PanelBarBuilder DataSpriteCssClassField(string value)
        {
            container.DataSpriteCssClassField = value;

            return this;
        }

        /// <summary>
        /// Sets the field of the data item that provides the link URL of the nodes.
        /// </summary>
        /// <param name="value">The value that configures the dataurlfield.</param>
        public PanelBarBuilder DataUrlField(string value)
        {
            container.DataUrlField = value;

            return this;
        }

        /// <summary>
        /// The text messages displayed in the widget. Use it to customize or localize the messages.
        /// </summary>
        /// <param name="configurator">The action that configures the messages.</param>
        public PanelBarBuilder Messages(Action<PanelBarMessagesSettingsBuilder> configurator)
        {
            configurator(new PanelBarMessagesSettingsBuilder(container.Messages));
            return this;
        }

        //<< Fields

        /// <summary>
        /// Sets the field of the data item that provides the text content of the nodes.
        /// If an array, each level uses the field that is at the same index in the array, or the last item in the array.
        /// </summary>
        /// <param name="value">The value that configures the datatextfield.</param>
        public PanelBarBuilder DataTextField(params string[] value)
        {
            container.DataTextField.AddRange(value);

            return this;
        }

        /// <summary>
        /// Configures the animation effects of the panelbar.
        /// </summary>
        /// <param name="enable">Whether the component animation is enabled.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;%= Html.Kendo().PanelBar()
        ///             .Name("PanelBar")
        ///             .Animation(false)
        /// </code>
        /// </example>
        public PanelBarBuilder Animation(bool enable)
        {
            Component.Animation.Enabled = enable;

            return this;
        }

        /// <summary>
        /// Configures the animation effects of the panelbar.
        /// </summary>
        /// <param name="animationAction">The action that configures the animation.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;%= Html.Kendo().PanelBar()
        ///             .Name("PanelBar")
        ///             .Animation(animation => animation.Expand(config => config.Fade(FadeDirection.In)))
        /// </code>
        /// </example>
        public PanelBarBuilder Animation(Action<ExpandableAnimationBuilder> animationAction)
        {

            animationAction(new ExpandableAnimationBuilder(Component.Animation));

            return this;
        }

        /// <summary>
        /// Callback for each item.
        /// </summary>
        /// <param name="itemAction">Action, which will be executed for each item.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().PanelBar()
        ///             .Name("PanelBar")
        ///             .ItemAction(item =>
        ///             {
        ///                 item
        ///                     .Text(...)
        ///                     .HtmlAttributes(...);
        ///             })
        /// %&gt;
        /// </code>
        /// </example>
        public PanelBarBuilder ItemAction(Action<PanelBarItem> action)
        {

            Component.ItemAction = action;

            return this;
        }

        /// <summary>
        /// Select item depending on the current URL.
        /// </summary>
        /// <param name="value">If true the item will be highlighted.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().PanelBar()
        ///             .Name("PanelBar")
        ///             .HighlightPath(true)
        /// %&gt;
        /// </code>
        /// </example>
        public PanelBarBuilder HighlightPath(bool value)
        {
            Component.HighlightPath = value;

            return this;
        }

        /// <summary>
        /// Renders the panelbar with expanded items.
        /// </summary>
        /// <param name="value">If true the panelbar will be expanded.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().PanelBar()
        ///             .Name("PanelBar")
        ///             .ExpandAll(true)
        /// %&gt;
        /// </code>
        /// </example>
        public PanelBarBuilder ExpandAll(bool value)
        {
            Component.ExpandAll = value;

            return this;
        }

        /// <summary>
        /// Sets the expand mode of the panelbar.
        /// </summary>
        /// <param name="value">The desired expand mode.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().PanelBar()
        ///             .Name("PanelBar")
        ///             .ExpandMode(PanelBarExpandMode.Multiple)
        /// %&gt;
        /// </code>
        /// </example>
        public PanelBarBuilder ExpandMode(PanelBarExpandMode value)
        {
            Component.ExpandMode = value;

            return this;
        }

        /// <summary>
        /// Selects the item at the specified index.
        /// </summary>
        /// <param name="index">The index.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().PanelBar()
        ///             .Name("PanelBar")
        ///             .Items(items =>
        ///             {
        ///                 items.Add().Text("First Item");
        ///                 items.Add().Text("Second Item");
        ///             })
        ///             .SelectedIndex(1)
        /// %&gt;
        /// </code>
        /// </example>
        public PanelBarBuilder SelectedIndex(int index)
        {

            Component.SelectedIndex = index;

            return this;
        }

        /// <summary>
        /// Enable/disable security trimming functionality of the component.
        /// </summary>
        /// <param name="value">If true security trimming is enabled.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().PanelBar()
        ///             .Name("PanelBar")
        ///             .SecurityTrimming(false)
        /// %&gt;
        /// </code>
        /// </example>
        public PanelBarBuilder SecurityTrimming(bool value)
        {
            Component.SecurityTrimming.Enabled = value;

            return this;
        }

        /// <summary>
        /// Defines the security trimming functionality of the component
        /// </summary>
        /// <param name="securityTrimmingAction">The securityTrimming action.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().PanelBar()
        ///             .Name("PanelBar")
        ///             .SecurityTrimming(builder =>
        ///             {
        ///                 builder.Enabled(true).HideParent(true);
        ///             })
        /// %&gt;
        /// </code>
        /// </example>
        public PanelBarBuilder SecurityTrimming(Action<SecurityTrimmingBuilder> securityTrimmingAction)
        {
            securityTrimmingAction(new SecurityTrimmingBuilder(Component.SecurityTrimming));

            return this;
        }
    }
}
