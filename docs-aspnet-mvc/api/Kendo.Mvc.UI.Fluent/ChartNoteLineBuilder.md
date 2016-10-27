---
title: ChartNoteLineBuilder
---

# Kendo.Mvc.UI.Fluent.ChartNoteLineBuilder
Defines the fluent interface for configuring the chart note line.




## Methods


### Width(System.Int32)
Sets the line width


#### Parameters

##### width `System.Int32`
The line width.




#### Example (ASPX)
    <% Html.Kendo().Chart()
        .Name("Chart")
        .Series(series => series
            .Bar(s => s.Sales)
            .Note(note => note.Line(line => line.Width(2)))
        )
        .Render();
    %>


### Color(System.String)
Sets the line color


#### Parameters

##### color `System.String`
The line color.




#### Example (ASPX)
    <% Html.Kendo().Chart()
        .Name("Chart")
        .Series(series => series
            .Bar(s => s.Sales)
            .Note(note => note.Line(line => line.Color("red")))
        )
        .Render();
    %>


### Length(System.Int32)
Sets the connectors padding


#### Parameters

##### padding `System.Int32`
The connectors padding.




#### Example (ASPX)
    <% Html.Kendo().Chart()
        .Name("Chart")
        .Series(series => series
            .Bar(s => s.Sales)
            .Note(note => note.Line(line => line.Length(15)))
        )
        .Render();
    %>



