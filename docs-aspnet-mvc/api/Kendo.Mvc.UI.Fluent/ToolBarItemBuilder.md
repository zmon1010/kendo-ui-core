---
title: ToolBarItemBuilder
---

# Kendo.Mvc.UI.Fluent.ToolBarItemBuilder
Defines the fluent API for configuring the ToolBarItem settings.




## Methods


### HtmlAttributes(System.Object)
Specifies the HTML attributes of a ToolBar button.


#### Parameters

##### value `System.Object`
The value that configures the htmlattributes.





### HtmlAttributes(System.Collections.Generic.IDictionary\<System.String,System.Object\>)
Specifies the HTML attributes of a ToolBar button.


#### Parameters

##### value `System.Collections.Generic.IDictionary<System.String,System.Object>`
The value that configures the htmlattributes.





### Buttons(System.Action\<Kendo.Mvc.UI.Fluent.ToolBarItemButtonFactory\>)
Specifies the buttons of ButtonGroup.


#### Parameters

##### configurator System.Action<[Kendo.Mvc.UI.Fluent.ToolBarItemButtonFactory](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/ToolBarItemButtonFactory)>
The action that configures the buttons.





### Click(System.Func\<System.Object,System.Object\>)
Specifies the click event handler of the button. Applicable only for commands of type button and splitButton.


#### Parameters

##### value `System.Func<System.Object,System.Object>`
The value that configures the click action.





### Click(System.String)
Specifies the click event handler of the button. Applicable only for commands of type button and splitButton.


#### Parameters

##### value `System.String`
The value that configures the click action.





### Enable(System.Boolean)
Specifies whether the control is initially enabled or disabled. Default value is "true".


#### Parameters

##### value `System.Boolean`
The value that configures the enable.





### Group(System.String)
Assigns the button to a group. Applicable only for buttons with togglable: true.


#### Parameters

##### value `System.String`
The value that configures the group.





### Hidden(System.Boolean)
Determines if a button is visible or hidden. By default buttons are visible.


#### Parameters

##### value `System.Boolean`
The value that configures the hidden.





### Icon(System.String)
Sets icon for the item. The icon should be one of the existing in the Kendo UI theme sprite.


#### Parameters

##### value `System.String`
The value that configures the icon.





### Id(System.String)
Specifies the ID of the button.


#### Parameters

##### value `System.String`
The value that configures the id.





### ImageUrl(System.String)
If set, the ToolBar will render an image with the specified URL in the button.


#### Parameters

##### value `System.String`
The value that configures the imageurl.





### MenuButtons(System.Action\<Kendo.Mvc.UI.Fluent.ToolBarItemMenuButtonFactory\>)
Specifies the menu buttons of a SplitButton.


#### Parameters

##### configurator System.Action<[Kendo.Mvc.UI.Fluent.ToolBarItemMenuButtonFactory](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/ToolBarItemMenuButtonFactory)>
The action that configures the menubuttons.





### OverflowTemplate(System.String)
Specifies what element will be added in the command overflow popup. Applicable only for items that have a template.


#### Parameters

##### value `System.String`
The value that configures the overflowtemplate.





### OverflowTemplateId(System.String)
Specifies what element will be added in the command overflow popup. Applicable only for items that have a template.


#### Parameters

##### value `System.String`
The value that configures the overflowtemplate.





### Primary(System.Boolean)
Specifies whether the button is primary. Primary buttons receive different styling.


#### Parameters

##### value `System.Boolean`
The value that configures the primary.





### Selected(System.Boolean)
Specifies if the toggle button is initially selected. Applicable only for buttons with togglable: true.


#### Parameters

##### value `System.Boolean`
The value that configures the selected.





### SpriteCssClass(System.String)
Defines a CSS class (or multiple classes separated by spaces) which will be used for button icon.


#### Parameters

##### value `System.String`
The value that configures the spritecssclass.





### Template(System.String)
Specifies what element will be added in the ToolBar wrapper. Items with template does not have a type.


#### Parameters

##### value `System.String`
The value that configures the template.





### TemplateId(System.String)
Specifies what element will be added in the ToolBar wrapper. Items with template does not have a type.


#### Parameters

##### value `System.String`
The value that configures the template.





### Text(System.String)
Sets the text of the button.


#### Parameters

##### value `System.String`
The value that configures the text.





### Togglable(System.Boolean)
Specifies if the button is togglable, e.g. has a selected and unselected state.


#### Parameters

##### value `System.Boolean`
The value that configures the togglable.





### Toggle(System.Func\<System.Object,System.Object\>)
Specifies the toggle event handler of the button. Applicable only for commands of type button and togglable: true.


#### Parameters

##### value `System.Func<System.Object,System.Object>`
The value that configures the toggle action.





### Toggle(System.String)
Specifies the toggle event handler of the button. Applicable only for commands of type button and togglable: true.


#### Parameters

##### value `System.String`
The value that configures the toggle action.





### Url(System.String)
Specifies the url to navigate to.


#### Parameters

##### value `System.String`
The value that configures the url.





### Type(Kendo.Mvc.UI.CommandType)
Specifies the type of the item.


#### Parameters

##### value [Kendo.Mvc.UI.CommandType](/api/aspnet-mvc/Kendo.Mvc.UI/CommandType)
The value that configures the type.





### ShowText(Kendo.Mvc.UI.ShowIn)
Specifies where the text will be displayed.


#### Parameters

##### value [Kendo.Mvc.UI.ShowIn](/api/aspnet-mvc/Kendo.Mvc.UI/ShowIn)
The value that configures the showtext.





### ShowIcon(Kendo.Mvc.UI.ShowIn)
Specifies where the icon will be displayed.


#### Parameters

##### value [Kendo.Mvc.UI.ShowIn](/api/aspnet-mvc/Kendo.Mvc.UI/ShowIn)
The value that configures the showicon.





### Overflow(Kendo.Mvc.UI.ShowInOverflowPopup)
Specifies how the button behaves when the ToolBar is resized.


#### Parameters

##### value [Kendo.Mvc.UI.ShowInOverflowPopup](/api/aspnet-mvc/Kendo.Mvc.UI/ShowInOverflowPopup)
The value that configures the overflow.






