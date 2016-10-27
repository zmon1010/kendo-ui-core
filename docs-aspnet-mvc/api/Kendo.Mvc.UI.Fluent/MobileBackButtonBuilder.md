---
title: MobileBackButtonBuilder
---

# Kendo.Mvc.UI.Fluent.MobileBackButtonBuilder
Defines the fluent API for configuring the Kendo MobileBackButton for ASP.NET MVC.




## Methods


### Icon(System.String)
The icon of the button. It can be either one of the built-in icons, or a custom one


#### Parameters

##### value `System.String`
The value that configures the icon.





### Text(System.String)
Specifies the text of the button


#### Parameters

##### value `System.String`
The value that configures the text.





### Url(System.String)
Specifies the url for remote view or id of the view to be loaded (prefixed with #, like an anchor)


#### Parameters

##### value `System.String`
The value that configures the url.





### Target(System.String)
Specifies the id of target Pane or `_top` for application level Pane


#### Parameters

##### value `System.String`
The value that configures the target.





### Align(Kendo.Mvc.UI.MobileButtonAlign)
Use the align data attribute to specify the elements position inside the NavBar. By default, elements without any align are centered.


#### Parameters

##### value [Kendo.Mvc.UI.MobileButtonAlign](/api/aspnet-mvc/Kendo.Mvc.UI/MobileButtonAlign)
The value that configures the align.





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





### Events(System.Action\<Kendo.Mvc.UI.Fluent.MobileBackButtonEventBuilder\>)
Configures the client-side events.


#### Parameters

##### configurator System.Action<[Kendo.Mvc.UI.Fluent.MobileBackButtonEventBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/MobileBackButtonEventBuilder)>
The client events action.




#### Example (ASPX)
    <%= Html.Kendo().MobileBackButton()
    .Name("MobileBackButton")
    .Events(events => events
        .Click("onClick")
    )
    %>



