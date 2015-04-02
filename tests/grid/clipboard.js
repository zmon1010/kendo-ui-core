(function() {
   var Grid = kendo.ui.Grid,
        div,
        invoked,
        data = [{ foo: "foo", bar: "bar", baz: "baz" },{ foo: "plqs", bar: "mlqs", baz: "trqs" }],
        DataSource = kendo.data.DataSource;

    module("grid options api", {
        setup: function() {
            invoked = 0;
            div = $("<div></div>").appendTo(QUnit.fixture);
        },
        teardown: function() {
            kendo.destroy(QUnit.fixture);
        }
    });

    function setup(options) {
        options = kendo.deepExtend({}, {
            dataSource: {
                data: data
            },
            columns: [
                { field: "foo", width: 10 },
                { field: "bar", width: 20 },
                { field: "baz", width: 30 }
            ],
            selectable: "multiple cell"
        },
        options);

        return new Grid(div, options);
    }

    test("triggering keydown creates the textarea", function() {
        var grid = setup();

        var ev = jQuery.Event("keydown");
        ev.ctrlKey = true;

        grid.copySelection(ev);
        ok(grid.areaClipBoard);
    });

    test("triggering keydown creates the textarea", function() {
        var grid = setup();

        var ev = jQuery.Event("keydown");
        ev.ctrlKey = true;

        grid.copySelection(ev);
        ok(grid.areaClipBoard);
    });

    test("triggering keydown creates the textarea", function() {
        var grid = setup();
        grid.select(grid.tbody.find("td"));

        var ev = jQuery.Event("keydown");
        ev.ctrlKey = true;

        grid.copySelection(ev);
        equal(grid.getTSV().trim(),"foo\tbar\tbaz\r\nplqs\tmlqs\ttrqs");
    });

    test("getTSV uses the provided delimeter", function() {
        var grid = setup({
            allowCopy: {
                delimeter: "|"
            }
        });
        grid.select(grid.tbody.find("td"));

        var ev = jQuery.Event("keydown");
        ev.ctrlKey = true;

        grid.copySelection(ev);
        equal(grid.getTSV(),"foo|bar|baz\r\nplqs|mlqs|trqs\r\n");
    });

    test("handles the diagonal case", function() {
        var grid = setup({
            dataSource: {
                data : [
                    { foo: "1", bar: "2", baz: "3" },
                    { foo: "4", bar: "5", baz: "6" },
                    { foo: "7", bar: "8", baz: "9" }
                ],
           }
        });
        grid.select(grid.tbody.find(":contains(5),:contains(9)"));

        var ev = jQuery.Event("keydown");
        ev.ctrlKey = true;

        grid.copySelection(ev);
        equal(grid.getTSV(),"5\r\n\t9\r\n");
    });

    test("handles the oposite diagonal case", function() {
        var grid = setup({
            dataSource: {
                data : [
                    { foo: "1", bar: "2", baz: "3" },
                    { foo: "4", bar: "5", baz: "6" },
                    { foo: "7", bar: "8", baz: "9" }
                ],
           }
        });
        grid.select(grid.tbody.find(":contains(6),:contains(8)"));

        var ev = jQuery.Event("keydown");
        ev.ctrlKey = true;

        grid.copySelection(ev);
        equal(grid.getTSV(),"\t6\r\n8\r\n");
    });

    test("handles mosaic selection", function() {
        var grid = setup({
            allowCopy: {
                delimeter: "|"
            },
            dataSource: {
                data : [
                    { foo: "1", bar: "2", baz: "3" },
                    { foo: "4", bar: "5", baz: "6" },
                    { foo: "7", bar: "8", baz: "9" }
                ],
           }
        });
        grid.select(grid.tbody.find(":contains(1),:contains(3),:contains(5),:contains(7),:contains(9)"));

        var ev = jQuery.Event("keydown");
        ev.ctrlKey = true;

        grid.copySelection(ev);
        equal(grid.getTSV(),"1||3\r\n|5\r\n7||9\r\n");
    });

    test("copyHandlers are not attached when allowCopy is set to false", function() {
        var grid = setup({ });
        grid.select(grid.tbody.find("td"));

        var ev = jQuery.Event("keydown");
        ev.ctrlKey = true;

        equal(grid.copyHandler, undefined);
    });

    test("copyHandlers are attached when allowCopy is set to true", function() {
        var grid = setup({ allowCopy: true});
        grid.select(grid.tbody.find("td"));

        var ev = jQuery.Event("keydown");
        ev.ctrlKey = true;

        equal(typeof(grid.copyHandler), "function");
    });

    test("does not include hidden columns by default", function() {
        var grid = setup({
            columns: [
                { field: "foo", width: 10 },
                { field: "bar", width: 20, hidden: true },
                { field: "baz", width: 30 }
            ],
            dataSource: {
                data : [
                    { foo: "1", bar: "2", baz: "3" },
                    { foo: "4", bar: "5", baz: "6" },
                    { foo: "7", bar: "8", baz: "9" }
                ],
           }
        });
        grid.select(grid.tbody.find(":contains(4),:contains(5),:contains(6)"));

        var ev = jQuery.Event("keydown");
        ev.ctrlKey = true;

        grid.copySelection(ev);
        equal(grid.getTSV().trim(),"4\t6");
    });
})();
