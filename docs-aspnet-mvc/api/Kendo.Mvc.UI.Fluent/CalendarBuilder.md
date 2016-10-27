---
title: CalendarBuilder
---

# Kendo.Mvc.UI.Fluent.CalendarBuilder
Defines the fluent interface for configuring the Calendar.




## Methods


### Culture(System.String)
Specifies the culture info used by the Calendar widget.




#### Example (ASPX)
    <%= Html.Kendo().Calendar()
    .Name("calendar")
    .Culture("de-DE")
    %>


### Events(System.Action\<Kendo.Mvc.UI.Fluent.CalendarEventBuilder\>)
Configures the client-side events.


#### Parameters

##### clientEventsAction System.Action<[Kendo.Mvc.UI.Fluent.CalendarEventBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/CalendarEventBuilder)>
The client events action.




#### Example (ASPX)
    <%= Html.Kendo().Calendar()
    .Name("Calendar")
    .Events(events =>
        events.Select("onSelect")
    )
    %>


### Format(System.String)
Sets the date format, which will be used to parse and format the machine date.





### FooterId(System.String)
FooterId to be used for rendering the footer of the Calendar.




#### Example (ASPX)
    <%= Html.Kendo().Calendar()
    .Name("Calendar")
    .FooterId("widgetFooterId")
    %>


### Footer(System.String)
Footer template to be used for rendering the footer of the Calendar.




#### Example (ASPX)
    <%= Html.Kendo().Calendar()
    .Name("Calendar")
    .Footer("#= kendo.toString(data, "G") #")
    %>


### Footer(System.Boolean)
Enable/disable footer.




#### Example (ASPX)
    <%= Html.Kendo().Calendar()
    .Name("Calendar")
    .Footer(false)
    %>


### Depth(Kendo.Mvc.UI.CalendarView)
Specifies the navigation depth.




#### Example (ASPX)
    <%= Html.Kendo().Calendar()
    .Name("Calendar")
    .Depth(CalendarView.Month)
    %>


### Start(Kendo.Mvc.UI.CalendarView)
Specifies the start view.




#### Example (ASPX)
    <%= Html.Kendo().Calendar()
    .Name("Calendar")
    .Start(CalendarView.Month)
    %>


### MonthTemplateId(System.String)
MonthTemplateId to be used for rendering the cells of the Calendar.




#### Example (ASPX)
    <%= Html.Kendo().Calendar()
    .Name("Calendar")
    .MonthTemplateId("widgetMonthTemplateId")
    %>


### MonthTemplate(System.String)
Templates for the cells rendered in the "month" view.




#### Example (ASPX)
    <%= Html.Kendo().Calendar()
    .Name("Calendar")
    .MonthTemplate("#= data.value #")
    %>


### MonthTemplate(System.Action\<Kendo.Mvc.UI.Fluent.MonthTemplateBuilder\>)
Configures the content of cells of the Calendar.




#### Example (ASPX)
    <%= Html.Kendo().Calendar()
    .Name("Calendar")
    .MonthTemplate(month => month.Content("#= data.value #"))
    %>


### Min(System.String)
Sets the minimal date, which can be selected in the calendar.





### Max(System.String)
Sets the maximal date, which can be selected in the calendar.





### Min(System.DateTime)
Sets the minimal date, which can be selected in the calendar





### Max(System.DateTime)
Sets the maximal date, which can be selected in the calendar





### Value(System.Nullable\<System.DateTime\>)
Sets the value of the calendar





### Value(System.String)
Sets the value of the calendar





### Selection(System.Action\<Kendo.Mvc.UI.Fluent.CalendarSelectionSettingsBuilder\>)
Configures the selection settings of the calendar.


#### Parameters

##### selectionAction System.Action<[Kendo.Mvc.UI.Fluent.CalendarSelectionSettingsBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/CalendarSelectionSettingsBuilder)>
SelectAction settings, which includes Action name and IEnumerable of DateTime objects.



#### Returns




### DisableDates(System.DayOfWeek[])
Specifies the disabled dates in the Calendar widget using a function.




#### Example (ASPX)
    <%= Html.Kendo().Calendar()
    .Name("calendar")
    .DisableDates(DayofWeek.Saturday, DayOfWeek.Sunday)
    %>


### DisableDates(System.String)
Specifies the disabled dates in the Calendar widget using a function.




#### Example (ASPX)
    <%= Html.Kendo().Calendar()
    .Name("calendar")
    .DisableDates("disableDates")
    %>



