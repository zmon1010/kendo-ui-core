---
title: DropDownListItemBuilder
---

# Kendo.Mvc.UI.Fluent.DropDownListItemBuilder
Defines the fluent interface for configuring child DropDonwList items.




## Methods


### Text(System.String)
Sets the value for the item.


#### Parameters

##### value `System.String`
The value.




#### Example (ASPX)
    <%= Html.Kendo().DropDownList()
    .Name("DropDownList")
    .Items(items => items.Add().Text("First item."))
    %>


### Value(System.String)
Sets the value for the item.


#### Parameters

##### value `System.String`
The value.




#### Example (ASPX)
    <%= Html.Kendo().DropDownList()
    .Name("DropDownList")
    .Items(items => items.Add().Value("1"))
    %>


### Selected(System.Boolean)
Define when the item will be expanded on intial render.


#### Parameters

##### value `System.Boolean`
If true the item will be selected.




#### Example (ASPX)
    <%= Html.Kendo().DropDownList()
    .Name("DropDownList")
    .Items(items =>
    {
        items.Add().Text("First Item").Selected(true);
    })
    %>



