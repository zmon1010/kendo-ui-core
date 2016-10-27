---
title: SchedulerMultiDayViewBuilder
---

# Kendo.Mvc.UI.Fluent.SchedulerMultiDayViewBuilder
Defines the fluent interface for configuring the SchedulerMultiDayView.




## Methods


### AllDayEventTemplate(System.String)
The template used to render the "all day" scheduler events.


#### Parameters

##### allDayEventTemplate `System.String`
The allDayEventTemplate





### AllDayEventTemplateId(System.String)
The Id of the template used to render the "all day" scheduler events.


#### Parameters

##### allDayEventTemplateId `System.String`
The allDayEventTemplateId





### GroupHeaderTemplate(System.String)
The template used to render the group headers of scheduler day, week, workWeek and timeline views.


#### Parameters

##### groupHeaderTemplate `System.String`
The groupHeaderTemplate





### GroupHeaderTemplateId(System.String)
The Id of the template used to render the group headers of scheduler day, week, workWeek and timeline views.


#### Parameters

##### groupHeaderTemplateId `System.String`
The groupHeaderTemplateId





### AllDaySlot(System.Boolean)
If set to true the scheduler will display a slot for "all day" events. Default value is true.


#### Parameters

##### allDaySlot `System.Boolean`
The allDaySlot





### DateHeaderTemplate(System.String)
The template used to render the date header cells.


#### Parameters

##### dateHeaderTemplate `System.String`
The dateHeaderTemplate





### DateHeaderTemplateId(System.String)
The Id of the template used to render the date header cells.


#### Parameters

##### dateHeaderTemplateId `System.String`
The dateHeaderTemplateId





### MajorTick(System.Int32)
The number of minutes represented by a major tick.


#### Parameters

##### majorTick `System.Int32`
The majorTick





### AllDaySlotTemplate(System.String)
The template used to render the all day slot content


#### Parameters

##### slotTemplate `System.String`
The slotTemplate





### AllDaySlotTemplateId(System.String)
The Id of the template used to render the all day slot content.


#### Parameters

##### slotTemplateId `System.String`
The id of template





### SlotTemplate(System.String)
The template used to render the slot content


#### Parameters

##### slotTemplate `System.String`
The slotTemplate





### SlotTemplateId(System.String)
The Id of the template used to render the slot content.


#### Parameters

##### slotTemplateId `System.String`
The id of template





### MajorTimeHeaderTemplate(System.String)
The template used to render the major ticks.


#### Parameters

##### majorTimeHeaderTemplate `System.String`
The majorTimeHeaderTemplate





### MajorTimeHeaderTemplateId(System.String)
The Id of the template used to render the major ticks.


#### Parameters

##### majorTimeHeaderTemplateId `System.String`
The majorTimeHeaderTemplateId





### MinorTickCount(System.Int32)
The number of time slots to display per major tick.


#### Parameters

##### minorTickCount `System.Int32`
The minorTickCount





### MinorTimeHeaderTemplate(System.String)
The template used to render the minor ticks.


#### Parameters

##### minorTimeHeaderTemplate `System.String`
The minorTimeHeaderTemplate





### MinorTimeHeaderTemplateId(System.String)
The Id of the template used to render the minor ticks.


#### Parameters

##### minorTimeHeaderTemplateId `System.String`
The minorTimeHeaderTemplateId





### StartTime(System.DateTime)
The start time of the view. The scheduler will display events starting after the startTime.


#### Parameters

##### startTime `System.DateTime`
The startTime




#### Example (Razor)
    @(Html.Kendo().Scheduler<Kendo.Mvc.Examples.Models.Scheduler.Task>()
        .Name("scheduler")
        .Date(new DateTime(2013, 6, 13))
        .Views(views =>
        {
            views.DayView(dayView => {
                dayView.Title("Day");
                dayView.StartTime(new DateTime(2013, 6, 13, 10, 00, 00));
                dayView.EndTime(new DateTime(2013, 6, 13, 23, 00, 00));
                });
            })
            .DataSource(d => d
                .Model(m => m.Id(f => f.TaskID))
                .Read("Read", "Scheduler")
                .Create("Create", "Scheduler")
                .Destroy("Destroy", "Scheduler")
                .Update("Update", "Scheduler")
            )
        )


### StartTime(System.Int32,System.Int32,System.Int32)
The start time of the view. The scheduler will display events starting after the startTime.


#### Parameters

##### hours `System.Int32`
The hours

##### minutes `System.Int32`
The minutes

##### seconds `System.Int32`
The seconds




