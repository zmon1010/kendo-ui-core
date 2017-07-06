---
title: "FAQs: Checkbox Selectable Column"
description: This article provides the answers to the most common question about the built-in checkbox column of the Kendo UI Grid.
type: how-to
page_title: "FAQs: Kendo UI Grid Checkbox Selection"
slug: checkbox-selection-faqs
tags: checkbox selection, grid, kendo ui, umbrella article
position: 0
teampulseid:
ticketid:
pitsid:
---

# FAQs: Checkbox Selectable Column

## Environment
<table>
 <tr>
  <td>Product</td>
  <td>Grid for Progress® Kendo UI®</td>
 </tr>
 <tr>
  <td>Progress® Kendo UI® version</td>
  <td>Tested up to version 2017.2 621</td>
 </tr>
</table>

## Introduction

This article answers questions about the built-in checkbox column of the Kendo UI Grid.

> The checkbox selectable column is introduced in the Kendo UI R2 2017 SP1 release.

## How can I check checkboxes and select rows programmatically?

In the `dataBound` event handler, get all the rows of the Grid. Loop through the rows and based on the `dataItem` select the desired rows.

More information is available in [this article]({% slug checkbox-selection-select-rows-on-load %}).

## How can I limit the selection to a single row and remove the master checkbox?

Remove the master checkbox by adding an empty header template. In the `click` event handler of the checkboxes, use the `clearSelection` method to remove the selection from the other rows.

More information is available in [this article]({% slug checkbox-selection-select-single-row %}).

## How can I get the data item of the last selected row?

In the `click` event handler of the checkboxes, get the row by using the `closest` jQuery method. Get the row data by passing it as a parameter to the `dataItem` method.

More information is available in [this article]({% slug checkbox-selection-dataitem-last-selected-row %}).

## How can I get all the selected rows dataItems?

In the `change` event handler get all the selected rows. Loop through the rows and use the `dataItem` method for each row.

More information is available in [this article]({% slug checkbox-selection-dataitems-selected-rows %}).

## How can I select all the rows in all the pages?

> Implementing this functionality could lead to a slow Grid performance.

Set the `persistSelection` configuration of the Grid to `true`. In the `click` event handler of the master checkbox, show all rows on a single page, select the rows and bring back the old page size.

More information is available in [this article]({% slug checkbox-selection-select-all-rows-all-pages %}).

## How can I implement my own checkbox selectable column?

You can achieve this by taking advantage of some of the Kendo UI Grid and jQuery configurations, methods and events.

More information is available in [this article]({% slug howto_select_deselect_all_rowswith_checkboxes_grid %}). 

## See Also

* [Grid Checkbox selection demo](http://demos.telerik.com/kendo-ui/grid/checkbox-selection)
* [API Reference for the **columns.selectable** configuration](http://docs.telerik.com/kendo-ui/api/javascript/ui/grid#configuration-columns.selectable)