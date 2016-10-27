---
title: DropDownListBuilder
---

# Kendo.Mvc.UI.Fluent.DropDownListBuilder
Defines the fluent interface for configuring the DropDownList component.




## Methods


### AutoBind(System.Boolean)
Controls whether to bind the widget to the DataSource on initialization.




#### Example (ASPX)
    <%= Html.Kendo().DropDownList()
    .Name("DropDownList")
    .AutoBind(false)
    %>


### DataValueField(System.String)
Sets the field of the data item that provides the value content of the list items.




#### Example (ASPX)
    <%= Html.Kendo().DropDownList()
    .Name("DropDownList")
    .DataTextField("Text")
    .DataValueField("Value")
    %>


### Events(System.Action\<Kendo.Mvc.UI.Fluent.DropDownListEventBuilder\>)
Configures the client-side events.


#### Parameters

##### clientEventsAction System.Action<[Kendo.Mvc.UI.Fluent.DropDownListEventBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/DropDownListEventBuilder)>
The client events action.




#### Example (ASPX)
    <%= Html.Kendo().DropDownList()
    .Name("DropDownList")
    .Events(events =>
        events.Change("change")
    )
    %>


### Filter(System.String)
Use it to enable filtering of items.




#### Example (ASPX)
    <%= Html.Kendo().DropDownList()
    .Name("DropDownList")
    .Filter("startswith");
    %>


### Filter(Kendo.Mvc.UI.FilterType)
Use it to enable filtering of items.




#### Example (ASPX)
    <%= Html.Kendo().DropDownList()
    .Name("DropDownList")
    .Filter(FilterType.Contains);
    %>


### Items(System.Action\<Kendo.Mvc.UI.Fluent.DropDownListItemFactory\>)
Defines the items in the DropDownList


#### Parameters

##### addAction System.Action<[Kendo.Mvc.UI.Fluent.DropDownListItemFactory](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/DropDownListItemFactory)>
The add action.




#### Example (ASPX)
    <%= Html.Telerik().DropDownList()
    .Name("DropDownList")
    .Items(items =>
    {
        items.Add().Text("First Item");
        items.Add().Text("Second Item");
    })
    %>


### OptionLabel(System.String)
Define the text of the default empty item.




#### Example (ASPX)
    <%= Html.Kendo().DropDownList()
    .Name("DropDownList")
    .OptionLabel("Select country...")
    %>


### OptionLabel(System.Object)
Define the object of the default empty item.




#### Example (ASPX)
    <%= Html.Kendo().DropDownList()
    .Name("DropDownList")
    .DataTextField("Text")
    .DataValueField("Value")
    .OptionLabel(new { Text = "Text1", Value = "Value1" })
    %>


### MinLength(System.Int32)
Specifies the minimum number of characters that should be typed before the widget queries the dataSource.




#### Example (ASPX)
    <%= Html.Kendo().DropDownList()
    .Name("DropDownList")
    .MinLength(3)
    %>


### SelectedIndex(System.Int32)
Use it to set selected item index


#### Parameters

##### index `System.Int32`
Item index.




#### Example (ASPX)
    <%= Html.Kendo().DropDownList()
    .Name("DropDownList")
    .SelectedIndex(0);
    %>


### CascadeFrom(System.String)
Use it to set the Id of the parent DropDownList.




#### Example (ASPX)
    <%= Html.Telerik().DropDownList()
    .Name("DropDownList2")
    .CascadeFrom("DropDownList1")
    %>


### CascadeFromField(System.String)
Use it to set the field used to filter the data source.




#### Example (ASPX)
    <%= Html.Telerik().DropDownList()
    .Name("DropDownList2")
    .CascadeFrom("DropDownList1")
    .CascadeFromField("ParentID")
    %>


### Text(System.String)
Define the text of the widget, when the autoBind is set to false.




#### Example (ASPX)
    <%= Html.Telerik().DropDownList()
    .Name("DropDownList")
    .Text("Chai")
    .AutoBind(false)
    %>


### Text(System.Object)
Define the default item of the widget when the autoBind option is set to false.





### OptionLabelTemplate(System.String)
OptionLabelTemplate to be used to render the option label content.




#### Example (ASPX)
    <%= Html.Kendo().DropDownList()
    .Name("DropDownList")
    .OptionLabelTemplate("#= data #")
    %>


### OptionLabelTemplateId(System.String)
OptionLabelTemplateId to be used to render the option label content.




#### Example (ASPX)
    <%= Html.Kendo().DropDownList()
    .Name("DropDownList")
    .OptionLabelTemplateId("widgetOptionLabelTemplateId")
    %>


### ValueTemplate(System.String)
ValueTemplate to be used to render the selected value.




#### Example (ASPX)
    <%= Html.Kendo().DropDownList()
    .Name("DropDownList")
    .ValueTemplate("#= data #")
    %>


### ValueTemplateId(System.String)
ValueTemplateId to be used to render the selected value.




#### Example (ASPX)
    <%= Html.Kendo().DropDownList()
    .Name("DropDownList")
    .ValueTemplateId("widgetValueTemplateId")
    %>



