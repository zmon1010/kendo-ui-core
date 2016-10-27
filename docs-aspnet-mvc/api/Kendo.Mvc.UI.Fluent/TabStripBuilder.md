---
title: TabStripBuilder
---

# Kendo.Mvc.UI.Fluent.TabStripBuilder
Defines the fluent interface for configuring the TabStrip component.




## Methods


### Items(System.Action\<Kendo.Mvc.UI.Fluent.TabStripItemFactory\>)
Defines the items in the tabstrip


#### Parameters

##### addAction System.Action<[Kendo.Mvc.UI.Fluent.TabStripItemFactory](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/TabStripItemFactory)>
The add action.




#### Example (ASPX)
    <%= Html.Kendo().TabStrip()
    .Name("TabStrip")
    .Items(items =>
    {
        items.Add().Text("First Item");
        items.Add().Text("Second Item");
    })
    %>


### Events(System.Action\<Kendo.Mvc.UI.Fluent.TabStripEventBuilder\>)
Configures the client-side events.


#### Parameters

##### clientEventsAction System.Action<[Kendo.Mvc.UI.Fluent.TabStripEventBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/TabStripEventBuilder)>
The client events action.




#### Example (ASPX)
    <%= Html.Kendo().TabStrip()
    .Name("TabStrip")
    .Events(events =>
        events.Select("onSelect").OnLoad("onLoad")
    )
    %>


### Collapsible(System.Boolean)
Configures the collapsible property of the tabstrip.


#### Parameters

##### enable `System.Boolean`
Whether the component animation is collapsible.




#### Example (ASPX)
    <%= Html.Kendo().TabStrip()
    .Name("PanelBar")
    .Collapsible(false)


### Animation(System.Boolean)
Configures the animation effects of the tabstrip.


#### Parameters

##### enable `System.Boolean`
Whether the component animation is enabled.




#### Example (ASPX)
    <%= Html.Kendo().TabStrip()
    .Name("PanelBar")
    .Animation(false)


### Animation(System.Action\<Kendo.Mvc.UI.Fluent.PopupAnimationBuilder\>)
Configures the animation effects of the tabstrip.


#### Parameters

##### animationAction System.Action<[Kendo.Mvc.UI.Fluent.PopupAnimationBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/PopupAnimationBuilder)>
The action that configures the animation.




#### Example (ASPX)
    <%= Html.Kendo().TabStrip()
    .Name("PanelBar")
    .Animation(animation => animation.Open(config => config.Fade(FadeDirection.In)))


### BindTo(System.String,System.Action\<Kendo.Mvc.UI.TabStripItem,Kendo.Mvc.SiteMapNode\>)
Binds the tabstrip to a sitemap


#### Parameters

##### viewDataKey `System.String`
The view data key.

##### siteMapAction System.Action<[Kendo.Mvc.UI.TabStripItem](/api/aspnet-mvc/Kendo.Mvc.UI/TabStripItem),Kendo.Mvc.SiteMapNode>
The action to configure the item.




#### Example (ASPX)
    <%= Html.Kendo().TabStrip()
    .Name("TabStrip")
    .BindTo("examples", (item, siteMapNode) =>
    {
    })
    %>


### BindTo(System.String)
Binds the tabstrip to a sitemap.


#### Parameters

##### viewDataKey `System.String`
The view data key.




#### Example (ASPX)
    <%= Html.Kendo().TabStrip()
    .Name("TabStrip")
    .BindTo("examples")
    %>


### BindTo(System.Collections.Generic.IEnumerable\<T1\>,System.Action\<Kendo.Mvc.UI.TabStripItem,T1\>)
Binds the tabstrip to a list of objects


#### Parameters

##### dataSource `System.Collections.Generic.IEnumerable<T1>`
The data source.

##### itemDataBound System.Action<[Kendo.Mvc.UI.TabStripItem](/api/aspnet-mvc/Kendo.Mvc.UI/TabStripItem),T1>
The action executed for every data bound item.




#### Example (ASPX)
    <%= Html.Kendo().TabStrip()
    .Name("TabStrip")
    .BindTo(new []{"First", "Second"}, (item, value) =>
    {
        item.Text = value;
    })
    %>


### SelectedIndex(System.Int32)
Selects the item at the specified index.


#### Parameters

##### index `System.Int32`
The index.




#### Example (ASPX)
    <%= Html.Kendo().TabStrip()
    .Name("TabStrip")
    .Items(items =>
    {
        items.Add().Text("First Item");
        items.Add().Text("Second Item");
    })
    .SelectedIndex(1)
    %>


### ItemAction(System.Action\<Kendo.Mvc.UI.TabStripItem\>)
Callback for each item.


#### Parameters

##### action System.Action<[Kendo.Mvc.UI.TabStripItem](/api/aspnet-mvc/Kendo.Mvc.UI/TabStripItem)>
Action, which will be executed for each item.




#### Example (ASPX)
    <%= Html.Kendo().TabStrip()
    .Name("TabStrip")
    .ItemAction(item =>
    {
        item
        .Text(...)
        .HtmlAttributes(...);
    })
    %>


### HighlightPath(System.Boolean)
Select item depending on the current URL.


#### Parameters

##### value `System.Boolean`
If true the item will be highlighted.




#### Example (ASPX)
    <%= Html.Kendo().TabStrip()
    .Name("TabStrip")
    .HighlightPath(true)
    %>


### Navigatable(System.Boolean)
Enable/disable TabStrip keyboard navigation.


#### Parameters

##### value `System.Boolean`
If true the TabStrip will have keyboard navigation.




#### Example (ASPX)
    <%= Html.Kendo().TabStrip()
    .Name("TabStrip")
    .Navigatable(false)
    %>


### SecurityTrimming(System.Boolean)
Enable/disable security trimming functionality of the component.


#### Parameters

##### value `System.Boolean`
If true security trimming is enabled.




#### Example (ASPX)
    <%= Html.Kendo().TabStrip()
    .Name("TabStrip")
    .SecurityTrimming(false)
    %>


### TabPosition(Kendo.Mvc.UI.TabStripTabPosition)
Sets the tabs' position. The default value is Top. Using fade animation is highly recommended with any of the non-default tab position settings.


#### Parameters

##### value [Kendo.Mvc.UI.TabStripTabPosition](/api/aspnet-mvc/Kendo.Mvc.UI/TabStripTabPosition)
The position.




#### Example (ASPX)
    <%= Html.Kendo().TabStrip()
    .Name("TabStrip")
    .Items(items =>
    {
        items.Add().Text("First Item");
        items.Add().Text("Second Item");
    })
    .TabPosition(TabPosition.Left)
    %>


### Scrollable(System.Action\<Kendo.Mvc.UI.Fluent.TabStripScrollableSettingsBuilder\>)
Sets the tab scrolling settings.




#### Example (ASPX)
    <%= Html.Kendo().TabStrip()
    .Name("TabStrip")
    .Items(items =>
    {
        items.Add().Text("First Item");
        items.Add().Text("Second Item");
    })
    .Scrollable(s => s.Enabled(true).Distance(300))
    %>


### Scrollable(System.Boolean)
Disables tab scrolling.


#### Parameters

##### value `System.Boolean`
Boolean flag.




#### Example (ASPX)
    <%= Html.Kendo().TabStrip()
    .Name("TabStrip")
    .Items(items =>
    {
        items.Add().Text("First Item");
        items.Add().Text("Second Item");
    })
    .Scrollable(false)
    %>


### Value(System.String)
Sets the selected tab of the widget


#### Parameters

##### value `System.String`
String value corresponding to DataTextField property






