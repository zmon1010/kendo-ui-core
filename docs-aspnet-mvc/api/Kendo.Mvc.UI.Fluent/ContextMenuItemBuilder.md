---
title: ContextMenuItemBuilder
---

# Kendo.Mvc.UI.Fluent.ContextMenuItemBuilder
Defines the fluent interface for configuring child menu items.




## Methods


### Items(System.Action\<Kendo.Mvc.UI.Fluent.ContextMenuItemFactory\>)
Configures the child items of a ContextMenuItem.


#### Parameters

##### addAction System.Action<[Kendo.Mvc.UI.Fluent.ContextMenuItemFactory](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/ContextMenuItemFactory)>
The add action.




#### Example (ASPX)
    <%= Html.Kendo().ContextMenu()
    .Name("ContextMenu")
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
    <%= Html.Kendo().ContextMenu()
    .Name("ContextMenu")
    .Items(items =>
    {
        items.Add().Separator(true);
    })
    %>



