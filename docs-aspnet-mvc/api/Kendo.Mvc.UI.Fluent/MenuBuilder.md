---
title: MenuBuilder
---

# Kendo.Mvc.UI.Fluent.MenuBuilder
Defines the fluent interface for configuring the Menu component.




## Methods


### PopupCollision(System.Boolean)
Disables the menu popup collision detection.


#### Parameters

##### enable `System.Boolean`
Boolean parameter.




#### Example (ASPX)
    <%= Html.Kendo().Menu()
    .Name("Menu")
    .PopupCollision(false)
    %>


### PopupCollision(System.Action\<Kendo.Mvc.UI.Fluent.PopupCollisionBuilder\>)
Sets the menu popup collision detection.


#### Parameters

##### popupCollisionAction System.Action<[Kendo.Mvc.UI.Fluent.PopupCollisionBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/PopupCollisionBuilder)>
The collision action. Can be "fit", "flip" or "fit flip".




#### Example (ASPX)
    <%= Html.Kendo().Menu()
    .Name("Menu")
    .PopupCollision(c => c.Collision("flip"))
    %>


### Items(System.Action\<Kendo.Mvc.UI.Fluent.MenuItemFactory\>)
Defines the items in the menu


#### Parameters

##### addAction System.Action<[Kendo.Mvc.UI.Fluent.MenuItemFactory](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/MenuItemFactory)>
The add action.




#### Example (ASPX)
    <%= Html.Kendo().Menu()
    .Name("Menu")
    .Items(items =>
    {
        items.Add().Text("First Item");
        items.Add().Text("Second Item");
    })
    %>


### Events(System.Action\<Kendo.Mvc.UI.Fluent.MenuEventBuilder\>)
Configures the client-side events.


#### Parameters

##### clientEventsAction System.Action<[Kendo.Mvc.UI.Fluent.MenuEventBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/MenuEventBuilder)>
The client events action.




#### Example (ASPX)
    <%= Html.Kendo().Menu()
    .Name("Menu")
    .Events(events =>
        events.Open("onOpen").OnClose("onClose")
    )
    %>


### Direction(Kendo.Mvc.UI.MenuDirection)
Specifies Menu opening direction.


#### Parameters

##### value [Kendo.Mvc.UI.MenuDirection](/api/aspnet-mvc/Kendo.Mvc.UI/MenuDirection)
The desired direction.




#### Example (ASPX)
    <%= Html.Kendo().Menu()
    .Name("Menu")
    .Direction(MenuDirection.Left)
    %>


### Direction(System.String)
Specifies Menu opening direction.


#### Parameters

##### value `System.String`
The desired direction.




#### Example (ASPX)
    <%= Html.Kendo().Menu()
    .Name("Menu")
    .Direction("top")
    %>


### Orientation(Kendo.Mvc.UI.MenuOrientation)
Sets the menu orientation.


#### Parameters

##### value [Kendo.Mvc.UI.MenuOrientation](/api/aspnet-mvc/Kendo.Mvc.UI/MenuOrientation)
The desired orientation.




#### Example (ASPX)
    <%= Html.Kendo().Menu()
    .Name("Menu")
    .Orientation(MenuOrientation.Vertical)
    %>


### OpenOnClick(System.Boolean)
Enables or disables the "open-on-click" feature.




#### Example (ASPX)
    <%= Html.Kendo().Menu()
    .Name("Menu")
    .OpenOnClick(true)
    %>


