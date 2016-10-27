---
title: SortableBuilder
---

# Kendo.Mvc.UI.Fluent.SortableBuilder
Defines the fluent interface for configuring the Sortable component.




## Methods


### For(System.String)
The selector to match the DOM element to which the Sortable widget will be instantiated


#### Parameters

##### selector `System.String`
jQuery selector



#### Returns




### Disabled(System.String)
The selector that determines which items are disabled. Disabled items cannot be dragged but are valid sort targets.


#### Parameters

##### selector `System.String`
jQuery selector



#### Returns




### Filter(System.String)
The selector that determines which items are sortable. Filtered items cannot be dragged and are not valid sort targets.


#### Parameters

##### selector `System.String`
jQuery selector



#### Returns




### Handler(System.String)
The selector that determines which element will be used as a draggable handler.


#### Parameters

##### selector `System.String`
jQuery selector



#### Returns




### ContainerSelector(System.String)
Selector that determines the container boundaries in which hint movement will be constrained to.


#### Parameters

##### selector `System.String`
jQuery selector



#### Returns




### ConnectWith(System.String)
The selector which determines if items from the current Sortable widget can be accepted from another Sortable container(s). The connectWith option describes one way relationship, if the developer wants a two way connection then the connectWith option should be set on both widgets.


#### Parameters

##### selector `System.String`
jQuery selector



#### Returns




### Ignore(System.String)
The selector which determines child elements for which the sort will not be initiated. Useful if the sortable item contains input elements.


#### Parameters

##### selector `System.String`
jQuery selector



#### Returns




### Cursor(System.String)
The CSS style which determines the cursor that will be shown while user drags sortable item. For example 'move', 'pointer', etc.


#### Parameters

##### string `System.String`
String



#### Returns




### HoldToDrag(System.Boolean)
When set to true, the item will be activated after the user taps and holds the finger on the element for a short amount of time.


#### Parameters

##### value `System.Boolean`




#### Returns




### AutoScroll(System.Boolean)
If set to true the widget will auto-scroll the container when the mouse/finger is close to the top/bottom of it.


#### Parameters

##### value `System.Boolean`




#### Returns




### Axis(Kendo.Mvc.UI.SortableAxis)
Constrains the hint movement to either the horizontal (x) or vertical (y) axis.


#### Parameters

##### axis [Kendo.Mvc.UI.SortableAxis](/api/aspnet-mvc/Kendo.Mvc.UI/SortableAxis)
The axis



#### Returns




### CursorOffset(System.Action\<Kendo.Mvc.UI.Fluent.SortableCursorOffsetSettingsBuilder\>)
Configures the cursor offset of Sortable widget.


#### Parameters

##### cursorOffsetSettingsAction System.Action<[Kendo.Mvc.UI.Fluent.SortableCursorOffsetSettingsBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/SortableCursorOffsetSettingsBuilder)>
Cursor offset settings action.




#### Example (ASPX)
    <%= Html.Kendo().Sortable()
    .For("#sortable")
    .CursorOffset(settings =>
        settings.Top(10).Left(10)
    )
    %>


### Hint(System.String)
HTML string representing the the hint element


#### Parameters

##### string `System.String`
Html string



#### Returns




### HintHandler(System.Func\<System.Object,System.Object\>)
Sets JavaScript function which to return the hint for the sorted item.





### HintHandler(System.String)
Sets JavaScript function which to return the hint for the sorted item.


#### Parameters

##### handler `System.String`
JavaScript function name





### Placeholder(System.String)
HTML string representing the placeholder


#### Parameters

##### string `System.String`
Html string



#### Returns




### PlaceholderHandler(System.Func\<System.Object,System.Object\>)
Sets JavaScript function which to return the placeholder for the sorted item.





### PlaceholderHandler(System.String)
Sets JavaScript function which to return the placeholder for the sorted item.


#### Parameters

##### handler `System.String`
JavaScript function name





### Deferred
Suppress initialization script rendering. Note that this options should be used in conjunction with M:Kendo.Mvc.UI.Fluent.WidgetFactory.DeferredScripts(System.Boolean)



#### Returns




### ToComponent
Returns the internal view component.



#### Returns




### Events(System.Action\<Kendo.Mvc.UI.Fluent.SortableEventBuilder\>)
Sets the event configuration of the Sortable.


#### Parameters

##### configurator System.Action<[Kendo.Mvc.UI.Fluent.SortableEventBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/SortableEventBuilder)>
The lambda which configures the events





### Render
Renders the component.






