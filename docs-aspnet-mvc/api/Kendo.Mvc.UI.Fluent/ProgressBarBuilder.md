---
title: ProgressBarBuilder
---

# Kendo.Mvc.UI.Fluent.ProgressBarBuilder
Define the fluent interface for configuring the ProgressBar component.




## Methods


### Animation(System.Boolean)
Use to enable or disable the animation.


#### Parameters

##### enable `System.Boolean`
The boolean value.




#### Example (ASPX)
    <%= Html.Kendo().ProgressBar()
    .Name("progressBar")
    .Animation(false)
    %>


### Animation(System.Action\<Kendo.Mvc.UI.Fluent.ProgressBarAnimationBuilder\>)
Configures the animation effects.


#### Parameters

##### animationAction System.Action<[Kendo.Mvc.UI.Fluent.ProgressBarAnimationBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/ProgressBarAnimationBuilder)>
The action which configures the animation effects.




#### Example (ASPX)
    <%= Html.Kendo().ProgressBar()
    .Name("progressBar")
    .Animation(a => a.Duration(200))
    %>


### ChunkCount(System.Int32)
Sets the number of chunks to which the ProgressBar will be divided (applies only when type is "chunk")


#### Parameters

##### count `System.Int32`
The number of chunks




#### Example (ASPX)
    <%= Html.Kendo().ProgressBar()
    .Name("progressBar")
    .Type(ProgressBarType.Chunk)
    .ChunkCount(10)
    %>


### Enable(System.Boolean)
Enables or disables the component


#### Parameters

##### value `System.Boolean`
true if the component should be enabled, false otherwise; the default is true.




#### Example (ASPX)
    <%= Html.Kendo().ProgressBar()
    .Name("progressBar")
    .Enable(false)
    %>


### Events(System.Action\<Kendo.Mvc.UI.Fluent.ProgressBarEventBuilder\>)
Configures the client-side events


#### Parameters

##### configurator System.Action<[Kendo.Mvc.UI.Fluent.ProgressBarEventBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/ProgressBarEventBuilder)>
The client events configuration action.




#### Example (ASPX)
    <%= Html.Kendo().ProgressBar()
    .Name("progressBar")
    .Events(events => events
        .Change("onChange"))
    %>


### Max(System.Double)
Sets the maximum value of the ProgressBar


#### Parameters

##### value `System.Double`
Number specifying the maximum value




#### Example (ASPX)
    <%= Html.Kendo().ProgressBar()
    .Name("progressBar")
    .Max(200)
    %>


### Min(System.Double)
Sets the minimum value of the ProgressBar


#### Parameters

##### value `System.Double`
Number specifying the minimum value




#### Example (ASPX)
    <%= Html.Kendo().ProgressBar()
    .Name("progressBar")
    .Min(50)
    %>


### Orientation(Kendo.Mvc.UI.ProgressBarOrientation)
Sets the orientation of the ProgressBar


#### Parameters

##### orientation [Kendo.Mvc.UI.ProgressBarOrientation](/api/aspnet-mvc/Kendo.Mvc.UI/ProgressBarOrientation)
ProgressBarOrientation enumeration specifying the orientation




#### Example (ASPX)
    <%= Html.Kendo().ProgressBar()
    .Name("progressBar")
    .Orientation(ProgressBarOrientation.Vertical)
    %>


### Reverse(System.Boolean)
Specifies if the ProgressBar direction will be reversed


#### Parameters

##### value `System.Boolean`
The boolean value




#### Example (ASPX)
    <%= Html.Kendo().ProgressBar()
    .Name("progressBar")
    .Reverse(true)
    %>


### ShowStatus(System.Boolean)
Specifies if the Progress status will be displayed


#### Parameters

##### value `System.Boolean`
The boolean value




#### Example (ASPX)
    <%= Html.Kendo().ProgressBar()
    .Name("progressBar")
    .ShowStatus(false)
    %>


### Type(Kendo.Mvc.UI.ProgressBarType)
Specifies the type of the ProgressBar


#### Parameters

##### type [Kendo.Mvc.UI.ProgressBarType](/api/aspnet-mvc/Kendo.Mvc.UI/ProgressBarType)
ProgressBarType enumeration specifying the type




#### Example (ASPX)
    <%= Html.Kendo().ProgressBar()
    .Name("progressBar")
    .Type(ProgressBarType.Percent)
    %>


### Value(System.Double)
Sets the initial value of the ProgressBar


#### Parameters

##### value `System.Double`
Number specifying the value




#### Example (ASPX)
    <%= Html.Kendo().ProgressBar()
    .Name("progressBar")
    .Min(100)
    .Max(200)
    .Value(100)
    %>


### Value(System.Boolean)
Sets the initial value of the ProgressBar


#### Parameters

##### value `System.Boolean`
Pass false to set indeterminate value




#### Example (ASPX)
    <%= Html.Kendo().ProgressBar()
    .Name("progressBar")
    .Min(100)
    .Max(200)
    .Value(false)
    %>



