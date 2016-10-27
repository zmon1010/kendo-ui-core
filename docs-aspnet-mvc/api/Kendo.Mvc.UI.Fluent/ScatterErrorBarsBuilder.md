---
title: ScatterErrorBarsBuilder
---

# Kendo.Mvc.UI.Fluent.ScatterErrorBarsBuilder
Defines the fluent interface for configuring the error bars.




## Methods


### XValue(System.String)
Sets the error bars x value.


#### Parameters

##### xValue `System.String`
The error bars x value.




#### Example (Razor)
    @(Html.Kendo().Chart(Model)
        .Name("chart")
        .Series(series => series
            .Scatter(s => s.x, s => s.y)
            .ErrorBars(e => e.XValue("stderr"))
        )
    )

#### Example (ASPX)
    <%= Html.Kendo().Chart(Model)
    .Name("chart")
    .Series(series => series
        .Scatter(s => s.x, s => s.y)
        .ErrorBars(e => e.XValue("stderr"))
    )
    %>


### XValue(System.Double)
Sets the error bars difference from the point x value.


#### Parameters

##### xValue `System.Double`
The error bars difference from the point x value.




#### Example (Razor)
    @(Html.Kendo().Chart(Model)
        .Name("chart")
        .Series(series => series
            .Scatter(s => s.x, s => s.y)
            .ErrorBars(e => e.XValue(1))
        )
    )

#### Example (ASPX)
    <%= Html.Kendo().Chart(Model)
    .Name("chart")
    .Series(series => series
        .Scatter(s => s.x, s => s.y)
        .ErrorBars(e => e.XValue(1))
    )
    %>


### XValue(System.Double,System.Double)
Sets the error bars low and high value difference from the point x value.


#### Parameters

##### xLowValue `System.Double`
The error bar low value difference from point x value.

##### xHighValue `System.Double`
The error bar high value difference from point x value.




#### Example (Razor)
    @(Html.Kendo().Chart(Model)
        .Name("chart")
        .Series(series => series
            .Scatter(s => s.x, s => s.y)
            .ErrorBars(e => e.XValue(1, 2))
        )
    )

#### Example (ASPX)
    <%= Html.Kendo().Chart(Model)
    .Name("chart")
    .Series(series => series
        .Scatter(s => s.x, s => s.y)
        .ErrorBars(e => e.XValue(1, 2))
    )
    %>


### XValue(System.Func\<System.Object,System.Object\>)
Sets a handler function that returns the error bars x value.


#### Parameters

##### inlineCodeBlock `System.Func<System.Object,System.Object>`
The handler code that returns the error bars x value.




