---
title: SplitterEventBuilder
---

# Kendo.Mvc.UI.Fluent.SplitterEventBuilder
Defines the fluent API for configuring the Kendo Splitter for ASP.NET MVC events




## Methods


### Resize(System.Func\<System.Object,System.Object\>)
Defines the inline handler of the Resize client-side event

For additional information check the [resize event](/api/javascript/ui/splitter#events-resize) documentation.


#### Parameters

##### onResizeInlineCodeBlock `System.Func<System.Object,System.Object>`
The handler code wrapped in a text tag (Razor syntax).




#### Example (ASPX)
    <% Html.Kendo().Splitter()
        .Name("Splitter")
        .Events(events => events.Resize(
                @<text>
                    function(e) {
                    //event handling code
                    }
                    </text>
                    ))
                    .Render();
                    %>


### Resize(System.String)
Defines the name of the JavaScript function that will handle the the Resize client-side event.

For additional information check the [resize event](/api/javascript/ui/splitter#events-resize) documentation.


#### Parameters

##### onResizeHandlerName `System.String`
The name of the JavaScript function that will handle the event.




#### Example (ASPX)
    <%= Html.Kendo().Splitter()
    .Name("Splitter")
    .Events(events => events.Resize("onResize"))
    %>


### Expand(System.Func\<System.Object,System.Object\>)
Defines the inline handler of the Expand client-side event

For additional information check the [expand event](/api/javascript/ui/splitter#events-expand) documentation.


#### Parameters

##### onExpandInlineCodeBlock `System.Func<System.Object,System.Object>`
The handler code wrapped in a text tag (Razor syntax).




#### Example (ASPX)
    <% Html.Kendo().Splitter()
        .Name("Splitter")
        .Events(events => events.Expand(
                @<text>
                    function(e) {
                    //event handling code
                    }
                    </text>
                    ))
                    .Render();
                    %>


### Expand(System.String)
Defines the name of the JavaScript function that will handle the the Expand client-side event.

For additional information check the [expand event](/api/javascript/ui/splitter#events-expand) documentation.


#### Parameters

##### onExpandHandlerName `System.String`
The name of the JavaScript function that will handle the event.




#### Example (ASPX)
    <%= Html.Kendo().Splitter()
    .Name("Splitter")
    .Events(events => events.Expand("onExpand"))
    %>


### Collapse(System.Func\<System.Object,System.Object\>)
Defines the inline handler of the Collapse client-side event

For additional information check the [collapse event](/api/javascript/ui/splitter#events-collapse) documentation.


#### Parameters

##### onCollapseInlineCodeBlock `System.Func<System.Object,System.Object>`
The handler code wrapped in a text tag (Razor syntax).




#### Example (ASPX)
    <% Html.Kendo().Splitter()
        .Name("Splitter")
        .Events(events => events.Collapse(
                @<text>
                    function(e) {
                    //event handling code
                    }
                    </text>
                    ))
                    .Render();
                    %>


### Collapse(System.String)
Defines the name of the JavaScript function that will handle the the Collapse client-side event.

For additional information check the [collapse event](/api/javascript/ui/splitter#events-collapse) documentation.


#### Parameters

##### onCollapseHandlerName `System.String`
The name of the JavaScript function that will handle the event.




#### Example (ASPX)
    <%= Html.Kendo().Splitter()
    .Name("Splitter")
    .Events(events => events.Collapse("onCollapse"))
    %>


### ContentLoad(System.Func\<System.Object,System.Object\>)
Defines the inline handler of the ContentLoad client-side event

For additional information check the [contentLoad event](/api/javascript/ui/splitter#events-contentLoad) documentation.


#### Parameters

##### onContentLoadInlineCodeBlock `System.Func<System.Object,System.Object>`
The handler code wrapped in a text tag (Razor syntax).




#### Example (ASPX)
    <% Html.Kendo().Splitter()
        .Name("Splitter")
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

For additional information check the [contentLoad event](/api/javascript/ui/splitter#events-contentLoad) documentation.


#### Parameters

##### onContentLoadHandlerName `System.String`
The name of the JavaScript function that will handle the event.




#### Example (ASPX)
    <%= Html.Kendo().Splitter()
    .Name("Splitter")
    .Events(events => events.ContentLoad("onContentLoad"))
    %>


### Error(System.Func\<System.Object,System.Object\>)
Defines the inline handler of the Error client-side event

For additional information check the [error event](/api/javascript/ui/splitter#events-error) documentation.


#### Parameters

##### handler `System.Func<System.Object,System.Object>`
The handler code wrapped in a text tag (Razor syntax).




#### Example (ASPX)
    <% Html.Kendo().Splitter()
        .Name("Splitter")
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

For additional information check the [error event](/api/javascript/ui/splitter#events-error) documentation.


#### Parameters

##### handler `System.String`
The name of the JavaScript function that will handle the event.




#### Example (ASPX)
    <%= Html.Kendo().Splitter()
    .Name("Splitter")
    .Events(events => events.Error("onError"))
    %>



