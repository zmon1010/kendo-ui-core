---
title: How To Select Rows Based on the DataItem Programmatically
description: An example on how to select rows based on the values of the data items. 
type: how-to
page_title: Automatically Check Checkboxes on Load in the Grid
slug: checkbox-selection-select-rows-on-load
tags: checkbox selection, grid, kendo ui
teampulseid:
ticketid: 1117204
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

How can I check checkboxes programmatically using the selectable column in the Kendo UI Grid? I would like to have grid loaded with some check boxes checked by default when the grid loads.

## Possible Solution

To select rows programmatically on load:

1. In the [`dataBound`](http://docs.telerik.com/kendo-ui/api/javascript/ui/grid#events-dataBound) event handler, get and save all the rows.
1. Use the jQuery [`each`](https://api.jquery.com/each/) method to loop through the rows.
1. Use the [`dataItem`](http://docs.telerik.com/kendo-ui/api/javascript/ui/grid#methods-dataItem) method to get every row data.
1. Use the [`select`](http://docs.telerik.com/kendo-ui/api/javascript/ui/grid#methods-select) method to set the current row as selected.

```html
<div id="example">
    <div id="grid"></div>

    <script>
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
                dataBound: function(e) {
                    var rows = e.sender.tbody[0].rows;

                    $(rows).each(function(e) {
                        var grid = $("#grid").data("kendoGrid");
                        var row = this;
                        var dataItem = grid.dataItem(row);

                        if (dataItem.UnitPrice >= 22) {
                            grid.select(row);
                        }

                    });
                },
                scrollable: false,
                persistSelection: true,
                sortable: true,
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
        });
    </script>
</div>
```

## Notes

The checkbox selectable column is introduced in the Kendo UI R2 2017 SP1 release.

## See Also

* [FAQs: Checkbox Selectable Column]({% slug checkbox-selection-faqs %})
* [Grid Checkbox selection demo](http://demos.telerik.com/kendo-ui/grid/checkbox-selection)
* [API Reference for the **columns.selectable** configuration](http://docs.telerik.com/kendo-ui/api/javascript/ui/grid#configuration-columns.selectable)