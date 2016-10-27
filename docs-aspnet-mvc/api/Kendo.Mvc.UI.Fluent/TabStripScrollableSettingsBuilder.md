---
title: TabStripScrollableSettingsBuilder
---

# Kendo.Mvc.UI.Fluent.TabStripScrollableSettingsBuilder
Defines the fluent interface for configuring Scrollable




## Methods


### Enabled(System.Boolean)
Enables or disables scrolling. By default scrolling is enabled.




#### Example (ASPX)
    <%= Html.Kendo().TabStrip()
    .Name("TabStrip")
    .Scrollable(s => s.Enabled(false))
    %>


### Distance(System.Int32)
Sets the scroll amount applied when the user clicks on a scroll button.


#### Parameters

##### pixels `System.Int32`
The scroll distance in pixels.




#### Example (ASPX)
    <%= Html.Kendo().TabStrip(Model)
    .Name("TabStrip")
    .Scrollable(s => s.Distance(200))
    %>



