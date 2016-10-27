---
title: ChartAxisTicksBuilder
---

# Kendo.Mvc.UI.Fluent.ChartAxisTicksBuilder
Defines the fluent interface for configuring ChartAxisTicks.




## Methods


### Size(System.Int32)
Sets the ticks size


#### Parameters

##### size `System.Int32`
The ticks size.




#### Example (ASPX)
    <% Html.Kendo().Chart()
        .Name("chart")
        .ValueAxis(axis => axis.MajorTicks(ticks => ticks.Size(2)))
        .Render();
    %>


### Visible(System.Boolean)
Sets the ticks visibility


#### Parameters

##### visible `System.Boolean`
The ticks visibility.




#### Example (ASPX)
    <% Html.Kendo().Chart()
        .Name("chart")
        .ValueAxis(axis => axis.MajorTicks(ticks => ticks.Visible(false)))
        .Render();
    %>


### Skip(System.Double)
Sets the line skip


#### Parameters

##### skip `System.Double`
The line skip.




#### Example (ASPX)
    <% Html.Kendo().Chart()
        .Name("Chart")
        .CategoryAxis(axis => axis.MajorTicks(lines => lines.Skip(2)))
        .Render();
    %>


### Step(System.Double)
Sets the line step


#### Parameters

##### step `System.Double`
The line step.




#### Example (ASPX)
    <% Html.Kendo().Chart()
        .Name("Chart")
        .CategoryAxis(axis => axis.MajorTicks(lines => lines.Step(2)))
        .Render();
    %>


### Color(System.String)
Sets the line color


#### Parameters

##### step `System.String`
The line color.




#### Example (ASPX)
    <% Html.Kendo().Chart()
        .Name("Chart")
        .CategoryAxis(axis => axis.MajorTicks(lines => lines.Color("red")))
        .Render();
    %>



