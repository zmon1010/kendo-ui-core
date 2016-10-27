---
title: DiagramEditableSettingsBuilder
---

# Kendo.Mvc.UI.Fluent.DiagramEditableSettingsBuilder
Defines the fluent API for configuring the DiagramEditableSettings settings.




## Methods


### ConnectionTemplate(System.String)
Specifies the connection editor template which shows up when editing the connection via a pop-up editor much like 'editable.template' configuration of the Kendo UI Grid widget.


#### Parameters

##### value `System.String`
The value that configures the connectiontemplate.





### ConnectionTemplateId(System.String)
Specifies the connection editor template which shows up when editing the connection via a pop-up editor much like 'editable.template' configuration of the Kendo UI Grid widget.


#### Parameters

##### value `System.String`
The value that configures the connectiontemplate.





### Drag(System.Boolean)
Specifies if the shapes and connections can be dragged.


#### Parameters

##### enabled `System.Boolean`
Enables or disables the drag option.





### Drag(System.Action\<Kendo.Mvc.UI.Fluent.DiagramEditableDragSettingsBuilder\<T,T\>\>)
Specifies if the shapes and connections can be dragged.


#### Parameters

##### configurator System.Action<[Kendo.Mvc.UI.Fluent.DiagramEditableDragSettingsBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/DiagramEditableDragSettingsBuilder)<T,T>>
The action that configures the drag.





### Remove(System.Boolean)
Specifies if the shapes and connections can be removed.


#### Parameters

##### value `System.Boolean`
The value that configures the remove.





### Resize(System.Boolean)
Defines the look-and-feel of the resizing handles.


#### Parameters

##### enabled `System.Boolean`
Enables or disables the resize option.





### Resize(System.Action\<Kendo.Mvc.UI.Fluent.DiagramEditableResizeSettingsBuilder\<T,T\>\>)
Defines the look-and-feel of the resizing handles.


#### Parameters

##### configurator System.Action<[Kendo.Mvc.UI.Fluent.DiagramEditableResizeSettingsBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/DiagramEditableResizeSettingsBuilder)<T,T>>
The action that configures the resize.





### Rotate(System.Boolean)
Specifies whether the shapes can be rotated. Note that changing this setting after creating the diagram will have no effect.


#### Parameters

##### enabled `System.Boolean`
Enables or disables the rotate option.





### Rotate(System.Action\<Kendo.Mvc.UI.Fluent.DiagramEditableRotateSettingsBuilder\<T,T\>\>)
Specifies whether the shapes can be rotated. Note that changing this setting after creating the diagram will have no effect.


#### Parameters

##### configurator System.Action<[Kendo.Mvc.UI.Fluent.DiagramEditableRotateSettingsBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/DiagramEditableRotateSettingsBuilder)<T,T>>
The action that configures the rotate.





### ShapeTemplate(System.String)
Specifies the shape editor template. See the 'editable.connectionTemplate' for an example.


#### Parameters

##### value `System.String`
The value that configures the shapetemplate.





### ShapeTemplateId(System.String)
Specifies the shape editor template. See the 'editable.connectionTemplate' for an example.


#### Parameters

##### value `System.String`
The value that configures the shapetemplate.





### Tools(System.Action\<Kendo.Mvc.UI.Fluent.DiagramEditableSettingsToolFactory\<T,T\>\>)
Specifies the the toolbar tools. Predefined tools are:


#### Parameters

##### configurator System.Action<[Kendo.Mvc.UI.Fluent.DiagramEditableSettingsToolFactory](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/DiagramEditableSettingsToolFactory)<T,T>>
The action that configures the tools.





### ShapeTemplateName(System.String)
Specifies the shape editor template.


#### Parameters

##### value `System.String`
The value that configures the shapetemplate.





### ConnectionTemplateName(System.String)
Specifies the connection editor template.


#### Parameters

##### value `System.String`
The value that configures the connectiontemplate.






