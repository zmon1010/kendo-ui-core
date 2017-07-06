---
title: How To Select All Rows in All Pages
description: An example on how to select all the rows in all the pages of the Kendo UI Grid.
type: how-to
page_title: Select All Rows in All Pages with a Master Checkbox
slug: checkbox-selection-select-all-rows-all-pages
tags: checkbox selection, grid, kendo ui
teampulseid:
ticketid:
pitsid:
---

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


## Description

Is there a way of selecting all rows in all pages in the Kendo UI Grid.

## Possible Solution

> Implementing this functionality could lead to a slow Grid performance.

To select all the rows in all the pages:

1. Set the [`persistSelection`](http://docs.telerik.com/kendo-ui/api/javascript/ui/grid#configuration-persistSelection) configuration of the Grid to `true`.
1. Use a jQuery selector to subscribe for the [`click`](https://api.jquery.com/click/) event of the master checkbox.
1. In the `click` event handler:
	1. Use the [`pageSize`](http://docs.telerik.com/kendo-ui/api/javascript/data/datasource#methods-pageSize) method of the Kendo UI dataSource to save the current page size in a global variable.
	1. Use the `pageSize` method to show all the rows on a single page.
	1. Use the [`select`](http://docs.telerik.com/kendo-ui/api/javascript/ui/grid#methods-select) method of the Kendo UI Grid to select all the rows.
	1.  Use the `pageSize` method to bring back the old page size.


```html
<link rel="stylesheet" href="http://demos.telerik.com/kendo-ui/content/shared/styles/examples-offline.css">
<script src="http://demos.telerik.com/kendo-ui/content/shared/js/console.js"></script>  


<div id="example">
    <div id="grid"></div>

    <script>
        var oldPageSize = 0;

        function onChange(e) {
            kendoConsole.log("The selected product ids are: [" + this.selectedKeyNames().join(", ") + "]");
        };

        function onClick(e) {
            var grid = $("#grid").data("kendoGrid");

            oldPageSize = grid.dataSource.pageSize();
            grid.dataSource.pageSize(grid.dataSource.data().length);

            if (grid.dataSource.data().length === grid.select().length) {
                grid.clearSelection();
            } else {
                grid.select("tr");
            };

            grid.dataSource.pageSize(oldPageSize);
        };

        $(document).ready(function() {
            $("#grid").kendoGrid({
                dataSource: {
                    pageSize: 10,
                    transport: {
                        read: {
                            url: "https://demos.telerik.com/kendo-ui/service/Products",
                            dataType: "jsonp"
                        }
                    },
                    schema: {
                        model: {
                            id: "ProductID"
                        }
                    }
                },
                pageable: true,
                scrollable: false,
                persistSelection: true,
                sortable: true,
                change: onChange,
                columns: [{
                        selectable: true,
                        width: "50px"
                    },
                    {
                        field: "ProductName",
                        title: "Product Name"
                    },
                    {
                        field: "UnitPrice",
                        title: "Unit Price",
                        format: "{0:c}"
                    },
                    {
                        field: "UnitsInStock",
                        title: "Units In Stock"
                    },
                    {
                        field: "Discontinued"
                    }
                ]
            });

            var grid = $("#grid").data("kendoGrid");

            grid.thead.on("click", ".k-checkbox", onClick);
        });
    </script>
    <div class="box wide">
        <h4>Console log</h4>
        <div class="console"></div>
    </div>
    <style>
        .console div {
            height: 6em;
        }
    </style>
</div>
```

## Notes

The checkbox selectable column is introduced in the Kendo UI R2 2017 SP1 release.

## See Also

* [FAQs: Checkbox Selectable Column]({% slug checkbox-selection-faqs %})
* [Grid Checkbox selection demo](http://demos.telerik.com/kendo-ui/grid/checkbox-selection)
* [API Reference for the **columns.selectable** configuration](http://docs.telerik.com/kendo-ui/api/javascript/ui/grid#configuration-columns.selectable)