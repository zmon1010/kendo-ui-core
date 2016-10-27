---
title: GridAllowCopyBuilder
---

# Kendo.Mvc.UI.Fluent.GridAllowCopyBuilder
Defines the fluent interface for configuring Selectable




## Methods


### Enabled(System.Boolean)
Enables or disables AllowCopy.




#### Example (ASPX)
    <%= Html.Kendo().Grid(Model)
    .Name("Grid")
    .AllowCopy(config => config.Enabled((bool)ViewData["allowCopy"]))
    %>


### Delimeter(System.String)
Specifies whether multiple or single selection is allowed.




#### Example (ASPX)
    <%= Html.Kendo().Grid(Model)
    .Name("Grid")
    .Selectable(selection => selection.Delimeter((bool)ViewData["selectionMode"]))
    %>



