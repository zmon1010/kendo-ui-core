---
title: Footer Alignment
---

# Align the footer cells

This example shows how align the footer cells during excel export. Usually one uses HTML and CSS to do that but this isn't supported in Excel.

The demo uses the [hAlign](/api/javascript/ooxml/workbook#configuration-sheets.rows.cells.hAlign) option of the cell to set the alignment.

To understand how Excel documents work check the [Excel Introduction](/framework/excel/introduction#create-excel-document) help topic.

#### Example - alternating rows

```html
<div id="grid"></div>
<script>
  $(function() {
    $("#grid").kendoGrid({
      toolbar: ["excel"],
      excelExport: function(e) {
        var rows = e.workbook.sheets[0].rows;

        for (var ri = 0; ri < rows.length; ri++) {
          var row = rows[ri];

          if (row.type == "group-footer" || row.type == "footer") {
            for (var ci = 0; ci < row.cells.length; ci++) {
              var cell = row.cells[ci];
              if (cell.value) {
                // Use jQuery.fn.text to remove the HTML and get only the text
                cell.value = $(cell.value).text();
                // Set the alignment
                cell.hAlign = "right";
              }
            }
          }
        }
      },
      dataSource: {
        type: "odata",
        transport: {
          read: "http://demos.telerik.com/kendo-ui/service/Northwind.svc/Products"
        },
        schema:{
          model: {
            fields: {
              UnitsInStock: { type: "number" },
              ProductName: { type: "string" },
              UnitPrice: { type: "number" },
              UnitsOnOrder: { type: "number" },
              UnitsInStock: { type: "number" }
            }
          }
        },
        pageSize: 7,
        group: {
          field: "UnitsInStock", aggregates: [
            { field: "ProductName", aggregate: "count" },
            { field: "UnitPrice", aggregate: "sum"},
            { field: "UnitsOnOrder", aggregate: "average" },
            { field: "UnitsInStock", aggregate: "count" }
          ]
        },

        aggregate: [ { field: "ProductName", aggregate: "count" },
                    { field: "UnitPrice", aggregate: "sum" },
                    { field: "UnitsOnOrder", aggregate: "average" },
                    { field: "UnitsInStock", aggregate: "min" },
                    { field: "UnitsInStock", aggregate: "max" }]
      },
      sortable: true,
      scrollable: false,
      pageable: true,
      columns: [
        { field: "ProductName", title: "Product Name", aggregates: ["count"], footerTemplate: "<div style='text-align:right'>Total Count: #=count#</div>", groupFooterTemplate: "<div style='text-align:right'>Count: #=count#</div>" },
        { field: "UnitPrice", title: "Unit Price", aggregates: ["sum"] },
        { field: "UnitsOnOrder", title: "Units On Order", aggregates: ["average"], footerTemplate: "<div style='text-align:right'>Average: #=average#</div>",
         groupFooterTemplate: "<div>Average: #=average#</div>" },
        { field: "UnitsInStock", title: "Units In Stock", aggregates: ["min", "max", "count"], footerTemplate: "<div style='text-align:right'>Min: #= min # Max: #= max #</div>",
         groupHeaderTemplate: "Units In Stock: #= value # (Count: #= count#)" }
      ]
    });
  });
</script>
```