#### Example (Razor)
    @(Html.Kendo().Chart(Model)
        .Name("chart")
        .Series(series => series
            .Scatter(s => s.x, s => s.y)
            .ErrorBars(e => e.XValue(@<text>
                    function(data) {
                    var value = data.value.x,
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
        .Scatter(s => s.x, s => s.y)
        .ErrorBars(e => e.XValue(o =>
            @"function(data) {
            var value = data.value.x,
            lowPercentage = value * 0.05,
            highPercentage = value * 0.1;
            return [lowPercentage, highPercentage];
            }"
            ))
        )
    %>


### YValue(System.String)
Sets the error bars y value.


#### Parameters

##### yValue `System.String`
The error bars y value.




#### Example (Razor)
    @(Html.Kendo().Chart(Model)
        .Name("chart")
        .Series(series => series
            .Scatter(s => s.x, s => s.y)
            .ErrorBars(e => e.YValue("stderr"))
        )
    )

#### Example (ASPX)
    <%= Html.Kendo().Chart(Model)
    .Name("chart")
    .Series(series => series
        .Scatter(s => s.x, s => s.y)
        .ErrorBars(e => e.YValue("stderr"))
    )
    %>


### YValue(System.Double)
Sets the error bars difference from the point y value.


#### Parameters

##### yValue `System.Double`
The error bars difference from the point y value.




#### Example (Razor)
    @(Html.Kendo().Chart(Model)
        .Name("chart")
        .Series(series => series
            .Scatter(s => s.x, s => s.y)
            .ErrorBars(e => e.YValue(1))
        )
    )

#### Example (ASPX)
    <%= Html.Kendo().Chart(Model)
    .Name("chart")
    .Series(series => series
        .Scatter(s => s.x, s => s.y)
        .ErrorBars(e => e.YValue(1))
    )
    %>


### YValue(System.Double,System.Double)
Sets the error bars low and high value difference from the point y value.


#### Parameters

##### yLowValue `System.Double`
The error bar low value difference from point y value.

##### yHighValue `System.Double`
The error bar high value difference from point y value.




#### Example (Razor)
    @(Html.Kendo().Chart(Model)
        .Name("chart")
        .Series(series => series
            .Scatter(s => s.x, s => s.y)
            .ErrorBars(e => e.YValue(1, 2))
        )
    )

#### Example (ASPX)
    <%= Html.Kendo().Chart(Model)
    .Name("chart")
    .Series(series => series
        .Scatter(s => s.x, s => s.y)
        .ErrorBars(e => e.YValue(1, 2))
    )
    %>


### YValue(System.Func\<System.Object,System.Object\>)
Sets a handler function that returns the error bars y value.


#### Parameters

##### inlineCodeBlock `System.Func<System.Object,System.Object>`
The handler code that returns the error bars y value.




#### Example (Razor)
    @(Html.Kendo().Chart(Model)
        .Name("chart")
        .Series(series => series
            .Scatter(s => s.x, s => s.y)
            .ErrorBars(e => e.YValue(@<text>
                    function(data) {
                    var value = data.value.y,
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
        .Scatter(s => s.x, s => s.y)
        .ErrorBars(e => e.YValue(o =>
            @"function(data) {
            var value = data.value.y,
            lowPercentage = value * 0.05,
            highPercentage = value * 0.1;
            return [lowPercentage, highPercentage];
            }"
            ))
        )
    %>


### XLowField(System.String)
Sets the error bars x low field.


#### Parameters

##### xLowField `System.String`
The error bars x low field.




#### Example (Razor)
    @(Html.Kendo().Chart(Model)
        .Name("chart")
        .Series(series => series
            .Scatter(s => s.x, s => s.y)
            .ErrorBars(e => e.XLowField("Low"))
        )
    )

#### Example (ASPX)
    <%= Html.Kendo().Chart(Model)
    .Name("chart")
    .Series(series => series
        .Scatter(s => s.x, s => s.y)
        .ErrorBars(e => e.XLowField("Low"))
    )
    %>


### XHighField(System.String)
Sets the error bars x high field.


#### Parameters

##### xHighField `System.String`
The error bars x high field.




#### Example (Razor)
    @(Html.Kendo().Chart(Model)
        .Name("chart")
        .Series(series => series
            .Scatter(s => s.x, s => s.y)
            .ErrorBars(e => e.XHighField("High"))
        )
    )

#### Example (ASPX)
    <%= Html.Kendo().Chart(Model)
    .Name("chart")
    .Series(series => series
        .Scatter(s => s.x, s => s.y)
        .ErrorBars(e => e.XHighField("High"))
    )
    %>


### XFields(System.String,System.String)
Sets the error bars x low and high fields.


#### Parameters

##### xLowField `System.String`
The error bars x low field.

##### xHighField `System.String`
The error bars x high field.




#### Example (Razor)
    @(Html.Kendo().Chart(Model)
        .Name("chart")
        .Series(series => series
            .Scatter(s => s.x, s => s.y)
            .ErrorBars(e => e.XFields("Low", "High"))
        )
    )

#### Example (ASPX)
    <%= Html.Kendo().Chart(Model)
    .Name("chart")
    .Series(series => series
        .Scatter(s => s.x, s => s.y)
        .ErrorBars(e => e.XFields("Low", "High"))
    )
    %>


### YLowField(System.String)
Sets the error bars y low field.


#### Parameters

##### yLowField `System.String`
The error bars y low field.




#### Example (Razor)
    @(Html.Kendo().Chart(Model)
        .Name("chart")
        .Series(series => series
            .Scatter(s => s.x, s => s.y)
            .ErrorBars(e => e.YLowField("Low"))
        )
    )

#### Example (ASPX)
    <%= Html.Kendo().Chart(Model)
    .Name("chart")
    .Series(series => series
        .Scatter(s => s.x, s => s.y)
        .ErrorBars(e => e.YLowField("Low"))
    )
    %>


### YHighField(System.String)
Sets the error bars y high field.


#### Parameters

##### yHighField `System.String`
The error bars y high field.




#### Example (Razor)
    @(Html.Kendo().Chart(Model)
        .Name("chart")
        .Series(series => series
            .Scatter(s => s.x, s => s.y)
            .ErrorBars(e => e.YHighField("High"))
        )
    )

#### Example (ASPX)
    <%= Html.Kendo().Chart(Model)
    .Name("chart")
    .Series(series => series
        .Scatter(s => s.x, s => s.y)
        .ErrorBars(e => e.YHighField("High"))
    )
    %>


### YFields(System.String,System.String)
Sets the error bars y low and high fields.


#### Parameters

##### yLowField `System.String`
The error bars y low field.

##### yHighField `System.String`
The error bars y high field.




#### Example (Razor)
    @(Html.Kendo().Chart(Model)
        .Name("chart")
        .Series(series => series
            .Scatter(s => s.x, s => s.y)
            .ErrorBars(e => e.YFields("Low", "High"))
        )
    )

#### Example (ASPX)
    <%= Html.Kendo().Chart(Model)
    .Name("chart")
    .Series(series => series
        .Scatter(s => s.x, s => s.y)
        .ErrorBars(e => e.YFields("Low", "High"))
    )
    %>



