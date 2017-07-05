---
title: Cancel Changes Per Row by Using the Incell Editing Mode of the Grid
description: An example on how to cancel the changes for a specific row when the Grid is in the incell editing mode.
type: how-to
page_title: Cancel Changes for Specific Grid Row with Incell Editing
slug: how-to-cancel-changes-for-specific-row-with-incell-editing
tags: grid, editing
teampulseid:
ticketid: 1111657
pitsid:
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Grid for Progress® Kendo UI®</td>
 </tr>
 <tr>
  <td>Operating System</td>
  <td>Windows 10 64bit</td>
 </tr>
 <tr>
  <td>Browser</td>
  <td>Google Chrome</td>
 </tr>
 <tr>
  <td>Browser Version</td>
  <td>58.0.3029.110</td>
 </tr>
</table>

 
## Description

I am using a Grid with a remote Datasource with the `batch:true` setup. The Grid is in the incell editing mode. The toolbar of the Grid has the `create`, `save,` and `cancel` commands. The problem is that the `cancel` command discards all made changes.

How can I provide a `cancel` command per row and at the same time keep the above configurations? In other words, I need my Grid to have both of the following commands:  
1. The `cancel` command of the row which discards only the changes of the corresponding row, and   
1. The `cancel` command of the toolbar which discards all changes that are made.  

How can I achieve this?

## Solution

The desired result is not fully supported by the Kendo UI Grid. However, you can achieve a similar result by using custom logic:

1. Add a custom button.
1. On the button click, get the item by `Uid`.
1. Call `cancelChanges` only for that item.

For more details, refer to the following articles:  

* [http://docs.telerik.com/kendo-ui/api/javascript/data/datasource\#methods-getByUid](http://docs.telerik.com/kendo-ui/api/javascript/data/datasource#methods-getByUid)  
* [http://docs.telerik.com/kendo-ui/api/javascript/data/datasource\#methods-cancelChanges](http://docs.telerik.com/kendo-ui/api/javascript/data/datasource#methods-cancelChanges)  
* [http://docs.telerik.com/kendo-ui/api/javascript/ui/grid\#configuration-columns.command](http://docs.telerik.com/kendo-ui/api/javascript/ui/grid#configuration-columns.command)  

> **Important**
>
> This approach will prevent the item from being updated in the database. However, the old values will be visually reverted after `saveChanges`.  
