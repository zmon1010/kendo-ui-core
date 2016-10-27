---
title: DropDownListBuilderBase
---

# Kendo.Mvc.UI.Fluent.DropDownListBuilderBase
Defines the fluent interface for configuring the DropDownList and ComboBox components.




## Methods


### Template(System.String)
Template to be used for rendering the items in the list.




#### Example (ASPX)
    <%= Html.Kendo().DropDownList()
    .Name("DropDownList")
    .Template("#= data #")
    %>


### TemplateId(System.String)
TemplateId to be used for rendering the items in the list.




#### Example (ASPX)
    <%= Html.Kendo().DropDownList()
    .Name("DropDownList")
    .TemplateId("widgetTemplateId")
    %>


### Value(System.String)
Sets the value of the widget.




#### Example (ASPX)
    <%= Html.Kendo().DropDownList()
    .Name("DropDownList")
    .Value("1")
    %>



