(function() {
    var sheet;
    var defaults = kendo.ui.Spreadsheet.prototype.options;
    var SheetDataSourceBinder = kendo.spreadsheet.SheetDataSourceBinder;
    var success = $.proxy(ok, null, true);
    var failure = $.proxy(ok, null, false);

    module("Sheet DataSource binding", {
        setup: function() {
            sheet = new kendo.spreadsheet.Sheet(defaults.rows, defaults.columns,
            defaults.rowHeight, defaults.columnWidth);
        }
    });

    test("creates DataSource instance from the datasource options", function() {
        var binder = new SheetDataSourceBinder({
            dataSource: {
                data: [{ foo: 1 }],
            },
            sheet: sheet
        });

        ok(binder.dataSource instanceof kendo.data.DataSource);
    });

    test("DataSource instance", function() {
        var dataSource = new kendo.data.DataSource({
            data: [{ foo: 1 }]
        });

        var binder = new SheetDataSourceBinder({
            dataSource: dataSource,
            sheet: sheet
        });

        deepEqual(binder.dataSource, dataSource);
    });

    test("dataSource is automatically fetched", function() {
        var binder = new SheetDataSourceBinder({
            dataSource: {
                data: [{ foo: 1 }]
            },
            sheet: sheet
        });

        equal(binder.dataSource.view()[0].foo, 1);
    });

    test("populates the sheet with DataSource values", function() {
        var binder = new SheetDataSourceBinder({
            dataSource: {
                data: [
                    { foo: "foo1", bar: "bar1" },
                    { foo: "foo2", bar: "bar2" },
                    { foo: "foo3", bar: "bar3" }
                ]
            },
            sheet: sheet
        });

        equal(sheet.range("A2").value(), "foo1");
        equal(sheet.range("B2").value(), "bar1");
        equal(sheet.range("A3").value(), "foo2");
        equal(sheet.range("B3").value(), "bar2");
        equal(sheet.range("A4").value(), "foo3");
        equal(sheet.range("B4").value(), "bar3");
    });

    test("binds to specific columns", function() {
        var binder = new SheetDataSourceBinder({
            columns: [
                { field: "bar" }
            ],
            dataSource: {
                data: [
                    { foo: "foo1", bar: "bar1" },
                    { foo: "foo2", bar: "bar2" },
                    { foo: "foo3", bar: "bar3" }
                ]
            },
            sheet: sheet
        });

        equal(sheet.range("A2").value(), "bar1");
        equal(sheet.range("B2").value(), null);
        equal(sheet.range("A3").value(), "bar2");
        equal(sheet.range("B3").value(), null);
        equal(sheet.range("A4").value(), "bar3");
        equal(sheet.range("B4").value(), null);
    });

    test("binds to nested object field", function() {
        var binder = new SheetDataSourceBinder({
            columns: [
                { field: "foo.bar" }
            ],
            dataSource: {
                data: [
                    { foo: { bar: "bar1" } },
                    { foo: { bar: "bar2" } },
                    { foo: { bar: "bar3" } }
                ]
            },
            sheet: sheet
        });

        equal(sheet.range("A2").value(), "bar1");
        equal(sheet.range("B2").value(), null);
        equal(sheet.range("A3").value(), "bar2");
        equal(sheet.range("B3").value(), null);
        equal(sheet.range("A4").value(), "bar3");
        equal(sheet.range("B4").value(), null);
    });

    test("changing sheet value updates the DataSource", function() {
        var binder = new SheetDataSourceBinder({
            columns: [
                { field: "foo" }
            ],
            dataSource: {
                data: [
                    { foo: "foo1", bar: "bar1" },
                    { foo: "foo2", bar: "bar2" },
                    { foo: "foo3", bar: "bar3" }
                ]
            },
            sheet: sheet
        });

        sheet.range("A2").value("baz");

        equal(binder.dataSource.at(0).foo, "baz");
    });

    test("changing sheet value of non bound column does not modify the data record", function() {
        var binder = new SheetDataSourceBinder({
            columns: [
                { field: "foo" }
            ],
            dataSource: {
                data: [
                    { foo: "foo1", bar: "bar1" },
                    { foo: "foo2", bar: "bar2" },
                    { foo: "foo3", bar: "bar3" }
                ]
            },
            sheet: sheet
        });

        sheet.range("C2").value("baz");

        var dataItem = binder.dataSource.at(0);
        equal(dataItem.foo, "foo1");
        equal(dataItem.bar, "bar1");
        equal(Object.keys(dataItem.toJSON()).length, 2);
    });

    test("changing sheet value of non bound row adds new record to the DataSource and set the value", function() {
        var binder = new SheetDataSourceBinder({
            columns: [
                { field: "foo" }
            ],
            dataSource: {
                data: [
                    { foo: "foo1", bar: "bar1" },
                    { foo: "foo2", bar: "bar2" },
                    { foo: "foo3", bar: "bar3" }
                ]
            },
            sheet: sheet
        });

        sheet.range("A5").value("baz");

        var data = binder.dataSource.data();
        equal(data.length, 4);
        equal(data[3].foo, "baz");
    });

    test("changing value of multiple non bound rows adds new records to the DataSource and set the value", function() {
        var binder = new SheetDataSourceBinder({
            columns: [
                { field: "foo" }
            ],
            dataSource: {
                data: [
                    { foo: "foo1", bar: "bar1" },
                    { foo: "foo2", bar: "bar2" },
                    { foo: "foo3", bar: "bar3" }
                ]
            },
            sheet: sheet
        });

        sheet.range("A5:A7").value("baz");

        var data = binder.dataSource.data();
        equal(data.length, 6);
        equal(data[3].foo, "baz");
        equal(data[4].foo, "baz");
        equal(data[5].foo, "baz");
    });

    test("changing sheet value does not trigger second update the sheet", 1, function() {
        var binder = new SheetDataSourceBinder({
            columns: [
                { field: "foo" }
            ],
            dataSource: {
                data: [
                    { foo: "foo1", bar: "bar1" },
                    { foo: "foo2", bar: "bar2" },
                    { foo: "foo3", bar: "bar3" }
                ]
            },
            sheet: sheet
        });

        sheet.bind("change", ok.bind(this));
        sheet.range("A2").value("baz");
    });

    test("deleting row removes it from the DataSource", function() {
        var binder = new SheetDataSourceBinder({
            columns: [
                { field: "foo" }
            ],
            dataSource: {
                data: [
                    { foo: "foo1", bar: "bar1" },
                    { foo: "foo2", bar: "bar2" },
                    { foo: "foo3", bar: "bar3" }
                ]
            },
            sheet: sheet
        });

        sheet.deleteRow(2);

        var view = binder.dataSource.view();
        equal(view.length, 2);
        equal(view[0].foo, "foo1");
        equal(view[1].foo, "foo3");
    });

    test("deleting row not present in the DataSource does not change the DataSource", function() {
        var binder = new SheetDataSourceBinder({
            columns: [
                { field: "foo" }
            ],
            dataSource: {
                data: [
                    { foo: "foo1", bar: "bar1" },
                    { foo: "foo2", bar: "bar2" },
                    { foo: "foo3", bar: "bar3" }
                ]
            },
            sheet: sheet
        });

        sheet.deleteRow(5);

        var view = binder.dataSource.view();
        equal(view.length, 3);
        equal(view[0].foo, "foo1");
        equal(view[1].foo, "foo2");
        equal(view[2].foo, "foo3");
    });

    test("inserting row on the first position", function() {
        var binder = new SheetDataSourceBinder({
            columns: [
                { field: "foo" }
            ],
            dataSource: {
                data: [
                    { foo: "foo1", bar: "bar1" },
                    { foo: "foo2", bar: "bar2" },
                    { foo: "foo3", bar: "bar3" }
                ]
            },
            sheet: sheet
        });

        sheet.insertRow(0);

        var view = binder.dataSource.view();
        equal(view.length, 4);
        equal(view[0].foo, null);
        equal(view[1].foo, "foo1");
        equal(view[2].foo, "foo2");
        equal(view[3].foo, "foo3");
    });

    test("inserting row adds it to the DataSource", function() {
        var binder = new SheetDataSourceBinder({
            columns: [
                { field: "foo" }
            ],
            dataSource: {
                data: [
                    { foo: "foo1", bar: "bar1" },
                    { foo: "foo2", bar: "bar2" },
                    { foo: "foo3", bar: "bar3" }
                ]
            },
            sheet: sheet
        });

        sheet.insertRow(5);

        var view = binder.dataSource.view();
        equal(view.length, 4);
        equal(view[0].foo, "foo1");
        equal(view[1].foo, "foo2");
        equal(view[2].foo, "foo3");
        equal(view[3].foo, null);
    });

    test("inserting row in between existing rows adds it to the DataSource", function() {
        var binder = new SheetDataSourceBinder({
            columns: [
                { field: "foo" }
            ],
            dataSource: {
                data: [
                    { foo: "foo1", bar: "bar1" },
                    { foo: "foo2", bar: "bar2" },
                    { foo: "foo3", bar: "bar3" }
                ]
            },
            sheet: sheet
        });

        sheet.insertRow(2);

        var view = binder.dataSource.view();
        equal(view.length, 4);
        equal(view[0].foo, "foo1");
        equal(view[1].foo, null);
        equal(view[2].foo, "foo2");
        equal(view[3].foo, "foo3");
    });

    test("show title of the columns in the header", function() {
        var binder = new SheetDataSourceBinder({
            columns: [{ field: "foo", title: "title1" }, { field: "bar", title: "title2" } ],
            dataSource: {
                data: [
                    { foo: "foo1", bar: "bar1" },
                    { foo: "foo2", bar: "bar2" },
                    { foo: "foo3", bar: "bar3" }
                ]
            },
            sheet: sheet
        });

        equal(sheet.range("A1").value(), "title1");
        equal(sheet.range("B1").value(), "title2");
    });

    test("add fields of bound columns on the sheet's first row", function() {
        var binder = new SheetDataSourceBinder({
            columns: [ "foo", "bar"],
            dataSource: {
                data: [
                    { foo: "foo1", bar: "bar1" },
                    { foo: "foo2", bar: "bar2" },
                    { foo: "foo3", bar: "bar3" }
                ]
            },
            sheet: sheet
        });

        equal(sheet.range("A1").value(), "foo");
        equal(sheet.range("B1").value(), "bar");
    });

    test("add fields of autogenerated columns on the sheet's first row", function() {
        var binder = new SheetDataSourceBinder({
            dataSource: {
                data: [
                    { foo: "foo1", bar: "bar1" },
                    { foo: "foo2", bar: "bar2" },
                    { foo: "foo3", bar: "bar3" }
                ]
            },
            sheet: sheet
        });

        equal(sheet.range("A1").value(), "foo");
        equal(sheet.range("B1").value(), "bar");
    });

    test("sheet setDataSource assigns dataSource", function() {
        var dataSource = new kendo.data.DataSource({});

        sheet.setDataSource(dataSource);

        ok(sheet.dataSource instanceof kendo.data.DataSource);
        strictEqual(sheet.dataSource, dataSource);
    });

    test("sheet dataSource is DataSource instance if array is passed", function() {
        sheet.setDataSource({ dataSource: [ { foo: 1 } ] });

        ok(sheet.dataSource instanceof kendo.data.DataSource);
    });

    test("sheet setDataSource creates binder instance", function() {
        var dataSource = new kendo.data.DataSource({});

        sheet.setDataSource(dataSource);

        ok(sheet.dataSourceBinder instanceof SheetDataSourceBinder);
        strictEqual(sheet.dataSourceBinder.dataSource, dataSource);
        strictEqual(sheet.dataSourceBinder.sheet, sheet);
    });

    test("sheet setDataSource destroyes the previous binder", function() {
        sheet.setDataSource({});

        var binder = spy(sheet.dataSourceBinder, "destroy");

        sheet.setDataSource({});

        equal(binder.calls("destroy"), 1);
    });


})();
