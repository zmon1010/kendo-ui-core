---
title: MobileDrawerBuilder
---

# Kendo.Mvc.UI.Fluent.MobileDrawerBuilder
Defines the fluent API for configuring the Kendo MobileDrawer for ASP.NET MVC.




## Methods


### Container(System.String)
Specifies the content element to shift when the drawer appears. Required if the drawer is used outside of a mobile application.


#### Parameters

##### value `System.String`
The value that configures the container.





### SwipeToOpen(System.Boolean)
If set to false, swiping the view will not activate the drawer. In this case, the drawer will only be open by a designated button. should be disabled for browsers, which use side swiping gestures for back/forward navigation, such as iOS Safari. Otherwise, users should swipe from an inner part of the view, and not from the view edge.


#### Parameters

##### value `System.Boolean`
The value that configures the swipetoopen.





### SwipeToOpenViews(System.String[])
A list of the view ids on which the drawer will appear when the view is swiped. If omitted, the swipe gesture will work on all views.
            The option has effect only if swipeToOpen is set to true.


#### Parameters

##### value `System.String[]`
The value that configures the swipetoopenviews.





### Title(System.String)
The text to display in the Navbar title (if present).


#### Parameters

##### value `System.String`
The value that configures the title.





### Position(Kendo.Mvc.UI.MobileDrawerPosition)
The position of the drawer. Can be left (default) or right.


#### Parameters

##### value [Kendo.Mvc.UI.MobileDrawerPosition](/api/aspnet-mvc/Kendo.Mvc.UI/MobileDrawerPosition)
The value that configures the position.





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





### Views(System.String[])
A list of the view ids on which the drawer will appear. If omitted, the drawer can be revealed on any view in the application.


#### Parameters

##### names `System.String[]`
The list of view ids on which the drawer will appear.





### Events(System.Action\<Kendo.Mvc.UI.Fluent.MobileDrawerEventBuilder\>)
Configures the client-side events.


#### Parameters

##### configurator System.Action<[Kendo.Mvc.UI.Fluent.MobileDrawerEventBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/MobileDrawerEventBuilder)>
The client events action.




#### Example (ASPX)
    <%= Html.Kendo().MobileDrawer()
    .Name("MobileDrawer")
    .Events(events => events
        .BeforeShow("onBeforeShow")
    )
    %>



