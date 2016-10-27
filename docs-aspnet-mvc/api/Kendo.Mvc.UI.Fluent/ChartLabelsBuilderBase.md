---
title: ChartLabelsBuilderBase
---

# Kendo.Mvc.UI.Fluent.ChartLabelsBuilderBase
Defines the fluent interface for configuring the chart labels.




## Methods


### Font(System.String)
Sets the labels font


#### Parameters

##### font `System.String`
The labels font (CSS format).




#### Example (ASPX)
    <% Html.Kendo().Chart()
        .Name("Chart")
        .Series(series => series
            .Bar(s => s.Sales)
            .Labels(labels => labels
                .Font("14px Arial,Helvetica,sans-serif")
                .Visible(true)
                );
            )
            .Render();
            %>


### Visible(System.Boolean)
Sets the labels visibility


#### Parameters

##### visible `System.Boolean`
The labels visibility.




#### Example (ASPX)
    <% Html.Kendo().Chart()
        .Name("Chart")
        .Series(series => series
            .Bar(s => s.Sales)
            .Labels(labels => labels
                .Visible(true)
                );
            )
            .Render();
            %>


### VisibleHandler(System.String)
Sets the function used to set the labels visibility.


#### Parameters

##### visibleFunction `System.String`
The JavaScript function that will be executed
                to retrieve the visible state of each label.




#### Example (ASPX)
    <% Html.Kendo().Chart()
        .Name("Chart")
        .Series(series => series
            .Bar(s => s.Sales)
            .Labels(labels => labels
                .VisibleHandler("labelVisible")
                );
            )
            .Render();
            %>


### VisibleHandler(System.Func\<System.Object,System.Object\>)
Sets the function used to set the labels visibility.


#### Parameters

##### visibleFunction `System.Func<System.Object,System.Object>`
The JavaScript function that will be executed
                to retrieve the visible state of each label.




#### Example (ASPX)
    <% Html.Kendo().Chart()
        .Name("Chart")
        .Series(series => series
            .Bar(s => s.Sales)
            .Labels(labels => labels
                .VisibleHandler(
                    @<text>
                        function(point) {
                        return point.value > 5;
                        }
                        </text>
                    )
                    );
                )
                .Render();
                %>


### Background(System.String)
Sets the labels background color


#### Parameters

##### background `System.String`
The labels background color.




#### Example (ASPX)
    <% Html.Kendo().Chart()
        .Name("Chart")
        .Series(series => series
            .Bar(s => s.Sales)
            .Labels(labels => labels
                .Background("Red")
                .Visible(true);
                );
            )
            .Render();
            %>


### Color(System.String)
Sets the labels text color


#### Parameters

##### color `System.String`
The labels text color.




#### Example (ASPX)
    <% Html.Kendo().Chart()
        .Name("Chart")
        .Series(series => series
            .Bar(s => s.Sales)
            .Labels(labels => labels
                .Color("Red")
                .Visible(true);
                );
            )
            .Render();
            %>


### Color(System.Func\<System.Object,System.Object\>)
Sets a Function that returns the JavaScript handler for the labels color.


#### Parameters

##### handler `System.Func<System.Object,System.Object>`
The labels text color.




#### Example (ASPX)
    <% Html.Kendo().Chart()
        .Name("Chart")
        .Series(series => series
            .Bar(s => s.Sales)
            .Labels(labels => labels
                .Color(o => "colorHandler")
                .Visible(true);
                );
            )
            .Render();
            %>


### Margin(System.Int32,System.Int32,System.Int32,System.Int32)
Sets the labels margin


#### Parameters

##### top `System.Int32`
The labels top margin.

##### right `System.Int32`
The labels right margin.

##### bottom `System.Int32`
The labels bottom margin.

##### left `System.Int32`
The labels left margin.




#### Example (ASPX)
    <% Html.Kendo().Chart()
        .Name("Chart")
        .Series(series => series
            .Bar(s => s.Sales)
            .Labels(labels => labels
                .Margin(0, 5, 5, 0)
                .Visible(true);
                );
            )
            .Render();
            %>


### Margin(System.Int32)
Sets the labels margin


