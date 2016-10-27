---
title: ChartMinorGridLinesBuilder
---

# Kendo.Mvc.UI.Fluent.ChartMinorGridLinesBuilder
Defines the fluent interface for configuring ChartMinorGridLinesBuilder.




## Methods


### Skip(System.Int32)
Sets the line skip


#### Parameters

##### skip `System.Int32`
The line skip.




#### Example (ASPX)
    <% Html.Kendo().Chart()
        .Name("Chart")
        .CategoryAxis(axis => axis.MinorGridLines(lines => lines.Skip(2)))
        .Render();
    %>


### Step(System.Int32)
Sets the line step


#### Parameters

##### step `System.Int32`
The line step.




#### Example (ASPX)
    <% Html.Kendo().Chart()
        .Name("Chart")
        .CategoryAxis(axis => axis.MinorGridLines(lines => lines.Step(2)))
        .Render();
    %>



