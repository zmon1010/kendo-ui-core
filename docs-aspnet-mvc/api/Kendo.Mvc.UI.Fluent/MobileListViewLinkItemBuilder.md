---
title: MobileListViewLinkItemBuilder
---

# Kendo.Mvc.UI.Fluent.MobileListViewLinkItemBuilder
Defines the fluent API for configuring the MobileListViewLinkItem settings.




## Methods


### LinkHtmlAttributes(System.Collections.Generic.IDictionary\<System.String,System.Object\>)
Sets the HTML attributes of the link.


#### Parameters

##### attributes `System.Collections.Generic.IDictionary<System.String,System.Object>`
The HTML attributes of the link.



#### Returns




### LinkHtmlAttributes(System.Object)
Sets the HTML attributes of the link.


#### Parameters

##### attributes `System.Object`
The HTML attributes of the link.



#### Returns




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





### Rel(Kendo.Mvc.UI.MobileButtonRel)
Specifies the widget to be open when is tapped (the href must be set too)


#### Parameters

##### value [Kendo.Mvc.UI.MobileButtonRel](/api/aspnet-mvc/Kendo.Mvc.UI/MobileButtonRel)
The value that configures the rel.





### Url(System.String)
Specifies the url for remote view or id of the view to be loaded (prefixed with #, like an anchor)


#### Parameters

##### value `System.String`
The value that configures the url.





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






