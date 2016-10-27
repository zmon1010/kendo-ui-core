---
title: CategoricalErrorBarsBuilder
---

# Kendo.Mvc.UI.Fluent.CategoricalErrorBarsBuilder
Defines the fluent interface for configuring the error bars.




## Methods


### Value(System.String)
Sets the error bars value.


#### Parameters

##### value `System.String`
The error bars value.




#### Example (Razor)
    @(Html.Kendo().Chart(Model)
        .Name("chart")
        .Series(series => series
            .Bar(s => s.Sales)
            .ErrorBars(e => e.Value("stderr"))
        )
    )

#### Example (ASPX)
    <%= Html.Kendo().Chart(Model)
    .Name("chart")
    .Series(series => series
        .Bar(s => s.Sales)
        .ErrorBars(e => e.Value("stderr"))
    )
    %>


### Value(System.Double)
Sets the error bars difference from the point value.


#### Parameters

##### value `System.Double`
The error bars difference from the point value.




#### Example (Razor)
    @(Html.Kendo().Chart(Model)
        .Name("chart")
        .Series(series => series
            .Bar(s => s.Sales)
            .ErrorBars(e => e.Value(1))
        )
    )

#### Example (ASPX)
    <%= Html.Kendo().Chart(Model)
    .Name("chart")
    .Series(series => series
        .Bar(s => s.Sales)
        .ErrorBars(e => e.Value(1))
    )
    %>


### Value(System.Double,System.Double)
Sets the error bars low and high value difference from the point value.


#### Parameters

##### lowValue `System.Double`
The error bar low value difference from point value.

##### highValue `System.Double`
The error bar high value difference from point value.




#### Example (Razor)
    @(Html.Kendo().Chart(Model)
        .Name("chart")
        .Series(series => series
            .Bar(s => s.Sales)
            .ErrorBars(e => e.Value(1, 2))
        )
    )

#### Example (ASPX)
    <%= Html.Kendo().Chart(Model)
    .Name("chart")
    .Series(series => series
        .Bar(s => s.Sales)
        .ErrorBars(e => e.Value(1, 2))
    )
    %>


### Value(System.Func\<System.Object,System.Object\>)
Sets a handler function  that returns the error bars value.


#### Parameters

##### inlineCodeBlock `System.Func<System.Object,System.Object>`
The handler code that returns the error bars value.




#### Example (Razor)
    @(Html.Kendo().Chart(Model)
        .Name("chart")
        .Series(series => series
            .Bar(s => s.Sales)
            .ErrorBars(e => e.Value(@<text>
                    function(data) {
                    var value = data.value,
                    lowPercentage = value * 0.05,
                    highPercentage = value * 0.1;
                    return [lowPercentage, highPercentage];
                    }
                    </text>))
                )
            )

#### Example (ASPX)
    <%= Html.Kendo().Chart(Model)
    .Name("chart")
    .Series(series => series
        .Bar(s => s.Sales)
        .ErrorBars(e => e.Value(o =>
            @"function(data) {
            var value = data.value,
            lowPercentage = value * 0.05,
            highPercentage = value * 0.1;
            return [lowPercentage, highPercentage];
            }"
            ))
        )
    %>


### LowField(System.String)
Sets the error bars low field.


#### Parameters

##### lowField `System.String`
The error bars low field.




#### Example (Razor)
    @(Html.Kendo().Chart(Model)
        .Name("chart")
        .Series(series => series
            .Bar(s => s.Sales)
            .ErrorBars(e => e.LowField("Low"))
        )
    )

#### Example (ASPX)
    <%= Html.Kendo().Chart(Model)
    .Name("chart")
    .Series(series => series
        .Bar(s => s.Sales)
        .ErrorBars(e => e.LowField("Low"))
    )
    %>


### HighField(System.String)
Sets the error bars high field.


#### Parameters

##### highField `System.String`
The error bars high field.




#### Example (Razor)
    @(Html.Kendo().Chart(Model)
        .Name("chart")
        .Series(series => series
            .Bar(s => s.Sales)
            .ErrorBars(e => e.HighField("High"))
        )
    )

#### Example (ASPX)
    <%= Html.Kendo().Chart(Model)
    .Name("chart")
    .Series(series => series
        .Bar(s => s.Sales)
        .ErrorBars(e => e.HighField("High"))
    )
    %>


### Fields(System.String,System.String)
Sets the error bars low and high fields.


#### Parameters

##### lowField `System.String`
The error bars low field.

##### highField `System.String`
The error bars high field.




#### Example (Razor)
    @(Html.Kendo().Chart(Model)
        .Name("chart")
        .Series(series => series
            .Bar(s => s.Sales)
            .ErrorBars(e => e.Fields("Low", "High"))
        )
    )

#### Example (ASPX)
    <%= Html.Kendo().Chart(Model)
    .Name("chart")
    .Series(series => series
        .Bar(s => s.Sales)
        .ErrorBars(e => e.Fields("Low", "High"))
    )
    %>



