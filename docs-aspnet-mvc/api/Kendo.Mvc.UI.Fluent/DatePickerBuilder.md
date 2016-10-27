---
title: DatePickerBuilder
---

# Kendo.Mvc.UI.Fluent.DatePickerBuilder
Defines the fluent interface for configuring the DatePicker component.




## Methods


### ARIATemplate(System.String)
Specifies a template used to populate aria-label attribute.


#### Parameters

##### template `System.String`
The string template.




#### Example (ASPX)
    <%= Html.Kendo().DatePicker()
    .Name("DatePicker")
    .ARIATemplate("Date: #=kendo.toString(data.current, 'd')#")
    %>


### FooterId(System.String)
FooterId to be used for rendering the footer of the Calendar.




#### Example (ASPX)
    <%= Html.Kendo().DatePicker()
    .Name("DatePicker")
    .FooterId("widgetFooterId")
    %>


### Footer(System.String)
Footer template to be used for rendering the footer of the Calendar.




#### Example (ASPX)
    <%= Html.Kendo().DatePicker()
    .Name("DatePicker")
    .Footer("#= kendo.toString(data, "G") #")
    %>


### Footer(System.Boolean)
Enables/disables footer of the calendar popup.




#### Example (ASPX)
    <%= Html.Kendo().DatePicker()
    .Name("DatePicker")
    .Footer(false)
    %>


### Depth(Kendo.Mvc.UI.CalendarView)
Specifies the navigation depth.




#### Example (ASPX)
    <%= Html.Kendo().DatePicker()
    .Name("DatePicker")
    .Depth(CalendarView.Month)
    %>


### Start(Kendo.Mvc.UI.CalendarView)
Specifies the start view.




#### Example (ASPX)
    <%= Html.Kendo().DatePicker()
    .Name("DatePicker")
    .Start(CalendarView.Month)
    %>


### MonthTemplateId(System.String)
MonthTemplateId to be used for rendering the cells of the Calendar.




#### Example (ASPX)
    <%= Html.Kendo().DatePicker()
    .Name("DatePicker")
    .MonthTemplateId("widgetMonthTemplateId")
    %>


### MonthTemplate(System.String)
Templates for the cells rendered in the "month" view.




#### Example (ASPX)
    <%= Html.Kendo().DatePicker()
    .Name("DatePicker")
    .MonthTemplate("#= data.value #")
    %>


### MonthTemplate(System.Action\<Kendo.Mvc.UI.Fluent.MonthTemplateBuilder\>)
Configures the content of cells of the Calendar.




#### Example (ASPX)
    <%= Html.Kendo().DatePicker()
    .Name("DatePicker")
    .MonthTemplate(month => month.Content("#= data.value #"))
    %>


### Min(System.String)
Sets the minimal date, which can be selected in DatePicker.





### Max(System.String)
Sets the maximal date, which can be selected in DatePicker.





### DisableDates(System.DayOfWeek[])
Specifies the disabled dates in the DatePicker widget.




#### Example (ASPX)
    @(Html.Kendo().DatePicker()
        .Name("datePicker")
        .DisableDates(DayofWeek.Saturday, DayOfWeek.Sunday)
    )


### DisableDates(System.String)
Specifies the disabled dates in the DatePicker widget using a function.




#### Example (ASPX)
    <%= Html.Kendo().DatePicker()
    .Name("DatePicker")
    .DisableDates("disableDates")
    %>



