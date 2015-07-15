(function() {

    var element;
    var ganttList;
    var GanttList = kendo.ui.GanttList;
    var GanttDataSource = kendo.data.GanttDataSource;

    function createGanttList(options) {
        var dataSource = setupDataSource();

        ganttList = new GanttList(element, $.extend(true, {}, {
            dataSource: dataSource,
            columns: [
                { field: "title" },
                { field: "start" },
                { field: "end" }
            ]
        }, options));

        dataSource.fetch();
        ganttList._render(dataSource.taskTree());
    }

    var setupDataSource = function() {
        return new GanttDataSource({
            data: [{
                id: 1,
                parentId: null,
                orderId: 0,
                title: "foo",
                start: new Date("2015/03/31"),
                end: new Date("2015/04/05"),
                summary: true,
                expanded: true
            }],
            schema: {
                model: {
                    id: "id"
                }
            }
        });
    };

    module("List Column Resizing Initialization", {
        setup: function() {
            element = $("<div/>")
               .appendTo(QUnit.fixture);
        },
        teardown: function() {
            ganttList.destroy();
            element.remove();
            kendo.destroy(QUnit.fixture);
            ganttList = null;
        }
    });

    test("list with resizable option initialize column resizable", function() {
        createGanttList({ resizable: true });

        ok(ganttList.header.data("kendoResizable") instanceof kendo.ui.Resizable);
        ok(ganttList._columnResizable instanceof kendo.ui.Resizable);
    });

    test("list with default options does not initialize column resizable", function() {
        createGanttList();

        ok(!ganttList.header.data("kendoResizable"));
        ok(!ganttList._columnResizable);
    });
}());