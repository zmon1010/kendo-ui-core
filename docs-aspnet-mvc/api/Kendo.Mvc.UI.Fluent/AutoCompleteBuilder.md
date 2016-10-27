---
title: AutoCompleteBuilder
---

# Kendo.Mvc.UI.Fluent.AutoCompleteBuilder
Defines the fluent interface for configuring the AutoComplete component.




## Methods


### ClearButton(System.Boolean)
Use to enable or disable clear button functionality.


#### Parameters

##### enable `System.Boolean`
The boolean value.




#### Example (ASPX)
    <%= Html.Kendo().AutoComplete()
    .Name("AutoComplete")
    .ClearButton(false) //disable clear button
    %>


### Events(System.Action\<Kendo.Mvc.UI.Fluent.AutoCompleteEventBuilder\>)
Configures the client-side events.


#### Parameters

##### clientEventsAction System.Action<[Kendo.Mvc.UI.Fluent.AutoCompleteEventBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/AutoCompleteEventBuilder)>
The client events action.




#### Example (ASPX)
    <%= Html.Kendo().AutoComplete()
    .Name("AutoComplete")
    .Events(events =>
        events.Change("change")
    )
    %>


### Filter(System.String)
Use it to enable filtering of items.




#### Example (ASPX)
    <%= Html.Kendo().AutoComplete()
    .Name("AutoComplete")
    .Filter("startswith");
    %>


### Filter(Kendo.Mvc.UI.FilterType)
Use it to enable filtering of items.




#### Example (ASPX)
    <%= Html.Kendo().AutoComplete()
    .Name("AutoComplete")
    .Filter(FilterType.Contains);
    %>


### HighlightFirst(System.Boolean)
Use it to enable highlighting of first matched item.




#### Example (ASPX)
    <%= Html.Kendo().AutoComplete()
    .Name("AutoComplete")
    .HighlightFirst(true)
    %>


### MinLength(System.Int32)
Specifies the minimum number of characters that should be typed before the widget queries the dataSource.




#### Example (ASPX)
    <%= Html.Kendo().AutoComplete()
    .Name("AutoComplete")
    .MinLength(3)
    %>


### Placeholder(System.String)
A string that appears in the textbox when it has no value.




#### Example (ASPX)
    <%= Html.Kendo().AutoComplete()
    .Name("AutoComplete")
    .MinLength(3)
    %>


### Separator(System.String)
Sets the separator for completion. Empty by default, allowing for only one completion.




#### Example (ASPX)
    <%= Html.Kendo().AutoComplete()
    .Name("AutoComplete")
    .Separator(", ")
    %>


### Suggest(System.Boolean)
Controls whether the AutoComplete should automatically auto-type the rest of text.




#### Example (ASPX)
    <%= Html.Kendo().AutoComplete()
    .Name("AutoComplete")
    .Suggest(true)
    %>



