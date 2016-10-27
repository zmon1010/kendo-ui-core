---
title: MobileModalViewBuilder
---

# Kendo.Mvc.UI.Fluent.MobileModalViewBuilder
Defines the fluent API for configuring the Kendo MobileModalView for ASP.NET MVC.




## Methods


### Modal(System.Boolean)
When set to false, the ModalView will close when the user taps outside of its element.


#### Parameters

##### value `System.Boolean`
The value that configures the modal.





### Height(System.String)
The height of the ModalView container in pixels. If not set, the element style is used.


#### Parameters

##### value `System.String`
The value that configures the height.





### Width(System.String)
The width of the ModalView container in pixels. If not set, the element style is used.


#### Parameters

##### value `System.String`
The value that configures the width.





### Zoom(System.Boolean)
If set to true, the user can zoom in/out the contents of the view using the pinch/zoom gesture.


#### Parameters

##### value `System.Boolean`
The value that configures the zoom.





### Stretch(System.Boolean)
If set to true, the view will stretch its child contents to occupy the entire view, while disabling kinetic scrolling. Useful if the view contains an image or a map.


#### Parameters

##### value `System.Boolean`
The value that configures the stretch.





### UseNativeScrolling(System.Boolean)
(available since Q1 2013) If set to true, the view will use the native scrolling available in the current platform. This should help with form issues on some platforms (namely Android and WP8). Native scrolling is only enabled on platforms that support it: iOS > 4, Android > 2, WP8. BlackBerry devices do support it, but the native scroller is flaky.


#### Parameters

##### value `System.Boolean`
The value that configures the usenativescrolling.





### Title(System.String)
The text to display in the navbar title (if present) and the browser title.


#### Parameters

##### value `System.String`
The value that configures the title.





### Layout(System.String)
Specifies the id of the default layout


#### Parameters

##### value `System.String`
The value that configures the layout.





### Height(System.Int32)
The height of the ModalView in pixels.


#### Parameters

##### value `System.Int32`
The value that configures the height.





### Width(System.Int32)
The width of the ModalView in pixels


#### Parameters

##### value `System.Int32`
The value that configures the width.





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





### Events(System.Action\<Kendo.Mvc.UI.Fluent.MobileModalViewEventBuilder\>)
Configures the client-side events.


#### Parameters

##### configurator System.Action<[Kendo.Mvc.UI.Fluent.MobileModalViewEventBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/MobileModalViewEventBuilder)>
The client events action.




#### Example (ASPX)
    <%= Html.Kendo().MobileModalView()
    .Name("MobileModalView")
    .Events(events => events
        .Close("onClose")
    )
    %>



