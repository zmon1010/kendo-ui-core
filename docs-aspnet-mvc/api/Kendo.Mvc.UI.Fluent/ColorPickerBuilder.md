---
title: ColorPickerBuilder
---

# Kendo.Mvc.UI.Fluent.ColorPickerBuilder
Defines the fluent interface for configuring the DatePickerBase component.




## Methods


### Buttons(System.Boolean)
Specifies whether the widget should display the Apply / Cancel buttons.Applicable only for the HSV selector, when a pallete is not specified.


#### Parameters

##### value `System.Boolean`
The value that configures the buttons.





### Columns(System.Double)
The number of columns to show in the color dropdown when a pallete is specified.
            This is automatically initialized for the "basic" and "websafe" palettes.
            If you use a custom palette then you can set this to some value that makes sense for your colors.


#### Parameters

##### value `System.Double`
The value that configures the columns.





### Messages(System.Action\<Kendo.Mvc.UI.Fluent.ColorPickerMessagesSettingsBuilder\>)
Allows localization of the strings that are used in the widget.


#### Parameters

##### configurator System.Action<[Kendo.Mvc.UI.Fluent.ColorPickerMessagesSettingsBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/ColorPickerMessagesSettingsBuilder)>
The action that configures the messages.





### Opacity(System.Boolean)
Only for the HSV selector.  If true, the widget will display the opacity slider.
            Note that currently in HTML5 the <input type="color"> does not support opacity.


#### Parameters

##### value `System.Boolean`
The value that configures the opacity.





### Preview(System.Boolean)
Only applicable for the HSV selector.Displays the color preview element, along with an input field where the end user can paste a color in a CSS-supported notation.


#### Parameters

##### value `System.Boolean`
The value that configures the preview.





### ToolIcon(System.String)
A CSS class name to display an icon in the color picker button.  If
            specified, the HTML for the element will look like this:


#### Parameters

##### value `System.String`
The value that configures the toolicon.





### Value(System.String)
The initially selected color.
            Note that when initializing the widget from an <input> element, the initial color will be decided by the field instead.


#### Parameters

##### value `System.String`
The value that configures the value.





### Events(System.Action\<Kendo.Mvc.UI.Fluent.ColorPickerEventBuilder\>)
Configures the client-side events.


#### Parameters

##### clientEventsAction System.Action<[Kendo.Mvc.UI.Fluent.ColorPickerEventBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/ColorPickerEventBuilder)>
The client events action.




#### Example (ASPX)
    <%= Html.Kendo().ColorPicker()
    .Name("ColorPicker")
    .Events(events =>
        events.Select("select").Change("change")
    )
    %>


### Palette(System.Collections.Generic.IEnumerable\<System.String\>)
Sets the range of colors that the user can pick from.


#### Parameters

##### palette `System.Collections.Generic.IEnumerable<System.String>`
A list of colors.




#### Example (ASPX)
    <%= Html.Kendo().ColorPicker()
    .Name("ColorPicker")
    .Palette(new List<string> { "#ff0000", "#00ff00", "#0000ff" })
    %>


### Palette(Kendo.Mvc.UI.ColorPickerPalette)
Sets the range of colors that the user can pick from.


#### Parameters

##### palette [Kendo.Mvc.UI.ColorPickerPalette](/api/aspnet-mvc/Kendo.Mvc.UI/ColorPickerPalette)
One of the preset palettes of colors




#### Example (ASPX)
    <%= Html.Kendo().ColorPicker()
    .Name("ColorPicker")
    .Palette(ColorPickerPalette.WebSafe)
    %>


### Enable(System.Boolean)
Enables or disables the picker.


#### Parameters

##### value `System.Boolean`
Whether the picker is enabled




#### Example (ASPX)
    <%= Html.Kendo().ColorPicker()
    .Name("ColorPicker")
    .Enable(false)
    %>


### TileSize(System.Int32)
Sets the size of the palette tiles


#### Parameters

##### tileSize `System.Int32`
The tile size (for square tiles)




#### Example (ASPX)
    <%= Html.Kendo().ColorPalette()
    .Name("ColorPalette")
    .TileSize(32)
    %>


### TileSize(System.Action\<Kendo.Mvc.UI.Fluent.PaletteSizeBuilder\>)
Sets the size of the palette tiles


#### Parameters

##### columns System.Action<[Kendo.Mvc.UI.Fluent.PaletteSizeBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/PaletteSizeBuilder)>
The tile size (for square tiles)




#### Example (ASPX)
    <%= Html.Kendo().ColorPalette()
    .Name("ColorPalette")
    .TileSize(s => s.Width(20).Height(10))
    %>



