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


})();
