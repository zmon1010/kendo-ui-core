---
title: ChartLegendLabelsBuilder
---

# Kendo.Mvc.UI.Fluent.ChartLegendLabelsBuilder
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
        .Legend(legend => legend
            .Labels(labels => labels
                .Font("14px Arial,Helvetica,sans-serif")
            )
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
        .Legend(legend => legend
            .Labels(labels => labels
                .Color("Red")
            )
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
        .Legend(legend => legend
            .Labels(labels => labels
                .Template("${TotalSales}")
            )
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





### Padding(System.Int32)
Sets the labels padding


#### Parameters

##### padding `System.Int32`
The labels padding.






