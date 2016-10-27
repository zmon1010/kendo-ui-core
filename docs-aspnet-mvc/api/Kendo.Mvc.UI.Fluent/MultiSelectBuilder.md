---
title: MultiSelectBuilder
---

# Kendo.Mvc.UI.Fluent.MultiSelectBuilder
Defines the fluent interface for configuring the MultiSelect component.




## Methods


### AutoBind(System.Boolean)
Controls whether to bind the widget to the DataSource on initialization.




#### Example (ASPX)
    <%= Html.Kendo().MultiSelect()
    .Name("MultiSelect")
    .AutoBind(false)
    %>


### AutoClose(System.Boolean)
Controls whether to close the widget suggestion list on item selection.




#### Example (ASPX)
    <%= Html.Kendo().MultiSelect()
    .Name("MultiSelect")
    .AutoClose(false)
    %>


### ClearButton(System.Boolean)
Use to enable or disable clear button functionality.


#### Parameters

##### enable `System.Boolean`
The boolean value.




#### Example (ASPX)
    <%= Html.Kendo().MultiSelect()
    .Name("MultiSelect")
    .ClearButton(false) //disable clear button
    %>


### DataValueField(System.String)
Sets the field of the data item that provides the value content of the list items.




#### Example (ASPX)
    <%= Html.Kendo().MultiSelect()
    .Name("MultiSelect")
    .DataTextField("Text")
    .DataValueField("Value")
    %>


### Events(System.Action\<Kendo.Mvc.UI.Fluent.MultiSelectEventBuilder\>)
Configures the client-side events.


#### Parameters

##### clientEventsAction System.Action<[Kendo.Mvc.UI.Fluent.MultiSelectEventBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/MultiSelectEventBuilder)>
The client events action.




#### Example (ASPX)
    <%= Html.Kendo().MultiSelect()
    .Name("MultiSelect")
    .Events(events =>
        events.Change("change")
    )
    %>


### Filter(System.String)
Use it to enable filtering of items.




#### Example (ASPX)
    <%= Html.Kendo().MultiSelect()
    .Name("MultiSelect")
    .Filter("startswith");
    %>


### Filter(Kendo.Mvc.UI.FilterType)
Use it to enable filtering of items.




#### Example (ASPX)
    <%= Html.Kendo().MultiSelect()
    .Name("MultiSelect")
    .Filter(FilterType.Contains);
    %>


### Items(System.Action\<Kendo.Mvc.UI.Fluent.DropDownListItemFactory\>)
Defines the items in the MultiSelect


#### Parameters

##### addAction System.Action<[Kendo.Mvc.UI.Fluent.DropDownListItemFactory](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/DropDownListItemFactory)>
The add action.




#### Example (ASPX)
    <%= Html.Telerik().MultiSelect()
    .Name("MultiSelect")
    .Items(items =>
    {
        items.Add().Text("First Item");
        items.Add().Text("Second Item");
    })
    %>


### HighlightFirst(System.Boolean)
Use it to enable highlighting of first matched item.




#### Example (ASPX)
    <%= Html.Kendo().MultiSelect()
    .Name("MultiSelect")
    .HighlightFirst(true)
    %>


### MaxSelectedItems(System.Int32)
Specifies the limit of the selected items. If set to null widget will not limit number of the selected items.




#### Example (ASPX)
    <%= Html.Kendo().MultiSelect()
    .Name("MultiSelect")
    .MinLength(3)
    %>


### MinLength(System.Int32)
Specifies the minimum number of characters that should be typed before the widget queries the dataSource.




#### Example (ASPX)
    <%= Html.Kendo().MultiSelect()
    .Name("MultiSelect")
    .MinLength(3)
    %>


### Placeholder(System.String)
A string that appears in the textbox when it has no value.




#### Example (ASPX)
    <%= Html.Kendo().MultiSelect()
    .Name("MultiSelect")
    .Placeholder("Select country...")
    %>


### ItemTemplate(System.String)
Template to be used for rendering the items in the list.




#### Example (ASPX)
    <%= Html.Kendo().MultiSelect()
    .Name("MultiSelect")
    .ItemTemplate("#= data #")
    %>


### ItemTemplateId(System.String)
TemplateId to be used for rendering the items in the list.




#### Example (ASPX)
    <%= Html.Kendo().MultiSelect()
    .Name("MultiSelect")
    .ItemTemplateId("widgetTemplateId")
    %>


### TagMode(Kendo.Mvc.UI.TagMode)
The mode used to render the selected tags. The available modes are 'single' and 'multiple'




#### Example (ASPX)
    <%= Html.Kendo().MultiSelect()
    .Name("MultiSelect")
    .TagMode(TagMode.Single)
    %>


### TagTemplate(System.String)
Template to be used for rendering the tags of the selected items.




#### Example (ASPX)
    <%= Html.Kendo().MultiSelect()
    .Name("MultiSelect")
    .TagTemplate("#= data #")
    %>


### TagTemplateId(System.String)
TemplateId to be used for rendering the tags of the selected items.




#### Example (ASPX)
    <%= Html.Kendo().MultiSelect()
    .Name("MultiSelect")
    .TagTemplateId("widgetTemplateId")
    %>


### Value(System.Collections.IEnumerable)
Sets the value of the widget.




#### Example (ASPX)
    <%= Html.Kendo().MultiSelect()
    .Name("MultiSelect")
    .Value(new string[] { "1" })
    %>



