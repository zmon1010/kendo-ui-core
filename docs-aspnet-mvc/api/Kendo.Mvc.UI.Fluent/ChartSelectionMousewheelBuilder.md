---
title: ChartSelectionMousewheelBuilder
---

# Kendo.Mvc.UI.Fluent.ChartSelectionMousewheelBuilder
Defines the fluent interface for configuring the ChartSelectionMousewheelBuilder.




## Methods


### Reverse
Reverses the mousewheel direction.
            Rotating the wheel down will shrink the selection, rotating up will expand it.




#### Example (ASPX)
    <% Html.Kendo().Chart()
        .Name("Chart")
        .CategoryAxis(axis => axis.Select(select => select
            .From(fromDate).To(toDate)
            .Mousewheel(mw => mw.Reverse())
            ))
            .Render();
            %>


### Reverse(System.Boolean)
Sets a value indicating if the mousewheel should be reversed.


#### Parameters

##### reverse `System.Boolean`
true: scrolling up shrinks the selection.
            false: scrolling down expands the selection.




#### Example (ASPX)
    <% Html.Kendo().Chart()
        .Name("Chart")
        .CategoryAxis(axis => axis.Select(select => select
            .From(fromDate).To(toDate)
            .Mousewheel(mw => mw.Reverse(true))
            ))
            .Render();
            %>


### Zoom(Kendo.Mvc.UI.ChartZoomDirection)
Sets the mousewheel zoom type


#### Parameters

##### fromDate [Kendo.Mvc.UI.ChartZoomDirection](/api/aspnet-mvc/Kendo.Mvc.UI/ChartZoomDirection)
The mousewheel zoom type. Default value is ChartZoomDirection.Both




#### Example (ASPX)
    <% Html.Kendo().Chart()
        .Name("Chart")
        .CategoryAxis(axis => axis.Select(select =>
            select.From(from).To(to)
            .Mousewheel(mw => mw.Zoom(ChartZoomDirection.Left))
            ))
            .Render();
            %>



