---
title: RecurrenceEditorBuilder
---

# Kendo.Mvc.UI.Fluent.RecurrenceEditorBuilder
Defines the fluent interface for configuring the RecurrenceEditor.




## Methods


### Start(System.DateTime)
The current start of the RecurrenceEditor. Used to determine the start day. The minimum date available in the "Until" DatePicker.


#### Parameters

##### start `System.DateTime`
The start




#### Example (Razor)
    @(Html.Kendo().RecurrenceEditor()
        .Name("recurrenceEditor")
        .Start(new DateTime(2013, 6, 13))
    )


### FirstWeekDay(System.Int32)
The first week day (by index) of the RecurrenceEditor. Default is 0.


#### Parameters

##### firstWeekDay `System.Int32`
The firstWeekDay




#### Example (Razor)
    @(Html.Kendo().RecurrenceEditor()
        .Name("recurrenceEditor")
        .FirstWeekDay(6)
    )


### Timezone(System.String)
The timezone of the RecurrenceEditor.


#### Parameters

##### timezone `System.String`
The timezone




#### Example (Razor)
    @(Html.Kendo().RecurrenceEditor()
        .Name("recurrenceEditor")
        .Timezone("Etc/UTC")
    )


### Value(System.String)
The value of the RecurrenceEditor. Must be valid recurrence rule.


#### Parameters

##### value `System.String`
The value




#### Example (Razor)
    @(Html.Kendo().RecurrenceEditor()
        .Name("recurrenceEditor")
        .Value("FREQ=WEEKLY;BYDAY=TU,TH")
    )


### Frequency(System.Action\<Kendo.Mvc.UI.Fluent.RecurrenceEditorFrequencyBuilder\>)
The Frequencies of the RecurrenceEditor.


#### Parameters

##### addFrequencyAction System.Action<[Kendo.Mvc.UI.Fluent.RecurrenceEditorFrequencyBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/RecurrenceEditorFrequencyBuilder)>
The addFrequencyAction




#### Example (Razor)
    @(Html.Kendo().RecurrenceEditor()
        .Name("recurrenceEditor")
        .Frequency(frequency => frequency
            .Add(RecurrenceEditorFrequency.Never)
            .Add(RecurrenceEditorFrequency.Daily)
            .Add(RecurrenceEditorFrequency.Weekly)
        )
    )


### Frequency(System.Collections.Generic.IEnumerable\<Kendo.Mvc.UI.RecurrenceEditorFrequency\>)
The IEnumerable collection of frequencies for the RecurrenceEditor.


#### Parameters

##### frequencies System.Collections.Generic.IEnumerable<[Kendo.Mvc.UI.RecurrenceEditorFrequency](/api/aspnet-mvc/Kendo.Mvc.UI/RecurrenceEditorFrequency)>
The frequencies




#### Example (Razor)
    @(Html.Kendo().RecurrenceEditor()
        .Name("recurrenceEditor")
        .Frequency(new List<RecurrenceEditorFrequency>() {
        RecurrenceEditorFrequency.Never,
        RecurrenceEditorFrequency.Daily,
        RecurrenceEditorFrequency.Weekly,
        }))


### Messages(System.Action\<Kendo.Mvc.UI.Fluent.SchedulerRecurrenceEditorMessagesBuilder\>)
Sets the messages of the recurrenceEditor.


#### Parameters

##### addViewAction System.Action<[Kendo.Mvc.UI.Fluent.SchedulerRecurrenceEditorMessagesBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/SchedulerRecurrenceEditorMessagesBuilder)>
The lambda which configures the scheduler messages





### Events(System.Action\<Kendo.Mvc.UI.Fluent.RecurrenceEditorEventBuilder\>)
Sets the events configuration of the recurrenceEditor.


#### Parameters

##### clientEventsAction System.Action<[Kendo.Mvc.UI.Fluent.RecurrenceEditorEventBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/RecurrenceEditorEventBuilder)>
The lambda which configures the recurrenceEditor events




#### Example (ASPX)
    <%= Html.Kendo().RecurrenceEditor()
    .Name("RecurrenceEditor")
    .Events(events =>
        events.Change("change")
    )
    %>



