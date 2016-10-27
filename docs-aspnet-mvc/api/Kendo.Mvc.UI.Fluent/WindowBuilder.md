---
title: WindowBuilder
---

# Kendo.Mvc.UI.Fluent.WindowBuilder
Defines the fluent interface for configuring the Window component.




## Methods


### Title(System.Boolean)
Allows title to be shown / hidden


#### Parameters

##### show `System.Boolean`
Whether the window title will be visible





### Title(System.String)
Sets title, which appears in the header of the window.





### AppendTo(System.String)
Defines a selector for the element to which the Window will be appended. By default this is the page body.


#### Parameters

##### selector `System.String`
A selector of the Window container





### ContentSettings(System.Action\<Kendo.Mvc.UI.Fluent.WindowContentBuilder\>)
Configure how the window content is fetched, parsed, and rendered


#### Parameters

##### selector System.Action<[Kendo.Mvc.UI.Fluent.WindowContentBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/WindowContentBuilder)>
A selector of the Window container





### Content(System.Action)
Sets the HTML content which the window should display.


#### Parameters

##### value `System.Action`
The action which renders the content.




#### Example (ASPX)
    <% Html.Kendo().Window()
        .Name("Window")
        .Content(() =>
        {
            %>
            <strong>Window content</strong>
            <%
        })
    %>


### Content(System.Func\<System.Object,System.Object\>)
Sets the HTML content which the window should display


#### Parameters

##### value `System.Func<System.Object,System.Object>`
The Razor inline template



#### Returns



#### Example (ASPX)
    @(Html.Kendo().Window()
        .Name("Window")
        .Content(@<strong> Hello World!</strong>))


### Content(System.String)
Sets the HTML content which the item should display as a string.


#### Parameters

##### value `System.String`
The action which renders the content.





### LoadContentFrom(System.Web.Routing.RouteValueDictionary)
Sets the Url, which will be requested to return the content.


#### Parameters

##### routeValues `System.Web.Routing.RouteValueDictionary`
The route values of the Action method.




#### Example (ASPX)
    <%= Html.Kendo().Window()
    .Name("Window")
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
    <%= Html.Kendo().Window()
    .Name("Window")
    .LoadContentFrom("AjaxView_OpenSource", "Window")
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
    <%= Html.Kendo().Window()
    .Name("Window")
    .LoadContentFrom("AjaxView_OpenSource", "Window", new { id = 10})
    %>


### LoadContentFrom(System.String)
Sets the Url, which will be requested to return the content.


#### Parameters

##### value `System.String`
The url.




#### Example (ASPX)
    <%= Html.Kendo().Window()
    .Name("Window")
    .LoadContentFrom(Url.Action("AjaxView_OpenSource", "Window"))
    %>


### Events(System.Action\<Kendo.Mvc.UI.Fluent.WindowEventBuilder\>)
Configures the client-side events.


#### Parameters

##### clientEventsAction System.Action<[Kendo.Mvc.UI.Fluent.WindowEventBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/WindowEventBuilder)>
The client events action.




#### Example (ASPX)
    <%= Html.Kendo().Window()
    .Name("Window")
    .Events(events =>
        events.Open("onOpen").Close("onClose")
    )
    %>


### Resizable
Enables windows resizing.




#### Example (ASPX)
    <%= Html.Kendo().Window()
    .Name("Window")
    .Resizable()
    %>


### Resizable(System.Action\<Kendo.Mvc.UI.Fluent.WindowResizingSettingsBuilder\>)
Configures the resizing ability of the window.


#### Parameters

##### resizingSettingsAction System.Action<[Kendo.Mvc.UI.Fluent.WindowResizingSettingsBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/WindowResizingSettingsBuilder)>
Resizing settings action.




#### Example (ASPX)
    <%= Html.Kendo().Window()
    .Name("Window")
    .Resizable(settings =>
        settings.Enabled(true).MaxHeight(500).MaxWidth(500)
    )
    %>


### Actions(System.Action\<Kendo.Mvc.UI.Fluent.WindowActionsBuilder\>)
Configures the window buttons.


#### Parameters

##### actionsBuilderAction System.Action<[Kendo.Mvc.UI.Fluent.WindowActionsBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/WindowActionsBuilder)>
The buttons configuration action.




#### Example (ASPX)
    <%= Html.Kendo().Window()
    .Name("Window")
    .Actions(actions =>
        actions.Close()
    )
    %>


### Width(System.Int32)
Sets the width of the window.





### Height(System.Int32)
Sets the height of the window.





### Position(System.Action\<Kendo.Mvc.UI.Fluent.WindowPositionSettingsBuilder\>)
Configures the position of the window.


#### Parameters

##### positionSettingsAction System.Action<[Kendo.Mvc.UI.Fluent.WindowPositionSettingsBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/WindowPositionSettingsBuilder)>
Position settings action.




#### Example (ASPX)
    <%= Html.Kendo().Window()
    .Name("Window")
    .Position(settings =>
        settings.Top(100).Left(100)
    )
    %>


### Visible(System.Boolean)
Sets whether the window should be rendered visible.





### Scrollable(System.Boolean)
Sets whether the window should have scrollbars.





### Animation(System.Boolean)
Configures the animation effects of the window.


#### Parameters

##### enable `System.Boolean`
Whether the component animation is enabled.




#### Example (ASPX)
    <%= Html.Kendo().Window()
    .Name("Window")
    .Animation(false)


### Animation(System.Action\<Kendo.Mvc.UI.Fluent.PopupAnimationBuilder\>)
Configures the animation effects of the panelbar.


#### Parameters

##### animationAction System.Action<[Kendo.Mvc.UI.Fluent.PopupAnimationBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/PopupAnimationBuilder)>
The action that configures the animation.




#### Example (ASPX)
    <%= Html.Kendo().Window()
    .Name("Window")
    .Animation(animation => animation.Expand)


### Modal(System.Boolean)
Sets whether the window should be modal or not.





### Draggable
Sets whether the window can be moved.





### Draggable(System.Boolean)
Sets whether the window can be moved.





### Pinned
Sets whether the window is pinned.





### AutoFocus(System.Boolean)
Sets whether the window automatically gains focus when opened.





### Pinned(System.Boolean)
Sets whether the window is pinned.





### Iframe(System.Boolean)
Explicitly specifies whether the loaded window content will be rendered as an iframe or in-line






