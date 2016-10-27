---
title: MobileViewBuilder
---

# Kendo.Mvc.UI.Fluent.MobileViewBuilder
Defines the fluent API for configuring the Kendo MobileView for ASP.NET MVC.




## Methods


### Reload(System.Boolean)
Applicable to remote views only. If set to true, the remote view contents will be reloaded from the server (using Ajax) each time the view is navigated to.


#### Parameters

##### value `System.Boolean`
The value that configures the reload.





### Scroller(System.Object)
Configuration options to be passed to the scroller instance instantiated by the view. For more details, check the scroller configuration options.


#### Parameters

##### value `System.Object`
The value that configures the scroller.





### Stretch(System.Boolean)
If set to true, the view will stretch its child contents to occupy the entire view, while disabling kinetic scrolling.
            Useful if the view contains an image or a map.


#### Parameters

##### value `System.Boolean`
The value that configures the stretch.





### Title(System.String)
The text to display in the NavBar title (if present) and the browser title.


#### Parameters

##### value `System.String`
The value that configures the title.





### UseNativeScrolling(System.Boolean)
If set to true, the view will use the native scrolling available in the current platform. This should help with form issues on some platforms (namely Android and WP8).
            Native scrolling is only enabled on platforms that support it: iOS > 5+, Android > 3+, WP8. BlackBerry devices do support it, but the native scroller is flaky.


#### Parameters

##### value `System.Boolean`
The value that configures the usenativescrolling.





### Zoom(System.Boolean)
If set to true, the user can zoom in/out the contents of the view using the pinch/zoom gesture.


#### Parameters

##### value `System.Boolean`
The value that configures the zoom.





### Layout(System.String)
Specifies the id of the default layout


#### Parameters

##### value `System.String`
The value that configures the layout.





### Transition(System.String)
Specifies the Pane transition


#### Parameters

##### value `System.String`
The value that configures the transition.





### Header(System.Action)
Sets the HTML content which the header should display.


#### Parameters

##### value `System.Action`
The action which renders the header.





### Header(System.Func\<System.Object,System.Object\>)
Sets the HTML content which the header should display.


#### Parameters

##### value `System.Func<System.Object,System.Object>`
The content wrapped in a regular HTML tag or text tag (Razor syntax).





### Header(System.String)
Sets the HTML content which the header should display as a string.


#### Parameters

##### value `System.String`
The action which renders the header.





### Content(System.Action)
Sets the HTML content which the content should display.


#### Parameters

##### value `System.Action`
The action which renders the content.





### Content(System.Func\<System.Object,System.Object\>)
Sets the HTML content which the content should display.


#### Parameters

##### value `System.Func<System.Object,System.Object>`
The content wrapped in a regular HTML tag or text tag (Razor syntax).





### Content(System.String)
Sets the HTML content which the view content should display as a string.


#### Parameters

##### value `System.String`
The action which renders the view content.





### Footer(System.Action)
Sets the HTML content which the footer should display.


#### Parameters

##### value `System.Action`
The action which renders the footer.





### Footer(System.Func\<System.Object,System.Object\>)
Sets the HTML content which the footer should display.


#### Parameters

##### value `System.Func<System.Object,System.Object>`
The content wrapped in a regular HTML tag or text tag (Razor syntax).





### Footer(System.String)
Sets the HTML content which the footer should display as a string.


#### Parameters

##### value `System.String`
The action which renders the footer.





### Events(System.Action\<Kendo.Mvc.UI.Fluent.MobileViewEventBuilder\>)
Configures the client-side events.


#### Parameters

##### configurator System.Action<[Kendo.Mvc.UI.Fluent.MobileViewEventBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/MobileViewEventBuilder)>
The client events action.




#### Example (ASPX)
    <%= Html.Kendo().MobileView()
    .Name("MobileView")
    .Events(events => events
        .AfterShow("onAfterShow")
    )
    %>