#### Parameters

##### margin `System.Int32`
The labels margin.




#### Example (ASPX)
    <% Html.Kendo().Chart()
        .Name("Chart")
        .Series(series => series
            .Bar(s => s.Sales)
            .Labels(labels => labels
                .Margin(20)
                .Visible(true);
                );
            )
            .Render();
            %>


### Padding(System.Int32,System.Int32,System.Int32,System.Int32)
Sets the labels padding


#### Parameters

##### top `System.Int32`
The labels top padding.

##### right `System.Int32`
The labels right padding.

##### bottom `System.Int32`
The labels bottom padding.

##### left `System.Int32`
The labels left padding.




#### Example (ASPX)
    <% Html.Kendo().Chart()
        .Name("Chart")
        .Series(series => series
            .Bar(s => s.Sales)
            .Labels(labels => labels
                .Padding(0, 5, 5, 0)
                .Visible(true);
                );
            )
            .Render();
            %>


### Padding(System.Int32)
Sets the labels padding


#### Parameters

##### padding `System.Int32`
The labels padding.




#### Example (ASPX)
    <% Html.Kendo().Chart()
        .Name("Chart")
        .Series(series => series
            .Bar(s => s.Sales)
            .Labels(labels => labels
                .Padding(20)
                .Visible(true);
                );
            )
            .Render();
            %>


### Border(System.Int32,System.String,Kendo.Mvc.UI.ChartDashType)
Sets the labels border


#### Parameters

##### width `System.Int32`
The labels border width.

##### color `System.String`
The labels border color (CSS syntax).

##### dashType [Kendo.Mvc.UI.ChartDashType](/api/aspnet-mvc/Kendo.Mvc.UI/ChartDashType)
The labels border dash type.




#### Example (ASPX)
    <% Html.Kendo().Chart()
        .Name("Chart")
        .Series(series => series
            .Bar(s => s.Sales)
            .Labels(labels => labels
                .Border(1, "Red", ChartDashType.Dot)
                .Visible(true);
                );
            )
            .Render();
            %>


### Border(System.Action\<Kendo.Mvc.UI.Fluent.ChartBorderBuilder\>)
Configures the labels border


#### Parameters

##### configurator System.Action<[Kendo.Mvc.UI.Fluent.ChartBorderBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/ChartBorderBuilder)>
The border configuration action





### Format(System.String)
Sets the labels format.


#### Parameters

##### format `System.String`
The labels format.




#### Example (ASPX)
    <% Html.Kendo().Chart()
        .Name("Chart")
        .Series(series => series
            .Bar(s => s.Sales)
            .Labels(labels => labels
                .Format("{0:C}")
                .Visible(true);
                );
            )
            .Render();
            %>


### Template(System.String)
Sets the labels template.


#### Parameters

##### template `System.String`
The labels template.




#### Example (ASPX)
    <% Html.Kendo().Chart()
        .Name("Chart")
        .Series(series => series
            .Bar(s => s.Sales)
            .Labels(labels => labels
                .Template("${TotalSales}")
                .Visible(true);
                );
            )
            .Render();
            %>


### Opacity(System.Double)
Sets the labels opacity.


#### Parameters

##### opacity `System.Double`
The series opacity in the range from 0 (transparent) to 1 (opaque).
            The default value is 1.




#### Example (ASPX)
    <% Html.Kendo().Chart()
        .Name("Chart")
        .Series(series => series
            .Bar(s => s.Sales)
            .Labels(labels => labels
                .Opacity(0.5)
                .Visible(true);
                );
            )
            .Render();
            %>


### Rotation(System.Int32)
Sets the labels text rotation


#### Parameters

##### rotation `System.Int32`
The labels text rotation.




#### Example (ASPX)
    <% Html.Kendo().Chart()
        .Name("Chart")
        .Series(series => series
            .Bar(s => s.Sales)
            .Labels(labels => labels
                .Rotation(45)
                .Visible(true);
                );
            )
            .Render();
            %>


### Visual(System.Func\<System.Object,System.Object\>)
Sets the labels visual handler


#### Parameters

##### handler `System.Func<System.Object,System.Object>`
The handler






