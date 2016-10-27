---
title: ChartDateCategoryAxisBuilder
---

# Kendo.Mvc.UI.Fluent.ChartDateCategoryAxisBuilder
Configures date category axis for the 1.



## Properties


### Container

The parent Chart




## Methods


### Categories(System.Linq.Expressions.Expression\<System.Func\<T,System.DateTime\>\>)
Defines bound categories.


#### Parameters

##### expression `System.Linq.Expressions.Expression<System.Func<T,System.DateTime>>`
The expression used to extract the categories value from the chart model





### Categories(System.Collections.Generic.IEnumerable\<System.DateTime\>)
Defines categories.


#### Parameters

##### categories `System.Collections.Generic.IEnumerable<System.DateTime>`
The list of categories





### Categories(System.DateTime[])
Defines categories.


#### Parameters

##### categories `System.DateTime[]`
The list of categories





### BaseUnit(Kendo.Mvc.UI.ChartAxisBaseUnit)
Sets the date category axis base unit.


#### Parameters

##### baseUnit [Kendo.Mvc.UI.ChartAxisBaseUnit](/api/aspnet-mvc/Kendo.Mvc.UI/ChartAxisBaseUnit)
The date category axis base unit





### BaseUnitStep(System.Int32)
Sets the step (interval) between categories in base units.
            Specifiying 0 (auto) will set the step to such value that the total
            number of categories does not exceed MaxDateGroups.


#### Parameters

##### baseUnitStep `System.Int32`
the step (interval) between categories in base units.
            Set 0 for automatic step. The default value is 1.





### MaxDateGroups(System.Int32)
Specifies the maximum number of groups (categories) that the chart will attempt to
            produce when either BaseUnit is set to Fit or BaseUnitStep is set to 0 (auto).
            This option is ignored in all other cases.


#### Parameters

##### maxDateGroups `System.Int32`
the maximum number of groups (categories).
            The default value is 10.





### RoundToBaseUnit(System.Boolean)
If set to false, the min and max dates will not be rounded off to
            the nearest baseUnit.
            This option is most useful in combination with explicit min and max dates.
            It will be ignored if either Bar, Column, OHLC or Candlestick series are plotted on the axis.


#### Parameters

##### roundToBaseUnit `System.Boolean`
A boolean value that indicates if the axis range should be rounded to the nearest base unit.
            The default value is true.





### WeekStartDay(System.DayOfWeek)
Sets the week start day.


#### Parameters

##### weekStartDay `System.DayOfWeek`
The week start day when the base unit is Weeks. The default is Sunday.





### Justify(System.Boolean)
Positions categories and series points on major ticks. This removes the empty space before and after the series.
            This option will be ignored if either Bar, Column, OHLC or Candlestick series are plotted on the axis.


#### Parameters

##### justified `System.Boolean`
A boolean value that indicates if the empty space before and after the series should be removed.
            The default value is false.





### Justify
Positions categories and series points on major ticks. This removes the empty space before and after the series.
            This option will be ignored if either Bar, Column, OHLC or Candlestick series are plotted on the axis.





### AutoBaseUnitSteps(System.Action\<Kendo.Mvc.UI.Fluent.ChartAxisBaseUnitStepsBuilder\>)
Specifies the discrete baseUnitStep values when
            either BaseUnit is set to Fit or BaseUnitStep is set to 0 (auto).


#### Parameters

##### configurator System.Action<[Kendo.Mvc.UI.Fluent.ChartAxisBaseUnitStepsBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/ChartAxisBaseUnitStepsBuilder)>
The configuration action.





### Min(System.DateTime)
Sets the date category axis minimum (start) date.


#### Parameters

##### min `System.DateTime`
The date category axis minimum (start) date





### Max(System.DateTime)
Sets the date category axis maximum (end) date.


#### Parameters

##### max `System.DateTime`
The date category axis maximum (end) date





### AxisCrossingValue(System.Double)
Sets value at which the first perpendicular axis crosses this axis.


#### Parameters

##### axisCrossingValue `System.Double`
The value at which the first perpendicular axis crosses this axis.




#### Example (ASPX)
    <%= Html.Kendo().Chart(Model)
    .Name("Chart")
    .CategoryAxis(axis => axis.Date().AxisCrossingValue(4))
    .ValueAxis(axis => axis.Numeric().Title("Axis 1"))
    .ValueAxis(axis => axis.Numeric("secondary").Title("Axis 2"))
    %>


### AxisCrossingValue(System.Double[])
Sets value at which perpendicular axes cross this axis.


#### Parameters

##### axisCrossingValues `System.Double[]`
The values at which perpendicular axes cross this axis.




#### Example (ASPX)
    <%= Html.Kendo().Chart(Model)
    .Name("Chart")
    .CategoryAxis(axis => axis.Date().AxisCrossingValue(0, 10))
    .ValueAxis(axis => axis.Numeric().Title("Axis 1"))
    .ValueAxis(axis => axis.Numeric("secondary").Title("Axis 2"))
    %>


### AxisCrossingValue(System.Collections.Generic.IEnumerable\<System.Double\>)
Sets value at which perpendicular axes cross this axis.


#### Parameters

##### axisCrossingValues `System.Collections.Generic.IEnumerable<System.Double>`
The values at which perpendicular axes cross this axis.




#### Example (ASPX)
    <%= Html.Kendo().Chart(Model)
    .Name("Chart")
    .CategoryAxis(axis => axis.Date().AxisCrossingValue(new double[] { 0, 10 }))
    .ValueAxis(axis => axis.Numeric().Title("Axis 1"))
    .ValueAxis(axis => axis.Numeric("secondary").Title("Axis 2"))
    %>


### Labels(System.Action\<Kendo.Mvc.UI.Fluent.ChartDateAxisLabelsBuilder\>)
Configures the axis labels.


#### Parameters

##### configurator System.Action<[Kendo.Mvc.UI.Fluent.ChartDateAxisLabelsBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/ChartDateAxisLabelsBuilder)>
The configuration action.




#### Example (ASPX)
    <%= Html.Kendo().Chart()
    .Name("Chart")
    .CategoryAxis(axis => axis
        .Date()
        .Labels(labels => labels
            .Culture(new CultureInfo("es-ES")
            .Visible(true)
        )
        ))
    %>


### Select(System.Nullable\<System.DateTime\>,System.Nullable\<System.DateTime\>)
Sets the selection range


#### Parameters

##### from `System.Nullable<System.DateTime>`
The selection range start.

##### to `System.Nullable<System.DateTime>`
The selection range end.
            *Note*: The specified date is not included in the selected range
            unless the axis is justified. In order to select all categories specify
            a value larger than the last date.




#### Example (ASPX)
    <%= Html.Kendo().StockChart(Model)
    .Name("StockChart")
    .CategoryAxis(axis => axis.Select(DateTime.Today.AddMonths(-1), DateTime.Today))
    %>


### Select(System.Action\<Kendo.Mvc.UI.Fluent.ChartAxisSelectionBuilder\>)
Configures the selection


#### Parameters

##### configurator System.Action<[Kendo.Mvc.UI.Fluent.ChartAxisSelectionBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/ChartAxisSelectionBuilder)>
The configuration action.




#### Example (ASPX)
    <%= Html.Kendo().StockChart(Model)
    .Name("StockChart")
    .CategoryAxis(axis => axis.Select(select =>
        select.Mousewheel(mw => mw.Reverse())
        ))
    %>



