---
title: ChartAxisLabelsDateFormatsBuilder
---

# Kendo.Mvc.UI.Fluent.ChartAxisLabelsDateFormatsBuilder
Defines the fluent interface for configuring ChartAxisLabelsDateFormatsBuilder.




## Methods


### Seconds(System.String)
Sets the date format when the base date unit is Seconds


#### Parameters

##### format `System.String`
The date format.




#### Example (ASPX)
    <%= Html.Kendo().Chart()
    .Name("Chart")
    .CategoryAxis(axis => axis
        .Date()
        .Labels(labels => labels
            .DateFormats(formats => formats
                .Seconds("HH:mm:ss")
            )
        )
        );
    %>


### Minutes(System.String)
Sets the date format when the base date unit is Minutes


#### Parameters

##### format `System.String`
The date format.




#### Example (ASPX)
    <%= Html.Kendo().Chart()
    .Name("Chart")
    .CategoryAxis(axis => axis
        .Date()
        .Labels(labels => labels
            .DateFormats(formats => formats
                .Minutes("ss")
            )
        )
        );
    %>


### Hours(System.String)
Sets the date format when the base date unit is Hours


#### Parameters

##### format `System.String`
The date format.




#### Example (ASPX)
    <%= Html.Kendo().Chart()
    .Name("Chart")
    .CategoryAxis(axis => axis
        .Date()
        .Labels(labels => labels
            .DateFormats(formats => formats
                .Hours("HH:mm")
            )
        )
        );
    %>


### Days(System.String)
Sets the date format when the base date unit is Days


#### Parameters

##### format `System.String`
The date format.




#### Example (ASPX)
    <%= Html.Kendo().Chart()
    .Name("Chart")
    .CategoryAxis(axis => axis
        .Date()
        .Labels(labels => labels
            .DateFormats(formats => formats
                .Days("dddd dd")
            )
        )
        );
    %>


### Months(System.String)
Sets the date format when the base date unit is Months


#### Parameters

##### format `System.String`
The date format.




#### Example (ASPX)
    <%= Html.Kendo().Chart()
    .Name("Chart")
    .CategoryAxis(axis => axis
        .Date()
        .Labels(labels => labels
            .DateFormats(formats => formats
                .Months("MMMM MM")
            )
        )
        );
    %>


### Weeks(System.String)
Sets the date format when the base date unit is Weeks


#### Parameters

##### format `System.String`
The date format.




#### Example (ASPX)
    <%= Html.Kendo().Chart()
    .Name("Chart")
    .CategoryAxis(axis => axis
        .Date()
        .Labels(labels => labels
            .DateFormats(formats => formats
                .Weeks("dddd")
            )
        )
        );
    %>


### Years(System.String)
Sets the date format when the base date unit is Years


#### Parameters

##### format `System.String`
The date format.




#### Example (ASPX)
    <%= Html.Kendo().Chart()
    .Name("Chart")
    .CategoryAxis(axis => axis
        .Date()
        .Labels(labels => labels
            .DateFormats(formats => formats
                .Years("yyyy")
            )
        )
        );
    %>



