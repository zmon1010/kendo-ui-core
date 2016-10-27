---
title: SchedulerBaseViewBuilder
---

# Kendo.Mvc.UI.Fluent.SchedulerBaseViewBuilder
Defines the fluent interface for configuring the 2.




## Methods


### Title(System.String)
The user-friendly title of the view displayed by the scheduler.


#### Parameters

##### title `System.String`
The title




#### Example (Razor)
    @(Html.Kendo().Scheduler<Kendo.Mvc.Examples.Models.Scheduler.Task>()
        .Name("scheduler")
        .Date(new DateTime(2013, 6, 13))
        .Views(views =>
        {
            views.DayView(dayView => {
                dayView.Title("Day");
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


### Editable(System.Action\<Kendo.Mvc.UI.Fluent.SchedulerViewEditableSettingsBuilder\>)
Sets the editing configuration of the current scheduler view.


#### Parameters

##### configurator System.Action<[Kendo.Mvc.UI.Fluent.SchedulerViewEditableSettingsBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/SchedulerViewEditableSettingsBuilder)>
The lambda which configures the editing





### Editable(System.Boolean)
If set to true the user would be able to create new scheduler events and modify or delete existing ones. Default value is true.


#### Parameters

##### isEditable `System.Boolean`
The isEditable




#### Example (Razor)
    @(Html.Kendo().Scheduler<Kendo.Mvc.Examples.Models.Scheduler.Task>()
        .Name("scheduler")
        .Date(new DateTime(2013, 6, 13))
        .Views(views =>
        {
            views.DayView(dayView => {
                dayView.Title("Day");
                dayView.Editable(false);
                });
                views.AgendaView();
            })
            .DataSource(d => d
                .Model(m => m.Id(f => f.TaskID))
                .Read("Read", "Scheduler")
                .Create("Create", "Scheduler")
                .Destroy("Destroy", "Scheduler")
                .Update("Update", "Scheduler")
            )
        )


### EventTemplate(System.String)
The template used by the view to render the scheduler events.


#### Parameters

##### eventTemplate `System.String`
The eventTemplate.





### EventTemplateId(System.String)
The Id of the template used by the view to render the scheduler events.


#### Parameters

##### eventTemplateId `System.String`
The eventTemplateId





### SelectedDateFormat(System.String)
The format used to display the selected date. Uses kendo.format.
            Contains two placeholders - "{0}" and "{1}" which represent the start and end date displayed by the view.


#### Parameters

##### selectedDateFormat `System.String`
The selectedDateFormat.




#### Example (Razor)
    @(Html.Kendo().Scheduler<Kendo.Mvc.Examples.Models.Scheduler.Task>()
        .Name("scheduler")
        .Date(new DateTime(2013, 6, 13))
        .Views(views =>
        {
            views.DayView(dayView => {
                dayView.Title("Day");
                dayView.Editable(false);
                dayView.SelectedDateFormat("{0:dd-MM-yyyy}");
                });
                views.AgendaView();
            })
            .DataSource(d => d
                .Model(m => m.Id(f => f.TaskID))
                .Read("Read", "Scheduler")
                .Create("Create", "Scheduler")
                .Destroy("Destroy", "Scheduler")
                .Update("Update", "Scheduler")
            )
        )


### SelectedShortDateFormat(System.String)
The format used to display the selected short date. Uses kendo.format.
            Contains two placeholders - "{0}" and "{1}" which represent the start and end date displayed by the view.


#### Parameters

##### selectedShortDateFormat `System.String`
The selectedShortDateFormat.




#### Example (Razor)
    @(Html.Kendo().Scheduler<Kendo.Mvc.Examples.Models.Scheduler.Task>()
        .Name("scheduler")
        .Date(new DateTime(2013, 6, 13))
        .Views(views =>
        {
            views.DayView(dayView => {
                dayView.Title("Day");
                dayView.Editable(false);
                dayView.SelectedShortDateFormat("{0:dd-MM-yyyy}");
                });
                views.AgendaView();
            })
            .DataSource(d => d
                .Model(m => m.Id(f => f.TaskID))
                .Read("Read", "Scheduler")
                .Create("Create", "Scheduler")
                .Destroy("Destroy", "Scheduler")
                .Update("Update", "Scheduler")
            )
        )


### Selected(System.Boolean)
If set to true the view will be initially selected by the scheduler widget. Default value is false.


#### Parameters

##### isSelected `System.Boolean`
The isSelected




#### Example (Razor)
    @(Html.Kendo().Scheduler<Kendo.Mvc.Examples.Models.Scheduler.Task>()
        .Name("scheduler")
        .Date(new DateTime(2013, 6, 13))
        .Views(views =>
        {
            views.DayView(dayView => {
                dayView.Title("Day");
                dayView.Editable(false);
                dayView.SelectedDateFormat("{0:dd-MM-yyyy}");
                dayView.Selected(true);
                });
                views.AgendaView();
            })
            .DataSource(d => d
                .Model(m => m.Id(f => f.TaskID))
                .Read("Read", "Scheduler")
                .Create("Create", "Scheduler")
                .Destroy("Destroy", "Scheduler")
                .Update("Update", "Scheduler")
            )
        )


### Groups(Kendo.Mvc.UI.SchedulerGroupOrientation)
Sets the orientation of the group headers


#### Parameters

##### orientation [Kendo.Mvc.UI.SchedulerGroupOrientation](/api/aspnet-mvc/Kendo.Mvc.UI/SchedulerGroupOrientation)
The orientation





### Groups(System.Boolean)
Sets grouping by date.


#### Parameters

##### orientation `System.Boolean`
The grouping by date






