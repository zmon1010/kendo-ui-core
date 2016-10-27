---
title: DateTimePickerBuilder
---

# Kendo.Mvc.UI.Fluent.DateTimePickerBuilder
Defines the fluent interface for configuring the TimePicker component.




## Methods


### ARIATemplate(System.String)
Specifies a template used to populate aria-label attribute.


#### Parameters

##### template `System.String`
The string template.




#### Example (ASPX)
    <%= Html.Kendo().DateTimePicker()
    .Name("DateTimePicker")
    .ARIATemplate("Date: #=kendo.toString(data.current, 'd')#")
    %>


### Interval(System.Int32)
Sets the interval between hours.





### Footer(System.Boolean)
Enables/disables footer of the calendar popup.




#### Example (ASPX)
    <%= Html.Kendo().DateTimePicker()
    .Name("DateTimePicker")
    .Footer(false)
    %>


### Footer(System.String)
Footer template to be used for rendering the footer of the Calendar.




#### Example (ASPX)
    <%= Html.Kendo().DateTimePicker()
    .Name("DateTimePicker")
    .Footer("#= kendo.toString(data, "G") #")
    %>


### FooterId(System.String)
FooterId to be used for rendering the footer of the Calendar.




#### Example (ASPX)
    <%= Html.Kendo().DateTimePicker()
    .Name("DateTimePicker")
    .FooterId("widgetFooterId")
    %>


### Depth(Kendo.Mvc.UI.CalendarView)
Specifies the navigation depth.




#### Example (ASPX)
    <%= Html.Kendo().DateTimePicker()
    .Name("DateTimePicker")
    .Depth(CalendarView.Month)
    %>


### Start(Kendo.Mvc.UI.CalendarView)
Specifies the start view.




#### Example (ASPX)
    <%= Html.Kendo().DateTimePicker()
    .Name("DateTimePicker")
    .Start(CalendarView.Month)
    %>


### MonthTemplateId(System.String)
MonthTemplateId to be used for rendering the cells of the Calendar.




#### Example (ASPX)
    <%= Html.Kendo().DateTimePicker()
    .Name("DateTimePicker")
    .MonthTemplateId("widgetMonthTemplateId")
    %>


### MonthTemplate(System.String)
Templates for the cells rendered in the "month" view.




#### Example (ASPX)
    <%= Html.Kendo().DateTimePicker()
    .Name("DateTimePicker")
    .MonthTemplate("#= data.value #")
    %>


### MonthTemplate(System.Action\<Kendo.Mvc.UI.Fluent.MonthTemplateBuilder\>)
Configures the content of cells of the Calendar.




#### Example (ASPX)
    <%= Html.Kendo().DateTimePicker()
    .Name("DateTimePicker")
    .MonthTemplate(month => month.Content("#= data.value #"))
    %>


### Min(System.String)
Sets the minimal date, which can be selected in DatePicker.





### Max(System.String)
Sets the maximal date, which can be selected in DatePicker.





### TimeFormat(System.String)
Specifies the format, which is used to format the values in the time drop-down list.





### DisableDates(System.DayOfWeek[])
Specifies the disabled dates in the DateTimePicker widget.




#### Example (ASPX)
    @(Html.Kendo().DateTimePicker()
        .Name("DateTimePicker")
        .DisableDates(DayofWeek.Saturday, DayOfWeek.Sunday)
    )


### DisableDates(System.String)
Specifies the disabled dates in the DateTimePicker widget using a function.




#### Example (ASPX)
    <%= Html.Kendo().DateTimePicker()
    .Name("DateTimePicker")
    .DisableDates("disableDates")
    %>



