---
title: DiagramShapeDefaultsSettingsBuilder
---

# Kendo.Mvc.UI.Fluent.DiagramShapeDefaultsSettingsBuilder
Defines the fluent API for configuring the DiagramShapeDefaultsSettings settings.




## Methods


### ConnectorDefaults(System.Action\<Kendo.Mvc.UI.Fluent.DiagramShapeConnectorBuilder\<T,T\>\>)
Defines the default options for the shape connectors.


#### Parameters

##### configurator System.Action<[Kendo.Mvc.UI.Fluent.DiagramShapeConnectorBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/DiagramShapeConnectorBuilder)<T,T>>
The action that configures the default options.





### Connectors(System.Action\<Kendo.Mvc.UI.Fluent.DiagramShapeConnectorFactory\<T,T\>\>)
Defines the connectors the shape owns.You can easily define your own custom connectors or mix-match with the above defined custom connectors.Example - custom shape with custom connectorsThe following defines a custom shape with connectors adapted to the shape's outline. Note in particular the various helpful methods (right(), left(), top()) to define positions relative to the shape.


#### Parameters

##### configurator System.Action<[Kendo.Mvc.UI.Fluent.DiagramShapeConnectorFactory](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/DiagramShapeConnectorFactory)<T,T>>
The action that configures the connectors.





### Content(System.Action\<Kendo.Mvc.UI.Fluent.DiagramShapeDefaultsContentSettingsBuilder\<T,T\>\>)
Defines the shapes content settings.


#### Parameters

##### configurator System.Action<[Kendo.Mvc.UI.Fluent.DiagramShapeDefaultsContentSettingsBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/DiagramShapeDefaultsContentSettingsBuilder)<T,T>>
The action that configures the content.





### Editable(System.Boolean)
Defines the shape editable options.


#### Parameters

##### enabled `System.Boolean`
Enables or disables the editable option.





### Editable(System.Action\<Kendo.Mvc.UI.Fluent.DiagramShapeDefaultsEditableSettingsBuilder\<T,T\>\>)
Defines the shape editable options.


#### Parameters

##### configurator System.Action<[Kendo.Mvc.UI.Fluent.DiagramShapeDefaultsEditableSettingsBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/DiagramShapeDefaultsEditableSettingsBuilder)<T,T>>
The action that configures the editable.





### Fill(System.Action\<Kendo.Mvc.UI.Fluent.DiagramShapeDefaultsFillSettingsBuilder\<T,T\>\>)
Defines the fill options of the shape.


#### Parameters

##### configurator System.Action<[Kendo.Mvc.UI.Fluent.DiagramShapeDefaultsFillSettingsBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/DiagramShapeDefaultsFillSettingsBuilder)<T,T>>
The action that configures the fill.





### Height(System.Double)
Defines the height of the shape when added to the diagram.


#### Parameters

##### value `System.Double`
The value that configures the height.





### Hover(System.Action\<Kendo.Mvc.UI.Fluent.DiagramShapeDefaultsHoverSettingsBuilder\<T,T\>\>)
Defines the hover configuration.


#### Parameters

##### configurator System.Action<[Kendo.Mvc.UI.Fluent.DiagramShapeDefaultsHoverSettingsBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/DiagramShapeDefaultsHoverSettingsBuilder)<T,T>>
The action that configures the hover.





### MinHeight(System.Double)
Defines the minimum height the shape should have, i.e. it cannot be resized to a value smaller than the given one.


#### Parameters

##### value `System.Double`
The value that configures the minheight.





### MinWidth(System.Double)
Defines the minimum width the shape should have, i.e. it cannot be resized to a value smaller than the given one.


#### Parameters

##### value `System.Double`
The value that configures the minwidth.





### Path(System.String)
The path option of a Shape is a description of a custom geometry. The format follows the standard SVG format (http://www.w3.org/TR/SVG/paths.html#PathData "SVG Path data.").


#### Parameters

##### value `System.String`
The value that configures the path.





### Rotation(System.Action\<Kendo.Mvc.UI.Fluent.DiagramShapeDefaultsRotationSettingsBuilder\<T,T\>\>)
Defines the rotation of the shape.


#### Parameters

##### configurator System.Action<[Kendo.Mvc.UI.Fluent.DiagramShapeDefaultsRotationSettingsBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/DiagramShapeDefaultsRotationSettingsBuilder)<T,T>>
The action that configures the rotation.





### Selectable(System.Boolean)
Specifies if the shape can be selected.


#### Parameters

##### value `System.Boolean`
The value that configures the selectable.





### Source(System.String)
The source of the shape image. Applicable when the type is set to "image".


#### Parameters

##### value `System.String`
The value that configures the source.





### Stroke(System.Action\<Kendo.Mvc.UI.Fluent.DiagramShapeDefaultsStrokeSettingsBuilder\<T,T\>\>)
Defines the stroke configuration.


#### Parameters

##### configurator System.Action<[Kendo.Mvc.UI.Fluent.DiagramShapeDefaultsStrokeSettingsBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/DiagramShapeDefaultsStrokeSettingsBuilder)<T,T>>
The action that configures the stroke.





### Type(System.String)
Specifies the type of the Shape using any of the built-in shape type.


#### Parameters

##### value `System.String`
The value that configures the type.





### Width(System.Double)
Defines the width of the shape when added to the diagram.


#### Parameters

##### value `System.Double`
The value that configures the width.





### X(System.Double)
Defines the x-coordinate of the shape when added to the diagram.


#### Parameters

##### value `System.Double`
The value that configures the x.





### Y(System.Double)
Defines the y-coordinate of the shape when added to the diagram.


#### Parameters

##### value `System.Double`
The value that configures the y.





### Visual(System.Func\<System.Object,System.Object\>)
Defines the inline visual template


#### Parameters

##### inlineCodeBlock `System.Func<System.Object,System.Object>`
The handler code wrapped in a text tag (Razor syntax).





### Visual(System.String)
Defines the name of the JavaScript function that will create the visual element.


#### Parameters

##### visualHandler `System.String`
The name of the JavaScript function that will create the visual element.






