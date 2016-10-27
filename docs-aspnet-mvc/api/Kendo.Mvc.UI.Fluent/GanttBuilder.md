---
title: GanttBuilder
---

# Kendo.Mvc.UI.Fluent.GanttBuilder
Defines the fluent API for configuring the Kendo Gantt for ASP.NET MVC.




## Methods


### DataSource(System.Action\<Kendo.Mvc.UI.Fluent.GanttDataSourceBuilder\<T\>\>)
Configures the DataSource options.


#### Parameters

##### configurator System.Action<[Kendo.Mvc.UI.Fluent.GanttDataSourceBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/GanttDataSourceBuilder)<T>>
The DataSource configurator action.




#### Example (Razor)
    @(Html.Kendo().Gantt<TaskViewModel, DependencyViewModel>()
        .Name("Gantt")
        .DataSource(source =>
        {
            source.Read(read =>
            {
                read.Action("Read", "Gantt");
                });
            })
        )


### DependenciesDataSource(System.Action\<Kendo.Mvc.UI.Fluent.GanttDependenciesDataSourceBuilder\<T\>\>)
Configures the dependencies DataSource options.


#### Parameters

##### configurator System.Action<[Kendo.Mvc.UI.Fluent.GanttDependenciesDataSourceBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/GanttDependenciesDataSourceBuilder)<T>>
The DataSource configurator action.




#### Example (Razor)
    @(Html.Kendo().Gantt<TaskViewModel, DependencyViewModel>()
        .Name("Gantt")
        .DependenciesDataSource(source =>
        {
            source.Read(read =>
            {
                read.Action("Read", "Gantt");
                });
            })
        )


### Columns(System.Action\<Kendo.Mvc.UI.Fluent.GanttColumnFactory\<T,T\>\>)
The configuration of the gantt columns. An array of JavaScript objects or strings. A JavaScript objects are interpreted as column configurations. Strings are interpreted as the
            field to which the column is bound. The gantt will create a column for every item of the array.


#### Parameters

##### configurator System.Action<[Kendo.Mvc.UI.Fluent.GanttColumnFactory](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/GanttColumnFactory)<T,T>>
The action that configures the columns.





### Assignments(System.Action\<Kendo.Mvc.UI.Fluent.GanttAssignmentsSettingsBuilder\<T1\>\>)
The configuration of the assignments of the gantt resources. An assignment is a one-to-one mapping between a gantt task and a gantt resource containing the number of units for which a resource is assigned to a task.


#### Parameters

##### configurator System.Action<[Kendo.Mvc.UI.Fluent.GanttAssignmentsSettingsBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/GanttAssignmentsSettingsBuilder)<T1>>
The action that configures the assignments.





### CurrentTimeMarker(System.Action\<Kendo.Mvc.UI.Fluent.GanttCurrentTimeMarkerSettingsBuilder\>)
If set to false the "current time" marker of the Gantt would not be displayed.


#### Parameters

##### configurator System.Action<[Kendo.Mvc.UI.Fluent.GanttCurrentTimeMarkerSettingsBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/GanttCurrentTimeMarkerSettingsBuilder)>
The action that configures the currenttimemarker.





### Editable
If set to false the user won't be able to create, modify or delete tasks and dependencies.





### Resources(System.Action\<Kendo.Mvc.UI.Fluent.GanttResourcesSettingsBuilder\>)
The configuration of the gantt resource(s). A gantt resource is optional metadata that can be associated
            with a gantt task.


#### Parameters

##### configurator System.Action<[Kendo.Mvc.UI.Fluent.GanttResourcesSettingsBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/GanttResourcesSettingsBuilder)>
The action that configures the resources.





### AutoBind(System.Boolean)
If set to false the widget will not bind to the data source during initialization. In this case data binding will occur when the change event of the
            data source is fired. By default the widget will bind to the data source specified in the configuration.


#### Parameters

##### value `System.Boolean`
The value that configures the autobind.





### ColumnResizeHandleWidth(System.Double)
Defines the width of the column resize handle in pixels. Apply a larger value for easier grasping.


#### Parameters

##### value `System.Double`
The value that configures the columnresizehandlewidth.





### Date(System.DateTime)
If set to some date and it is between the range start and range end of the selected view, the timeline of the currently selected view is scrolled to start from this date.


#### Parameters

##### value `System.DateTime`
The value that configures the date.





### Editable(System.Boolean)
If set to false the user won't be able to create, modify or delete tasks and dependencies.


#### Parameters

##### enabled `System.Boolean`
Enables or disables the editable option.





### Editable(System.Action\<Kendo.Mvc.UI.Fluent.GanttEditableSettingsBuilder\>)
If set to false the user won't be able to create, modify or delete tasks and dependencies.


#### Parameters

##### configurator System.Action<[Kendo.Mvc.UI.Fluent.GanttEditableSettingsBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/GanttEditableSettingsBuilder)>
The action that configures the editable.





### Navigatable(System.Boolean)
If set to true the user could navigate the widget using the keyboard. By default keyboard navigation is disabled.


#### Parameters

##### value `System.Boolean`
The value that configures the navigatable.





### WorkDayStart(System.DateTime)
Sets the start of the work day.


#### Parameters

##### value `System.DateTime`
The value that configures the workdaystart.





### WorkDayEnd(System.DateTime)
Sets the end of the work day.


#### Parameters

##### value `System.DateTime`
The value that configures the workdayend.





### WorkWeekStart(System.Double)
The start of working week (index based).


