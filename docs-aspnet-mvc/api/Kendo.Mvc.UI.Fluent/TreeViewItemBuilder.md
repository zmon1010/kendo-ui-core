---
title: TreeViewItemBuilder
---

# Kendo.Mvc.UI.Fluent.TreeViewItemBuilder
Defines the fluent interface for configuring child TreeView items.




## Methods


### Items(System.Action\<Kendo.Mvc.UI.Fluent.TreeViewItemFactory\>)
Configures the child items of a TreeViewItem.


#### Parameters

##### addAction System.Action<[Kendo.Mvc.UI.Fluent.TreeViewItemFactory](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/TreeViewItemFactory)>
The add action.




#### Example (ASPX)
    <%= Html.Telerik().TreeView()
    .Name("TreeView")
    .Items(items =>
    {
        items.Add().Text("First Item").Items(firstItemChildren =>
        {
            firstItemChildren.Add().Text("Child Item 1");
            firstItemChildren.Add().Text("Child Item 2");
            });
        })
    %>


### Id(System.String)
Sets the id of the item.


#### Parameters

##### value `System.String`
The id.




#### Example (ASPX)
    <%= Html.Telerik().TreeView()
    .Name("TreeView")
    .Items(items => items.Add().Id("42"))
    %>


### Expanded(System.Boolean)
Define when the item will be expanded on intial render.


#### Parameters

##### value `System.Boolean`
If true the item will be expanded.




#### Example (ASPX)
    <%= Html.Telerik().TreeView()
    .Name("TreeView")
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


### Checked(System.Boolean)
Specify whether the item should be initially checked.


#### Parameters

##### value `System.Boolean`
If true, the item will be checked.




#### Example (ASPX)
    <%= Html.Telerik().TreeView()
    .Name("TreeView")
    .Checkboxes(true)
    .Items(items =>
    {
        items.Add().Text("Item").Checked(true);
    })
    %>


### HasChildren(System.Boolean)
Sets the expand mode of the treeview item.


#### Parameters

##### value `System.Boolean`
If true then item will be loaded on demand from client side, if the treeview DataSource is properly configured.




#### Example (ASPX)
    <%= Html.Telerik().TreeView()
    .Name("TreeView")
    .Items(items =>
    {
        items.Add().Text("First Item").Items(firstItemChildren =>
        {
            firstItemChildren.Add().Text("Child Item 1");
            firstItemChildren.Add().Text("Child Item 2");
        })
        .HasChildren(true);
    })
    %>