### CloseOnClick(System.Boolean)
Specifies that sub menus should close after item selection (provided they won't navigate).




#### Example (ASPX)
    <%= Html.Kendo().Menu()
    .Name("Menu")
    .CloseOnClick(false)
    %>


### HoverDelay(System.Int32)
Specifies the delay in ms before the menu is opened/closed - used to avoid accidental closure on leaving.




#### Example (ASPX)
    <%= Html.Kendo().Menu()
    .Name("Menu")
    .HoverDelay(300)
    %>


### BindTo(System.String,System.Action\<Kendo.Mvc.UI.MenuItem,Kendo.Mvc.SiteMapNode\>)
Binds the menu to a sitemap


#### Parameters

##### viewDataKey `System.String`
The view data key.

##### siteMapAction System.Action<[Kendo.Mvc.UI.MenuItem](/api/aspnet-mvc/Kendo.Mvc.UI/MenuItem),Kendo.Mvc.SiteMapNode>
The action to configure the item.




#### Example (ASPX)
    <%= Html.Kendo().Menu()
    .Name("Menu")
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
    <%= Html.Kendo().Menu()
    .Name("Menu")
    .BindTo("examples")
    %>


### BindTo(System.Collections.Generic.IEnumerable\<T1\>,System.Action\<Kendo.Mvc.UI.MenuItem,T1\>)
Binds the menu to a list of objects. The menu will be "flat" which means a menu item will be created for
            every item in the data source.


#### Parameters

##### dataSource `System.Collections.Generic.IEnumerable<T1>`
The data source.

##### itemDataBound System.Action<[Kendo.Mvc.UI.MenuItem](/api/aspnet-mvc/Kendo.Mvc.UI/MenuItem),T1>
The action executed for every data bound item.




#### Example (ASPX)
    <%= Html.Kendo().Menu()
    .Name("Menu")
    .BindTo(new []{"First", "Second"}, (item, value) =>
    {
        item.Text = value;
    })
    %>


### BindTo(System.Collections.IEnumerable,System.Action\<Kendo.Mvc.UI.Fluent.NavigationBindingFactory\<Kendo.Mvc.UI.MenuItem\>\>)
Binds the menu to a list of objects. The menu will create a hierarchy of items using the specified mappings.


#### Parameters

##### dataSource `System.Collections.IEnumerable`
The data source.

##### factoryAction System.Action<[Kendo.Mvc.UI.Fluent.NavigationBindingFactory](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/NavigationBindingFactory)<Kendo.Mvc.UI.MenuItem>>
The action which will configure the mappings




#### Example (ASPX)
    <%= Html.Kendo().Menu()
    .Name("Menu")
    .BindTo(Model, mapping => mapping
        .For<Customer>(binding => binding
            .Children(c => c.Orders) // The "child" items will be bound to the the "Orders" property
            .ItemDataBound((item, c) => item.Text = c.ContactName) // Map "Customer" properties to MenuItem properties
        )
        .For<Order<(binding => binding
            .Children(o => null) // "Orders" do not have child objects so return "null"
            .ItemDataBound((item, o) => item.Text = o.OrderID.ToString()) // Map "Order" properties to MenuItem properties
        )
    )
    %>


### ItemAction(System.Action\<Kendo.Mvc.UI.MenuItem\>)
Callback for each item.


#### Parameters

##### action System.Action<[Kendo.Mvc.UI.MenuItem](/api/aspnet-mvc/Kendo.Mvc.UI/MenuItem)>
Action, which will be executed for each item.




#### Example (ASPX)
    <%= Html.Kendo().Menu()
    .Name("Menu")
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
    <%= Html.Kendo().Menu()
    .Name("Menu")
    .HighlightPath(true)
    %>


### SecurityTrimming(System.Boolean)
Enable/disable security trimming functionality of the component.


#### Parameters

##### value `System.Boolean`
If true security trimming is enabled.




#### Example (ASPX)
    <%= Html.Kendo().Menu()
    .Name("Menu")
    .SecurityTrimming(false)
    %>


### SecurityTrimming(System.Action\<Kendo.Mvc.UI.SecurityTrimmingBuilder\>)
Defines the security trimming functionality of the component


#### Parameters

##### securityTrimmingAction System.Action<[Kendo.Mvc.UI.SecurityTrimmingBuilder](/api/aspnet-mvc/Kendo.Mvc.UI/SecurityTrimmingBuilder)>
The securityTrimming action.




#### Example (ASPX)
    <%= Html.Kendo().Menu()
    .Name("Menu")
    .SecurityTrimming(builder =>
    {
        builder.Enabled(true).HideParent(true);
    })
    %>