#### Parameters

##### value `System.Double`
The value that configures the workweekstart.





### WorkWeekEnd(System.Double)
The end of working week (index based).


#### Parameters

##### value `System.Double`
The value that configures the workweekend.





### HourSpan(System.Double)
The span of an hour slot.


#### Parameters

##### value `System.Double`
The value that configures the hourspan.





### Snap(System.Boolean)
If set to true the Gantt will snap tasks to the nearest slot during dragging (resizing or moving). Set it to false to allow free moving and resizing of tasks.


#### Parameters

##### value `System.Boolean`
The value that configures the snap.





### Height(System.Double)
The height of the widget. Numeric values are treated as pixels.


#### Parameters

##### value `System.Double`
The value that configures the height.





### ListWidth(System.String)
The width of the task list. Numeric values are treated as pixels.


#### Parameters

##### value `System.String`
The value that configures the listwidth.





### Messages(System.Action\<Kendo.Mvc.UI.Fluent.GanttMessagesSettingsBuilder\>)
The configuration of the Gantt messages. Use this option to customize or localize the Gantt messages.


#### Parameters

##### configurator System.Action<[Kendo.Mvc.UI.Fluent.GanttMessagesSettingsBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/GanttMessagesSettingsBuilder)>
The action that configures the messages.





### Pdf(System.Action\<Kendo.Mvc.UI.Fluent.GanttPdfSettingsBuilder\>)
Configures the Kendo UI Gantt PDF export settings.


#### Parameters

##### configurator System.Action<[Kendo.Mvc.UI.Fluent.GanttPdfSettingsBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/GanttPdfSettingsBuilder)>
The action that configures the pdf.





### Range(System.Action\<Kendo.Mvc.UI.Fluent.GanttRangeSettingsBuilder\>)
Configures the Kendo UI Gantt range settings.


#### Parameters

##### configurator System.Action<[Kendo.Mvc.UI.Fluent.GanttRangeSettingsBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/GanttRangeSettingsBuilder)>
The action that configures the range.





### Resizable(System.Boolean)
If set to true allows users to resize columns by dragging their header borders. By default resizing is disabled.


#### Parameters

##### value `System.Boolean`
The value that configures the resizable.





### Selectable(System.Boolean)
If set to false the user won't be able to select tasks in the Gantt. By default selection is enabled and triggers the change event.


#### Parameters

##### value `System.Boolean`
The value that configures the selectable.





### ShowWorkDays(System.Boolean)
If set to false, Gantt views will show all days of the week. By default the views display only business days.


#### Parameters

##### value `System.Boolean`
The value that configures the showworkdays.





### ShowWorkHours(System.Boolean)
If set to false, the day view will show all hours of the day. By default the view displays only business hours.


#### Parameters

##### value `System.Boolean`
The value that configures the showworkhours.





### TaskTemplate(System.String)
The template used to render the gantt tasks.The fields which can be used in the template are the task fields


#### Parameters

##### value `System.String`
The value that configures the tasktemplate.





### TaskTemplateId(System.String)
The template used to render the gantt tasks.The fields which can be used in the template are the task fields


#### Parameters

##### value `System.String`
The value that configures the tasktemplate.





### Toolbar(System.Action\<Kendo.Mvc.UI.Fluent.GanttToolbarFactory\>)
If a String value is assigned to the toolbar configuration option, it will be treated as a single string template for the whole Gantt Toolbar,
            and the string value will be passed as an argument to a kendo.template() function.If a Function value is assigned (it may be a kendo.template() function call or a generic function reference), then the return value of the function will be used to render the Gantt Toolbar contents.If an Array value is assigned, it will be treated as the list of commands displayed in the Gantt Toolbar. Commands can be custom or built-in ("append", "pdf").The "append" command adds a new task to the gantt.The "pdf" command exports the gantt in PDF format.


#### Parameters

##### configurator System.Action<[Kendo.Mvc.UI.Fluent.GanttToolbarFactory](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/GanttToolbarFactory)>
The action that configures the toolbar.





### Tooltip(System.Action\<Kendo.Mvc.UI.Fluent.GanttTooltipSettingsBuilder\>)
The task tooltip configuration options.


#### Parameters

##### configurator System.Action<[Kendo.Mvc.UI.Fluent.GanttTooltipSettingsBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/GanttTooltipSettingsBuilder)>
The action that configures the tooltip.





### Views(System.Action\<Kendo.Mvc.UI.Fluent.GanttViewFactory\>)
The views displayed by the Gantt and their configuration. The array items can be either objects specifying the view configuration or strings representing the view types (assuming default configuration).
            By default the Kendo UI Gantt widget displays "day", "week", and "month" views.


#### Parameters

##### configurator System.Action<[Kendo.Mvc.UI.Fluent.GanttViewFactory](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/GanttViewFactory)>
The action that configures the views.





### RowHeight(System.Double)
The height of the table rows. Numeric values are treated as pixels.


#### Parameters

##### value `System.Double`
The value that configures the rowheight.





### Events(System.Action\<Kendo.Mvc.UI.Fluent.GanttEventBuilder\>)
Configures the client-side events.


#### Parameters

##### configurator System.Action<[Kendo.Mvc.UI.Fluent.GanttEventBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/GanttEventBuilder)>
The client events action.




#### Example (Razor)
    @(Html.Kendo().Gantt()
        .Name("Gantt")
        .Events(events => events
            .DataBinding("onDataBinding")
        )
    )



