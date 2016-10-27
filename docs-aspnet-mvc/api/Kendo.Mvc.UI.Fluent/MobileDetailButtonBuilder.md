---
title: MobileDetailButtonBuilder
---

# Kendo.Mvc.UI.Fluent.MobileDetailButtonBuilder
Defines the fluent API for configuring the Kendo MobileDetailButton for ASP.NET MVC.




## Methods


### Url(System.String)
Specifies the url for remote view or id of the view to be loaded (prefixed with #, like an anchor)


#### Parameters

##### value `System.String`
The value that configures the url.





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





### Icon(System.String)
The icon of the button. It can be either one of the built-in icons, or a custom one.


#### Parameters

##### value `System.String`
The value that configures the icon.





### Style(Kendo.Mvc.UI.MobileDetailButtonStyle)
Specifies predefined button style


#### Parameters

##### value [Kendo.Mvc.UI.MobileDetailButtonStyle](/api/aspnet-mvc/Kendo.Mvc.UI/MobileDetailButtonStyle)
The value that configures the style.





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





### Events(System.Action\<Kendo.Mvc.UI.Fluent.MobileDetailButtonEventBuilder\>)
Configures the client-side events.


#### Parameters

##### configurator System.Action<[Kendo.Mvc.UI.Fluent.MobileDetailButtonEventBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/MobileDetailButtonEventBuilder)>
The client events action.




#### Example (ASPX)
    <%= Html.Kendo().MobileDetailButton()
    .Name("MobileDetailButton")
    .Events(events => events
        .Click("onClick")
    )
    %>



