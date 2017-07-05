---
title: Start Typing in Unordered List in Editor
description: An example on how to start typing in a Kendo UI Editor and automatically create <ul> and <li> elements.
type: how-to
page_title: Set the Kendo UI Editor Value to Start as a Bullet List
slug: start-typing-in-unordered-list-editor
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

Your customers might want to:

1. Have the first bullet in a list to appear automatically.
1. Type the data they need.
1. After they finish typing, open a new bullet line by pressing the `Enter` key.

## Possible Solution

To allow typing in an unordered list in the Editor, handle the `select` event of the widget and execute the `insertUnorderedList` command.

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

* [Kendo UI Editor JavaScript API Reference](http://docs.telerik.com/kendo-ui/api/javascript/ui/editor)
