---
title: MobileCollapsibleBuilder
---

# Kendo.Mvc.UI.Fluent.MobileCollapsibleBuilder
Defines the fluent API for configuring the Kendo MobileCollapsible for ASP.NET MVC.




## Methods


### Animation(System.Boolean)
Turns on or off the animation of the widget.


#### Parameters

##### value `System.Boolean`
The value that configures the animation.





### Collapsed(System.Boolean)
If set to false the widget content will be expanded initially. The content of the widget is collapsed by default.


#### Parameters

##### value `System.Boolean`
The value that configures the collapsed.





### ExpandIcon(System.String)
Sets the icon for the header of the collapsible widget when it is in a expanded state.


#### Parameters

##### value `System.String`
The value that configures the expandicon.





### Inset(System.Boolean)
Forces inset appearance - the collapsible panel is padded from the View and receives rounded corners.


#### Parameters

##### value `System.Boolean`
The value that configures the inset.





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





### Events(System.Action\<Kendo.Mvc.UI.Fluent.MobileCollapsibleEventBuilder\>)
Configures the client-side events.


#### Parameters

##### configurator System.Action<[Kendo.Mvc.UI.Fluent.MobileCollapsibleEventBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/MobileCollapsibleEventBuilder)>
The client events action.




#### Example (ASPX)
    <%= Html.Kendo().MobileCollapsible()
    .Name("MobileCollapsible")
    .Events(events => events
        .Collapse("onCollapse")
    )
    %>


### IconPosition(Kendo.Mvc.UI.IconPosition)
Sets the icon position in the header of the collapsible widget. Possible values are "left", "right", "top".


#### Parameters

##### value [Kendo.Mvc.UI.IconPosition](/api/aspnet-mvc/Kendo.Mvc.UI/IconPosition)
The value that configures the iconposition.






