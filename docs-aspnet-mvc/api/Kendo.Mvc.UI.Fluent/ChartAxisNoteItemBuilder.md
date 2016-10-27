---
title: ChartAxisNoteItemBuilder
---

# Kendo.Mvc.UI.Fluent.ChartAxisNoteItemBuilder
Defines the fluent interface for configuring the chart note.




## Methods


### Value(System.Object)
Sets the note value.


#### Parameters

##### value `System.Object`
The value of the note.




#### Example (ASPX)
    <% Html.Kendo().Chart()
        .Name("Chart")
        .ValueAxis(a => a.Numeric()
            .Note(note => note
                .Data(items =>
                {
                    data.Add().Value(1);
                    data.Add().Value(2);
                })
            )
        )
        .Render();
    %>



