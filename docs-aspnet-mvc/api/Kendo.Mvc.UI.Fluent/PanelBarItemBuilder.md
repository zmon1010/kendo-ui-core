---
title: PanelBarItemBuilder
---

# Kendo.Mvc.UI.Fluent.PanelBarItemBuilder
Defines the fluent interface for configuring child panelbar items.




## Methods


### Items(System.Action\<Kendo.Mvc.UI.Fluent.PanelBarItemFactory\>)
Configures the child items of a PanelBarItem.


#### Parameters

##### addAction System.Action<[Kendo.Mvc.UI.Fluent.PanelBarItemFactory](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/PanelBarItemFactory)>
The add action.




#### Example (ASPX)
    <%= Html.Kendo().PanelBar()
    .Name("PanelBar")
    .Items(items =>
    {
        items.Add().Text("First Item").Items(firstItemChildren =>
        {
            firstItemChildren.Add().Text("Child Item 1");
            firstItemChildren.Add().Text("Child Item 2");
            });
        })
    %>


### Expanded(System.Boolean)
Define when the item will be expanded on intial render.


#### Parameters

##### value `System.Boolean`
If true the item will be expanded.




#### Example (ASPX)
    <%= Html.Kendo().PanelBar()
    .Name("PanelBar")
    .Items(items =>
    {
        items.Add().Text("First Item").Items(firstItemChildren =>
        {
            firstItemChildren.Add().Text("Child Item 1");
            firstItemChildren.Add().Text("Child Item 2");
        })
        .Expanded(true);
    })
    %>



