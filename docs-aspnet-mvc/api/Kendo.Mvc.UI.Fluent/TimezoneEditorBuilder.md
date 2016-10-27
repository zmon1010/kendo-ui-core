---
title: TimezoneEditorBuilder
---

# Kendo.Mvc.UI.Fluent.TimezoneEditorBuilder
Defines the fluent interface for configuring the TimezoneEditor.




## Methods


### Value(System.String)
The value of the TimezoneEditor. Must be valid recurrence rule.


#### Parameters

##### value `System.String`
The value




#### Example (Razor)
    @(Html.Kendo().TimezoneEditor()
        .Name("timezoneEditor")
        .Value("Etc/UTC")
    )


### Events(System.Action\<Kendo.Mvc.UI.Fluent.TimezoneEditorEventBuilder\>)
Sets the events configuration of the scheduler.


#### Parameters

##### clientEventsAction System.Action<[Kendo.Mvc.UI.Fluent.TimezoneEditorEventBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/TimezoneEditorEventBuilder)>
The lambda which configures the timezoneEditor events




#### Example (Razor)
    <%= Html.Kendo().TimezoneEditor()
    .Name("TimezoneEditor")
    .Events(events =>
        events.Change("change")
    )
    %>



