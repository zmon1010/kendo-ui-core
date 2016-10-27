---
title: UploadMessagesBuilder
---

# Kendo.Mvc.UI.Fluent.UploadMessagesBuilder
A builder class for UploadMessages




## Methods


### Cancel(System.String)
Sets the Cancel button text


#### Parameters

##### cancelMessage `System.String`
New cancel button text.




#### Example (ASPX)
    <%= Html.Kendo().Upload()
    .Name("Upload")
    .Messages(msgs => msgs
        .Cancel("cancel")
    )
    %>


### DropFilesHere(System.String)
Sets the Drag and Drop hint text


#### Parameters

##### dropFilesHereMessage `System.String`
New Drag and Drop hint text.




#### Example (ASPX)
    <%= Html.Kendo().Upload()
    .Name("Upload")
    .Messages(msgs => msgs
        .DropFilesHere("drop files here")
    )
    %>


### Remove(System.String)
Sets the Remove button text


#### Parameters

##### removeMessage `System.String`
New Remove button text.




#### Example (ASPX)
    <%= Html.Kendo().Upload()
    .Name("Upload")
    .Messages(msgs => msgs
        .Remove("drop files here")
    )
    %>


### Retry(System.String)
Sets the Retry button text


#### Parameters

##### retryMessage `System.String`
New Retry button text.




#### Example (ASPX)
    <%= Html.Kendo().Upload()
    .Name("Upload")
    .Messages(msgs => msgs
        .Retry("retry")
    )
    %>


### Select(System.String)
Sets the Select button text


#### Parameters

##### selectMessage `System.String`
New Select button text.




#### Example (ASPX)
    <%= Html.Kendo().Upload()
    .Name("Upload")
    .Messages(msgs => msgs
        .Select("select")
    )
    %>


### StatusFailed(System.String)
Sets the "failed" status text accessible by screen readers


#### Parameters

##### statusFailedMessage `System.String`
New "failed" status text accessible by screen readers.




#### Example (ASPX)
    <%= Html.Kendo().Upload()
    .Name("Upload")
    .Messages(msgs => msgs
        .StatusFailed("failed")
    )
    %>


### StatusUploaded(System.String)
Sets the "uploaded" status text accessible by screen readers


#### Parameters

##### statusUploadedMessage `System.String`
New "uploaded" status text accessible by screen readers.




#### Example (ASPX)
    <%= Html.Kendo().Upload()
    .Name("Upload")
    .Messages(msgs => msgs
        .StatusUploaded("uploaded")
    )
    %>


### StatusUploading(System.String)
Sets the "uploading" status text accessible by screen readers


#### Parameters

##### statusUploadingMessage `System.String`
New "uploading" status text accessible by screen readers.




#### Example (ASPX)
    <%= Html.Kendo().Upload()
    .Name("Upload")
    .Messages(msgs => msgs
        .StatusUploading("uploading")
    )
    %>


### HeaderStatusUploading(System.String)
Sets the "uploading" header status text accessible by screen readers


#### Parameters

##### headerStatusUploadingMessage `System.String`
New "header uploading" status text accessible by screen readers.




#### Example (ASPX)
    <%= Html.Kendo().Upload()
    .Name("Upload")
    .Messages(msgs => msgs
        .HeaderStatusUploading("header uploading")
    )
    %>


### HeaderStatusUploaded(System.String)
Sets the "uploaded" header status text accessible by screen readers


#### Parameters

##### headerStatusUploadedMessage `System.String`
New "header uploaded" status text accessible by screen readers.




#### Example (ASPX)
    <%= Html.Kendo().Upload()
    .Name("Upload")
    .Messages(msgs => msgs
        .HeaderStatusUploaded("header uploaded")
    )
    %>


### UploadSelectedFiles(System.String)
Sets Upload button (visible when AutoUpload is set to false) text


#### Parameters

##### uploadSelectedFilesMessage `System.String`
New Upload button text.




#### Example (ASPX)
    <%= Html.Kendo().Upload()
    .Name("Upload")
    .Messages(msgs => msgs
        .UploadSelectedFiles("uploading")
    )
    %>


### InvalidMaxFileSize(System.String)
Sets invalid max file size text


#### Parameters

##### invalidMaxFileSizeMessage `System.String`
New invalid max file size text.




#### Example (ASPX)
    <%= Html.Kendo().Upload()
    .Name("Upload")
    .Messages(msgs => msgs
        .InvalidMaxFileSize("invalid max file size")
    )
    %>


### InvalidMinFileSize(System.String)
Sets invalid min file size text


#### Parameters

##### invalidMinFileSizeMessage `System.String`
New invalid min file size text.




#### Example (ASPX)
    <%= Html.Kendo().Upload()
    .Name("Upload")
    .Messages(msgs => msgs
        .InvalidMinFileSize("invalid min file size")
    )
    %>


### InvalidFileExtension(System.String)
Sets invalid file type text


#### Parameters

##### invalidMinFileExtensionMessage `System.String`
New invalid file type text.




#### Example (ASPX)
    <%= Html.Kendo().Upload()
    .Name("Upload")
    .Messages(msgs => msgs
        .InvalidFileExtension("invalid file type size")
    )
    %>


### ClearSelectedFiles(System.String)
Sets clear file text


#### Parameters

##### clearSelectedFilesMessage `System.String`
New clear file text.




#### Example (ASPX)
    <%= Html.Kendo().Upload()
    .Name("Upload")
    .Messages(msgs => msgs
        .ClearSelectedFiles("clear file")
    )
    %>



