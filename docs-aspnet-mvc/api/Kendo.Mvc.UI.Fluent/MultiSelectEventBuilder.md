---
title: MultiSelectEventBuilder
---

# Kendo.Mvc.UI.Fluent.MultiSelectEventBuilder
The fluent API for subscribing to Kendo UI MultiSelect events.




## Methods


### Deselect(System.Func\<System.Object,System.Object\>)
Defines the inline handler of the Deselect client-side event

For additional information check the [deselect event](/api/javascript/ui/multiselect#events-deselect) documentation.


#### Parameters

##### handler `System.Func<System.Object,System.Object>`
The handler code wrapped in a text tag (Razor syntax).




#### Example (ASPX)
    @(Html.Kendo().MultiSelect()
        .Name("MultiSelect")
        .Events(events => events.Deselect(
                @<text>
                    function(e) {
                    //event handling code
                    }
                    </text>
                    ))
                )


### Deselect(System.String)
Defines the name of the JavaScript function that will handle the the Deselect client-side event.

For additional information check the [deselect event](/api/javascript/ui/multiselect#events-deselect) documentation.


#### Parameters

##### handler `System.String`
The name of the JavaScript function that will handle the event.




#### Example (ASPX)
    @(Html.Kendo().MultiSelect()
        .Name("MultiSelect")
        .Events(events => events.Deselect("deselect"))
    )


### Select(System.Func\<System.Object,System.Object\>)
Defines the inline handler of the Select client-side event

For additional information check the [select event](/api/javascript/ui/multiselect#events-select) documentation.


#### Parameters

##### handler `System.Func<System.Object,System.Object>`
The handler code wrapped in a text tag (Razor syntax).




#### Example (ASPX)
    @(Html.Kendo().MultiSelect()
        .Name("MultiSelect")
        .Events(events => events.Select(
                @<text>
                    function(e) {
                    //event handling code
                    }
                    </text>
                    ))
                )


### Select(System.String)
Defines the name of the JavaScript function that will handle the the Select client-side event.

For additional information check the [select event](/api/javascript/ui/multiselect#events-select) documentation.


#### Parameters

##### handler `System.String`
The name of the JavaScript function that will handle the event.




#### Example (ASPX)
    @(Html.Kendo().MultiSelect()
        .Name("MultiSelect")
        .Events(events => events.Select("select"))
    )


### Change(System.Func\<System.Object,System.Object\>)
Defines the inline handler of the Change client-side event

For additional information check the [change event](/api/javascript/ui/multiselect#events-change) documentation.


#### Parameters

##### handler `System.Func<System.Object,System.Object>`
The handler code wrapped in a text tag (Razor syntax).




#### Example (ASPX)
    @(Html.Kendo().MultiSelect()
        .Name("MultiSelect")
        .Events(events => events.Change(
                @<text>
                    function(e) {
                    //event handling code
                    }
                    </text>
                    ))
                )


### Change(System.String)
Defines the name of the JavaScript function that will handle the the Change client-side event.

For additional information check the [change event](/api/javascript/ui/multiselect#events-change) documentation.


#### Parameters

##### handler `System.String`
The name of the JavaScript function that will handle the event.




#### Example (ASPX)
    @(Html.Kendo().MultiSelect()
        .Name("MultiSelect")
        .Events(events => events.Change("change"))
    )


### DataBound(System.Func\<System.Object,System.Object\>)
Defines the inline handler of the DataBound client-side event

For additional information check the [dataBound event](/api/javascript/ui/multiselect#events-dataBound) documentation.


#### Parameters

##### handler `System.Func<System.Object,System.Object>`
The handler code wrapped in a text tag (Razor syntax).




#### Example (ASPX)
    @(Html.Kendo().MultiSelect()
        .Name("MultiSelect")
        .Events(events => events.DataBound(
                @<text>
                    function(e) {
                    //event handling code
                    }
                    </text>
                    ))
                )


### DataBound(System.String)
Defines the name of the JavaScript function that will handle the the DataBound client-side event.

For additional information check the [dataBound event](/api/javascript/ui/multiselect#events-dataBound) documentation.


#### Parameters

##### handler `System.String`
The name of the JavaScript function that will handle the event.




#### Example (ASPX)
    <%= Html.Kendo().MultiSelect()
    .Name("MultiSelect")
    .Events(events => events.DataBound("dataBound"))
    %>


### Filtering(System.Func\<System.Object,System.Object\>)
Defines the inline handler of the Filtering client-side event

For additional information check the [filtering event](/api/javascript/ui/multiselect#events-filtering) documentation.


#### Parameters

##### handler `System.Func<System.Object,System.Object>`
The handler code wrapped in a text tag (Razor syntax).




#### Example (ASPX)
    @(Html.Kendo().MultiSelect()
        .Name("MultiSelect")
        .Events(events => events.Filtering(
                @<text>
                    function(e) {
                    //event handling code
                    }
                    </text>
                    ))
                )


### Filtering(System.String)
Defines the name of the JavaScript function that will handle the the Filtering client-side event.

For additional information check the [filtering event](/api/javascript/ui/multiselect#events-filtering) documentation.


#### Parameters

##### handler `System.String`
The name of the JavaScript function that will handle the event.




#### Example (ASPX)
    <%= Html.Kendo().MultiSelect()
    .Name("MultiSelect")
    .Events(events => events.Filtering("filtering"))
    %>


### Open(System.String)
Defines the name of the JavaScript function that will handle the the Open client-side event.

For additional information check the [open event](/api/javascript/ui/multiselect#events-open) documentation.


#### Parameters

##### handler `System.String`
The name of the JavaScript function that will handle the event.




#### Example (ASPX)
    @(Html.Kendo().MultiSelect()
        .Name("MultiSelect")
        .Events(events => events.Open("open"))
    )


### Open(System.Func\<System.Object,System.Object\>)
Defines the inline handler of the Open client-side event

For additional information check the [open event](/api/javascript/ui/multiselect#events-open) documentation.


#### Parameters

##### handler `System.Func<System.Object,System.Object>`
The handler code wrapped in a text tag (Razor syntax).




#### Example (ASPX)
    @(Html.Kendo().MultiSelect()
        .Name("MultiSelect")
        .Events(events => events.Open(
                @<text>
                    function(e) {
                    //event handling code
                    }
                    </text>
                    ))
                )


### Close(System.Func\<System.Object,System.Object\>)
Defines the inline handler of the Close client-side event

For additional information check the [close event](/api/javascript/ui/multiselect#events-close) documentation.


#### Parameters

##### handler `System.Func<System.Object,System.Object>`
The handler code wrapped in a text tag (Razor syntax).




#### Example (ASPX)
    @(Html.Kendo().MultiSelect()
        .Name("MultiSelect")
        .Events(events => events.Close(
                @<text>
                    function(e) {
                    //event handling code
                    }
                    </text>
                    ))
                )


### Close(System.String)
Defines the name of the JavaScript function that will handle the the Close client-side event.

For additional information check the [close event](/api/javascript/ui/multiselect#events-close) documentation.


#### Parameters

##### handler `System.String`
The name of the JavaScript function that will handle the event.




#### Example (ASPX)
    @(Html.Kendo().MultiSelect()
        .Name("MultiSelect")
        .Events(events => events.Close("close"))
    )



