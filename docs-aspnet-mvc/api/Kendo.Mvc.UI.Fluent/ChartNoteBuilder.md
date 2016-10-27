---
title: ChartNoteBuilder
---

# Kendo.Mvc.UI.Fluent.ChartNoteBuilder
Defines the fluent interface for configuring the chart note.




## Methods


### Line(System.Action\<Kendo.Mvc.UI.Fluent.ChartNoteLineBuilder\>)
Sets the line configuration of the note


#### Parameters

##### configurator System.Action<[Kendo.Mvc.UI.Fluent.ChartNoteLineBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/ChartNoteLineBuilder)>
The line configuration.




#### Example (ASPX)
    <% Html.Kendo().Chart()
        .Name("Chart")
        .ValueAxis(a => a.Numeric()
            .Note(note => note
                .Line(line => line.Width(2))
            )
        )
        .Render();
    %>


### Label(System.Action\<Kendo.Mvc.UI.Fluent.ChartNoteLabelBuilder\>)
Sets the label configuration of the note


#### Parameters

##### configurator System.Action<[Kendo.Mvc.UI.Fluent.ChartNoteLabelBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/ChartNoteLabelBuilder)>
The label configurator.




#### Example (ASPX)
    <% Html.Kendo().Chart()
        .Name("Chart")
        .ValueAxis(a => a.Numeric()
            .Note(note => note
                .Label(label => label.Position(ChartNoteLabelPosition.Inside))
            )
        )
        .Render();
    %>


### Icon(System.Action\<Kendo.Mvc.UI.Fluent.ChartMarkersBuilder\>)
Sets the icon configuration of the note


#### Parameters

##### configurator System.Action<[Kendo.Mvc.UI.Fluent.ChartMarkersBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/ChartMarkersBuilder)>
The icon configuration.




#### Example (ASPX)
    <% Html.Kendo().Chart()
        .Name("Chart")
        .ValueAxis(a => a.Numeric()
            .Note(note => note.Icon(icon => icon.Size(10)))
        )
        .Render();
    %>


### Position(System.Nullable\<Kendo.Mvc.UI.ChartNotePosition\>)
Sets the note position.


#### Parameters

##### position System.Nullable<[Kendo.Mvc.UI.ChartNotePosition](/api/aspnet-mvc/Kendo.Mvc.UI/ChartNotePosition)>
The note position.




#### Example (ASPX)
    <% Html.Kendo().Chart()
        .Name("Chart")
        .ValueAxis(a => a.Numeric()
            .Note(note => note.Position(ChartNotePosition.Left))
        )
        .Render();
    %>


### Visual(System.String)
Sets the note visual handler


#### Parameters

##### handler `System.String`
The handler name.





### Visual(System.Func\<System.Object,System.Object\>)
Sets the note visual handler


#### Parameters

##### handler `System.Func<System.Object,System.Object>`
The handler






