---
title: ChartNegativeValueSettingsBuilder
---

# Kendo.Mvc.UI.Fluent.ChartNegativeValueSettingsBuilder
Defines the fluent interface for configuring ChartNegativeValueSettings.




## Methods


### Color(System.String)
Sets the color for bubbles representing negative values


#### Parameters

##### color `System.String`
The bubble color (CSS format).




#### Example (ASPX)
    <% Html.Kendo().Chart()
        .Name("Chart")
        .Series(series => series
            .Bubble(s => s.x, s => s.y, s => s.size)
            .NegativeValues(n => n
                .Visible(true)
                .Color("#ff0000")
                );
            )
            .Render();
            %>


### Visible(System.Boolean)
Sets the visibility for bubbles representing negative values


#### Parameters

##### visible `System.Boolean`
The visibility for bubbles representing negative values.




#### Example (ASPX)
    <% Html.Kendo().Chart()
        .Name("Chart")
        .Series(series => series
            .Bubble(s => s.x, s => s.y, s => s.size)
            .NegativeValues(n => n
                .Visible(true)
                );
            )
            .Render();
            %>



