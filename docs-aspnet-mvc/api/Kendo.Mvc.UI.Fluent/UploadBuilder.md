---
title: UploadBuilder
---

# Kendo.Mvc.UI.Fluent.UploadBuilder
Defines the fluent interface for configuring the Upload component.




## Methods


### Events(System.Action\<Kendo.Mvc.UI.Fluent.UploadEventBuilder\>)
Configures the client-side events.


#### Parameters

##### configurator System.Action<[Kendo.Mvc.UI.Fluent.UploadEventBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/UploadEventBuilder)>
The client events configuration action.




#### Example (ASPX)
    <%= Html.Kendo().Upload()
    .Name("Upload")
    .Events(events => events
        .Upload("onUpload")
    )
    %>


### Enable(System.Boolean)
Enables or disables the component.


#### Parameters

##### value `System.Boolean`
true if the component should be enabled, false otherwise; the default is true.




#### Example (ASPX)
    <%= Html.Kendo().Upload()
    .Name("Upload")
    .Enable(false)
    %>


### Multiple(System.Boolean)
Enables or disables multiple file selection.


#### Parameters

##### value `System.Boolean`
true if multiple file selection should be enabled, false otherwise; the default is true.




#### Example (ASPX)
    <%= Html.Kendo().Upload()
    .Name("Upload")
    .Multiple(false)
    %>


### ShowFileList(System.Boolean)
Sets a value indicating whether to show the list of uploaded files


#### Parameters

##### value `System.Boolean`
true if the list of uploaded files should be visible, false otherwise; true by default





### Async(System.Action\<Kendo.Mvc.UI.Fluent.UploadAsyncSettingsBuilder\>)
Use it to configure asynchronous uploading.


#### Parameters

##### configurator System.Action<[Kendo.Mvc.UI.Fluent.UploadAsyncSettingsBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/UploadAsyncSettingsBuilder)>
Use builder to set different asynchronous uploading options.




#### Example (ASPX)
    <%= Html.Kendo().Upload()
    .Name("Upload")
    .Async(async => async
        .Save("Save", "Compose")
        .Remove("Remove", "Compose")
        );
    %>


### Validation(System.Action\<Kendo.Mvc.UI.Fluent.UploadValidationSettingsBuilder\>)
Use it to configure validation.


#### Parameters

##### configurator System.Action<[Kendo.Mvc.UI.Fluent.UploadValidationSettingsBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/UploadValidationSettingsBuilder)>
Use builder to set different validation options.




#### Example (ASPX)
    <%= Html.Kendo().Upload()
    .Name("Upload")
    .Validation(async => async
        .MaxFileSize(900000)
        );
    %>


### Messages(System.Action\<Kendo.Mvc.UI.Fluent.UploadMessagesBuilder\>)
Use it to configure asynchronous uploading.


#### Parameters

##### configurator System.Action<[Kendo.Mvc.UI.Fluent.UploadMessagesBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/UploadMessagesBuilder)>
Use builder to set different asynchronous uploading options.




#### Example (ASPX)
    <%= Html.Kendo().Upload()
    .Name("Upload")
    .Async(async => async
        .Save("Save", "Compose")
        .Remove("Remove", "Compose")
        );
    %>


### TemplateId(System.String)
The template element to be used for rendering the files in the list


#### Parameters

##### templateId `System.String`
The id of the template




#### Example (Razor)
    @(Html.Kendo().Upload()
        .Name("files")
        .TemplateId("fileTemplate")
        .Async(a => a
            .Save("Save", "Compose")
            .Remove("Remove", "Compose")
            .AutoUpload(true)
        )
    )

#### Example (ASPX)
    <%= Html.Kendo().Upload()
    .Name("Upload")
    .TemplateId("fileTemplate")
    .Async(async => async
        .Save("Save", "Compose")
        .Remove("Remove", "Compose")
    )
    %>


### DropZone(System.String)
The string jQuery selector for the DropZone


#### Parameters

##### templateId `System.String`
The string jQuery selector for the DropZone




#### Example (Razor)
    @(Html.Kendo().Upload()
        .Name("files")
        .DropZone("DropZone")
        .Async(a => a
            .Save("Save", "Compose")
            .Remove("Remove", "Compose")
            .AutoUpload(true)
        )
    )

#### Example (ASPX)
    <%= Html.Kendo().Upload()
    .Name("Upload")
    .DropZone("DropZone")
    .Async(async => async
        .Save("Save", "Compose")
        .Remove("Remove", "Compose")
    )
    %>


### Files(System.Action\<Kendo.Mvc.UI.Fluent.UploadFileFactory\>)
Sets the initially rendered files


#### Parameters

##### configurator System.Action<[Kendo.Mvc.UI.Fluent.UploadFileFactory](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/UploadFileFactory)>
The lambda which configures initial files




#### Example (ASPX)
    <%= Html.Kendo().Upload()
    .Name("files")
    .Files(files => files.Add().Name("file.txt").Size(500).Extension(".txt"))
    .Async(a => a
        .Save("Save", "Compose")
        .Remove("Remove", "Compose")
        .AutoUpload(true)
    )
    %>

#### Example (Razor)
    @(Html.Kendo().Upload()
        .Name("files")
        .Files(files => files.Add().Name("file.txt").Size(500).Extension(".txt"))
        .Async(a => a
            .Save("Save", "Compose")
            .Remove("Remove", "Compose")
            .AutoUpload(true)
        )
    )



