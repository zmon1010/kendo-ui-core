---
title: ColorPickerEventBuilder
---

# Kendo.Mvc.UI.Fluent.ColorPickerEventBuilder
Defines the fluent interface for configuring ColorPicker client events.




## Methods


### Change(System.Func\<System.Object,System.Object\>)
Defines the inline handler of the Change client-side event

For additional information check the [change event](/api/javascript/ui/colorpicker#events-change) documentation.


#### Parameters

##### handler `System.Func<System.Object,System.Object>`
The handler code wrapped in a text tag (Razor syntax).




#### Example (ASPX)
    @(Html.Kendo().ColorPicker()
        .Name("ColorPicker")
        .Events(events => events.Change(
                @<text>
                    function(e) {
                    // event handling code
                    }
                    </text>
                    ))
                )


### Change(System.String)
Defines the name of the JavaScript function that will handle the the Change client-side event.

For additional information check the [change event](/api/javascript/ui/colorpicker#events-change) documentation.


#### Parameters

##### handler `System.String`
The name of the JavaScript function that will handle the event.




#### Example (ASPX)
    @(Html.Kendo().ColorPicker()
        .Name("ColorPicker")
        .Events(events => events.Change("change"))
    )


### Select(System.Func\<System.Object,System.Object\>)
Defines the inline handler of the Select client-side event

For additional information check the [select event](/api/javascript/ui/colorpicker#events-select) documentation.


#### Parameters

##### handler `System.Func<System.Object,System.Object>`
The handler code wrapped in a text tag (Razor syntax).




#### Example (ASPX)
    @(Html.Kendo().ColorPicker()
        .Name("ColorPicker")
        .Events(events => events.Select(
                @<text>
                    function(e) {
                    // event handling code
                    }
                    </text>
                    ))
                )


### Select(System.String)
Defines the name of the JavaScript function that will handle the the Select client-side event.

For additional information check the [select event](/api/javascript/ui/colorpicker#events-select) documentation.


#### Parameters

##### handler `System.String`
The name of the JavaScript function that will handle the event.




#### Example (ASPX)
    @(Html.Kendo().ColorPicker()
        .Name("ColorPicker")
        .Events(events => events.Select("change"))
    )


### Open(System.Func\<System.Object,System.Object\>)
Defines the inline handler of the Open client-side event

For additional information check the [open event](/api/javascript/ui/colorpicker#events-open) documentation.


#### Parameters

##### handler `System.Func<System.Object,System.Object>`
The handler code wrapped in a text tag (Razor syntax).




#### Example (ASPX)
    @(Html.Kendo().ColorPicker()
        .Name("ColorPicker")
        .Events(events => events.Open(
                @<text>
                    function(e) {
                    // event handling code
                    }
                    </text>
                    ))
                )


### Open(System.String)
Defines the name of the JavaScript function that will handle the the Open client-side event.

For additional information check the [open event](/api/javascript/ui/colorpicker#events-open) documentation.


#### Parameters

##### handler `System.String`
The name of the JavaScript function that will handle the event.




#### Example (ASPX)
    @(Html.Kendo().ColorPicker()
        .Name("ColorPicker")
        .Events(events => events.Open("open"))
    )


### Close(System.Func\<System.Object,System.Object\>)
Defines the inline handler of the Close client-side event

For additional information check the [close event](/api/javascript/ui/colorpicker#events-close) documentation.


#### Parameters

##### handler `System.Func<System.Object,System.Object>`
The handler code wrapped in a text tag (Razor syntax).




#### Example (ASPX)
    @(Html.Kendo().ColorPicker()
        .Name("ColorPicker")
        .Events(events => events.Close(
                @<text>
                    function(e) {
                    // event handling code
                    }
                    </text>
                    ))
                )


### Close(System.String)
Defines the name of the JavaScript function that will handle the the Close client-side event.

For additional information check the [close event](/api/javascript/ui/colorpicker#events-close) documentation.


#### Parameters

##### handler `System.String`
The name of the JavaScript function that will handle the event.




#### Example (ASPX)
    @(Html.Kendo().ColorPicker()
        .Name("ColorPicker")
        .Events(events => events.Close("close"))
    )



