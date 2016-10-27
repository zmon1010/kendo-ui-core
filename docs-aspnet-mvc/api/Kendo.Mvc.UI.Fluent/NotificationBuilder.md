---
title: NotificationBuilder
---

# Kendo.Mvc.UI.Fluent.NotificationBuilder
Defines the fluent interface for configuring the !:Notification<T>component.




## Methods


### Position(System.Action\<Kendo.Mvc.UI.Fluent.NotificationPositionSettingsBuilder\>)
Configures the position settings of the popup notifications.





### Stacking(Kendo.Mvc.UI.NotificationStackingSettings)
Sets the stacking direction when multiple notifications are displayed by a single widget instance.





### HideOnClick(System.Boolean)
Sets whether notifications should be hidden by clicking anywhere on their content.





### Button(System.Boolean)
Sets whether notifications should display a hide button (when using default templates only).





### AllowHideAfter(System.Int32)
Sets the time in milliseconds, after which a notifications can be hidden by the user via clicking.





### AutoHideAfter(System.Int32)
Sets the time in milliseconds, after which a notifications is hidden automatically.





### AppendTo(System.String)
Defines a CSS selector, which points to the element that will hold the notifications to be displayed.





### Width(System.String)
Defines the width of the notifications to be displayed.





### Width(System.Int32)
Defines the width of the notifications to be displayed.





### Height(System.String)
Defines the height of the notifications to be displayed.





### Height(System.Int32)
Defines the height of the notifications to be displayed.





### Templates(System.Action\<Kendo.Mvc.UI.Fluent.NotificationTemplateFactory\>)
Configures the Notification templates.





### Animation(System.Action\<Kendo.Mvc.UI.Fluent.PopupAnimationBuilder\>)
Configures the animation effects of the displayed notifications.


#### Parameters

##### animationAction System.Action<[Kendo.Mvc.UI.Fluent.PopupAnimationBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/PopupAnimationBuilder)>
The action that configures the animation.





### Events(System.Action\<Kendo.Mvc.UI.Fluent.NotificationEventBuilder\>)
Configures the client-side events.


#### Parameters

##### events System.Action<[Kendo.Mvc.UI.Fluent.NotificationEventBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/NotificationEventBuilder)>
The client events action.




#### Example (ASPX)
    <%= Html.Kendo().Notification()
    .Name("Notification")
    .Events(events =>
        events.Click("onClick"))
    %>


### Tag(System.String)
Sets the Notification HTML tag. A SPAN tag is used by default.




#### Example (ASPX)
    <%= Html.Kendo().Notification()
    .Name("Notification")
    .Tag("div")
    %>



