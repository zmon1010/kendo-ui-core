---
title: MobileTabStripItemBuilder
---

# Kendo.Mvc.UI.Fluent.MobileTabStripItemBuilder
Defines the fluent API for configuring the MobileTabStripItem settings.




## Methods


### Url(System.String)
Specifies the url or id of the view which will be loaded


#### Parameters

##### value `System.String`
The value that configures the url.





### Icon(System.String)
The icon of the button. It can be either one of the built-in icons, or a custom one


#### Parameters

##### value `System.String`
The value that configures the icon.





### Text(System.String)
Specifies the text of the item


#### Parameters

##### value `System.String`
The value that configures the text.





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





### Badge(System.String)
Specifies the value shown in badge icon


#### Parameters

##### value `System.String`
The value that configures the badge.





### Rel(Kendo.Mvc.UI.MobileButtonRel)
Specifies the widget to be open when is tapped (the href must be set too)


#### Parameters

##### value [Kendo.Mvc.UI.MobileButtonRel](/api/aspnet-mvc/Kendo.Mvc.UI/MobileButtonRel)
The value that configures the rel.





### HtmlAttributes(System.Object)
Sets the HTML attributes.


#### Parameters

##### attributes `System.Object`
The HTML attributes.



#### Returns




### HtmlAttributes(System.Collections.Generic.IDictionary\<System.String,System.Object\>)
Sets the HTML attributes.


#### Parameters

##### attributes `System.Collections.Generic.IDictionary<System.String,System.Object>`
The HTML attributes.



#### Returns




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






