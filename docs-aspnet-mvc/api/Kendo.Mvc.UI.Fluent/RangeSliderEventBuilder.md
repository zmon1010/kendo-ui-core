---
title: RangeSliderEventBuilder
---

# Kendo.Mvc.UI.Fluent.RangeSliderEventBuilder
Defines the fluent interface for configuring the Events.




## Methods


### Change(System.Func\<System.Object,System.Object\>)
Defines the inline handler of the Change client-side event

For additional information check the [change event](/api/javascript/ui/rangeslider#events-change) documentation.


#### Parameters

##### handlerName `System.Func<System.Object,System.Object>`
The action defining the inline handler.




#### Example (ASPX)
    <% Html.Kendo().RangeSlider()
        .Name("RangeSlider")
        .Events(events => events.Change(() =>
        {
            %>
            function(e) {
            //event handling code
            }
            <%
            }))
            .Render();
            %>


### Change(System.String)
Defines the name of the JavaScript function that will handle the the Kendo client-side event.

For additional information check the [change event](/api/javascript/ui/rangeslider#events-change) documentation.


#### Parameters

##### handlerName `System.String`
The name of the JavaScript function that will handle the event.




#### Example (ASPX)
    <%= Html.Kendo().RangeSlider()
    .Name("RangeSlider")
    .Events(events => events.Change("change"))
    %>


### Slide(System.Func\<System.Object,System.Object\>)
Defines the inline handler of the Slide client-side event.

For additional information check the [slide event](/api/javascript/ui/rangeslider#events-slide) documentation.


#### Parameters

##### handlerName `System.Func<System.Object,System.Object>`
The action defining the inline handler.




#### Example (ASPX)
    <% Html.Kendo().RangeSlider()
        .Name("RangeSlider")
        .Events(events => events.Slide(() =>
        {
            %>
            function(e) {
            //event handling code
            }
            <%
            }))
            .Render();
            %>


### Slide(System.String)
Defines the name of the JavaScript function that will handle the the Slide client-side event.

For additional information check the [slide event](/api/javascript/ui/rangeslider#events-slide) documentation.


#### Parameters

##### handlerName `System.String`
The name of the JavaScript function that will handle the event.




#### Example (ASPX)
    <%= Html.Kendo().RangeSlider()
    .Name("RangeSlider")
    .Events(events => events.Slide("slide"))
    %>



