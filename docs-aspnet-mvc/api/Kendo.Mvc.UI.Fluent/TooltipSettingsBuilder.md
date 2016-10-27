---
title: TooltipSettingsBuilder
---

# Kendo.Mvc.UI.Fluent.TooltipSettingsBuilder
Defines the fluent interface for configuring the Tooltip component.




## Methods


### Position(Kendo.Mvc.UI.TooltipPosition)
The position (relative to the target) at which the Tooltip will be shown


#### Parameters

##### position [Kendo.Mvc.UI.TooltipPosition](/api/aspnet-mvc/Kendo.Mvc.UI/TooltipPosition)
The position



#### Returns




### ShowAfter(System.Int32)
The inverval in milliseconds, after which the Tooltip will be shown


#### Parameters

##### milliseconds `System.Int32`




#### Returns




### Callout(System.Boolean)
Determines if callout should be visible


#### Parameters

##### show `System.Boolean`




#### Returns




### AutoHide(System.Boolean)
Determines if tooltip should be automatically hidden, or a close button should be present


#### Parameters

##### value `System.Boolean`




#### Returns




### LoadContentFrom(System.Web.Routing.RouteValueDictionary)
Sets the Url, which will be requested to return the content.


#### Parameters

##### routeValues `System.Web.Routing.RouteValueDictionary`
The route values of the Action method.




#### Example (ASPX)
    <%= Html.Kendo().Tooltip()
    .For("#element")
    .LoadContentFrom(MVC.Home.Index().GetRouteValueDictionary());
    %>


### LoadContentFrom(System.String,System.String)
Sets the Url, which will be requested to return the content.


#### Parameters

##### actionName `System.String`
The action name.

##### controllerName `System.String`
The controller name.




#### Example (ASPX)
    <%= Html.Kendo().Tooltip()
    .For("#element")
    .LoadContentFrom("AjaxView_OpenSource", "Tooltip")
    %>


### LoadContentFrom(System.String,System.String,System.Object)
Sets the Url, which will be requested to return the content.


#### Parameters

##### actionName `System.String`
The action name.

##### controllerName `System.String`
The controller name.

##### routeValues `System.Object`
Route values.




#### Example (ASPX)
    <%= Html.Kendo().Tooltip()
    .For("#element")
    .LoadContentFrom("AjaxView_OpenSource", "Tooltip", new { id = 10})
    %>


### LoadContentFrom(System.String)
Sets the Url, which will be requested to return the content.


#### Parameters

##### value `System.String`
The url.




#### Example (ASPX)
    <%= Html.Kendo().Tooltip()
    .For("#element")
    .LoadContentFrom(Url.Action("AjaxView_OpenSource", "Tooltip"))
    %>


### Content(System.String)
Sets the HTML content which the tooltip should display as a string.


#### Parameters

##### value `System.String`
The action which renders the content.





### ContentTemplateId(System.String)
Sets the id of kendo template which will be used as tooltip content.


#### Parameters

##### value `System.String`
The id of the template





### ContentHandler(System.Func\<System.Object,System.Object\>)
Sets JavaScript function which to return the content for the tooltip.





### ContentHandler(System.String)
Sets JavaScript function which to return the content for the tooltip.


#### Parameters

##### handler `System.String`
JavaScript function name





### Animation(System.Boolean)
Configures the animation effects of the window.


#### Parameters

##### enable `System.Boolean`
Whether the component animation is enabled.




#### Example (ASPX)
    <%= Html.Kendo().Tooltip()
    .For("#element")
    .Animation(false)


### Animation(System.Action\<Kendo.Mvc.UI.Fluent.PopupAnimationBuilder\>)
Configures the animation effects of the panelbar.


#### Parameters

##### animationAction System.Action<[Kendo.Mvc.UI.Fluent.PopupAnimationBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/PopupAnimationBuilder)>
The action that configures the animation.




#### Example (ASPX)
    <%= Html.Kendo().Tooltip()
    .For("#element")
    .Animation(animation => animation.Expand)


### Width(System.Int32)
Sets the width of the tooltip.





### Height(System.Int32)
Sets the height of the tooltip.






