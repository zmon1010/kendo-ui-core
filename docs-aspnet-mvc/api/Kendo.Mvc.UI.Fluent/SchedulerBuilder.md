---
title: SchedulerBuilder
---

# Kendo.Mvc.UI.Fluent.SchedulerBuilder
Defines the fluent interface for configuring the 1.




## Methods


### Date(System.DateTime)
The current date of the scheduler. Used to determine the period which is displayed by the widget.


#### Parameters

##### date `System.DateTime`
The Date




#### Example (Razor)
    @(Html.Kendo().Scheduler<Kendo.Mvc.Examples.Models.Scheduler.Screening>()
        .Name("scheduler")
        .Date(new DateTime(2013, 6, 13))
        .BindTo(Model)
    )


### Mobile
Enables the adaptive rendering when viewed on mobile browser





### Mobile(Kendo.Mvc.UI.MobileMode)
Used to determine if adaptive rendering should be used when viewed on mobile browser


#### Parameters

##### type [Kendo.Mvc.UI.MobileMode](/api/aspnet-mvc/Kendo.Mvc.UI/MobileMode)






### StartTime(System.DateTime)
The start time of the week and day views. The scheduler will display events starting after the startTime.


#### Parameters

##### startTime `System.DateTime`
The startTime.




#### Example (Razor)
    @(Html.Kendo().Scheduler<Kendo.Mvc.Examples.Models.Scheduler.Screening>()
        .Name("scheduler")
        .Date(new DateTime(2013, 6, 13))
        .StartTime(new DateTime(2013, 6, 13, 10, 00, 00))
        .BindTo(Model)
    )


### StartTime(System.Int32,System.Int32,System.Int32)
The start time of the week and day views. The scheduler will display events starting after the startTime.


#### Parameters

##### hours `System.Int32`
The hours

##### minutes `System.Int32`
The minutes

##### seconds `System.Int32`
The seconds




#### Example (Razor)
    @(Html.Kendo().Scheduler<Kendo.Mvc.Examples.Models.Scheduler.Screening>()
        .Name("scheduler")
        .Date(new DateTime(2013, 6, 13))
        .StartTime(10, 0, 0)
        .BindTo(Model)
    )


### EndTime(System.DateTime)
The end time of the week and day views. The scheduler will display events ending before the endTime.


#### Parameters

##### endTime `System.DateTime`
The endTime.




#### Example (Razor)
    @(Html.Kendo().Scheduler<Kendo.Mvc.Examples.Models.Scheduler.Screening>()
        .Name("scheduler")
        .Date(new DateTime(2013, 6, 13))
        .EndTime(new DateTime(2013, 6, 13, 23, 00, 00))
        .BindTo(Model)
    )


### EndTime(System.Int32,System.Int32,System.Int32)
The end time of the week and day views. The scheduler will display events ending before the endTime.


#### Parameters

##### hours `System.Int32`
The hours

##### minutes `System.Int32`
The minutes

##### seconds `System.Int32`
The seconds




#### Example (Razor)
    @(Html.Kendo().Scheduler<Kendo.Mvc.Examples.Models.Scheduler.Screening>()
        .Name("scheduler")
        .Date(new DateTime(2013, 6, 13))
        .EndTime(10,0,0)
        .BindTo(Model)
    )


### WorkDayStart(System.DateTime)
The start time of the business day. The scheduler will display events starting after the workDayStart when the "Show Business Hours" button is pressed.


#### Parameters

##### workDayStart `System.DateTime`
The workDayStart.




#### Example (Razor)
    @(Html.Kendo().Scheduler<Kendo.Mvc.Examples.Models.Scheduler.Screening>()
        .Name("scheduler")
        .Date(new DateTime(2013, 6, 13))
        .WorkDayStart(new DateTime(2013, 6, 13, 10, 00, 00))
        .BindTo(Model)
    )


### WorkDayStart(System.Int32,System.Int32,System.Int32)
The start time of the business day. The scheduler will display events starting after the workDayStart when the "Show Business Hours" button is pressed.


#### Parameters

##### hours `System.Int32`
The hours

##### minutes `System.Int32`
The minutes

##### seconds `System.Int32`
The seconds




#### Example (Razor)
    @(Html.Kendo().Scheduler<Kendo.Mvc.Examples.Models.Scheduler.Screening>()
        .Name("scheduler")
        .Date(new DateTime(2013, 6, 13))
        .WorkDayStart(10, 0, 0)
        .BindTo(Model)
    )


