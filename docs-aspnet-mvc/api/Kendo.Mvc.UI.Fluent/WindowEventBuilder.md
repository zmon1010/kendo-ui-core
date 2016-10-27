---
title: WindowEventBuilder
---

# Kendo.Mvc.UI.Fluent.WindowEventBuilder
Defines the fluent interface for configuring the Window events.




## Methods


### Open(System.String)
Defines the name of the JavaScript function that will handle the the Open client-side event.

For additional information check the [open event](/api/javascript/ui/window#events-open) documentation.


#### Parameters

##### handler `System.String`
The name of the JavaScript function that will handle the event.




#### Example (ASPX)
    <%= Html.Kendo().Window()
    .Name("Window")
    .Events(events => events.Open("onOpen"))
    %>


### Open(System.Func\<System.Object,System.Object\>)
Defines the name of the JavaScript function that will handle the the Open client-side event.

For additional information check the [open event](/api/javascript/ui/window#events-open) documentation.


#### Parameters

##### handler `System.Func<System.Object,System.Object>`
The name of the JavaScript function that will handle the event.




#### Example (ASPX)
    <%= Html.Kendo().Window()
    .Name("Window")
    .Events(events => events.Open("onOpen"))
    %>


### Activate(System.String)
Defines the name of the JavaScript function that will handle the the Activate client-side event.

For additional information check the [activate event](/api/javascript/ui/window#events-activate) documentation.


#### Parameters

##### handler `System.String`
The name of the JavaScript function that will handle the event.




#### Example (ASPX)
    <%= Html.Kendo().Window()
    .Name("Window")
    .Events(events => events.Activate("onActivate"))
    %>


### Activate(System.Func\<System.Object,System.Object\>)
Defines the name of the JavaScript function that will handle the the Activate client-side event.

For additional information check the [activate event](/api/javascript/ui/window#events-activate) documentation.


#### Parameters

##### handler `System.Func<System.Object,System.Object>`
The name of the JavaScript function that will handle the event.




#### Example (ASPX)
    <%= Html.Kendo().Window()
    .Name("Window")
    .Events(events => events.Activate("onActivate"))
    %>


### Deactivate(System.String)
Defines the name of the JavaScript function that will handle the the Deactivate client-side event.

For additional information check the [deactivate event](/api/javascript/ui/window#events-deactivate) documentation.


#### Parameters

##### handler `System.String`
The name of the JavaScript function that will handle the event.




#### Example (ASPX)
    <%= Html.Kendo().Window()
    .Name("Window")
    .Events(events => events.Deactivate("onDeactivate"))
    %>


### Deactivate(System.Func\<System.Object,System.Object\>)
Defines the name of the JavaScript function that will handle the the Deactivate client-side event.

For additional information check the [deactivate event](/api/javascript/ui/window#events-deactivate) documentation.


#### Parameters

##### handler `System.Func<System.Object,System.Object>`
The name of the JavaScript function that will handle the event.




#### Example (ASPX)
    <%= Html.Kendo().Window()
    .Name("Window")
    .Events(events => events.Deactivate("onDeactivate"))
    %>


### Close(System.String)
Defines the name of the JavaScript function that will handle the the Close client-side event.

For additional information check the [close event](/api/javascript/ui/window#events-close) documentation.


#### Parameters

##### handler `System.String`
The name of the JavaScript function that will handle the event.




#### Example (ASPX)
    <%= Html.Kendo().Window()
    .Name("Window")
    .Events(events => events.Close("onClose"))
    %>


### Close(System.Func\<System.Object,System.Object\>)
Defines the name of the JavaScript function that will handle the the Close client-side event.

For additional information check the [close event](/api/javascript/ui/window#events-close) documentation.


#### Parameters

##### handler `System.Func<System.Object,System.Object>`
The name of the JavaScript function that will handle the event.




#### Example (ASPX)
    <%= Html.Kendo().Window()
    .Name("Window")
    .Events(events => events.Close("onClose"))
    %>


### DragStart(System.String)
Defines the name of the JavaScript function that will handle the the DragStart client-side event.

For additional information check the [dragStart event](/api/javascript/ui/window#events-dragStart) documentation.


#### Parameters

##### handler `System.String`
The name of the JavaScript function that will handle the event.




#### Example (ASPX)
    <%= Html.Kendo().Window()
    .Name("Window")
    .Events(events => events.DragStart("onDragStart"))
    %>


### DragStart(System.Func\<System.Object,System.Object\>)
Defines the name of the JavaScript function that will handle the the DragStart client-side event.

For additional information check the [dragStart event](/api/javascript/ui/window#events-dragStart) documentation.


#### Parameters

##### handler `System.Func<System.Object,System.Object>`
The name of the JavaScript function that will handle the event.




#### Example (ASPX)
    <%= Html.Kendo().Window()
    .Name("Window")
    .Events(events => events.DragStart("onDragStart"))
    %>


### DragEnd(System.String)
Defines the name of the JavaScript function that will handle the the DragEnd client-side event.

For additional information check the [dragEnd event](/api/javascript/ui/window#events-dragEnd) documentation.


#### Parameters

##### handler `System.String`
The name of the JavaScript function that will handle the event.




#### Example (ASPX)
    <%= Html.Kendo().Window()
    .Name("Window")
    .Events(events => events.DragEnd("onDragEnd"))
    %>


### DragEnd(System.Func\<System.Object,System.Object\>)
Defines the name of the JavaScript function that will handle the the DragEnd client-side event.

For additional information check the [dragEnd event](/api/javascript/ui/window#events-dragEnd) documentation.


#### Parameters

##### handler `System.Func<System.Object,System.Object>`
The name of the JavaScript function that will handle the event.




#### Example (ASPX)
    <%= Html.Kendo().Window()
    .Name("Window")
    .Events(events => events.DragEnd("onDragEnd"))
    %>


### Resize(System.String)
Defines the name of the JavaScript function that will handle the the Resize client-side event.

For additional information check the [resize event](/api/javascript/ui/window#events-resize) documentation.


#### Parameters

##### handler `System.String`
The name of the JavaScript function that will handle the event.




#### Example (ASPX)
    <%= Html.Kendo().Window()
    .Name("Window")
    .Events(events => events.Resize("onResize"))
    %>


### Resize(System.Func\<System.Object,System.Object\>)
Defines the name of the JavaScript function that will handle the the Resize client-side event.

For additional information check the [resize event](/api/javascript/ui/window#events-resize) documentation.


#### Parameters

##### handler `System.Func<System.Object,System.Object>`
The name of the JavaScript function that will handle the event.




#### Example (ASPX)
    <%= Html.Kendo().Window()
    .Name("Window")
    .Events(events => events.Resize("onResize"))
    %>


### Refresh(System.String)
Defines the name of the JavaScript function that will handle the the Refresh client-side event.

For additional information check the [refresh event](/api/javascript/ui/window#events-refresh) documentation.


#### Parameters

##### handler `System.String`
The name of the JavaScript function that will handle the event.




#### Example (ASPX)
    <%= Html.Kendo().Window()
    .Name("Window")
    .Events(events => events.Refresh("onRefresh"))
    %>


### Refresh(System.Func\<System.Object,System.Object\>)
Defines the name of the JavaScript function that will handle the the Refresh client-side event.

For additional information check the [refresh event](/api/javascript/ui/window#events-refresh) documentation.


#### Parameters

##### handler `System.Func<System.Object,System.Object>`
The name of the JavaScript function that will handle the event.




#### Example (ASPX)
    <%= Html.Kendo().Window()
    .Name("Window")
    .Events(events => events.Refresh("onRefresh"))
    %>


### Error(System.String)
Defines the name of the JavaScript function that will handle the the Error client-side event.

For additional information check the [error event](/api/javascript/ui/window#events-error) documentation.


#### Parameters

##### handler `System.String`
The name of the JavaScript function that will handle the event.




#### Example (ASPX)
    <%= Html.Kendo().Window()
    .Name("Window")
    .Events(events => events.Error("onError"))
    %>


### Error(System.Func\<System.Object,System.Object\>)
Defines the name of the JavaScript function that will handle the the Error client-side event.

For additional information check the [error event](/api/javascript/ui/window#events-error) documentation.


#### Parameters

##### handler `System.Func<System.Object,System.Object>`
The name of the JavaScript function that will handle the event.




#### Example (ASPX)
    <%= Html.Kendo().Window()
    .Name("Window")
    .Events(events => events.Error("onError"))
    %>


### Minimize(System.String)
Defines the name of the JavaScript function that will handle the the Minimize client-side event.

For additional information check the [minimize event](/api/javascript/ui/window#events-minimize) documentation.


#### Parameters

##### handler `System.String`
The name of the JavaScript function that will handle the event.




#### Example (ASPX)
    <%= Html.Kendo().Window()
    .Name("Window")
    .Events(events => events.Minimize("onMinimize"))
    %>


### Minimize(System.Func\<System.Object,System.Object\>)
Defines the name of the JavaScript function that will handle the the Minimize client-side event.

For additional information check the [minimize event](/api/javascript/ui/window#events-minimize) documentation.


#### Parameters

##### handler `System.Func<System.Object,System.Object>`
The name of the JavaScript function that will handle the event.




#### Example (ASPX)
    <%= Html.Kendo().Window()
    .Name("Window")
    .Events(events => events.Minimize("onMinimize"))
    %>


### Maximize(System.String)
Defines the name of the JavaScript function that will handle the the Maximize client-side event.

For additional information check the [maximize event](/api/javascript/ui/window#events-maximize) documentation.


#### Parameters

##### handler `System.String`
The name of the JavaScript function that will handle the event.




#### Example (ASPX)
    <%= Html.Kendo().Window()
    .Name("Window")
    .Events(events => events.Maximize("onMaximize"))
    %>


### Maximize(System.Func\<System.Object,System.Object\>)
Defines the name of the JavaScript function that will handle the the Maximize client-side event.

For additional information check the [maximize event](/api/javascript/ui/window#events-maximize) documentation.


#### Parameters

##### handler `System.Func<System.Object,System.Object>`
The name of the JavaScript function that will handle the event.




#### Example (ASPX)
    <%= Html.Kendo().Window()
    .Name("Window")
    .Events(events => events.Maximize("onMaximize"))
    %>



