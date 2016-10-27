---
title: ChartDateAxisLabelsBuilder
---

# Kendo.Mvc.UI.Fluent.ChartDateAxisLabelsBuilder
Defines the fluent interface for configuring the chart labels.




## Methods


### Culture(System.Globalization.CultureInfo)
Culture to use for formatting the dates.


#### Parameters

##### culture `System.Globalization.CultureInfo`
Culture to use for formatting the dates.




#### Example (ASPX)
    <%= Html.Kendo().Chart()
    .Name("Chart")
    .CategoryAxis(axis => axis
        .Date()
        .Categories(sale => sale.Date)
        .Labels(labels => labels.Culture(new CultureInfo("es-ES")))
    )
    %>


### DateFormats(System.Action\<Kendo.Mvc.UI.Fluent.ChartAxisLabelsDateFormatsBuilder\>)
Culture to use for formatting the dates.
            See Globalization
            for more information.


#### Parameters

##### configurator System.Action<[Kendo.Mvc.UI.Fluent.ChartAxisLabelsDateFormatsBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/ChartAxisLabelsDateFormatsBuilder)>
Culture to use for formatting the dates.




#### Example (ASPX)
    <%= Html.Kendo().Chart()
    .Name("Chart")
    .CategoryAxis(axis => axis
        .Date()
        .Categories(sale => sale.Date)
        .Labels(labels => labels
            .DateFormats(formats => formats
                .Days("dd")
            )
        )
    )
    %>