### WorkDayEnd(System.DateTime)
The end time of the business day. The scheduler will display events ending before the workDayEnd when the "Show Business Hours" button is pressed.


#### Parameters

##### workDayEnd `System.DateTime`
The workDayEnd.




#### Example (Razor)
    @(Html.Kendo().Scheduler<Kendo.Mvc.Examples.Models.Scheduler.Screening>()
        .Name("scheduler")
        .Date(new DateTime(2013, 6, 13))
        .WorkDayEnd(new DateTime(2013, 6, 13, 10, 00, 00))
        .BindTo(Model)
    )


### WorkDayEnd(System.Int32,System.Int32,System.Int32)
The end time of the business day. The scheduler will display events ending before the workDayEnd when the "Show Business Hours" button is pressed.


#### Parameters

##### hours `System.Int32`
The hours

##### minutes `System.Int32`
The minutes

##### seconds `System.Int32`
The seconds




#### Example (Razor)
    @(Html.Kendo().Scheduler<Kendo.Mvc.Examples.Models.Scheduler.Screening>()
        .Name("scheduler")
        .Date(new DateTime(2013, 6, 13))
        .WorkDayEnd(16,0,0)
        .BindTo(Model)
    )


### Height(System.Int32)
The height of the widget.


#### Parameters

##### height `System.Int32`
The height.




#### Example (Razor)
    @(Html.Kendo().Scheduler<Kendo.Mvc.Examples.Models.Scheduler.Screening>()
        .Name("scheduler")
        .Date(new DateTime(2013, 6, 13))
        .Height(600)
        .BindTo(Model)
    )


### EventTemplate(System.String)
The template used to render the scheduler events.


#### Parameters

##### eventTemplate `System.String`
The eventTemplate.




#### Example (Razor)
    @(Html.Kendo().Scheduler<Kendo.Mvc.Examples.Models.Scheduler.Screening>()
        .Name("scheduler")
        .Date(new DateTime(2013, 6, 13))
        .StartTime(new DateTime(2013, 6, 13, 10, 00, 00))
        .EndTime(new DateTime(2013, 6, 13, 23, 00, 00))
        .Height(600)
        .EventTemplate(
            "<div style='color:white'>" +
            "<img src='" + Url.Content("~/Content/web/scheduler/") + "#= Image #' style='float:left'>" +
            "<p>" +
            "#: kendo.toString(Start, 'hh:mm') # - #: kendo.toString(End, 'hh:mm') #" +
            "</p>" +
            "<h3>#: title #</h3>" +
            "<a href='#= Imdb #' style='color:white'>Movie in IMDB</a>" +
            "</div>")
            .Views(views =>
            {
                views.DayView();
                views.AgendaView();
            })
            .BindTo(Model)
        )


### EventTemplateId(System.String)
The Id of the template used to render the scheduler events.


#### Parameters

##### eventTemplateId `System.String`
The eventTemplateId




#### Example (Razor)
    @(Html.Kendo().Scheduler<Kendo.Mvc.Examples.Models.Scheduler.Screening>()
        .Name("scheduler")
        .Date(new DateTime(2013, 6, 13))
        .StartTime(new DateTime(2013, 6, 13, 10, 00, 00))
        .EndTime(new DateTime(2013, 6, 13, 23, 00, 00))
        .Height(600)
        .EventTemplateId("customEventTemplate")
        .Views(views =>
        {
            views.DayView();
            views.AgendaView();
        })
        .BindTo(Model)
    )


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
If set to true the scheduler will display a slot for "all day" events.


#### Parameters

##### allDaySlot `System.Boolean`
The allDaySlot.





### ShowWorkHours(System.Boolean)
If set to true day and week views will be initially shown in business hours mode.


#### Parameters

##### value `System.Boolean`






### ShowWorkHours
If set day and week views will be initially shown in business hours mode.





### Selectable(System.Boolean)
If set to true the scheduler will enable the selection


#### Parameters

##### selectable `System.Boolean`
The selectable.





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




#### Example (Razor)
    @(Html.Kendo().Scheduler<Kendo.Mvc.Examples.Models.Scheduler.Screening>()
        .Name("scheduler")
        .Date(new DateTime(2013, 6, 13))
        .StartTime(new DateTime(2013, 6, 13, 10, 00, 00))
        .EndTime(new DateTime(2013, 6, 13, 23, 00, 00))
        .Height(600)
        .AllDayEventTemplateId("customAllDayTemplate")
        .Views(views =>
        {
            views.DayView();
            views.AgendaView();
        })
        .BindTo(Model)
    )


### MajorTick(System.Int32)
The number of minutes represented by a major tick.


