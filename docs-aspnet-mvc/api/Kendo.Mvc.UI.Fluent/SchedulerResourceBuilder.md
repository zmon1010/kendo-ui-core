---
title: SchedulerResourceBuilder
---

# Kendo.Mvc.UI.Fluent.SchedulerResourceBuilder
Defines the fluent interface for configuring the 1.




## Methods


### Title(System.String)
The user friendly title of the resource displayed in the scheduler edit form. If not set the value of the field option is used.


#### Parameters

##### title `System.String`
The title





### Multiple(System.Boolean)
If set to true the scheduler event can be assigned multiple instances of the resource. The scheduler event field specified via the field option will contain an array of resources. By default only one resource instance can be assigned to an event.


#### Parameters

##### isMultiple `System.Boolean`
The isMultiple





### Name(System.String)
The name of the resource.





### BindTo(System.Collections.IEnumerable)
Binds the scheduler resource to a list of objects


#### Parameters

##### dataSource `System.Collections.IEnumerable`
The dataSource




#### Example (Razor)
    @(Html.Kendo().Scheduler<Kendo.Mvc.Examples.Models.Scheduler.Task>()
        .Name("scheduler")
        .Date(new DateTime(2013, 6, 13))
        .Views(views =>
        {
            views.DayView();
            views.AgendaView();
        })
        .Resources(resource =>
        {
            resource.Add(m => m.OwnerID)
            .Title("Owner")
            .Multiple(true)
            .DataTextField("Text")
            .DataValueField("Value")
            .BindTo(new[] {
            new { Text = "Alex", Value = 1, color = "red" } ,
            new { Text = "Bob", Value = 1, color = "green" } ,
            new { Text = "Charlie", Value = 1, color = "blue" }
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


### DataValueField(System.String)
The field of the resource data item which represents the resource value. The resource value is used to link a scheduler event with a resource.


#### Parameters

##### field `System.String`
The field





### DataTextField(System.String)
The field of the resource data item which represents the resource text.


#### Parameters

##### field `System.String`
The field





### DataColorField(System.String)
The field of the resource data item which contains the resource color.


#### Parameters

##### field `System.String`
The field





### ValuePrimitive(System.Boolean)
Set to false if the scheduler event field specified via the field option contains a resource data item. By default the scheduler expects that field to contain a primitive value (string, number) which corresponds to the "value" of the resource (specified via dataValueField).


#### Parameters

##### valuePrimitive `System.Boolean`
The valuePrimitive





### DataSource(System.Action\<Kendo.Mvc.UI.Fluent.ReadOnlyDataSourceBuilder\>)
Configures the DataSource options.


#### Parameters

##### configurator System.Action<[Kendo.Mvc.UI.Fluent.ReadOnlyDataSourceBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/ReadOnlyDataSourceBuilder)>
The DataSource configurator action.




#### Example (Razor)
    @(Html.Kendo().Scheduler<Kendo.Mvc.Examples.Models.Scheduler.Task>()
        .Name("scheduler")
        .Date(new DateTime(2013, 6, 13))
        .Views(views =>
        {
            views.DayView();
            views.AgendaView();
        })
        .Resources(resource =>
        {
            resource.Add(m => m.OwnerID)
            .Title("Owner")
            .Multiple(true)
            .DataTextField("Text")
            .DataValueField("Value")
            .DataSource(d => d.Read("Attendies", "Scheduler"));
        })
        .DataSource(d => d
            .Model(m => m.Id(f => f.TaskID))
            .Read("Read", "Scheduler")
            .Create("Create", "Scheduler")
            .Destroy("Destroy", "Scheduler")
            .Update("Update", "Scheduler")
        )
    )



