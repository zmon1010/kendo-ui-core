---
title: ChartAxisBaseUnitStepsBuilder
---

# Kendo.Mvc.UI.Fluent.ChartAxisBaseUnitStepsBuilder
Defines the fluent interface for configuring ChartAxisBaseUnitStepsBuilder.




## Methods


### Milliseconds(System.Int32[])
The discrete BaseUnitStep values when BaseUnit is set to Milliseconds and
            BaseUnitStep is set to 0 (auto).


#### Parameters

##### steps `System.Int32[]`
The discrete steps when BaseUnit is set to Milliseconds.




#### Example (ASPX)
    <% Html.Kendo().Chart()
        .Name("chart")
        .Title("Units sold")
        .Series(series => {
            series
            .Column(new int[] { 20, 40, 45, 30, 50 });
        })
        .CategoryAxis(axis => axis
            .Date()
            .BaseUnit(ChartAxisBaseUnit.Fit)
            .AutoBaseUnitSteps(steps => steps.Milliseconds(1, 2))
        )
    %>


### Seconds(System.Int32[])
The discrete BaseUnitStep values when BaseUnit is set to Seconds and
            BaseUnitStep is set to 0 (auto).


#### Parameters

##### steps `System.Int32[]`
The discrete steps when BaseUnit is set to Seconds.




#### Example (ASPX)
    <% Html.Kendo().Chart()
        .Name("chart")
        .Title("Units sold")
        .Series(series => {
            series
            .Column(new int[] { 20, 40, 45, 30, 50 });
        })
        .CategoryAxis(axis => axis
            .Date()
            .BaseUnit(ChartAxisBaseUnit.Fit)
            .AutoBaseUnitSteps(steps => steps.Seconds(1, 2))
        )
    %>


### Minutes(System.Int32[])
The discrete BaseUnitStep values when BaseUnit is set to Minutes and
            BaseUnitStep is set to 0 (auto).


#### Parameters

##### steps `System.Int32[]`
The discrete steps when BaseUnit is set to Minutes.




#### Example (ASPX)
    <% Html.Kendo().Chart()
        .Name("chart")
        .Title("Units sold")
        .Series(series => {
            series
            .Column(new int[] { 20, 40, 45, 30, 50 });
        })
        .CategoryAxis(axis => axis
            .Date()
            .BaseUnit(ChartAxisBaseUnit.Fit)
            .AutoBaseUnitSteps(steps => steps.Minutes(1, 2))
        )
    %>


### Hours(System.Int32[])
The discrete BaseUnitStep values when BaseUnit is set to Hours and
            BaseUnitStep is set to 0 (auto).


#### Parameters

##### steps `System.Int32[]`
The discrete steps when BaseUnit is set to Hours.




#### Example (ASPX)
    <% Html.Kendo().Chart()
        .Name("chart")
        .Title("Units sold")
        .Series(series => {
            series
            .Column(new int[] { 20, 40, 45, 30, 50 });
        })
        .CategoryAxis(axis => axis
            .Date()
            .BaseUnit(ChartAxisBaseUnit.Fit)
            .AutoBaseUnitSteps(steps => steps.Hours(1, 2))
        )
    %>


### Days(System.Int32[])
The discrete BaseUnitStep values when BaseUnit is set to Days and
            BaseUnitStep is set to 0 (auto).


#### Parameters

##### steps `System.Int32[]`
The discrete steps when BaseUnit is set to Days.




#### Example (ASPX)
    <% Html.Kendo().Chart()
        .Name("chart")
        .Title("Units sold")
        .Series(series => {
            series
            .Column(new int[] { 20, 40, 45, 30, 50 });
        })
        .CategoryAxis(axis => axis
            .Date()
            .BaseUnit(ChartAxisBaseUnit.Fit)
            .AutoBaseUnitSteps(steps => steps.Days(1, 2))
        )
    %>


### Weeks(System.Int32[])
The discrete BaseUnitStep values when BaseUnit is set to Weeks and
            BaseUnitStep is set to 0 (auto).


#### Parameters

##### steps `System.Int32[]`
The discrete steps when BaseUnit is set to Weeks.




#### Example (ASPX)
    <% Html.Kendo().Chart()
        .Name("chart")
        .Title("Units sold")
        .Series(series => {
            series
            .Column(new int[] { 20, 40, 45, 30, 50 });
        })
        .CategoryAxis(axis => axis
            .Date()
            .BaseUnit(ChartAxisBaseUnit.Fit)
            .AutoBaseUnitSteps(steps => steps.Weeks(1, 2))
        )
    %>


### Months(System.Int32[])
The discrete BaseUnitStep values when BaseUnit is set to Months and
            BaseUnitStep is set to 0 (auto).


#### Parameters

##### steps `System.Int32[]`
The discrete steps when BaseUnit is set to Months.




#### Example (ASPX)
    <% Html.Kendo().Chart()
        .Name("chart")
        .Title("Units sold")
        .Series(series => {
            series
            .Column(new int[] { 20, 40, 45, 30, 50 });
        })
        .CategoryAxis(axis => axis
            .Date()
            .BaseUnit(ChartAxisBaseUnit.Fit)
            .AutoBaseUnitSteps(steps => steps.Months(1, 2))
        )
    %>


### Years(System.Int32[])
The discrete BaseUnitStep values when BaseUnit is set to Years and
            BaseUnitStep is set to 0 (auto).


#### Parameters

##### steps `System.Int32[]`
The discrete steps when BaseUnit is set to Years.




#### Example (ASPX)
    <% Html.Kendo().Chart()
        .Name("chart")
        .Title("Units sold")
        .Series(series => {
            series
            .Column(new int[] { 20, 40, 45, 30, 50 });
        })
        .CategoryAxis(axis => axis
            .Date()
            .BaseUnit(ChartAxisBaseUnit.Fit)
            .AutoBaseUnitSteps(steps => steps.Years(1, 2))
        )
    %>