#### Parameters

##### majorTick `System.Int32`
The majorTick




#### Example (Razor)
    @(Html.Kendo().Scheduler<Kendo.Mvc.Examples.Models.Scheduler.Screening>()
        .Name("scheduler")
        .Date(new DateTime(2013, 6, 13))
        .Height(600)
        .MajorTick(120)
        .BindTo(Model)
    )


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




#### Example (Razor)
    @(Html.Kendo().Scheduler<Kendo.Mvc.Examples.Models.Scheduler.Screening>()
        .Name("scheduler")
        .Date(new DateTime(2013, 7, 23))
        .Height(400)
        .MinorTickCount(1)
        .BindTo(Model)
    )


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





### Timezone(System.String)
The timezone which the scheduler will use to display the scheduler appointment dates. By default the current system timezone is used. This is an acceptable default when the scheduler widget is bound to local array of events. It is advisable to specify a timezone if the scheduler is bound to a remote service. That way all users would see the same dates and times no matter their configured system timezone.
            The complete list of the supported timezones is available in the List of IANA time zones Wikipedia page.


#### Parameters

##### timezone `System.String`
The timezone




#### Example (Razor)
    @(Html.Kendo().Scheduler<Kendo.Mvc.Examples.Models.Scheduler.Task>()
        .Name("scheduler")
        .Date(new DateTime(2013, 6, 13))
        .Timezone("Europe/London")
        .Height(600)
        .DataSource(d => d
            .Model(m => m.Id(f => f.TaskID))
            .Read("Read", "Scheduler")
            .Create("Create", "Scheduler")
            .Destroy("Destroy", "Scheduler")
            .Update("Update", "Scheduler")
        )
    )


### Width(System.Int32)
The width of the widget.


#### Parameters

##### width `System.Int32`
The width




#### Example (Razor)
    @(Html.Kendo().Scheduler<Kendo.Mvc.Examples.Models.Scheduler.Task>()
        .Name("scheduler")
        .Date(new DateTime(2013, 6, 13))
        .Width(800)
        .Height(600)
        .DataSource(d => d
            .Model(m => m.Id(f => f.TaskID))
            .Read("Read", "Scheduler")
            .Create("Create", "Scheduler")
            .Destroy("Destroy", "Scheduler")
            .Update("Update", "Scheduler")
        )
    )


### Snap(System.Boolean)
If set to false the events would not snap events to the nearest slot during dragging (resizing or moving). Set it to false to allow free moving and resizing of events.


#### Parameters

##### isSnapable `System.Boolean`
The isSnapable




#### Example (Razor)
    @(Html.Kendo().Scheduler<Kendo.Mvc.Examples.Models.Scheduler.Task>()
        .Name("scheduler")
        .Date(new DateTime(2013, 6, 13))
        .Snap(false)
        .DataSource(d => d
            .Model(m => m.Id(f => f.TaskID))
            .Read("Read", "Scheduler")
            .Create("Create", "Scheduler")
            .Destroy("Destroy", "Scheduler")
            .Update("Update", "Scheduler")
        )
    )


### AutoBind(System.Boolean)
If set to false the initial binding will be prevented.


#### Parameters

##### autoBind `System.Boolean`
The autoBind




#### Example (Razor)
    @(Html.Kendo().Scheduler<Kendo.Mvc.Examples.Models.Scheduler.Task>()
        .Name("scheduler")
        .Date(new DateTime(2013, 6, 13))
        .AutoBind(false)
        .DataSource(d => d
            .Model(m => m.Id(f => f.TaskID))
            .Read("Read", "Scheduler")
        )
    )


### WorkWeekStart(System.Int32)
Sets the start day of work week by index.


#### Parameters

##### workWeekStartDay `System.Int32`
The workWeekStartDay




#### Example (Razor)
    @(Html.Kendo().Scheduler<Kendo.Mvc.Examples.Models.Scheduler.Task>()
        .Name("scheduler")
        .Date(new DateTime(2013, 6, 13))
        .WorkWeekStart(2)
        .DataSource(d => d
            .Model(m => m.Id(f => f.TaskID))
            .Read("Read", "Scheduler")
        )
    )


### WorkWeekEnd(System.Int32)
Sets the end day of work week by index.


#### Parameters

##### workWeekEndDay `System.Int32`
The workWeekEndDay




