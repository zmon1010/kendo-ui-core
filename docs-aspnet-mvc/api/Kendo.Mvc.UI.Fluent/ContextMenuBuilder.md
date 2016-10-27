---
title: ContextMenuBuilder
---

# Kendo.Mvc.UI.Fluent.ContextMenuBuilder
Defines the fluent interface for configuring the ContextMenu component.




## Methods


### Items(System.Action\<Kendo.Mvc.UI.Fluent.ContextMenuItemFactory\>)
Defines the items in the menu


#### Parameters

##### addAction System.Action<[Kendo.Mvc.UI.Fluent.ContextMenuItemFactory](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/ContextMenuItemFactory)>
The add action.




#### Example (ASPX)
    <%= Html.Kendo().ContextMenu()
    .Name("ContextMenu")
    .Items(items =>
    {
        items.Add().Text("First Item");
        items.Add().Text("Second Item");
    })
    %>


### Events(System.Action\<Kendo.Mvc.UI.Fluent.ContextMenuEventBuilder\>)
Configures the client-side events.


#### Parameters

##### clientEventsAction System.Action<[Kendo.Mvc.UI.Fluent.ContextMenuEventBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/ContextMenuEventBuilder)>
The client events action.




#### Example (ASPX)
    <%= Html.Kendo().ContextMenu()
    .Name("ContextMenu")
    .Events(events =>
        events.Open("onOpen").OnClose("onClose")
    )
    %>


### Direction(Kendo.Mvc.UI.ContextMenuDirection)
Specifies ContextMenu opening direction.


#### Parameters

##### value [Kendo.Mvc.UI.ContextMenuDirection](/api/aspnet-mvc/Kendo.Mvc.UI/ContextMenuDirection)
The desired direction.




#### Example (ASPX)
    <%= Html.Kendo().ContextMenu()
    .Name("ContextMenu")
    .Direction(ContextMenuDirection.Left)
    %>


### Direction(System.String)
Specifies ContextMenu opening direction.


#### Parameters

##### value `System.String`
The desired direction.




#### Example (ASPX)
    <%= Html.Kendo().ContextMenu()
    .Name("ContextMenu")
    .Direction("top")
    %>


### Target(System.String)
Specifies ContextMenu target to bind to.


#### Parameters

##### value `System.String`
The desired target.




#### Example (ASPX)
    <%= Html.Kendo().ContextMenu()
    .Name("ContextMenu")
    .Target("#target")
    %>


### Filter(System.String)
Specifies ContextMenu filter selector - would filter elements inside the target to bind to.


#### Parameters

##### value `System.String`
The desired filter.




#### Example (ASPX)
    <%= Html.Kendo().ContextMenu()
    .Name("ContextMenu")
    .Filter(".item")
    %>


### ShowOn(System.String)
Specifies ContextMenu triggering event.


#### Parameters

##### value `System.String`
The desired event.




#### Example (ASPX)
    <%= Html.Kendo().ContextMenu()
    .Name("ContextMenu")
    .ShowOn("click")
    %>


### Orientation(Kendo.Mvc.UI.ContextMenuOrientation)
Sets the menu orientation.


#### Parameters

##### value [Kendo.Mvc.UI.ContextMenuOrientation](/api/aspnet-mvc/Kendo.Mvc.UI/ContextMenuOrientation)
The desired orientation.




#### Example (ASPX)
    <%= Html.Kendo().ContextMenu()
    .Name("ContextMenu")
    .Orientation(ContextMenuOrientation.Vertical)
    %>


### OpenOnClick(System.Boolean)
Enables or disables the "open-on-click" feature.




#### Example (ASPX)
    <%= Html.Kendo().ContextMenu()
    .Name("ContextMenu")
    .OpenOnClick(true)
    %>


