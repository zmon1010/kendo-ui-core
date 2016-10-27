---
title: GanttViewBuilder
---

# Kendo.Mvc.UI.Fluent.GanttViewBuilder
Defines the fluent API for configuring the GanttView settings.




## Methods


### Date(System.DateTime)
If set to some date and it is between the range start and range end of the selected view, the timeline of the currently selected view is scrolled to start from this date.Overrides the date option of the gantt.


#### Parameters

##### value `System.DateTime`
The value that configures the date.





### Range(System.Action\<Kendo.Mvc.UI.Fluent.GanttViewRangeSettingsBuilder\>)
Configures the view range settings.


#### Parameters

##### configurator System.Action<[Kendo.Mvc.UI.Fluent.GanttViewRangeSettingsBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/GanttViewRangeSettingsBuilder)>
The action that configures the range.





### Selected(System.Boolean)
If set to true the view will be initially selected by the Gantt widget. The default selected view is "day".


#### Parameters

##### value `System.Boolean`
The value that configures the selected.





### SlotSize(System.Double)
The size of the time slot headers. Values are treated as pixels.


#### Parameters

##### value `System.Double`
The value that configures the slotsize.





### TimeHeaderTemplate(System.String)
The template used to render the time slots in "day" view


#### Parameters

##### value `System.String`
The value that configures the timeheadertemplate.





### TimeHeaderTemplateId(System.String)
The template used to render the time slots in "day" view


#### Parameters

##### value `System.String`
The value that configures the timeheadertemplate.





### DayHeaderTemplate(System.String)
The template used to render the day slots in "day" and "week" views.


#### Parameters

##### value `System.String`
The value that configures the dayheadertemplate.





### DayHeaderTemplateId(System.String)
The template used to render the day slots in "day" and "week" views.


#### Parameters

##### value `System.String`
The value that configures the dayheadertemplate.





### WeekHeaderTemplate(System.String)
The template used to render the week slots in "week" and "month" views.


#### Parameters

##### value `System.String`
The value that configures the weekheadertemplate.





### WeekHeaderTemplateId(System.String)
The template used to render the week slots in "week" and "month" views.


#### Parameters

##### value `System.String`
The value that configures the weekheadertemplate.





### MonthHeaderTemplate(System.String)
The template used to render the month slots in "month" and "year" views.


#### Parameters

##### value `System.String`
The value that configures the monthheadertemplate.





### MonthHeaderTemplateId(System.String)
The template used to render the month slots in "month" and "year" views.


#### Parameters

##### value `System.String`
The value that configures the monthheadertemplate.





### YearHeaderTemplate(System.String)
The template used to render the year slots in "year" view.


#### Parameters

##### value `System.String`
The value that configures the yearheadertemplate.





### YearHeaderTemplateId(System.String)
The template used to render the year slots in "year" view.


#### Parameters

##### value `System.String`
The value that configures the yearheadertemplate.





### ResizeTooltipFormat(System.String)
The format used to display the start and end dates in the resize tooltip.


#### Parameters

##### value `System.String`
The value that configures the resizetooltipformat.





### Type(Kendo.Mvc.UI.GanttViewType)
The view type. Supported types are "day", "week", "month" and "year".


#### Parameters

##### value [Kendo.Mvc.UI.GanttViewType](/api/aspnet-mvc/Kendo.Mvc.UI/GanttViewType)
The value that configures the type.