#### Example (Razor)
    @(Html.Kendo().Scheduler<Kendo.Mvc.Examples.Models.Scheduler.Task>()
        .Name("scheduler")
        .Date(new DateTime(2013, 6, 13))
        .WorkWeekEnd(2)
        .DataSource(d => d
            .Model(m => m.Id(f => f.TaskID))
            .Read("Read", "Scheduler")
        )
    )


### Editable(System.Action\<Kendo.Mvc.UI.Fluent.SchedulerEditableSettingsBuilder\<T\>\>)
Sets the editing configuration of the scheduler.


#### Parameters

##### configurator System.Action<[Kendo.Mvc.UI.Fluent.SchedulerEditableSettingsBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/SchedulerEditableSettingsBuilder)<T>>
The lambda which configures the editing




#### Example (Razor)
    @(Html.Kendo().Scheduler<Kendo.Mvc.Examples.Models.Scheduler.Task>()
        .Name("scheduler")
        .Date(new DateTime(2013, 6, 13))
        .Editable(editable =>
        {
            editable.Confirmation(false);
            editable.TemplateId("customEditTemplate");
        })
        .DataSource(d => d
            .Model(m => m.Id(f => f.TaskID))
            .Read("Read", "Scheduler")
            .Create("Create", "Scheduler")
            .Destroy("Destroy", "Scheduler")
            .Update("Update", "Scheduler")
        )
    )


### Editable(System.Boolean)
If set to false the user would not be able to create new scheduler events and modify or delete existing ones.


#### Parameters

##### isEditable `System.Boolean`
The isEditable




#### Example (Razor)
    @(Html.Kendo().Scheduler<Kendo.Mvc.Examples.Models.Scheduler.Task>()
        .Name("scheduler")
        .Date(new DateTime(2013, 6, 13))
        .Editable(false)
        .DataSource(d => d
            .Model(m => m.Id(f => f.TaskID))
            .Read("Read", "Scheduler")
        )
    )


### Footer(System.Action\<Kendo.Mvc.UI.Fluent.SchedulerFooterBuilder\>)
If set to false the footer of the scheduler would not be displayed.


#### Parameters

##### configurator System.Action<[Kendo.Mvc.UI.Fluent.SchedulerFooterBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/SchedulerFooterBuilder)>
The configurator for the footer setting.





### Footer(System.Boolean)
If set to false the footer of the scheduler would not be displayed.


#### Parameters

##### enabled `System.Boolean`
Enables or disables the footer option.





### Min(System.DateTime)
Constraints the minimum date which can be selected via the scheduler navigation.


#### Parameters

##### date `System.DateTime`
The min date





### Max(System.DateTime)
Constraints the maximum date which can be selected via the scheduler navigation.


#### Parameters

##### date `System.DateTime`
The max date





### Group(System.Action\<Kendo.Mvc.UI.Fluent.SchedulerGroupBuilder\>)
Sets the resources grouping configuration of the scheduler.


#### Parameters

##### configuration System.Action<[Kendo.Mvc.UI.Fluent.SchedulerGroupBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/SchedulerGroupBuilder)>
The lambda which configures the scheduler grouping




#### Example (Razor)
    @(Html.Kendo().Scheduler<Task>()
        .Name("Scheduler")
        .Resources(resource =>
        {
            resource.Add(m => m.TaskID)
            .Title("Color")
            .Multiple(true)
            .DataTextField("Text")
            .DataValueField("Value")
            .DataSource(d => d.Read("Attendies", "Scheduler"));
        })
        .DataSource(dataSource => dataSource
            .Model(m => m.Id(f => f.TaskID))
            ))


### Resources(System.Action\<Kendo.Mvc.UI.Fluent.SchedulerResourceFactory\<T\>\>)
Sets the resources configuration of the scheduler.


#### Parameters

##### addResourceAction System.Action<[Kendo.Mvc.UI.Fluent.SchedulerResourceFactory](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/SchedulerResourceFactory)<T>>
The lambda which configures the scheduler resources




#### Example (Razor)
    @(Html.Kendo().Scheduler<Task>()
        .Name("Scheduler")
        .Resources(resource =>
        {
            resource.Add(m => m.TaskID)
            .Title("Color")
            .Multiple(true)
            .DataTextField("Text")
            .DataValueField("Value")
            .DataSource(d => d.Read("Attendies", "Scheduler"));
        })
        .DataSource(dataSource => dataSource
            .Model(m => m.Id(f => f.TaskID))
            ))


### Views(System.Action\<Kendo.Mvc.UI.Fluent.SchedulerViewFactory\<T\>\>)
Sets the views configuration of the scheduler.


#### Parameters

