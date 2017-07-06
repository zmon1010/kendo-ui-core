---
title: How To Get the Data of the Last Selected Row
description: An example on how to get the dataItem for the last selected row by using the jQuery click event.
type: how-to
page_title: Getting the DataItem of the Last Selected Row Only
slug: checkbox-selection-dataitem-last-selected-row
tags: checkbox selection, grid, kendo ui
teampulseid:
ticketid: 1116716, 1117204
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

How can I get the data item of the last selected row by using the checkbox selectable column in the Kendo UI Grid?

## Possible Solution

To get the dataItem for the last selected row:

1. Use a jQuery selector to subscribe for the [`click`](https://api.jquery.com/click/) event of the checkboxes.
1. In the `click` event handler, get the row by using the [`closest`](https://api.jquery.com/closest/) jQuery method.
1. Use the [`dataItem`](http://docs.telerik.com/kendo-ui/api/javascript/ui/grid#methods-dataItem) method of the Grid to get the row data.

```html
<div id="example">
    <div id="grid"></div>

    <script>
        function onClick(e) {
            var grid = $("#grid").data("kendoGrid");
            var row = e.target.closest("tr");
            var dataItem = grid.dataItem(row);
			var className = row.className;

			if(className.indexOf("k-state-selected") != -1){
				console.log("Deselecting");
			}else{
				console.log("Selecting");
			}

            console.log(dataItem);
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

            grid.tbody.on("click", ".k-checkbox", onClick);
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