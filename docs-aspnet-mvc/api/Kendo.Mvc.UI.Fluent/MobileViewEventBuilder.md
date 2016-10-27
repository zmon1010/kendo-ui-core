---
title: MobileViewEventBuilder
---

# Kendo.Mvc.UI.Fluent.MobileViewEventBuilder
Defines the fluent API for configuring the Kendo MobileView for ASP.NET MVC events.




## Methods


### AfterShow(System.String)
Fires after the mobile View becomes visible. If the view is displayed with transition, the event is triggered after the transition is complete.

For additional information check the [afterShow event](/api/javascript/ui/mobileview#events-afterShow) documentation.


#### Parameters

##### handler `System.String`
The name of the JavaScript function that will handle the afterShow event.





### BeforeHide(System.String)
Fires before the mobile View becomes hidden.

For additional information check the [beforeHide event](/api/javascript/ui/mobileview#events-beforeHide) documentation.


#### Parameters

##### handler `System.String`
The name of the JavaScript function that will handle the beforeHide event.





### BeforeShow(System.String)
Fires before the mobile View becomes visible. The event can be prevented by calling the preventDefault method of the event parameter, in case a redirection should happen.

For additional information check the [beforeShow event](/api/javascript/ui/mobileview#events-beforeShow) documentation.


#### Parameters

##### handler `System.String`
The name of the JavaScript function that will handle the beforeShow event.





### Hide(System.String)
Fires when the mobile View becomes hidden.

For additional information check the [hide event](/api/javascript/ui/mobileview#events-hide) documentation.


#### Parameters

##### handler `System.String`
The name of the JavaScript function that will handle the hide event.





### Init(System.String)
Fires after the mobile View and its child widgets are initialized.

For additional information check the [init event](/api/javascript/ui/mobileview#events-init) documentation.


#### Parameters

##### handler `System.String`
The name of the JavaScript function that will handle the init event.





### Show(System.String)
Fires when the mobile View becomes visible.

For additional information check the [show event](/api/javascript/ui/mobileview#events-show) documentation.


#### Parameters

##### handler `System.String`
The name of the JavaScript function that will handle the show event.





### TransitionStart(System.String)
Fires when the mobile view transition starts.

For additional information check the [transitionStart event](/api/javascript/ui/mobileview#events-transitionStart) documentation.


#### Parameters

##### handler `System.String`
The name of the JavaScript function that will handle the transitionStart event.





### TransitionEnd(System.String)
Fires after the mobile view transition container has its k-fx-end class set. Setting CSS properties to the view at the event handler will animate them.

For additional information check the [transitionEnd event](/api/javascript/ui/mobileview#events-transitionEnd) documentation.


#### Parameters

##### handler `System.String`
The name of the JavaScript function that will handle the transitionEnd event.






