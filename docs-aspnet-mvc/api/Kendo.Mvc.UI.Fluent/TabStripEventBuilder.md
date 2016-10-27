---
title: TabStripEventBuilder
---

# Kendo.Mvc.UI.Fluent.TabStripEventBuilder
Defines the fluent interface for configuring the TabStrip events.




## Methods


### Show(System.Func\<System.Object,System.Object\>)
Defines the inline handler of the Show client-side event

For additional information check the [show event](/api/javascript/ui/tabstrip#events-show) documentation.


#### Parameters

##### onSelectAction `System.Func<System.Object,System.Object>`
The handler code wrapped in a text tag (Razor syntax).




#### Example (ASPX)
    <% Html.Kendo().TabStrip()
        .Name("TabStrip")
        .Events(events => events.Show(
                @<text>
                    function(e) {
                    //event handling code
                    }
                    </text>
                    ))
                    .Render();
                    %>


### Show(System.String)
Defines the name of the JavaScript function that will handle the the Show client-side event.

For additional information check the [show event](/api/javascript/ui/tabstrip#events-show) documentation.


#### Parameters

##### onSelectHandlerName `System.String`
The name of the JavaScript function that will handle the event.




#### Example (ASPX)
    <%= Html.Kendo().TabStrip()
    .Name("TabStrip")
    .Events(events => events.Show("onActivate"))
    %>


### Activate(System.Func\<System.Object,System.Object\>)
Defines the inline handler of the Activate client-side event

For additional information check the [activate event](/api/javascript/ui/tabstrip#events-activate) documentation.


#### Parameters

##### onSelectAction `System.Func<System.Object,System.Object>`
The handler code wrapped in a text tag (Razor syntax).




#### Example (ASPX)
    <% Html.Kendo().TabStrip()
        .Name("TabStrip")
        .Events(events => events.Activate(
                @<text>
                    function(e) {
                    //event handling code
                    }
                    </text>
                    ))
                    .Render();
                    %>


### Activate(System.String)
Defines the name of the JavaScript function that will handle the the Activate client-side event.

For additional information check the [activate event](/api/javascript/ui/tabstrip#events-activate) documentation.


#### Parameters

##### onSelectHandlerName `System.String`
The name of the JavaScript function that will handle the event.




#### Example (ASPX)
    <%= Html.Kendo().TabStrip()
    .Name("TabStrip")
    .Events(events => events.Activate("onActivate"))
    %>


### Select(System.Func\<System.Object,System.Object\>)
Defines the inline handler of the Select client-side event

For additional information check the [select event](/api/javascript/ui/tabstrip#events-select) documentation.


#### Parameters

##### onSelectAction `System.Func<System.Object,System.Object>`
The handler code wrapped in a text tag (Razor syntax).




#### Example (ASPX)
    <% Html.Kendo().TabStrip()
        .Name("TabStrip")
        .Events(events => events.Select(
                @<text>
                    function(e) {
                    //event handling code
                    }
                    </text>
                    ))
                    .Render();
                    %>


### Select(System.String)
Defines the name of the JavaScript function that will handle the the Select client-side event.

For additional information check the [select event](/api/javascript/ui/tabstrip#events-select) documentation.


#### Parameters

##### onSelectHandlerName `System.String`
The name of the JavaScript function that will handle the event.




#### Example (ASPX)
    <%= Html.Kendo().TabStrip()
    .Name("TabStrip")
    .Events(events => events.Select("onSelect"))
    %>


### ContentLoad(System.Func\<System.Object,System.Object\>)
Defines the inline handler of the ContentLoad client-side event

For additional information check the [contentLoad event](/api/javascript/ui/tabstrip#events-contentLoad) documentation.


#### Parameters

##### onSelectAction `System.Func<System.Object,System.Object>`
The handler code wrapped in a text tag (Razor syntax).




#### Example (ASPX)
    <% Html.Kendo().TabStrip()
        .Name("TabStrip")
        .Events(events => events.ContentLoad(
                @<text>
                    function(e) {
                    //event handling code
                    }
                    </text>
                    ))
                    .Render();
                    %>


### ContentLoad(System.String)
Defines the name of the JavaScript function that will handle the the ContentLoad client-side event.

For additional information check the [contentLoad event](/api/javascript/ui/tabstrip#events-contentLoad) documentation.


#### Parameters

##### onSelectHandlerName `System.String`
The name of the JavaScript function that will handle the event.




#### Example (ASPX)
    <%= Html.Kendo().TabStrip()
    .Name("TabStrip")
    .Events(events => events.ContentLoad("onContentLoad"))
    %>


### Error(System.Func\<System.Object,System.Object\>)
Defines the inline handler of the Error client-side event

For additional information check the [error event](/api/javascript/ui/tabstrip#events-error) documentation.


#### Parameters

##### onErrorAction `System.Func<System.Object,System.Object>`
The handler code wrapped in a text tag (Razor syntax).




#### Example (ASPX)
    <% Html.Kendo().TabStrip()
        .Name("TabStrip")
        .Events(events => events.Error(
                @<text>
                    function(e) {
                    //event handling code
                    }
                    </text>
                    ))
                    .Render();
                    %>


### Error(System.String)
Defines the name of the JavaScript function that will handle the the Error client-side event.

For additional information check the [error event](/api/javascript/ui/tabstrip#events-error) documentation.


#### Parameters

##### onErrorHandlerName `System.String`
The name of the JavaScript function that will handle the event.




#### Example (ASPX)
    <%= Html.Kendo().TabStrip()
    .Name("TabStrip")
    .Events(events => events.Error("onError"))
    %>



