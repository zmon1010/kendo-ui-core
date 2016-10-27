---
title: DiagramBuilder
---

# Kendo.Mvc.UI.Fluent.DiagramBuilder
Defines the fluent API for configuring the Kendo Diagram for ASP.NET MVC.




## Methods


### AutoBind(System.Boolean)
If set to false the widget will not bind to the data source during initialization. In this case data binding will occur when the change event of the
            data source is fired. By default the widget will bind to the data source specified in the configuration.


#### Parameters

##### value `System.Boolean`
The value that configures the autobind.





### ConnectionDefaults(System.Action\<Kendo.Mvc.UI.Fluent.DiagramConnectionDefaultsSettingsBuilder\<T,T\>\>)
Defines the defaults of the connections. Whenever a connection is created, the specified connectionDefaults will be used and merged with the (optional) configuration passed through the connection creation method.


#### Parameters

##### configurator System.Action<[Kendo.Mvc.UI.Fluent.DiagramConnectionDefaultsSettingsBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/DiagramConnectionDefaultsSettingsBuilder)<T,T>>
The action that configures the connectiondefaults.





### Connections(System.Action\<Kendo.Mvc.UI.Fluent.DiagramConnectionFactory\<T,T\>\>)
Defines the connections configuration.


#### Parameters

##### configurator System.Action<[Kendo.Mvc.UI.Fluent.DiagramConnectionFactory](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/DiagramConnectionFactory)<T,T>>
The action that configures the connections.





### Editable(System.Boolean)
Defines how the diagram behaves when the user attempts to edit shape content, create new connections, edit connection labels and so on.


#### Parameters

##### enabled `System.Boolean`
Enables or disables the editable option.





### Editable(System.Action\<Kendo.Mvc.UI.Fluent.DiagramEditableSettingsBuilder\<T,T\>\>)
Defines how the diagram behaves when the user attempts to edit shape content, create new connections, edit connection labels and so on.


#### Parameters

##### configurator System.Action<[Kendo.Mvc.UI.Fluent.DiagramEditableSettingsBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/DiagramEditableSettingsBuilder)<T,T>>
The action that configures the editable.





### Layout(System.Action\<Kendo.Mvc.UI.Fluent.DiagramLayoutSettingsBuilder\<T,T\>\>)
The layout of a diagram consists in arranging the shapes (sometimes also the connections) in some fashion in order to achieve an aesthetically pleasing experience to the user. It aims at giving a more direct insight in the information contained within the diagram and its relational structure.On a technical level, layout consists of a multitude of algorithms and optimizations:and various ad-hoc calculations which depend on the type of layout. The criteria on which an algorithm is based vary but the common denominator is:Kendo diagram includes three of the most used layout algorithms which should cover most of your layout needs - tree layout, force-directed layout and layered layout. Please, check the type property for more details regarding each type.The generic way to apply a layout is by calling the layout() method on the diagram. The method has a single parameter options. It is an object, which can contain parameters which are specific to the layout as well as parameters customizing the global grid layout. Parameters which apply to other layout algorithms can be included but are overlooked if not applicable to the chose layout type. This means that you can define a set of parameters which cover all possible layout types and simply pass it in the method whatever the layout define in the first parameter.


#### Parameters

##### configurator System.Action<[Kendo.Mvc.UI.Fluent.DiagramLayoutSettingsBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/DiagramLayoutSettingsBuilder)<T,T>>
The action that configures the layout.





### Pannable(System.Boolean)
Defines the pannable options.


#### Parameters

##### enabled `System.Boolean`
Enables or disables the pannable option.





### Pannable(System.Action\<Kendo.Mvc.UI.Fluent.DiagramPannableSettingsBuilder\<T,T\>\>)
Defines the pannable options.


#### Parameters

##### configurator System.Action<[Kendo.Mvc.UI.Fluent.DiagramPannableSettingsBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/DiagramPannableSettingsBuilder)<T,T>>
The action that configures the pannable.





### Pdf(System.Action\<Kendo.Mvc.UI.Fluent.DiagramPdfSettingsBuilder\<T,T\>\>)
Configures the export settings for the saveAsPDF method.


#### Parameters

##### configurator System.Action<[Kendo.Mvc.UI.Fluent.DiagramPdfSettingsBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/DiagramPdfSettingsBuilder)<T,T>>
The action that configures the pdf.





### Selectable(System.Boolean)
Defines the selectable options.


