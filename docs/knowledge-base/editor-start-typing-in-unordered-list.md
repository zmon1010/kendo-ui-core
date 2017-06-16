---
title: Start typing in unordered list in Editor
description: 
type: troubleshooting
page_title: Start typing in unordered list in Editor
slug: start_typing_in_unordered_list_in_editor
position: 0
tags: kendo, editor, list, unordered, bullets
teampulseid:
ticketid: 1113496
pitsid:

---

## Environment
<table>
 <tr>
  <td>Product</td>
  <td>Editor for Progress Kendo UI</td>
 </tr>
</table>


## Description
The following article shows how to force the Editor to automatically start typing in unordered list (bullets).

## Solution
In order to achieve the desired, you could handle the **select** event of the widget and execute the **insertUnorderedList** command:

###### Example

````html
	<textarea id="editor"></textarea>
	
	<script>
	  var shouldInsertList = true;
	  $("#editor").kendoEditor({
	    // Implement an event handler for the select event
		select: function(e) {
		  // Set initially Editor to start an unordered list
		  if(shouldInsertList) {
			shouldInsertList = false;
			e.sender.exec("insertUnorderedList");
		  }
		}
	  });
	</script>
````

## See Also

* [Editor JavaScript API Reference](http://docs.telerik.com/kendo-ui/api/javascript/ui/editor)

