---
title: ListViewSelectionSettingsBuilder
---

# Kendo.Mvc.UI.Fluent.ListViewSelectionSettingsBuilder
Defines the fluent interface for configuring Selectable




## Methods


### Enabled(System.Boolean)
Enables or disables selection.




#### Example (ASPX)
    <%= Html.Kendo().ListView(Model)
    .Name("ListView")
    .Selectable(selection => selection.Enabled((bool)ViewData["enableSelection"]))
    %>


### Mode(Kendo.Mvc.UI.ListViewSelectionMode)
Specifies whether multiple or single selection is allowed.




#### Example (ASPX)
    <%= Html.Kendo().ListView(Model)
    .Name("ListView")
    .Selectable(selection => selection.Mode((bool)ViewData["selectionMode"]))
    %>



