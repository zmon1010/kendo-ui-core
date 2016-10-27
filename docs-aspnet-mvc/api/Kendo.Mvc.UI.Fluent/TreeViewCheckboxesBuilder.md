---
title: TreeViewCheckboxesBuilder
---

# Kendo.Mvc.UI.Fluent.TreeViewCheckboxesBuilder
Defines the fluent interface for configuring child TreeView items.




## Methods


### Enabled(System.Boolean)
Enable/disable rendering of checkboxes in the treeview.


#### Parameters

##### enabled `System.Boolean`
Whether checkboxes should be rendered.




#### Example (ASPX)
    <%= Html.Kendo().TreeView()
    .Name("TreeView")
    .Checkboxes(config => config
        .Enabled(true)
    )
    %>


### CheckChildren(System.Boolean)
Enable/disable checking of child checkboxes in the treeview.


#### Parameters

##### enabled `System.Boolean`
Whether checking of parent checkboxes should check child checkboxes.




#### Example (ASPX)
    <%= Html.Kendo().TreeView()
    .Name("TreeView")
    .Checkboxes(config => config
        .CheckChildren(true)
    )
    %>


### Template(System.String)
Client-side template to be used for rendering the items in the treeview.




#### Example (ASPX)
    <%= Html.Kendo().TreeView()
    .Name("TreeView")
    .Checkboxes(config => config
        .Template("#= data #")
    )
    %>


### TemplateId(System.String)
Id of the element that holds the client-side template to be used for rendering the items in the treeview.




#### Example (ASPX)
    <%= Html.Kendo().TreeView()
    .Name("TreeView")
    .Checkboxes(config => config
        .TemplateId("widgetTemplateId")
    )
    %>


### Name(System.String)
The name attribute of the checkbox fields. This will correlate to the name of the action method parameter that the nodes are posted to.


#### Parameters

##### name `System.String`
The string that will be used in the name attribute.




#### Example (ASPX)
    <%= Html.Kendo().TreeView()
    .Name("TreeView")
    .Checkboxes(config => config
        .Name("checkedNodes")
    )
    %>



