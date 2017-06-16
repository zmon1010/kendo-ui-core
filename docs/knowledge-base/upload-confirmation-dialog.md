---
title: Confirm dialog before uploading file
description: 
type: how to
page_title: Confirm dialog before uploading file
slug: confirm_dialog_before_uploading_file
position: 0
tags: kendo, upload, dialog, confirm
teampulseid:
ticketid: 1113102
pitsid:

---

## Environment
<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® Upload</td>
 </tr>
</table>


## Description
The following KB article describes how to implement a Confirm dialog before uploading a file with Kendo UI Upload in Async mode.

## Solution
The required could be achieved by using [Kendo Confirm Dialog](https://demos.telerik.com/kendo-ui/dialog/predefined-dialogs) and Async Upload with [AutoUpload](http://docs.telerik.com/kendo-ui/api/javascript/ui/upload#configuration-async.autoUpload) turned off. The Confirm Dialog is opened within the [select](http://docs.telerik.com/kendo-ui/api/javascript/ui/upload#events-select) event handler and it displays some information about the file (its name):

###### Example

````html
  <input name="files" id="files" type="file" />
  <script>
	$(document).ready(function() {
	  $("#files").kendoUpload({
		multiple: false,
		async: {
		  // Disable AutoUpload of files
		  autoUpload: false,
		  saveUrl: "https://demos.telerik.com/kendo-ui/upload/async/save",
		  removeUrl: "https://demos.telerik.com/kendo-ui/upload/async/remove",
		  withCredentials: false
		},
		select: function(e) {
		  var file = e.files[0];
		  // Get reference to the Upload widget
		  var upload = e.sender;
		  // Initialize a Confirm Dialog
		  kendo.confirm("File name:" + 
						"<br/>" + 
						file.name + 
						"<br/>" + 
						"Are you sure that you want to upload this file?")
			.then(function () {
			  // Upload the file if confirmed
			  upload.upload();
			}, function () {
			  // Clear the file from the Upload if denied
			  upload.clearAllFiles();
			});
		}
	  });
	});
  </script>
````

## See Also

* [Upload JavaScript API Reference](http://docs.telerik.com/kendo-ui/api/javascript/ui/upload)
* [Predefined Kendo Dialogs demo](https://demos.telerik.com/kendo-ui/dialog/predefined-dialogs)
