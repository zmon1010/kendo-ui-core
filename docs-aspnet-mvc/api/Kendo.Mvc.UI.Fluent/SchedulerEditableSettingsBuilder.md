---
title: SchedulerEditableSettingsBuilder
---

# Kendo.Mvc.UI.Fluent.SchedulerEditableSettingsBuilder
Defines the fluent interface for configuring the 1.




## Methods


### Create(System.Boolean)
If set to true the user can create new events. Creating is enabled by default.


#### Parameters

##### create `System.Boolean`
The create





### Destroy(System.Boolean)
If set to true the user can delete events from the view by clicking the "destroy" button. Deleting is enabled by default.


#### Parameters

##### destroy `System.Boolean`
The destroy





### Update(System.Boolean)
If set to true the user can update events. Updating is enabled by default.


#### Parameters

##### update `System.Boolean`
The update





### Template(System.String)
The template which renders the editor.


#### Parameters

##### template `System.String`
The template





### TemplateId(System.String)
The Id of the template which renders the editor.


#### Parameters

##### templateId `System.String`
The templateId





### TemplateName(System.String)
The EditorTemplate which to be rendered as editor.


#### Parameters

##### name `System.String`
The name of the EditorTemplate





### Confirmation(System.String)
The text which the scheduler will display in a confirmation dialog when the user clicks the "destroy" button.


#### Parameters

##### message `System.String`
The message





### Resize(System.Boolean)
If set to false the resizing of the events will be disabled. Resizing is enabled by default.


#### Parameters

##### enable `System.Boolean`
The resize option





### Move(System.Boolean)
If set to false the moving of the events will be disabled. Moving is enabled by default.


#### Parameters

##### enable `System.Boolean`
The move option





### Confirmation(System.Boolean)
If set to true the scheduler will display a confirmation dialog when the user clicks the "destroy" button. Confirmation dialog is enabled by default.


#### Parameters

##### enable `System.Boolean`
The confirmation





### EditRecurringMode(Kendo.Mvc.UI.SchedulerEditRecurringMode)
Recurring events edit mode.


#### Parameters

##### editRecurringMode [Kendo.Mvc.UI.SchedulerEditRecurringMode](/api/aspnet-mvc/Kendo.Mvc.UI/SchedulerEditRecurringMode)
The edit recurrence mode.





### Window(System.Action\<Kendo.Mvc.UI.Fluent.WindowBuilder\>)
Configures the Scheduler Window instance, which is used for editing of events. The configuration is optional.






