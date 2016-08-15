---
title: Drag and Drop
page_title: Drag and Drop | Kendo UI Upload
description: "Learn how to upload files with the drag-and-drop functionality in asyncronous mode in the Kendo UI Upload widget."
slug: dragandrop_upload_widget
position: 2
---

# Drag and Drop

Users can select files by dropping them over the Kendo UI Upload. As of the Kendo UI 2016 Q3 release custom drop zone(s) can be initialized based on a given selector that that provide drag and drop file upload.  

> **Important**
>
> The drag-and-drop functionality is only available in [async mode](modes#asynchronous-mode) and requires a [supported browser]({% slug browsersupport_upload_widget %}).

## Select and Upload Files

### File Upload

To use the Kendo UI Upload as a drop zone, follow the steps below:

1. Drag a file over the browser window for the drop zone to appear. ![](/controls/editors/upload/upload-dd1.png)
2. When you pass the mouse over the drop zone, it gets highlighted. ![](/controls/editors/upload/upload-dd2.png)
3. Release the file over the drop zone so it adds it to the upload queue. ![](/controls/editors/upload/upload-dd3.png)

###  Custom Drop Zone

As of the Kendo UI 2016 Q3 release custom drop zone(s) can be initialized based on a given selector that provide drag and drop file upload. Please find below some specifics about applying custom drop zone specific classes while user is dragging and dropping the selected file. This will be very helpful in order to customize the appearance of the drop zone during the process of drag and drop: 

1. When the file is dragged over the browser window the custom drop zone element will have a class "k-dropzone-active". 
2. If file is dragged over the drop zone itself the element receives an additional "k-dropzone-hovered" class. Also the drop zone gets highlighted. ![](/controls/editors/upload/upload-dd4.png)
3. Once the file is released over the drop zone it is added to the upload queue.   

###  Drop Zone Visibility

By default, the drop zone is not visible.

The example below demonstrates how to override the default drop zone (when the Kendo UI Upload itself is used as a drop zone) by applying the CSS rules.

###### Example
	
    div.k-dropzone {
        border: 1px solid #c5c5c5; /* For Default; Different for each theme */
    }

    div.k-dropzone em {
        visibility: visible;
    }

<!--*-->

The code snippet below shows how to customize the custom drop zone appearance during the drag and drop process. 

###### Example
	
    div.k-dropzone {
        border: 1px solid red;
    }

    .customDropZone.k-dropzone-active {
        border: 1px solid yellow;
    }
    .customDropZone.k-dropzone-active.k-dropzone-hovered {
        border: 1px solid green;
    }

<!--*-->
## See Also

Other articles on the Kendo UI Upload:

* [Overview of the Upload Widget]({% slug overview_kendoui_upload_widget %})
* [Send and Receive Metadata]({% slug metadata_upload_widget %})
* [Modes of Operation]({% slug modes_upload_widget %})
* [Browser Support]({% slug browsersupport_upload_widget %})
* [Troubleshooting]({% slug troubleshooting_upload_widget %})

For how-to examples on the Kendo UI Upload widget, browse its [**How To** documentation folder]({% slug howto_remove_files_with_errors %}).