### CloseOnClick(System.Boolean)
Specifies that sub menus should close after item selection (provided they won't navigate).




#### Example (ASPX)
    <%= Html.Kendo().ContextMenu()
    .Name("ContextMenu")
    .CloseOnClick(false)
    %>


### AlignToAnchor(System.Boolean)
Specifies that context menu would align to its anchor (target or filter).




#### Example (ASPX)
    <%= Html.Kendo().ContextMenu()
    .Name("ContextMenu")
    .AlignToAnchor(false)
    %>


### HoverDelay(System.Int32)
Specifies the delay in ms before the menu is opened/closed - used to avoid accidental closure on leaving.




#### Example (ASPX)
    <%= Html.Kendo().ContextMenu()
    .Name("ContextMenu")
    .HoverDelay(300)
    %>


### BindTo(System.String,System.Action\<Kendo.Mvc.UI.ContextMenuItem,Kendo.Mvc.SiteMapNode\>)
Binds the menu to a sitemap


#### Parameters

##### viewDataKey `System.String`
The view data key.

##### siteMapAction System.Action<[Kendo.Mvc.UI.ContextMenuItem](/api/aspnet-mvc/Kendo.Mvc.UI/ContextMenuItem),Kendo.Mvc.SiteMapNode>
The action to configure the item.




#### Example (ASPX)
    <%= Html.Kendo().ContextMenu()
    .Name("ContextMenu")
    .BindTo("examples", (item, siteMapNode) =>
    {
    })
    %>


### BindTo(System.String)
Binds the menu to a sitemap.


#### Parameters

##### viewDataKey `System.String`
The view data key.




#### Example (ASPX)
    <%= Html.Kendo().ContextMenu()
    .Name("ContextMenu")
    .BindTo("examples")
    %>


### BindTo(System.Collections.Generic.IEnumerable\<T1\>,System.Action\<Kendo.Mvc.UI.ContextMenuItem,T1\>)
Binds the menu to a list of objects. The menu will be "flat" which means a menu item will be created for
            every item in the data source.


#### Parameters

##### dataSource `System.Collections.Generic.IEnumerable<T1>`
The data source.

##### itemDataBound System.Action<[Kendo.Mvc.UI.ContextMenuItem](/api/aspnet-mvc/Kendo.Mvc.UI/ContextMenuItem),T1>
The action executed for every data bound item.




#### Example (ASPX)
    <%= Html.Kendo().ContextMenu()
    .Name("ContextMenu")
    .BindTo(new []{"First", "Second"}, (item, value) =>
    {
        item.Text = value;
    })
    %>


### BindTo(System.Collections.IEnumerable,System.Action\<Kendo.Mvc.UI.Fluent.NavigationBindingFactory\<Kendo.Mvc.UI.ContextMenuItem\>\>)
Binds the menu to a list of objects. The menu will create a hierarchy of items using the specified mappings.


#### Parameters

##### dataSource `System.Collections.IEnumerable`
The data source.

##### factoryAction System.Action<[Kendo.Mvc.UI.Fluent.NavigationBindingFactory](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/NavigationBindingFactory)<Kendo.Mvc.UI.ContextMenuItem>>
The action which will configure the mappings




#### Example (ASPX)
    <%= Html.Kendo().ContextMenu()
    .Name("ContextMenu")
    .BindTo(Model, mapping => mapping
        .For<Customer>(binding => binding
            .Children(c => c.Orders) // The "child" items will be bound to the the "Orders" property
            .ItemDataBound((item, c) => item.Text = c.ContactName) // Map "Customer" properties to ContextMenuItem properties
        )
        .For<Order<(binding => binding
            .Children(o => null) // "Orders" do not have child objects so return "null"
            .ItemDataBound((item, o) => item.Text = o.OrderID.ToString()) // Map "Order" properties to ContextMenuItem properties
        )
    )
    %>


### ItemAction(System.Action\<Kendo.Mvc.UI.ContextMenuItem\>)
Callback for each item.


#### Parameters

##### action System.Action<[Kendo.Mvc.UI.ContextMenuItem](/api/aspnet-mvc/Kendo.Mvc.UI/ContextMenuItem)>
Action, which will be executed for each item.




#### Example (ASPX)
    <%= Html.Kendo().ContextMenu()
    .Name("ContextMenu")
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
    <%= Html.Kendo().ContextMenu()
    .Name("ContextMenu")
    .HighlightPath(true)
    %>


### SecurityTrimming(System.Boolean)
Enable/disable security trimming functionality of the component.


#### Parameters

##### value `System.Boolean`
If true security trimming is enabled.




#### Example (ASPX)
    <%= Html.Kendo().ContextMenu()
    .Name("ContextMenu")
    .SecurityTrimming(false)
    %>


### SecurityTrimming(System.Action\<Kendo.Mvc.UI.SecurityTrimmingBuilder\>)
Defines the security trimming functionality of the component


#### Parameters

##### securityTrimmingAction System.Action<[Kendo.Mvc.UI.SecurityTrimmingBuilder](/api/aspnet-mvc/Kendo.Mvc.UI/SecurityTrimmingBuilder)>
The securityTrimming action.




#### Example (ASPX)
    <%= Html.Kendo().ContextMenu()
    .Name("ContextMenu")
    .SecurityTrimming(builder =>
    {
        builder.Enabled(true).HideParent(true);
    })
    %>



