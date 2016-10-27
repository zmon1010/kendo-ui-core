---
title: FlatColorPickerBuilder
---

# Kendo.Mvc.UI.Fluent.FlatColorPickerBuilder
Defines the fluent interface for configuring the DatePickerBase component.




## Methods


### Events(System.Action\<Kendo.Mvc.UI.Fluent.SimpleColorPickerEventBuilder\>)
Configures the client-side events.


#### Parameters

##### clientEventsAction System.Action<[Kendo.Mvc.UI.Fluent.SimpleColorPickerEventBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/SimpleColorPickerEventBuilder)>
The client events action.




#### Example (ASPX)
    <%= Html.Kendo().FlatColorPicker()
    .Name("FlatColorPicker")
    .Events(events =>
        events.Select("select").Change("change")
    )
    %>


### Value(System.String)
Sets the value of the picker input


#### Parameters

##### color `System.String`
The initially selected color




#### Example (ASPX)
    <%= Html.Kendo().FlatColorPicker()
    .Name("FlatColorPicker")
    .Value("#ff0000")
    %>


### Opacity(System.Boolean)
Indicates whether the picker will allow transparent colors to be picked.


#### Parameters

##### allowOpacity `System.Boolean`
Whether the user is allowed to change the color opacity.




#### Example (ASPX)
    <%= Html.Kendo().FlatColorPicker()
    .Name("FlatColorPicker")
    .Opacity(true)
    %>


### Input(System.Boolean)
Indicates whether the picker will show an input for entering colors.


#### Parameters

##### showInput `System.Boolean`
Whether the input field should be shown.




#### Example (ASPX)
    <%= Html.Kendo().FlatColorPicker()
    .Name("FlatColorPicker")
    .Input(false)
    %>


### Preview(System.Boolean)
Indicates whether the picker will show a preview of the selected color.


#### Parameters

##### showPreview `System.Boolean`
Whether the preview area should be shown.




#### Example (ASPX)
    <%= Html.Kendo().FlatColorPicker()
    .Name("FlatColorPicker")
    .Preview(false)
    %>


### Buttons(System.Boolean)
Indicates whether the picker will show apply / cancel buttons.


#### Parameters

##### showButtons `System.Boolean`
Whether the buttons should be shown.




#### Example (ASPX)
    <%= Html.Kendo().FlatColorPicker()
    .Name("FlatColorPicker")
    .Buttons(false)
    %>



