---
title: ChartAxisSelectionBuilder
---

# Kendo.Mvc.UI.Fluent.ChartAxisSelectionBuilder
Defines the fluent interface for configuring the ChartAxisSelectionBuilder.




## Methods


### From(System.DateTime)
Sets the selection lower boundary


#### Parameters

##### fromDate `System.DateTime`
The selection lower boundary.




#### Example (ASPX)
    <% Html.Kendo().Chart()
        .Name("Chart")
        .CategoryAxis(axis =>
            axis.Select(select => select.From(from))
        )
        .Render();
    %>


### From(System.Double)
Sets the selection lower boundary


#### Parameters

##### fromDate `System.Double`
The selection lower boundary.




#### Example (ASPX)
    <% Html.Kendo().Chart()
        .Name("Chart")
        .CategoryAxis(axis => axis.Select(select =>
            select.From(from).To(to)
            ))
            .Render();
            %>


### To(System.DateTime)
Sets the selection upper boundary


#### Parameters

##### toDate `System.DateTime`
The selection upper boundary.




#### Example (ASPX)
    <% Html.Kendo().Chart()
        .Name("Chart")
        .CategoryAxis(axis => axis.Select(select =>
            select.To(toDate).To(toDate)
            ))
            .Render();
            %>


### To(System.Double)
Sets the selection upper boundary


#### Parameters

##### toDate `System.Double`
The selection upper boundary.




#### Example (ASPX)
    <% Html.Kendo().Chart()
        .Name("Chart")
        .CategoryAxis(axis => axis.Select(select => select.To(to).To(to)
            ))
            .Render();
            %>


### Mousewheel(System.Action\<Kendo.Mvc.UI.Fluent.ChartSelectionMousewheelBuilder\>)
Configures the mousewheel zoom options


#### Parameters

##### configurator System.Action<[Kendo.Mvc.UI.Fluent.ChartSelectionMousewheelBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/ChartSelectionMousewheelBuilder)>
The mousewheel zoom options






