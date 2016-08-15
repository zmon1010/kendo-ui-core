---
title: Validation
page_title: Validation | Kendo UI Upload
description: "Learn how to validation the selected files the Kendo UI Upload widget."
slug: validation_upload_widget
position: 2.5
---

# Validation

As of the 2016 Q3 release Kendo UI Upload supports file validation. The selected files can be validated against their extensions and size. A sample validation configuration will look like: 

###### Example

        validation: {
    		allowedExtensions: [".jpg", ".rar"],
    		maxFileSize: 200000,
    		minFileSize: 800000
		}

# Types of Validation

1. File extension - there is an **allowedExtensions** array object which lists all allowed file extensions. If user tries to select a file with an extension which does not exists in the array the validation will fail. The validation messages are displayed differently depending on whether the [async.batch](/api/javascript/ui/upload#configuration-async.batch) option is enabled.
 
**Figure 1: Batch mode is disabled**
![](/controls/editors/upload/upload-validation-batch-disabled.png) 

**Figure 2: Batch mode is enabled**
![](/controls/editors/upload/upload-validation-batch-enabled.png)

2. Maximum file size - the maxFileSize property defines what size the file should not exceed in order to be uploaded to the server. In case the file exceeds it "File size too large." message will be displayed below as validation error message. 
 
3. Minimum file size - the minFileSize property defines what is the minimal file size in order to be uploaded to the server. If the selected file is smaller than the minimum file size a "File size too small." message will be displayed. 

## See Also

Other articles on Kendo UI Upload:

* [Overview of the Upload Widget]({% slug overview_kendoui_upload_widget %})
* [Send and Receive Metadata]({% slug metadata_upload_widget %})
* [Modes of Operation]({% slug modes_upload_widget %})
* [Browser Support]({% slug browsersupport_upload_widget %})
* [Troubleshooting]({% slug troubleshooting_upload_widget %})
