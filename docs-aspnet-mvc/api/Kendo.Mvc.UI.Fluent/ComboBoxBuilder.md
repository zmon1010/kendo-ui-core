---
title: ComboBoxBuilder
---

# Kendo.Mvc.UI.Fluent.ComboBoxBuilder
Defines the fluent interface for configuring the ComboBox component.




## Methods


### AutoBind(System.Boolean)
Controls whether to bind the widget to the DataSource on initialization.




#### Example (ASPX)
    <%= Html.Kendo().ComboBox()
    .Name("ComboBox")
    .AutoBind(false)
    %>


### ClearButton(System.Boolean)
Use to enable or disable clear button functionality.


#### Parameters

##### enable `System.Boolean`
The boolean value.




#### Example (ASPX)
    <%= Html.Kendo().ComboBox()
    .Name("ComboBox")
    .ClearButton(false) //disable clear button
    %>


### DataValueField(System.String)
Sets the field of the data item that provides the value content of the list items.




#### Example (ASPX)
    <%= Html.Kendo().DropDownList()
    .Name("DropDownList")
    .DataTextField("Text")
    .DataValueField("Value")
    %>


### Events(System.Action\<Kendo.Mvc.UI.Fluent.ComboBoxEventBuilder\>)
Configures the client-side events.


#### Parameters

##### clientEventsAction System.Action<[Kendo.Mvc.UI.Fluent.ComboBoxEventBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/ComboBoxEventBuilder)>
The client events action.




#### Example (ASPX)
    <%= Html.Kendo().ComboBox()
    .Name("ComboBox")
    .Events(events =>
        events.Change("change")
    )
    %>


### Filter(System.String)
Use it to enable filtering of items.




#### Example (ASPX)
    <%= Html.Kendo().ComboBox()
    .Name("ComboBox")
    .Filter("startswith");
    %>


### Filter(Kendo.Mvc.UI.FilterType)
Use it to enable filtering of items.




#### Example (ASPX)
    <%= Html.Kendo().ComboBox()
    .Name("ComboBox")
    .Filter(FilterType.Contains);
    %>


### Items(System.Action\<Kendo.Mvc.UI.Fluent.DropDownListItemFactory\>)
Defines the items in the ComboBox


#### Parameters

##### addAction System.Action<[Kendo.Mvc.UI.Fluent.DropDownListItemFactory](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/DropDownListItemFactory)>
The add action.




#### Example (ASPX)
    <%= Html.Telerik().ComboBox()
    .Name("ComboBox")
    .Items(items =>
    {
        items.Add().Text("First Item");
        items.Add().Text("Second Item");
    })
    %>


### HighlightFirst(System.Boolean)
Use it to enable highlighting of first matched item.




#### Example (ASPX)
    <%= Html.Kendo().ComboBox()
    .Name("ComboBox")
    .HighlightFirst(true)
    %>


### MinLength(System.Int32)
Specifies the minimum number of characters that should be typed before the widget queries the dataSource.




#### Example (ASPX)
    <%= Html.Kendo().ComboBox()
    .Name("ComboBox")
    .MinLength(3)
    %>


### SelectedIndex(System.Int32)
Use it to set selected item index


#### Parameters

##### index `System.Int32`
Item index.




#### Example (ASPX)
    <%= Html.Kendo().ComboBox()
    .Name("ComboBox")
    .SelectedIndex(0);
    %>


### Suggest(System.Boolean)
Controls whether the ComboBox should automatically auto-type the rest of text.




#### Example (ASPX)
    <%= Html.Kendo().ComboBox()
    .Name("ComboBox")
    .Suggest(true)
    %>


### Placeholder(System.String)
A string that appears in the textbox when it has no value.




#### Example (ASPX)
    <%= Html.Kendo().ComboBox()
    .Name("ComboBox")
    .Placeholder("Select country...")
    %>


### CascadeFrom(System.String)
Use it to set the Id of the parent ComboBox.




#### Example (ASPX)
    <%= Html.Telerik().ComboBox()
    .Name("ComboBox2")
    .CascadeFrom("ComboBox1")
    %>


### CascadeFromField(System.String)
Use it to set the field used to filter the data source.




#### Example (ASPX)
    <%= Html.Telerik().ComboBox()
    .Name("ComboBox2")
    .CascadeFrom("ComboBox1")
    .CascadeFromField("ParentID")
    %>


### Text(System.String)
Define the text of the widget, when the autoBind is set to false.




#### Example (ASPX)
    <%= Html.Telerik().ComboBox()
    .Name("ComboBox")
    .Text("Chai")
    .AutoBind(false)
    %>



