---
title: SliderBuilder
---

# Kendo.Mvc.UI.Fluent.SliderBuilder
Defines the fluent interface for configuring the 1component.




## Methods


### Value(System.Nullable\<T\>)
Sets the value of the slider.





### DragHandleTitle(System.String)
Sets the title of the slider draghandle.





### IncreaseButtonTitle(System.String)
Sets the title of the slider increase button.





### ShowButtons(System.Nullable\<System.Boolean\>)
Sets whether slider to be rendered with increase/decrease button.





### DecreaseButtonTitle(System.String)
Sets the title of the slider decrease button.





### Orientation(Kendo.Mvc.UI.SliderOrientation)
Sets orientation of the slider.





### TickPlacement(Kendo.Mvc.UI.SliderTickPlacement)
Sets a value indicating how to display the tick marks on the slider.





### Min(T)
Sets the minimum value of the slider.





### Max(T)
Sets the maximum value of the slider.





### SmallStep(T)
Sets the step with which the slider value will change.





### LargeStep(T)
Sets the delta with which the value will change when user click on the slider.





### Tooltip(System.Boolean)
Display tooltip while drag.





### Tooltip(System.Action\<Kendo.Mvc.UI.Fluent.SliderTooltipBuilder\>)
Use it to configure tooltip.


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


### Events(System.Action\<Kendo.Mvc.UI.Fluent.SliderEventBuilder\>)
Configures the client-side events.


#### Parameters

##### events System.Action<[Kendo.Mvc.UI.Fluent.SliderEventBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/SliderEventBuilder)>
The client events action.




#### Example (ASPX)
    <%= Html.Kendo().Slider()
    .Name("Slider")
    .Events(events =>
        events.OnChange("onChange"))
    %>



