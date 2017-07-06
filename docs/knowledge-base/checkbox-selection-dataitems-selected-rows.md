---
title: How To Get the Selected Rows Data
description: An example on how to get the dataItem for every selected row by using the Change event of the Grid.
type: how-to
page_title: Getting the DataItems of the Selected Rows
slug: checkbox-selection-dataitems-selected-rows
tags: checkbox selection, grid, kendo ui
teampulseid:
ticketid: 1116716
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

How can I get all the selected rows dataItems when using the selectable column in the Kendo UI Grid?

## Possible Solution

To get the dataItem for each selected row:

1. In the [`change`](http://docs.telerik.com/kendo-ui/api/javascript/ui/grid#events-change) event handler, get and save the rows in a variable by using the [`select`](http://docs.telerik.com/kendo-ui/api/javascript/ui/grid#methods-select) method.
1. Use the jQuery [`each`](https://api.jquery.com/each/) method to loop through the rows.
1. Use the [`dataItem`](http://docs.telerik.com/kendo-ui/api/javascript/ui/grid#methods-dataItem) method to get every row data.

```html
<div id="example">
    <div id="grid"></div>

    <script>
        function onChange(e) {
            var rows = e.sender.select();
            rows.each(function(e) {
                var grid = $("#grid").data("kendoGrid");
                var dataItem = grid.dataItem(this);

                console.log(dataItem);
            })
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