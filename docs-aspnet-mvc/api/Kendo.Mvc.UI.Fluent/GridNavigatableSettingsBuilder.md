---
title: GridNavigatableSettingsBuilder
---

# Kendo.Mvc.UI.Fluent.GridNavigatableSettingsBuilder
Defines the fluent interface for configuring Navigatable




## Methods


### Enabled(System.Boolean)
Enables or disables keyboard navigation.




#### Example (ASPX)
    <%= Html.Kendo().Grid(Model)
    .Name("Grid")
    .Navigatable(setting => setting.Enabled((bool)ViewData["enableKeyBoardNavigation"]))
    %>