##### addViewAction System.Action<[Kendo.Mvc.UI.Fluent.SchedulerViewFactory](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/SchedulerViewFactory)<T>>
The lambda which configures the scheduler views




#### Example (Razor)
    @(Html.Kendo().Scheduler<Kendo.Mvc.Examples.Models.Scheduler.Task>()
        .Name("scheduler")
        .Date(new DateTime(2013, 6, 13))
        .Views(views => {
            views.DayView();
            views.AgendaView();
        })
        .BindTo(Model)
    )


### Messages(System.Action\<Kendo.Mvc.UI.Fluent.SchedulerMessagesBuilder\>)
Sets the messages of the scheduler.


#### Parameters

##### addViewAction System.Action<[Kendo.Mvc.UI.Fluent.SchedulerMessagesBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/SchedulerMessagesBuilder)>
The lambda which configures the scheduler messages





### Events(System.Action\<Kendo.Mvc.UI.Fluent.SchedulerEventBuilder\>)
Sets the events configuration of the scheduler.


#### Parameters

##### clientEventsAction System.Action<[Kendo.Mvc.UI.Fluent.SchedulerEventBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/SchedulerEventBuilder)>
The lambda which configures the scheduler events




#### Example (Razor)
    <%= Html.Kendo().Scheduler<Task>()
    .Name("Scheduler")
    .Events(events =>
        events.Remove("remove")
    )
    .BindTo(Model)
    %>


### BindTo(System.Collections.Generic.IEnumerable\<T\>)
Binds the scheduler to a list of objects


#### Parameters

##### dataSource `System.Collections.Generic.IEnumerable<T>`
The data source.




#### Example (ASPX)
    @model IEnumerable<Task>
    <%@Page Inherits="System.Web.Mvc.ViewPage<IEnumerable<Task>>" %>
    <: Html.Kendo().Scheduler<Task>()
    .Name("Scheduler")
    .BindTo(Model)
    .DataSource(dataSource => dataSource
        .Model(m => m.Id(f => f.TaskID))
        )>

#### Example (Razor)
    @model IEnumerable<Task>
    @(Html.Kendo().Scheduler<Task>()
        .Name("Scheduler")
        .BindTo(Model)
        .DataSource(dataSource => dataSource
            .Model(m => m.Id(f => f.TaskID))
            ))


### DataSource(System.Action\<Kendo.Mvc.UI.Fluent.SchedulerAjaxDataSourceBuilder\<T\>\>)
Configures the DataSource options.


#### Parameters

##### configurator System.Action<[Kendo.Mvc.UI.Fluent.SchedulerAjaxDataSourceBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/SchedulerAjaxDataSourceBuilder)<T>>
The DataSource configurator action.




#### Example (ASPX)
    <%= Html.Kendo().Scheduler<Task>()
    .Name("Scheduler")
    .DataSource(source =>
    {
        source.Read(read =>
        {
            read.Action("Read", "Scheduler");
            });
        })
    %>


### CurrentTimeMarker(System.Action\<Kendo.Mvc.UI.Fluent.SchedulerCurrentTimeMarkerSettingsBuilder\>)
Sets the currentTimeMarker configuration of the scheduler.


#### Parameters

##### configurator System.Action<[Kendo.Mvc.UI.Fluent.SchedulerCurrentTimeMarkerSettingsBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/SchedulerCurrentTimeMarkerSettingsBuilder)>
The lambda which configures the currentTimeMarker




#### Example (Razor)
    @(Html.Kendo().Scheduler<Kendo.Mvc.Examples.Models.Scheduler.Task>()
        .Name("scheduler")
        .Date(new DateTime(2013, 6, 13))
        .CurrentTimeMarker(marker =>
        {
            marker.UpdateInterval(100);
            marker.UseLocalTimezone(false);
        })
        .DataSource(d => d
            .Model(m => m.Id(f => f.TaskID))
            .Read("Read", "Scheduler")
            .Create("Create", "Scheduler")
            .Destroy("Destroy", "Scheduler")
            .Update("Update", "Scheduler")
        )
    )


### CurrentTimeMarker(System.Boolean)
If set to false the "current time" marker would be disabled.


#### Parameters

##### enabled `System.Boolean`
The enabled




#### Example (Razor)
    @(Html.Kendo().Scheduler<Kendo.Mvc.Examples.Models.Scheduler.Task>()
        .Name("scheduler")
        .Date(new DateTime(2013, 6, 13))
        .CurrentTimeMarker(false)
        .DataSource(d => d
            .Model(m => m.Id(f => f.TaskID))
            .Read("Read", "Scheduler")
        )
    )



