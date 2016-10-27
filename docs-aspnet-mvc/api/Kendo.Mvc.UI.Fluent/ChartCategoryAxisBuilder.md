---
title: ChartCategoryAxisBuilder
---

# Kendo.Mvc.UI.Fluent.ChartCategoryAxisBuilder
Configures the category axis for the 1.



## Properties


### Container

The parent Chart




## Methods


### Categories(System.Linq.Expressions.Expression\<System.Func\<T,T1\>\>)
Defines bound categories.


#### Parameters

##### expression `System.Linq.Expressions.Expression<System.Func<T,T1>>`
The expression used to extract the categories value from the chart model





### Type(Kendo.Mvc.UI.ChartCategoryAxisType)
Overrides the category axis type.


#### Parameters

##### type [Kendo.Mvc.UI.ChartCategoryAxisType](/api/aspnet-mvc/Kendo.Mvc.UI/ChartCategoryAxisType)
The axis type. The default is determined by the category items type.





### Categories(System.Collections.IEnumerable)
Defines categories.


#### Parameters

##### categories `System.Collections.IEnumerable`
The list of categories





### Categories(System.String[])
Defines categories.


#### Parameters

##### categories `System.String[]`
The list of categories





### AxisCrossingValue(System.Double)
Sets value at which the first perpendicular axis crosses this axis.


#### Parameters

##### axisCrossingValue `System.Double`
The value at which the first perpendicular axis crosses this axis.




#### Example (ASPX)
    <%= Html.Kendo().Chart(Model)
    .Name("Chart")
    .CategoryAxis(axis => axis.AxisCrossingValue(4))
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
    .CategoryAxis(axis => axis.AxisCrossingValue(0, 10))
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
    .CategoryAxis(axis => axis.AxisCrossingValue(new double[] { 0, 10 }))
    .ValueAxis(axis => axis.Numeric().Title("Axis 1"))
    .ValueAxis(axis => axis.Numeric("secondary").Title("Axis 2"))
    %>


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





### Select(System.Double,System.Double)
Sets the selection range


#### Parameters

##### from `System.Double`
The selection range start.

##### to `System.Double`
The selection range end.
            *Note*: The category with the specified index is not included in the selected range
            unless the axis is justified. In order to select all categories specify
            a value larger than the last category index.




#### Example (ASPX)
    <%= Html.Kendo().StockChart(Model)
    .Name("StockChart")
    .CategoryAxis(axis => axis.Select(0, 3))
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


### Min(System.Double)
Sets the minimum value.





### Max(System.Double)
Sets the maximum value.