#### Example (Razor)
    @(Html.Kendo().Scheduler<Kendo.Mvc.Examples.Models.Scheduler.Task>()
        .Name("scheduler")
        .Date(new DateTime(2013, 6, 13))
        .Views(views =>
        {
            views.DayView(dayView => {
                dayView.Title("Day");
                dayView.StartTime(10,0,0);
                dayView.EndTime(new DateTime(2013, 6, 13, 23, 00, 00));
                });
            })
            .DataSource(d => d
                .Model(m => m.Id(f => f.TaskID))
                .Read("Read", "Scheduler")
                .Create("Create", "Scheduler")
                .Destroy("Destroy", "Scheduler")
                .Update("Update", "Scheduler")
            )
        )


### EndTime(System.DateTime)
The end time of the view. The scheduler will display events ending before the endTime.


#### Parameters

##### endTime `System.DateTime`
The endTime




#### Example (Razor)
    @(Html.Kendo().Scheduler<Kendo.Mvc.Examples.Models.Scheduler.Task>()
        .Name("scheduler")
        .Date(new DateTime(2013, 6, 13))
        .Views(views =>
        {
            views.DayView(dayView => {
                dayView.Title("Day");
                dayView.StartTime(new DateTime(2013, 6, 13, 10, 00, 00));
                dayView.EndTime(new DateTime(2013, 6, 13, 23, 00, 00));
                });
            })
            .DataSource(d => d
                .Model(m => m.Id(f => f.TaskID))
                .Read("Read", "Scheduler")
                .Create("Create", "Scheduler")
                .Destroy("Destroy", "Scheduler")
                .Update("Update", "Scheduler")
            )
        )


### EndTime(System.Int32,System.Int32,System.Int32)
The end time of the view. The scheduler will display events ending before the endTime.


#### Parameters

##### hours `System.Int32`
The hours

##### minutes `System.Int32`
The minutes

##### seconds `System.Int32`
The seconds




#### Example (Razor)
    @(Html.Kendo().Scheduler<Kendo.Mvc.Examples.Models.Scheduler.Task>()
        .Name("scheduler")
        .Date(new DateTime(2013, 6, 13))
        .Views(views =>
        {
            views.DayView(dayView => {
                dayView.Title("Day");
                dayView.StartTime(new DateTime(2013, 6, 13, 10, 00, 00));
                dayView.EndTime(23,0,0);
                });
            })
            .DataSource(d => d
                .Model(m => m.Id(f => f.TaskID))
                .Read("Read", "Scheduler")
                .Create("Create", "Scheduler")
                .Destroy("Destroy", "Scheduler")
                .Update("Update", "Scheduler")
            )
        )


### WorkDayStart(System.DateTime)
The start time of the business hours. The scheduler will display events after the workDayStart if "WorkDayCommand" button is clicked.


#### Parameters

##### workDayStart `System.DateTime`
The WorkDayStart





### WorkDayStart(System.Int32,System.Int32,System.Int32)
The start time of the business hours. The scheduler will display events after the workDayStart if "WorkDayCommand" button is clicked.


#### Parameters

##### hours `System.Int32`
The hours

##### minutes `System.Int32`
The minutes

##### seconds `System.Int32`
The seconds





### WorkDayEnd(System.DateTime)
The end time of the business hours. The scheduler will display events before the workDayEnd if "WorkDayCommand" button is clicked.


#### Parameters

##### workDayEnd `System.DateTime`
The WorkDayEnd





### WorkDayEnd(System.Int32,System.Int32,System.Int32)
The end time of the business hours. The scheduler will display events before the workDayEnd if "WorkDayCommand" button is clicked.


#### Parameters

##### hours `System.Int32`
The hours

##### minutes `System.Int32`
The minutes

##### seconds `System.Int32`
The seconds





### WorkDayCommand(System.Boolean)
If set to false the scheduler will not display the "WorkDayCommand" button. Default value is true.


#### Parameters

##### showWorkDayCommand `System.Boolean`
The showWorkDayCommand





### ShowWorkHours(System.Boolean)
If set to true the view will be initially shown in business hours mode.


#### Parameters

##### value `System.Boolean`






### ShowWorkHours
If set the view will be initially shown in business hours mode.





### Footer(System.Boolean)
If set to false the scheduler will not display the "footer" area. Default value is true.


#### Parameters

##### showFooter `System.Boolean`
The footer





### WorkWeekStart(System.Int32)
Sets the start day of work week by index.


#### Parameters

##### workWeekStartDay `System.Int32`
The workWeekStartDay





### WorkWeekEnd(System.Int32)
Sets the end day of work week by index.


#### Parameters

##### workWeekEndDay `System.Int32`
The workWeekEndDay






