---
title: ColorPaletteBuilder
---

# Kendo.Mvc.UI.Fluent.ColorPaletteBuilder
Defines the fluent interface for configuring the DatePickerBase component.




## Methods


### Events(System.Action\<Kendo.Mvc.UI.Fluent.SimpleColorPickerEventBuilder\>)
Configures the client-side events.


#### Parameters

##### clientEventsAction System.Action<[Kendo.Mvc.UI.Fluent.SimpleColorPickerEventBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/SimpleColorPickerEventBuilder)>
The client events action.




#### Example (ASPX)
    <%= Html.Kendo().ColorPalette()
    .Name("ColorPalette")
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
    <%= Html.Kendo().ColorPalette()
    .Name("ColorPalette")
    .Value("#ff0000")
    %>


### Columns(System.Int32)
Sets the amount of columns that should be shown


#### Parameters

##### columns `System.Int32`
The initially selected color




#### Example (ASPX)
    <%= Html.Kendo().ColorPalette()
    .Name("ColorPalette")
    .Columns(5)
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


### Palette(System.Collections.Generic.IEnumerable\<System.String\>)
Sets the range of colors that the user can pick from.


#### Parameters

##### palette `System.Collections.Generic.IEnumerable<System.String>`
A list of colors.




#### Example (ASPX)
    <%= Html.Kendo().ColorPalette()
    .Name("ColorPalette")
    .Palette(new List<string> { "#ff0000", "#00ff00", "#0000ff" })
    %>


### Palette(Kendo.Mvc.UI.ColorPickerPalette)
Sets the range of colors that the user can pick from.


#### Parameters

##### palette [Kendo.Mvc.UI.ColorPickerPalette](/api/aspnet-mvc/Kendo.Mvc.UI/ColorPickerPalette)
One of the preset palettes of colors




#### Example (ASPX)
    <%= Html.Kendo().ColorPalette()
    .Name("ColorPalette")
    .Palette(ColorPickerPalette.WebSafe)
    %>



