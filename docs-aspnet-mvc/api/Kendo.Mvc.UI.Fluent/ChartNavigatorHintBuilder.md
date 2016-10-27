---
title: ChartNavigatorHintBuilder
---

# Kendo.Mvc.UI.Fluent.ChartNavigatorHintBuilder
Defines the fluent interface for configuring ChartNavigatorhintBuilder.




## Methods


### Format(System.String)
Sets the border color.


#### Parameters

##### color `System.String`
The border color (CSS format).




#### Example (ASPX)
    <%= Html.Kendo().StockChart(Model)
    .Name("Chart")
    .Navigator(nav => nav
        .Series(series =>
        {
            series.Bar(s => s.SalesAmount);
        })
        .Hint(hint => hint
            .Format("{0:d} | {1:d}")
        )
    )
    %>


### Template(System.String)
Sets the border opacity


#### Parameters

##### opacity `System.String`
The border opacity (CSS format).




#### Example (ASPX)
    <%= Html.Kendo().StockChart(Model)
    .Name("Chart")
    .Navigator(nav => nav
        .Series(series =>
        {
            series.Bar(s => s.SalesAmount);
        })
        .Hint(hint => hint
            .Template("From: #= from # To: #= to #")
        )
    )
    %>


### Visible(System.Boolean)
Sets the hint visibility.


#### Parameters

##### visible `System.Boolean`
The hint visibility.




#### Example (ASPX)
    <%= Html.Kendo().StockChart(Model)
    .Name("Chart")
    .Navigator(nav => nav
        .Series(series =>
        {
            series.Bar(s => s.SalesAmount);
        })
        .Hint(hint => hint
            .Visible(false)
        )
    )
    %>



