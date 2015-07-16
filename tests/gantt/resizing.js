(function() {

    var element;
    var ganttList;
    var dataSource;
    var GanttList = kendo.ui.GanttList;
    var GanttDataSource = kendo.data.GanttDataSource;

    function createGanttList(options) {
        setupDataSource();

        ganttList = new GanttList(element, $.extend(true, {}, {
            dataSource: dataSource,
            columns: ["title", "start", "end"]
        }, options));

        dataSource.fetch();
    }

    var setupDataSource = function() {
        return dataSource = new GanttDataSource({
            data: [{
                id: 1,
                parentId: null,
                orderId: 0,
                title: "foo",
                start: new Date("2015/03/31"),
                end: new Date("2015/04/05"),
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

    test("list with resizable option renders additional column", function() {
        createGanttList({ resizable: true });

        ganttList._render(dataSource.taskTree());

        equal(ganttList.header.find("col").length, 4);
        equal(ganttList.content.find("col").length, 4);
        equal(ganttList.content.find("td").length, 4);
    });

    test("list with resizable option renders additional column width col width 1", function() {
        createGanttList({ resizable: true });

        equal(parseInt(ganttList.header.find("col:last").css("width"), 10), 1);
    });

    test("list with resizable option set explicit width to header cols", 3, function() {
        createGanttList({ resizable: true });

        ganttList._render(dataSource.taskTree());

        ganttList.header.find("col").not(":last").map(function() {
            ok(parseInt($(this).css("width"), 10));
        });
    });

    test("list with resizable option set explicit width to content cols", 3, function() {
        createGanttList({ resizable: true });

        ganttList._render(dataSource.taskTree());

        ganttList.content.find("col").not(":last").map(function() {
            ok(parseInt($(this).css("width"), 10));
        });
    });

}());