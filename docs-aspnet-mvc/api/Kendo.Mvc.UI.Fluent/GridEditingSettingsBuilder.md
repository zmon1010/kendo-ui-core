---
title: GridEditingSettingsBuilder
---

# Kendo.Mvc.UI.Fluent.GridEditingSettingsBuilder
Defines the fluent interface for configuring grid editing.




## Methods


### Enabled(System.Boolean)
Enables or disables grid editing.




#### Example (ASPX)
    <%= Html.Kendo().Grid<Order>()
    .Name("Orders")
    .Editable(settings => settings.Enabled(true))
    %>


### TemplateName(System.String)
Specify an editor template to be used in PopUp edit mode


#### Parameters

##### templateName `System.String`
name of the editor template





### AdditionalViewData(System.Object)
Provides additional view data in the editor template.


#### Parameters

##### additionalViewData `System.Object`
An anonymous object which contains the additional data




#### Example (ASPX)
    <%= Html.Kendo().Grid(Model)
    .Name("Grid")
    .Editable(editing => editing.AdditionalViewData(new { customers = Model.Customers }))
    %>


### DisplayDeleteConfirmation(System.Boolean)
Enables or disables delete confirmation.




#### Example (ASPX)
    <%= Html.Kendo().Grid<Order>()
    .Name("Orders")
    .Editable(settings => settings.DisplayDeleteConfirmation(true))
    %>


### ConfirmDelete(System.String)
Change default text for confirm delete button. Note: Available only on mobile devices.




#### Example (ASPX)
    <%= Html.Kendo().Grid<Order>()
    .Name("Orders")
    .Editable(settings => settings.ConfirmDelete("Yes"))
    %>


### CancelDelete(System.String)
Change default text for cancel delete button. Note: Available only on mobile devices.




#### Example (ASPX)
    <%= Html.Kendo().Grid<Order>()
    .Name("Orders")
    .Editable(settings => settings.ConfirmDelete("No"))
    %>


### CreateAt(Kendo.Mvc.UI.GridInsertRowPosition)
Sets insert row position.




#### Example (ASPX)
    <%= Html.Kendo().Grid<Order>()
    .Name("Orders")
    .Editable(settings => settings.CreateAt(GridInsertRowPosition.Bottom))
    %>



