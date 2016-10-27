---
title: DatePickerBuilderBase
---

# Kendo.Mvc.UI.Fluent.DatePickerBuilderBase
Defines the fluent interface for configuring the DatePickerBase component.




## Methods


### Animation(System.Boolean)
Use to enable or disable animation of the popup element.


#### Parameters

##### enable `System.Boolean`
The boolean value.




#### Example (ASPX)
    <%= Html.Kendo().DatePicker()
    .Name("DatePicker")
    .Animation(false) //toggle effect
    %>


### Animation(System.Action\<Kendo.Mvc.UI.Fluent.PopupAnimationBuilder\>)
Configures the animation effects of the widget.


#### Parameters

##### animationAction System.Action<[Kendo.Mvc.UI.Fluent.PopupAnimationBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/PopupAnimationBuilder)>
The action which configures the animation effects.




#### Example (ASPX)
    <%= Html.Kendo().DatePicker()
    .Name("DatePicker")
    .Animation(animation =>
    {
        animation.Open(open =>
        {
            open.SlideIn(SlideDirection.Down);
        })
    })
    %>


### Culture(System.String)
Specifies the culture info used by the widget.




#### Example (ASPX)
    <%= Html.Kendo().DatePicker()
    .Name("DatePicker")
    .Culture("de-DE")
    %>


### Events(System.Action\<Kendo.Mvc.UI.Fluent.DatePickerEventBuilderBase\>)
Configures the client-side events.


#### Parameters

##### clientEventsAction System.Action<[Kendo.Mvc.UI.Fluent.DatePickerEventBuilderBase](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/DatePickerEventBuilderBase)>
The client events action.




#### Example (ASPX)
    <%= Html.Kendo().DatePicker()
    .Name("DatePicker")
    .Events(events =>
        events.Open("open").Change("change")
    )
    %>


### Format(System.String)
Sets the date format, which will be used to parse and format the machine date. Defaults to CultureInfo.DateTimeFormat.ShortDatePattern.





### ParseFormats(System.Collections.Generic.IEnumerable\<System.String\>)
Specifies the formats, which are used to parse the value set with value() method or by direct input.





### Enable(System.Boolean)
Enables or disables the picker.





### Min(System.DateTime)
Sets the minimal date, which can be selected in picker.





### Max(System.DateTime)
Sets the maximal date, which can be selected in picker.





### Value(System.Nullable\<System.DateTime\>)
Sets the value of the picker input





### Value(System.String)
Sets the value of the picker input






