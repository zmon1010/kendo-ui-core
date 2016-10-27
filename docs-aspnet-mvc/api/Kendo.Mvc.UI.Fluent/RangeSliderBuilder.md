---
title: RangeSliderBuilder
---

# Kendo.Mvc.UI.Fluent.RangeSliderBuilder
Defines the fluent interface for configuring the 1component.




## Methods


### Values(System.Nullable\<T\>,System.Nullable\<T\>)
Sets the value of the range slider.





### Values(T[])
Sets the value of the range slider.





### Orientation(Kendo.Mvc.UI.SliderOrientation)
Sets orientation of the range slider.





### TickPlacement(Kendo.Mvc.UI.SliderTickPlacement)
Sets a value indicating how to display the tick marks on the range slider.





### Min(T)
Sets the minimum value of the range slider.





### Max(T)
Sets the maximum value of the range slider.





### SmallStep(T)
Sets the step with which the range slider value will change.





### LargeStep(T)
Sets the delta with which the value will change when user click on the track.





### Tooltip(System.Boolean)
Display tooltip while drag.





### Tooltip(System.Action\<Kendo.Mvc.UI.Fluent.SliderTooltipBuilder\>)
Use it to configure tooltip while drag.


#### Parameters

##### action System.Action<[Kendo.Mvc.UI.Fluent.SliderTooltipBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/SliderTooltipBuilder)>
Use builder to set different tooltip options.




#### Example (ASPX)
    <%= Html.Kendo().Slider()
    .Name("Slider")
    .Tooltip(tooltip => tooltip
        .Enable(true)
        .Format("{0:P}")
        );
    %>


### Events(System.Action\<Kendo.Mvc.UI.Fluent.RangeSliderEventBuilder\>)
Configures the client-side events.


#### Parameters

##### events System.Action<[Kendo.Mvc.UI.Fluent.RangeSliderEventBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/RangeSliderEventBuilder)>
The client events action.




#### Example (ASPX)
    <%= Html.Kendo().RangeSlider()
    .Name("RangeSlider")
    .Events(events =>
        events.OnChange("onChange"))
    %>


### LeftDragHandleTitle(System.String)
Sets the title of the slider draghandle.





### RightDragHandleTitle(System.String)
Sets the title of the slider draghandle.