#### Parameters

##### enabled `System.Boolean`
Enables or disables the selectable option.





### Selectable(System.Action\<Kendo.Mvc.UI.Fluent.DiagramSelectableSettingsBuilder\<T,T\>\>)
Defines the selectable options.


#### Parameters

##### configurator System.Action<[Kendo.Mvc.UI.Fluent.DiagramSelectableSettingsBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/DiagramSelectableSettingsBuilder)<T,T>>
The action that configures the selectable.





### ShapeDefaults(System.Action\<Kendo.Mvc.UI.Fluent.DiagramShapeDefaultsSettingsBuilder\<T,T\>\>)
Defines the shape options.


#### Parameters

##### configurator System.Action<[Kendo.Mvc.UI.Fluent.DiagramShapeDefaultsSettingsBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/DiagramShapeDefaultsSettingsBuilder)<T,T>>
The action that configures the shapedefaults.





### Shapes(System.Action\<Kendo.Mvc.UI.Fluent.DiagramShapeFactory\<T,T\>\>)
Defines the shape options.


#### Parameters

##### configurator System.Action<[Kendo.Mvc.UI.Fluent.DiagramShapeFactory](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/DiagramShapeFactory)<T,T>>
The action that configures the shapes.





### Template(System.String)
The template which renders the content of the shape when bound to a dataSource. The names you can use in the template correspond to the properties used in the dataSource. See the dataSource topic below for a concrete example.


#### Parameters

##### value `System.String`
The value that configures the template.





### TemplateId(System.String)
The template which renders the content of the shape when bound to a dataSource. The names you can use in the template correspond to the properties used in the dataSource. See the dataSource topic below for a concrete example.


#### Parameters

##### value `System.String`
The value that configures the template.





### Zoom(System.Double)
The zoom level in percentages.


#### Parameters

##### value `System.Double`
The value that configures the zoom.





### ZoomMax(System.Double)
The zoom max level in percentages.


#### Parameters

##### value `System.Double`
The value that configures the zoommax.





### ZoomMin(System.Double)
The zoom min level in percentages.


#### Parameters

##### value `System.Double`
The value that configures the zoommin.





### ZoomRate(System.Double)
The zoom step when using the mouse-wheel to zoom in or out.


#### Parameters

##### value `System.Double`
The value that configures the zoomrate.





### DataSource(System.Action\<Kendo.Mvc.UI.Fluent.DiagramDataSourceBuilder\<T\>\>)
Configure the HierarchicalDataSource of the component


#### Parameters

##### configurator System.Action<[Kendo.Mvc.UI.Fluent.DiagramDataSourceBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/DiagramDataSourceBuilder)<T>>
The action that configures the M:Kendo.Mvc.UI.Fluent.DiagramBuilder`2.DataSource(System.Action{Kendo.Mvc.UI.Fluent.DiagramDataSourceBuilder{`0}}).




#### Example (ASPX)
    <%= Html.Kendo().Diagram()
    .Name("diagram")
    .DataSource(dataSource => dataSource
        .Read(read => read
            .Action("_OrgChart", "Diagram")
        )
    )
    %>


### ConnectionsDataSource(System.Action\<Kendo.Mvc.UI.Fluent.DiagramConnectionDataSourceBuilder\<T\>\>)
Configure the DataSource of the component


#### Parameters

##### configurator System.Action<[Kendo.Mvc.UI.Fluent.DiagramConnectionDataSourceBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/DiagramConnectionDataSourceBuilder)<T>>
The action that configures the M:Kendo.Mvc.UI.Fluent.DiagramBuilder`2.ConnectionsDataSource(System.Action{Kendo.Mvc.UI.Fluent.DiagramConnectionDataSourceBuilder{`1}}).




#### Example (ASPX)
    <%= Html.Kendo().Diagram()
    .Name("diagram")
    .DataSource(dataSource => dataSource
        .Read(read => read
            .Action("_OrgChart", "Diagram")
        )
    )
    %>


### Events(System.Action\<Kendo.Mvc.UI.Fluent.DiagramEventBuilder\>)
Configures the client-side events.


#### Parameters

##### configurator System.Action<[Kendo.Mvc.UI.Fluent.DiagramEventBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/DiagramEventBuilder)>
The client events action.




#### Example (ASPX)
    <%= Html.Kendo().Diagram()
    .Name("diagram")
    .Events(events => events
        .Click("onClick")
    )
    %>



