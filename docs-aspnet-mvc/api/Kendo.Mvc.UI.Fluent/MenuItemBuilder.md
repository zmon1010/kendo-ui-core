---
title: MenuItemBuilder
---

# Kendo.Mvc.UI.Fluent.MenuItemBuilder
Defines the fluent interface for configuring child menu items.




## Methods


### Items(System.Action\<Kendo.Mvc.UI.Fluent.MenuItemFactory\>)
Configures the child items of a MenuItem.


#### Parameters

##### addAction System.Action<[Kendo.Mvc.UI.Fluent.MenuItemFactory](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/MenuItemFactory)>
The add action.




#### Example (ASPX)
    <%= Html.Kendo().Menu()
    .Name("Menu")
    .Items(items =>
    {
        items.Add().Text("First Item").Items(firstItemChildren =>
        {
            firstItemChildren.Add().Text("Child Item 1");
            firstItemChildren.Add().Text("Child Item 2");
            });
        })
    %>


### Separator(System.Boolean)
Renders a separator item




#### Example (ASPX)
    <%= Html.Kendo().Menu()
    .Name("Menu")
    .Items(items =>
    {
        items.Add().Separator(true);
    })
    %>



