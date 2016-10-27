---
title: MobileButtonBuilder
---

# Kendo.Mvc.UI.Fluent.MobileButtonBuilder
Defines the fluent API for configuring the Kendo MobileButton for ASP.NET MVC.




## Methods


### ClickOn(System.String)
Configures the DOM event used to trigger the button click event/navigate in the mobile application. Can be set to "down" as an alias for touchstart, mousedown, MSPointerDown, and PointerDown vendor specific events.
            Setting the clickOn to down usually makes sense for buttons in the header or in non-scrollable views for increased responsiveness.By default, buttons trigger click/navigate when the user taps the button (a press + release action sequence occurs).


#### Parameters

##### value `System.String`
The value that configures the clickon.





### Enable(System.Boolean)
If set to false the widget will be disabled and will not allow the user to click it. The widget is enabled by default.


#### Parameters

##### value `System.Boolean`
The value that configures the enable.





### Icon(System.String)
The icon of the button. It can be either one of the built-in icons, or a custom one.


#### Parameters

##### value `System.String`
The value that configures the icon.





### Url(System.String)
Specifies the url for remote view or id of the view to be loaded (prefixed with #, like an anchor)


#### Parameters

##### value `System.String`
The value that configures the url.





### Text(System.String)
Specifies the text of the button


#### Parameters

##### value `System.String`
The value that configures the text.





### Transition(System.String)
Specifies the Pane transition


#### Parameters

##### value `System.String`
The value that configures the transition.





### Target(System.String)
Specifies the id of target Pane or `_top` for application level Pane


#### Parameters

##### value `System.String`
The value that configures the target.





### ActionsheetContext(System.String)
This value will be available when the action callback of ActionSheet item is executed


#### Parameters

##### value `System.String`
The value that configures the actionsheetcontext.





### Align(Kendo.Mvc.UI.MobileButtonAlign)
Use the align data attribute to specify the elements position inside the NavBar. By default, elements without any align are centered.


#### Parameters

##### value [Kendo.Mvc.UI.MobileButtonAlign](/api/aspnet-mvc/Kendo.Mvc.UI/MobileButtonAlign)
The value that configures the align.





### Rel(Kendo.Mvc.UI.MobileButtonRel)
Specifies the widget to be open when is tapped (the href must be set too)


#### Parameters

##### value [Kendo.Mvc.UI.MobileButtonRel](/api/aspnet-mvc/Kendo.Mvc.UI/MobileButtonRel)
The value that configures the rel.





### Badge(System.String)
Specifies the value shown in badge icon


#### Parameters

##### value `System.String`
The value that configures the badge.





### Url(System.Action\<Kendo.Mvc.UI.Fluent.MobileNavigatableSettingsBuilder\>)
Specifies the url for remote view to be loaded





### Url(System.String,System.String,System.Object)
Sets controller and action from where the remove view to be loaded.


#### Parameters

##### actionName `System.String`
Action name

##### controllerName `System.String`
Controller Name

##### routeValues `System.Object`
Route values





### Url(System.String,System.String)
Sets controller, action and routeValues from where the remove view to be loaded.


#### Parameters

##### actionName `System.String`
Action name

##### controllerName `System.String`
Controller Name





### Events(System.Action\<Kendo.Mvc.UI.Fluent.MobileButtonEventBuilder\>)
Configures the client-side events.


#### Parameters

##### configurator System.Action<[Kendo.Mvc.UI.Fluent.MobileButtonEventBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/MobileButtonEventBuilder)>
The client events action.




#### Example (ASPX)
    <%= Html.Kendo().MobileButton()
    .Name("MobileButton")
    .Events(events => events
        .Click("onClick")
    )
    %>



