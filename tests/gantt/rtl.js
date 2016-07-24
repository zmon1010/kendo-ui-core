(function() {

    var rtl;
    var element;
    var gantt;
    var extend = $.extend;
    var ui = kendo.ui;
    var Gantt = ui.Gantt;
    var GanttTask = kendo.data.GanttTask;
    var GanttDependency = kendo.data.GanttDependency;

    module("timeline rtl", {
        setup: function() {
            rtl = $('<div class="k-rtl"/>').appendTo(QUnit.fixture);
            element = $("<div/>").appendTo(rtl);
            gantt = new Gantt(element, {
                snap: false,
                views: ["day", "week", "month", "year"]
            });
        },
        teardown: function() {
            kendo.destroy(rtl);
        }
    });

    function renderTask(taskProperties) {
        gantt.timeline._render([new GanttTask(extend({}, {
            start: new Date("2014/04/17"),
            end: new Date("2014/04/18")
        }, taskProperties))]);
    }

    test("resize splitbar increase timeline width when resized right", function () {
        var resizable = gantt._resizeDraggable;
        var timelineWrapper = gantt.wrapper.find(".k-gantt-timeline");
        var timelineWidth = timelineWrapper.width();
        var delta = 30;

        resizable.trigger("start");
        resizable.trigger("resize", {
            x: {
                initialDelta: delta
            }
        });

        equal(timelineWrapper.width(), timelineWidth + delta);
    });

    test("resize splitbar decrease timeline width when resized left", function () {
        var resizable = gantt._resizeDraggable;
        var timelineWrapper = gantt.wrapper.find(".k-gantt-timeline");
        var timelineWidth = timelineWrapper.width();
        var delta = -30;

        resizable.trigger("start");
        resizable.trigger("resize", {
            x: {
                initialDelta: delta
            }
        });

        equal(timelineWrapper.width(), timelineWidth + delta);
    });

    test("position of one hour task at beginning of view range", function() {
        var taskWrapper;
        var taskSlot;
        var taskRightEdge;

        renderTask({
            start: new Date("2014/05/13 08:00"),
            end: new Date("2014/05/13 09:00")
        });

        taskWrapper = gantt.timeline.wrapper.find(".k-task-wrap");
        taskRightEdge = parseFloat(taskWrapper.css("left"), 10) + taskWrapper.width();
        taskSlot = gantt.timeline.view()._timeSlots()[0];

        equal(taskRightEdge, taskSlot.offsetLeft + taskSlot.offsetWidth + 1);
    });

    test("position of one hour task at middle of view range", function() {
        var taskWrapper;
        var taskSlot;

        renderTask({
            start: new Date("2014/05/13 10:00"),
            end: new Date("2014/05/13 11:00")
        });

        taskWrapper = gantt.timeline.wrapper.find(".k-task-wrap");
        taskRightEdge = parseFloat(taskWrapper.css("left"), 10) + taskWrapper.width();
        taskSlot = gantt.timeline.view()._timeSlots()[2];

        equal(taskRightEdge, taskSlot.offsetLeft + taskSlot.offsetWidth + 1);
    });

    test("position of one hour task not snapped to slot", function() {
        var taskWrapper;
        var taskSlot;

        renderTask({
            start: new Date("2014/05/13 10:15"),
            end: new Date("2014/05/13 11:15")
        });

        taskWrapper = gantt.timeline.wrapper.find(".k-task-wrap");
        taskRightEdge = parseFloat(taskWrapper.css("left"), 10) + taskWrapper.width();
        taskSlot = gantt.timeline.view()._timeSlots()[2];

        equal(taskRightEdge, taskSlot.offsetLeft + taskSlot.offsetWidth * 3 / 4 + 1);
    });

    test("width of one hour task not snapped to slot", function() {
        var taskWrapper;
        var taskSlot;

        renderTask({
            start: new Date("2014/05/13 10:15"),
            end: new Date("2014/05/13 11:15")
        });

        taskWrapper = gantt.timeline.wrapper.find(".k-task-wrap");
        taskSlot = gantt.timeline.view()._timeSlots()[2];

        equal(taskWrapper.width(), taskSlot.offsetWidth);
    });

    module("treelist rtl", {
        setup: function() {
            rtl = $('<div class="k-rtl"/>').appendTo(QUnit.fixture);
            element = $("<div/>").appendTo(rtl);
            var dataSource = [{
                id: 1,
                parentId: null,
                orderId: 0,
                title: "foo",
                start: new Date("2014/03/31"),
                end: new Date("2014/04/05"),
                summary: false
            }];

            gantt = new Gantt(element, {
                editable: true,
                dataSource: dataSource
            });
        },
        teardown: function() {
            kendo.destroy(rtl);
        }
    });

    test("rtl class added to reorder drag hint", function() {
        var list = gantt.list;
        var target = list.content.find("tr:first");
        var draggable = list.content.data("kendoDraggable");

        draggable.hint = $('<div class="k-header k-drag-clue"/>')
            .append('<span class="k-icon k-drag-status k-denied" /><span class="k-clue-text"/>');

        draggable.trigger("dragstart", {
            currentTarget: target
        });

        ok(draggable.hint.hasClass("k-rtl"));
    });

    module("Gantt Date rtl ", {
        setup: function () {
            rtl = $('<div class="k-rtl"/>').appendTo(QUnit.fixture);
            element = $("<div/>").appendTo(rtl);
        },
        teardown: function () {
            kendo.destroy(element);
        }
    });

    function setupGantt(userOptions) {
        task = new kendo.data.GanttTask({
            title: "Task",
            start: new Date("2014/04/15 12:00"),
            end: new Date("2014/04/15 14:00")
        });

        var options = extend({}, {


            snap: false,
            views: ["day"],
            showWorkHours: false,
            dataSource: [task]
        }, userOptions);

        gantt = new kendo.ui.Gantt(element, options);
        timeline = gantt.timeline;
    }

    test("set custom date scrolls to slot day view", function () {
        setupGantt({
            date: new Date("2014/04/14"), views: ["day"],
            range: {
                start: new Date("2014/04/1"),
                end: new Date("2014/04/15")
            },
        });

        equal(kendo.scrollLeft(gantt.view().content), gantt.view()._tableWidth - gantt.view()._offset(new Date("2014/04/14")));
    });

    test("set custom date scrolls to slot week view", function () {
        setupGantt({
            date: new Date("2014/04/14"), views: ["week"],
            range: {
                start: new Date("2014/01/1"),
                end: new Date("2015/04/15")
            },
        });

        equal(kendo.scrollLeft(gantt.view().content), gantt.view()._tableWidth - gantt.view()._offset(new Date("2014/04/14")));
    });

    test("set custom date scrolls to slot month view", function () {
        setupGantt({
            date: new Date("2014/09/14"), views: ["month"],
            range: {
                start: new Date("2014/01/1"),
                end: new Date("2015/10/15")
            },
        });

        equal(kendo.scrollLeft(gantt.view().content), gantt.view()._tableWidth - gantt.view()._offset(new Date("2014/09/14")));
    });

    test("set custom date scrolls to slot year view", function () {
        setupGantt({
            date: new Date("2014/08/14"), views: ["year"],
            range: {
                start: new Date("2010/01/1"),
                end: new Date("2015/10/15")
            }
        });
        console.log(kendo.scrollLeft(gantt.view().content) , gantt.view()._tableWidth - gantt.view()._offset(new Date("2014/08/14")));
        var isScrolled = kendo.scrollLeft(gantt.view().content) + 2 > gantt.view()._tableWidth - gantt.view()._offset(new Date("2014/08/14")) &&
          kendo.scrollLeft(gantt.view().content) -2 < gantt.view()._tableWidth - gantt.view()._offset(new Date("2014/08/14")) ;

        ok(isScrolled);
    });

    test("set date() scrolls to slot day view",2 , function () {
        setupGantt({
            views: ["day"],
            range: {
                start: new Date("2014/04/1"),
                end: new Date("2014/04/15")
            },
        });

        var date = new Date("2014/04/14");
        gantt.date(date);
        equal(gantt.date(), date);
        equal(kendo.scrollLeft(gantt.view().content), gantt.view()._tableWidth - gantt.view()._offset(new Date("2014/04/14")));
    });

    test("set date() scrolls to slot week view",2, function () {
        setupGantt({
            views: ["week"],
            range: {
                start: new Date("2014/01/1"),
                end: new Date("2015/04/15")
            },
        });

        var date = new Date("2014/04/14");
        gantt.date(date);
        equal(gantt.date(), date);
        equal(kendo.scrollLeft(gantt.view().content), gantt.view()._tableWidth - gantt.view()._offset(new Date("2014/04/14")));
    });

    test("set date() scrolls to slot month view", function () {
        setupGantt({
            views: ["month"],
            range: {
                start: new Date("2014/01/1"),
                end: new Date("2015/10/15")
            },
        });

        var date = new Date("2014/09/14")
        gantt.date(date);
        equal(gantt.date(), date);
        equal(kendo.scrollLeft(gantt.view().content), gantt.view()._tableWidth - gantt.view()._offset(new Date("2014/09/14")));
    });

    test("set date() scrolls to slot year view", function () {
        setupGantt({
            date: new Date("2014/08/14"), views: ["year"],
            range: {
                start: new Date("2010/01/1"),
                end: new Date("2015/10/15")
            }
        });

        var date = new Date("2014/08/14");
        gantt.date(date);
        equal(gantt.date(), date);

        var isScrolled = kendo.scrollLeft(gantt.view().content) + 2 > gantt.view()._tableWidth - gantt.view()._offset(new Date("2014/08/14")) &&
            kendo.scrollLeft(gantt.view().content) -2 < gantt.view()._tableWidth - gantt.view()._offset(new Date("2014/08/14"));
        
        ok(isScrolled);
    });

})();
