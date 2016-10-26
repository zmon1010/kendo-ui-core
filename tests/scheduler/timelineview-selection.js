(function() {
    var Scheduler = kendo.ui.Scheduler;
    var SchedulerEvent = kendo.data.SchedulerEvent;
    var keys = kendo.keys;
    var scheduler;
    var container;
    var startDate;
    var view;

    module("Selection timeline", {
        setup: function() {
            jasmine.clock().install();
            container = $("<div />");
            QUnit.fixture.append(container);
        },

        teardown: function() {
            jasmine.clock().uninstall();
            kendo.destroy(QUnit.fixture);
        }
    });

    function createSelection(options) {
        return $.extend(true, {
            events: [],
            start: new Date(2013, 1, 2),
            end: new Date(2013, 1, 2),
            isAllDay: true,
            groupIndex: 0
        },
            options
        );
    }

    function setupWidget(options, selectedView) {
        startDate = new Date(2013, 1, 3, 0, 0, 0, 0);
        options = options || {};
        selectedView = selectedView || "timeline";
        var end = new Date(startDate);
        end.setHours(1);

        options = $.extend({
            selectable: true,
            date: new Date(2013, 1, 3, 0, 0, 0, 0),
            views: [
                selectedView
            ],
            dataSource: [
                { start: startDate, end: end, title: "Test", roomId: 2 }
            ]
        }, options);

        scheduler = new Scheduler(container, options);
         jasmine.clock().tick(1);
        view = scheduler.view();
        container.focus();
    }

    function addHours(date, hours) {
        return new Date(+date + (3600000 * hours));
    }

    function keydown(keyCode, options) {
        var e = $.extend({
            type: "keydown"
        }, options);

        if (typeof keyCode == "string") {
            keyCode = keyCode.charCodeAt(0);
        }

        if (keyCode) {
            e.keyCode = keyCode;
        }

        container.trigger(e);
    }

    test("selects first cell on focus", function() {
        setupWidget();
        jasmine.clock().tick(1);
        container.focusout().focus();
        var td = container.find(".k-scheduler-content td:first");

        ok(td.hasClass("k-state-selected"));
    });

    test("focuses wrapper on mousedown", function() {
        setupWidget();
        jasmine.clock().tick(1);
        var td = container.find(".k-scheduler-content td:first");

        td.trigger({
            type: "mousedown",
            currentTarget: td
        });

        equal(container[0], document.activeElement);
    });

    test("creates selection on mousedown", function() {
        setupWidget();
        jasmine.clock().tick(1);
        var td = container.find(".k-scheduler-content td:first");

        td.trigger({
            type: "mousedown",
            currentTarget: td
        });

        ok(td.hasClass("k-state-selected"));
    });

    test("selects next cell on move", function() {
        setupWidget();
        var oldSelection = $(".k-scheduler-content .k-state-selected");

        keydown(keys.RIGHT);

        var currentSelection = $(".k-scheduler-content .k-state-selected");

        equal($(oldSelection[0]).index(), 0);
        equal($(currentSelection[0]).index(), 1);
    });

    test("selects previous cell on move", function() {
        setupWidget();
        keydown(keys.RIGHT);
        var oldSelection = $(".k-scheduler-content .k-state-selected");
        equal($(oldSelection[0]).index(), 1);
        keydown(keys.LEFT);

        var currentSelection = $(".k-scheduler-content .k-state-selected");

        equal($(currentSelection[0]).index(), 0);
    });

    test("move to previous or next range on move from edge cell", function() {
        setupWidget();
        var oldStartDate = scheduler.view().startDate();

        keydown(keys.LEFT);

        var currentSelection = $(".k-scheduler-content .k-state-selected");

        equal($(currentSelection[0]).index(), $(currentSelection[0]).closest("tr").children().length - 1);
        notEqual(+oldStartDate, +scheduler.view().startDate());

        keydown(keys.RIGHT);

        currentSelection = $(".k-scheduler-content .k-state-selected");

        equal(+oldStartDate, +scheduler.view().startDate());
        equal($(currentSelection[0]).index(), 0);
    });

    test("move to previous or next range preserves selection duration", function() {
        setupWidget();
        keydown(keys.RIGHT, { shiftKey: true });
        keydown(keys.LEFT);

        var currentSelection = $(".k-scheduler-content .k-state-selected");

        equal(currentSelection.length, 2);

        keydown(keys.RIGHT);

        currentSelection = $(".k-scheduler-content .k-state-selected");

        equal(currentSelection.length, 2);
    });

    test("move to next group restarts selection to single cell", function() {
        setupWidget({
            group: {
                resources: ["Rooms"],
                orientation: "vertical"
            },
            resources: [
                {
                    field: "roomId",
                    name: "Rooms",
                    dataSource: [
                        { text: "Meeting Room 101", value: 1, color: "#6eb3fa" },
                        { text: "Meeting Room 201", value: 2, color: "#f58a8a" }
                    ],
                    title: "Room"
                }]

        });
        keydown(keys.RIGHT, { shiftKey: true });
        keydown(keys.LEFT);

        var oldSelection = $(".k-scheduler-content .k-state-selected");

        keydown(keys.DOWN);

        var currentSelection = $(".k-scheduler-content .k-state-selected");


        equal(oldSelection.length, 2);
        equal(currentSelection.length, 1);
    });

    test("pressing TAB key moves to next event element", function() {
        setupWidget({
            dataSource: [
                { start: startDate, end: addHours(startDate, 2), title: "Test", roomId: 1 },
                { start: addHours(startDate, 4), end: addHours(startDate, 6), title: "Test 2", roomId: 1 }
            ]
        });

        keydown(keys.TAB);
        var oldSelection = $(".k-scheduler-content .k-state-selected");
        keydown(keys.TAB);
        var currentSelection = $(".k-scheduler-content .k-state-selected");

        ok(oldSelection.hasClass("k-event"));
        ok(currentSelection.hasClass("k-event"));

        notEqual(oldSelection.data("uid"), currentSelection.data("uid"));
    });

    test("pressing TAB key on allDay event moves to next event element", function() {
        setupWidget({
            startTime: new Date(2013, 1, 2, 10, 0, 0, 0),
            endTime: new Date(2013, 1, 2, 18, 0, 0, 0),
            dataSource: [
                { start: startDate, end: addHours(startDate, 2), isAllDay: true, title: "Test", roomId: 1 },
                { start: addHours(startDate, 4), end: addHours(startDate, 6), isAllDay: true, title: "Test 2", roomId: 1 }
            ]
        });

        var eventElement = $(container.find(".k-event")[0]);
        eventElement.trigger({
            type: "mousedown",
            currentTarget: eventElement
        });

        var oldSelection = $(".k-scheduler-content .k-state-selected");
        keydown(keys.TAB);
        var currentSelection = $(".k-scheduler-content .k-state-selected");

        ok(oldSelection.hasClass("k-event"));
        ok(currentSelection.hasClass("k-event"));

        notEqual(oldSelection.data("uid"), currentSelection.data("uid"));
    });

    test("pressing RIGHT key on allDay event moves to next element", function() {
        setupWidget({
            startTime: new Date(2013, 1, 3, 10, 0, 0, 0),
            endTime: new Date(2013, 1, 3, 18, 0, 0, 0),
            views: ["timelineWeek"],
            dataSource: [
                { start: startDate, end: addHours(startDate, 2), isAllDay: true, title: "Test", roomId: 1 },
            ]
        });

        var oldStartDate = scheduler.view().startDate();

        var eventElement = $(container.find(".k-event")[0]);

        eventElement.trigger({
            type: "mousedown",
            currentTarget: eventElement
        });

        var oldSelection = $(".k-scheduler-content .k-state-selected");

        keydown(keys.RIGHT);

        equal(+oldStartDate, +scheduler.view().startDate());

        var currentSelection = $(".k-scheduler-content .k-state-selected");

        ok(oldSelection.hasClass("k-event"));
        ok(!currentSelection.hasClass("k-event"));
    });

    test("continues events collection is populated with events", function() {
        setupWidget();

        var event1 = new SchedulerEvent({
            start: startDate,
            end: addHours(startDate, 2),
            title: "Test"
        });
        var event2 = new SchedulerEvent({
            start: addHours(startDate, 4),
            end: addHours(startDate, 6),
            title: "Test"
        });

        view.render([
            event1,
            event2
        ]);
        var events = view.groups[0]._continuousEvents;

        equal(events.length, 2);
        equal(events[0].uid, event1.uid);
        equal(events[1].uid, event2.uid);
    });

    test("continues events collection is populated with all day events", function() {
        setupWidget();

        var event1 = new SchedulerEvent({
            start: startDate,
            end: startDate,
            isAllDay: true,
            title: "Test"
        });
        var event2 = new SchedulerEvent({
            start: addHours(startDate, 6),
            end: addHours(startDate, 11),
            isAllDay: true,
            title: "Test"
        });


        view.render([
            event1,
            event2
        ]);

        var events = view.groups[0]._continuousEvents;

        equal(events.length, 2);
        equal(events[0].uid, event1.uid);
        equal(events[1].uid, event2.uid);
    });

    test("continuous all day events must be in same order as rendered", function() {
        setupWidget();

        var allDayEvent1 = new SchedulerEvent({
            start: startDate,
            end: startDate,
            isAllDay: true,
            title: "Test"
        });
        var allDayEvent2 = new SchedulerEvent({
            start: addHours(startDate, 6),
            end: addHours(startDate, 11),
            isAllDay: true,
            title: "Test"
        });
        var event = new SchedulerEvent({
            start: addHours(startDate, 6),
            end: addHours(startDate, 11),
            title: "Test"
        });

        view.render([
            allDayEvent1,
            allDayEvent2,
            event
        ]);

        var events = view.groups[0]._continuousEvents;

        equal(events.length, 3);
        equal(events[0].uid, allDayEvent1.uid);
        equal(events[1].uid, allDayEvent2.uid);
        equal(events[2].uid, event.uid);
    });

    //vertical grouping
    test("move to next group in horizontal grouping restarts selection to single cell", function() {
        setupWidget({
            startTime: new Date(2013, 1, 3, 10, 0, 0, 0),
            endTime: new Date(2013, 1, 3, 11, 0, 0, 0),
            group: {
                resources: ["Rooms"],
                orientation: "horizontal"
            },
            resources: [
                {
                    field: "roomId",
                    name: "Rooms",
                    dataSource: [
                        { text: "Meeting Room 101", value: 1, color: "#6eb3fa" },
                        { text: "Meeting Room 201", value: 2, color: "#f58a8a" }
                    ],
                    title: "Room"
                }]

        });

        keydown(keys.RIGHT);

        var oldSelection = $(".k-scheduler-content .k-state-selected");

        keydown(keys.RIGHT);

        var currentSelection = $(".k-scheduler-content .k-state-selected");

        equal(oldSelection.index(), 1);
        equal(currentSelection.index(), 2);
    });

    test("move to next group in horizontal grouping restarts selection to single cell when selection is multiple", function() {
        setupWidget({
            startTime: new Date(2013, 1, 3, 10, 0, 0, 0),
            endTime: new Date(2013, 1, 3, 12, 0, 0, 0),
            group: {
                resources: ["Rooms"],
                orientation: "horizontal"
            },
            resources: [
                {
                    field: "roomId",
                    name: "Rooms",
                    dataSource: [
                        { text: "Meeting Room 101", value: 1, color: "#6eb3fa" },
                        { text: "Meeting Room 201", value: 2, color: "#f58a8a" }
                    ],
                    title: "Room"
                }]

        });

        keydown(keys.RIGHT, { shiftKey: true });
        keydown(keys.RIGHT);
        keydown(keys.RIGHT);

        var oldSelection = $(".k-scheduler-content .k-state-selected");

        keydown(keys.RIGHT);

        var currentSelection = $(".k-scheduler-content .k-state-selected");

        equal(oldSelection.length, 2);
        equal($(oldSelection[0]).index(), 2);
        equal(currentSelection.index(), 4);
    });

    test("move to prev group and date in horizontal grouping set correct slot and date", function() {
        setupWidget({
            startTime: new Date(2013, 1, 3, 10, 0, 0, 0),
            endTime: new Date(2013, 1, 3, 11, 0, 0, 0),
            group: {
                resources: ["Rooms"],
                orientation: "horizontal"
            },
            resources: [
                {
                    field: "roomId",
                    name: "Rooms",
                    dataSource: [
                        { text: "Meeting Room 101", value: 1, color: "#6eb3fa" },
                        { text: "Meeting Room 201", value: 2, color: "#f58a8a" }
                    ],
                    title: "Room"
                }]

        });

        var scheduler = container.data("kendoScheduler");
        var oldDViewDate = scheduler.view()._dates[0];

        keydown(keys.LEFT);

        var oldSelection = $(".k-scheduler-content .k-state-selected");

        keydown(keys.LEFT);
        var currentViewDate = scheduler.view()._dates[0];
        var currentSelection = $(".k-scheduler-content .k-state-selected");

        equal(oldSelection.index(), 3);
        equal(currentSelection.index(), 2);
        notEqual(currentViewDate, oldDViewDate);
    });

    test("move to prev group in horizontal grouping restarts selection to single cell when selection is multiple", function() {
        setupWidget({
            startTime: new Date(2013, 1, 3, 10, 0, 0, 0),
            endTime: new Date(2013, 1, 3, 11, 0, 0, 0),
            group: {
                resources: ["Rooms"],
                orientation: "horizontal"
            },
            resources: [
                {
                    field: "roomId",
                    name: "Rooms",
                    dataSource: [
                        { text: "Meeting Room 101", value: 1, color: "#6eb3fa" },
                        { text: "Meeting Room 201", value: 2, color: "#f58a8a" }
                    ],
                    title: "Room"
                }]

        });

        keydown(keys.RIGHT);
        keydown(keys.RIGHT);
        keydown(keys.RIGHT, { shiftKey: true });

        var oldSelection = $(".k-scheduler-content .k-state-selected");

        keydown(keys.LEFT);

        var currentSelection = $(".k-scheduler-content .k-state-selected");

        equal(oldSelection.length, 2);
        equal($(oldSelection[0]).index(), 2);
        equal(currentSelection.length, 1);
        equal($(currentSelection[0]).index(), 1);
    });

    //horizontal grouping by date
    test("move to next group in horizontal by date grouping restarts selection to single cell", function() {
        setupWidget({
            startTime: new Date(2013, 1, 3, 10, 0, 0, 0),
            endTime: new Date(2013, 1, 3, 11, 0, 0, 0),
            group: {
                resources: ["Rooms"],
                date: true,
                orientation: "horizontal"
            },
            resources: [
                {
                    field: "roomId",
                    name: "Rooms",
                    dataSource: [
                        { text: "Meeting Room 101", value: 1, color: "#6eb3fa" },
                        { text: "Meeting Room 201", value: 2, color: "#f58a8a" }
                    ],
                    title: "Room"
                }]

        });

        keydown(keys.RIGHT);

        var oldSelection = $(".k-scheduler-content .k-state-selected");

        keydown(keys.RIGHT);

        var currentSelection = $(".k-scheduler-content .k-state-selected");

        equal(oldSelection.index(), 1);
        equal(currentSelection.index(), 2);
    });

    test("move to next group in horizontal by date grouping restarts selection to single cell when selection is multiple", function() {
        setupWidget({
            startTime: new Date(2013, 1, 3, 10, 0, 0, 0),
            endTime: new Date(2013, 1, 3, 12, 0, 0, 0),
            group: {
                resources: ["Rooms"],
                date: true,
                orientation: "horizontal"
            },
            resources: [
                {
                    field: "roomId",
                    name: "Rooms",
                    dataSource: [
                        { text: "Meeting Room 101", value: 1, color: "#6eb3fa" },
                        { text: "Meeting Room 201", value: 2, color: "#f58a8a" }
                    ],
                    title: "Room"
                }]

        });

        keydown(keys.RIGHT, { shiftKey: true });
        keydown(keys.RIGHT);
        keydown(keys.RIGHT);
        keydown(keys.RIGHT);

        var oldSelection = $(".k-scheduler-content .k-state-selected");

        keydown(keys.RIGHT);

        var currentSelection = $(".k-scheduler-content .k-state-selected");

        equal(oldSelection.length, 1);
        equal($(oldSelection[0]).index(), 3);
        equal(currentSelection.index(), 4);
    });

    test("move to prev group and date in horizontal by date grouping set correct slot and date", function() {
        setupWidget({
            startTime: new Date(2013, 1, 3, 10, 0, 0, 0),
            endTime: new Date(2013, 1, 3, 11, 0, 0, 0),
            group: {
                resources: ["Rooms"],
                date: true,
                orientation: "horizontal"
            },
            resources: [
                {
                    field: "roomId",
                    name: "Rooms",
                    dataSource: [
                        { text: "Meeting Room 101", value: 1, color: "#6eb3fa" },
                        { text: "Meeting Room 201", value: 2, color: "#f58a8a" }
                    ],
                    title: "Room"
                }]

        });

        var scheduler = container.data("kendoScheduler");
        var oldDViewDate = scheduler.view()._dates[0];

        keydown(keys.LEFT);

        var oldSelection = $(".k-scheduler-content .k-state-selected");

        keydown(keys.LEFT);
        var currentViewDate = scheduler.view()._dates[0];
        var currentSelection = $(".k-scheduler-content .k-state-selected");

        equal(oldSelection.index(), 3);
        equal(currentSelection.index(), 2);
        notEqual(currentViewDate, oldDViewDate);
    });

    test("move to prev group in horizontal by date grouping restarts selection to single cell when selection is multiple", function() {
        setupWidget({
            startTime: new Date(2013, 1, 3, 10, 0, 0, 0),
            endTime: new Date(2013, 1, 3, 11, 0, 0, 0),
            group: {
                resources: ["Rooms"],
                date: true,
                orientation: "horizontal"
            },
            resources: [
                {
                    field: "roomId",
                    name: "Rooms",
                    dataSource: [
                        { text: "Meeting Room 101", value: 1, color: "#6eb3fa" },
                        { text: "Meeting Room 201", value: 2, color: "#f58a8a" }
                    ],
                    title: "Room"
                }]

        });

        keydown(keys.RIGHT);
        keydown(keys.RIGHT);
        keydown(keys.RIGHT, { shiftKey: true });

        var oldSelection = $(".k-scheduler-content .k-state-selected");

        keydown(keys.LEFT);

        var currentSelection = $(".k-scheduler-content .k-state-selected");

        equal(oldSelection.length, 1);
        equal($(oldSelection[0]).index(), 2);
        equal(currentSelection.length, 1);
        equal($(currentSelection[0]).index(), 1);
    });

    test("move to previous view in horizontal by date grouping", function() {
        setupWidget({
            startTime: new Date(2013, 1, 3, 10, 0, 0, 0),
            endTime: new Date(2013, 1, 3, 11, 0, 0, 0),
            group: {
                resources: ["Rooms"],
                date: true,
                orientation: "horizontal"
            },
            resources: [
                {
                    field: "roomId",
                    name: "Rooms",
                    dataSource: [
                        { text: "Meeting Room 101", value: 1, color: "#6eb3fa" },
                        { text: "Meeting Room 201", value: 2, color: "#f58a8a" }
                    ],
                    title: "Room"
                }]

        });

        keydown(keys.LEFT);

        var currentSelection = $(".k-scheduler-content .k-state-selected");

        equal(currentSelection.index(), 3);
    });

    test("move to next view in horizontal by date grouping", function() {
        setupWidget({
            startTime: new Date(2013, 1, 3, 10, 0, 0, 0),
            endTime: new Date(2013, 1, 3, 11, 0, 0, 0),
            group: {
                resources: ["Rooms"],
                date: true,
                orientation: "horizontal"
            },
            resources: [
                {
                    field: "roomId",
                    name: "Rooms",
                    dataSource: [
                        { text: "Meeting Room 101", value: 1, color: "#6eb3fa" },
                        { text: "Meeting Room 201", value: 2, color: "#f58a8a" }
                    ],
                    title: "Room"
                }]

        });

        keydown(keys.RIGHT);
        keydown(keys.RIGHT);
        keydown(keys.RIGHT);
        keydown(keys.RIGHT);

        var currentSelection = $(".k-scheduler-content .k-state-selected");

        equal(currentSelection.index(), 0);
    });

    //vertical grouping by date
    test("move to next group in vertical by date grouping restarts selection to single cell", function() {
        setupWidget({
            startTime: new Date(2013, 1, 3, 10, 0, 0, 0),
            endTime: new Date(2013, 1, 3, 11, 0, 0, 0),
            group: {
                resources: ["Rooms"],
                date: true,
                orientation: "vertical"
            },
            resources: [
                {
                    field: "roomId",
                    name: "Rooms",
                    dataSource: [
                        { text: "Meeting Room 101", value: 1, color: "#6eb3fa" },
                        { text: "Meeting Room 201", value: 2, color: "#f58a8a" }
                    ],
                    title: "Room"
                }]

        });

        keydown(keys.DOWN);

        var oldSelection = $(".k-scheduler-content .k-state-selected");
        var oldDViewDate = scheduler.view()._dates[0];

        keydown(keys.DOWN);

        var currentSelection = $(".k-scheduler-content .k-state-selected");
        var currentViewDate = scheduler.view()._dates[0];

        equal(oldSelection.index(), 0);
        equal(currentSelection.index(), 0);
        notEqual(currentViewDate, oldDViewDate);
    });

    test("move to next group in vertical by date grouping restarts selection to single cell when selection is multiple", function() {
        setupWidget({
            startTime: new Date(2013, 1, 3, 10, 0, 0, 0),
            endTime: new Date(2013, 1, 3, 12, 0, 0, 0),
            group: {
                resources: ["Rooms"],
                date: true,
                orientation: "vertical"
            },
            resources: [
                {
                    field: "roomId",
                    name: "Rooms",
                    dataSource: [
                        { text: "Meeting Room 101", value: 1, color: "#6eb3fa" },
                        { text: "Meeting Room 201", value: 2, color: "#f58a8a" }
                    ],
                    title: "Room"
                }]

        });

        keydown(keys.LEFT);
        keydown(keys.DOWN);
        keydown(keys.DOWN);


        var oldSelection = $(".k-scheduler-content .k-state-selected");

        keydown(keys.DOWN);

        var currentSelection = $(".k-scheduler-content .k-state-selected");

        equal(oldSelection.length, 1);
        equal($(oldSelection[0]).index(), 1);
        equal(currentSelection.index(), 1);
    });

    test("move to prev group and date in vertical by date grouping set correct slot and date", function() {
        setupWidget({
            startTime: new Date(2013, 1, 3, 10, 0, 0, 0),
            endTime: new Date(2013, 1, 3, 11, 0, 0, 0),
            group: {
                resources: ["Rooms"],
                date: true,
                orientation: "vertical"
            },
            resources: [
                {
                    field: "roomId",
                    name: "Rooms",
                    dataSource: [
                        { text: "Meeting Room 101", value: 1, color: "#6eb3fa" },
                        { text: "Meeting Room 201", value: 2, color: "#f58a8a" }
                    ],
                    title: "Room"
                }]

        });

        var scheduler = container.data("kendoScheduler");
        var oldDViewDate = scheduler.view()._dates[0];

        keydown(keys.LEFT);

        var oldSelection = $(".k-scheduler-content .k-state-selected");

        keydown(keys.LEFT);
        var currentViewDate = scheduler.view()._dates[0];
        var currentSelection = $(".k-scheduler-content .k-state-selected");

        equal(oldSelection.index(), 1);
        equal(currentSelection.index(), 0);
        equal(currentViewDate, oldDViewDate);
    });

    test("move to prev group in vertical by date grouping restarts selection to single cell when selection is multiple", function() {
        setupWidget({
            startTime: new Date(2013, 1, 3, 10, 0, 0, 0),
            endTime: new Date(2013, 1, 3, 11, 0, 0, 0),
            group: {
                resources: ["Rooms"],
                date: true,
                orientation: "vertical"
            },
            resources: [
                {
                    field: "roomId",
                    name: "Rooms",
                    dataSource: [
                        { text: "Meeting Room 101", value: 1, color: "#6eb3fa" },
                        { text: "Meeting Room 201", value: 2, color: "#f58a8a" }
                    ],
                    title: "Room"
                }]

        });

        keydown(keys.RIGHT);

        var oldSelection = $(".k-scheduler-content .k-state-selected");
        var oldDViewDate = scheduler.view()._dates[0];
        keydown(keys.UP);

        var currentSelection = $(".k-scheduler-content .k-state-selected");
        var currentViewDate = scheduler.view()._dates[0];

        equal(oldSelection.length, 1);
        equal($(oldSelection[0]).index(), 1);
        equal(currentSelection.length, 1);
        equal($(currentSelection[0]).index(), 1);
        notEqual(currentViewDate, oldDViewDate);
    });

    test("move to previous view in vertical by date grouping", function() {
        setupWidget({
            startTime: new Date(2013, 1, 3, 10, 0, 0, 0),
            endTime: new Date(2013, 1, 3, 11, 0, 0, 0),
            group: {
                resources: ["Rooms"],
                date: true,
                orientation: "horizontal"
            },
            resources: [
                {
                    field: "roomId",
                    name: "Rooms",
                    dataSource: [
                        { text: "Meeting Room 101", value: 1, color: "#6eb3fa" },
                        { text: "Meeting Room 201", value: 2, color: "#f58a8a" }
                    ],
                    title: "Room"
                }]

        });

        keydown(keys.LEFT);

        var currentSelection = $(".k-scheduler-content .k-state-selected");

        equal(currentSelection.index(), 3);
    });

    test("move to next view in vertical by date grouping", function() {
        setupWidget({
            startTime: new Date(2013, 1, 3, 10, 0, 0, 0),
            endTime: new Date(2013, 1, 3, 11, 0, 0, 0),
            group: {
                resources: ["Rooms"],
                date: true,
                orientation: "horizontal"
            },
            resources: [
                {
                    field: "roomId",
                    name: "Rooms",
                    dataSource: [
                        { text: "Meeting Room 101", value: 1, color: "#6eb3fa" },
                        { text: "Meeting Room 201", value: 2, color: "#f58a8a" }
                    ],
                    title: "Room"
                }]

        });
         jasmine.clock().tick(1);
        keydown(keys.RIGHT);
        keydown(keys.RIGHT);
        keydown(keys.RIGHT);
        keydown(keys.RIGHT);
         jasmine.clock().tick(1);
        var currentSelection = $(".k-scheduler-content .k-state-selected");
         jasmine.clock().tick(1);
        equal(currentSelection.index(), 0);
    });

    test("View moves selection to the prev visible date and group slot timelineWorkWeek", function() {
        setupWidget({
            startTime: new Date(2013, 1, 3, 10, 0, 0, 0),
            endTime: new Date(2013, 1, 3, 11, 0, 0, 0),
            group: {
                resources: ["Rooms"],
                date: true,
                orientation: "vertical"
            },
            resources: [
                {
                    field: "roomId",
                    name: "Rooms",
                    dataSource: [
                        { text: "Meeting Room 101", value: 1, color: "#6eb3fa" },
                        { text: "Meeting Room 201", value: 2, color: "#f58a8a" }
                    ],
                    title: "Room"
                }]

        }, "timelineWorkWeek");

        var selection = {
            start: new Date(2013, 0, 28, 10, 0, 0, 0),
            end: new Date(2013, 0, 28, 11, 0, 0),
            groupIndex: 0,
            events: []
        };
         jasmine.clock().tick(1);
        scheduler.view().move(selection, keys.UP);


        deepEqual(selection.start, new Date(2013, 0, 25, 10, 0, 0, 0));
        deepEqual(selection.end, new Date(2013, 0, 25, 11, 0, 0, 0));
    });

    test("View moves selection to the prev visible date and group slot timelineWorkWeek", function() {
        setupWidget({
            startTime: new Date(2013, 1, 3, 10, 0, 0, 0),
            endTime: new Date(2013, 1, 3, 11, 0, 0, 0),
            group: {
                resources: ["Rooms"],
                date: true,
                orientation: "vertical"
            },
            resources: [
                {
                    field: "roomId",
                    name: "Rooms",
                    dataSource: [
                        { text: "Meeting Room 101", value: 1, color: "#6eb3fa" },
                        { text: "Meeting Room 201", value: 2, color: "#f58a8a" }
                    ],
                    title: "Room"
                }]

        }, "timelineWorkWeek");

        var selection = {
            start: new Date(2013, 1, 1, 10, 0, 0, 0),
            end: new Date(2013, 1, 1, 11, 0, 0),
            groupIndex: 0,
            events: []
        };
        jasmine.clock().tick(1);
        scheduler.view().move(selection, keys.DOWN);


        deepEqual(selection.start, new Date(2013, 1, 4, 10, 0, 0, 0));
        deepEqual(selection.end, new Date(2013, 1, 4, 11, 0, 0, 0));
    });

    function setupScheduler(options, selectedView) {
        options = options || {};
        selectedView = selectedView || "timeline";
        options = $.extend({
            views: [
                selectedView
            ],
            date: new Date(2013, 1, 1),

            group: {
                resources: ["Rooms"],
                date: true,
                orientation: "vertical"
            },
            resources: [
                {
                    field: "roomId",
                    name: "Rooms",
                    dataSource: [
                        { text: "Meeting Room 101", value: 1, color: "#6eb3fa" },
                        { text: "Meeting Room 201", value: 2, color: "#f58a8a" }
                    ],
                    title: "Room"
                }],
            dataSource: []
        }, options);

        QUnit.fixture.append(container);
        scheduler = new Scheduler(container, options);
    }

    test("grouped view view moveToEvent: finds next closest event", function() {
        setupScheduler();
        jasmine.clock().tick(1);
        var sch = $(container).data("kendoScheduler");
        var view = sch.view();
        var event = new kendo.data.SchedulerEvent({
            start: new Date(2013, 1, 1),
            end: new Date(2013, 1, 1),
            title: "one day event",
            isAllDay: true,
            roomId: 1
        });
        var selection = createSelection({
            start: new Date(2013, 1, 1),
            end: new Date(2013, 1, 2),
            groupIndex: 0,
            isAllDay: false,
        });

        view.render([
            event
        ]);

        var found = view.moveToEvent(selection);

        equal(selection.events.length, 1);
        equal(selection.events[0], event.uid);
        ok(found);
    });

    test("grouped view moveToEvent: returns false if event is not found", function() {
        setupScheduler();
        jasmine.clock().tick(1);
        var sch = $(container).data("kendoScheduler");
        var view = sch.view();
        var selection = createSelection({
            start: new Date(2013, 1, 1, 12, 0, 0),
            end: new Date(2013, 1, 1, 12, 30, 0),
            groupIndex: 0,
            isAllDay: false
        });

        ok(!view.moveToEvent(selection));
    });

    test("grouped view moveToEvent: updates selection to event slot", function() {
        setupScheduler();
        jasmine.clock().tick(1);
        var sch = $(container).data("kendoScheduler");
        var view = sch.view();
        var event = new kendo.data.SchedulerEvent({
            start: new Date(2013, 1, 1, 13, 0, 0),
            end: new Date(2013, 1, 1, 13, 30, 0),
            title: "one day event",
            roomId: 1
        });
        var selection = createSelection({
            start: new Date(2013, 1, 1, 12, 0, 0),
            end: new Date(2013, 1, 1, 12, 30, 0),
            groupIndex: 0,
            isAllDay: false
        });

        view.render([
            event
        ]);

        var found = view.moveToEvent(selection);

        equal(selection.events[0], event.uid);
        deepEqual(selection.start, event.start);
        deepEqual(selection.end, new Date(2013, 1, 1, 13, 30, 0));
    });

    test("view moveToEvent: move selection from current event to next", function() {
        setupScheduler();
        jasmine.clock().tick(1);
        var sch = $(container).data("kendoScheduler");
        var view = sch.view();
        var firstEvent = new kendo.data.SchedulerEvent({
            start: new Date(2013, 1, 1),
            end: new Date(2013, 1, 1),
            title: "one day event",
            roomId: 1
        });
        var secondEvent = new kendo.data.SchedulerEvent({
            start: new Date(2013, 1, 1, 13, 0, 0),
            end: new Date(2013, 1, 1, 13, 30, 0),
            title: "one day event",
            roomId: 1
        });
        var selection = createSelection({
            start: new Date(2013, 1, 1, 12, 0, 0),
            end: new Date(2013, 1, 1, 12, 30, 0),
            events: [firstEvent.uid],
            groupIndex: 0,
            isAllDay: false
        });

        view.render([
            firstEvent,
            secondEvent
        ]);

        ok(view.moveToEvent(selection));
        equal(selection.events.length, 1);
        equal(selection.events[0], secondEvent.uid);
    });

    test("view moveToEvent: with shift finds previous closest event", function() {
        setupScheduler();
        jasmine.clock().tick(1);
        var sch = $(container).data("kendoScheduler");
        var view = sch.view();
        var firstEvent = new kendo.data.SchedulerEvent({
            start: new Date(2013, 1, 1),
            end: new Date(2013, 1, 1),
            title: "one day event",
            roomId: 1
        });
        var secondEvent = new kendo.data.SchedulerEvent({
            start: new Date(2013, 1, 1, 12, 0, 0),
            end: new Date(2013, 1, 1, 12, 30, 0),
            title: "one day event",
            roomId: 1
        });
        var selection = createSelection({
            start: new Date(2013, 1, 1, 13, 0, 0),
            end: new Date(2013, 1, 1, 13, 30, 0),
            groupIndex: 0,
            isAllDay: false
        });

        view.render([
            firstEvent,
            secondEvent
        ]);

        ok(view.moveToEvent(selection, true));
        equal(selection.events.length, 1);
        equal(selection.events[0], secondEvent.uid);
    });

    test("view moveToEvent: with shift finds previous closest event when selection is between events", function() {
        setupScheduler();
        jasmine.clock().tick(1);
        var sch = $(container).data("kendoScheduler");
        var view = sch.view();
        var firstEvent = new kendo.data.SchedulerEvent({
            start: new Date(2013, 1, 1),
            end: new Date(2013, 1, 1),
            title: "one day event",
            roomId: 1
        });
        var secondEvent = new kendo.data.SchedulerEvent({
            start: new Date(2013, 1, 1, 13, 0, 0),
            end: new Date(2013, 1, 1, 13, 30, 0),
            title: "one day event",
            roomId: 1
        });
        var selection = createSelection({
            start: new Date(2013, 1, 1, 12, 0, 0),
            end: new Date(2013, 1, 1, 12, 30, 0),
            groupIndex: 0,
            isAllDay: false
        });

        view.render([
            firstEvent,
            secondEvent
        ]);

        ok(view.moveToEvent(selection, true));
        equal(selection.events.length, 1);
        equal(selection.events[0], firstEvent.uid);
    });

    test("view moveToEvent: move selection from current event to previous", function() {
        setupScheduler();
        jasmine.clock().tick(1);
        var sch = $(container).data("kendoScheduler");
        var view = sch.view();
        var firstEvent = new kendo.data.SchedulerEvent({
            start: new Date(2013, 1, 1),
            end: new Date(2013, 1, 1),
            title: "one day event",
            roomId: 1
        });
        var secondEvent = new kendo.data.SchedulerEvent({
            start: new Date(2013, 1, 1, 13, 0, 0),
            end: new Date(2013, 1, 1, 13, 30, 0),
            title: "one day event",
            roomId: 1
        });
        var selection = createSelection({
            start: new Date(2013, 1, 1, 12, 0, 0),
            end: new Date(2013, 1, 1, 12, 30, 0),
            events: [secondEvent.uid],
            groupIndex: 0,
            isAllDay: false
        });

        view.render([
            firstEvent,
            secondEvent
        ]);

        ok(view.moveToEvent(selection, true));
        equal(selection.events.length, 1);
        equal(selection.events[0], firstEvent.uid);
    });

    test("view moveToEvent: move selection from event to previous event in same slot", function() {
        setupScheduler();
        jasmine.clock().tick(1);
        var sch = $(container).data("kendoScheduler");
        var view = sch.view();
        var firstEvent = new kendo.data.SchedulerEvent({
            start: new Date(2013, 1, 1),
            end: new Date(2013, 1, 1),
            title: "first event",
            roomId: 1
        });
        var secondEvent = new kendo.data.SchedulerEvent({
            start: new Date(2013, 1, 1, 13, 0, 0),
            end: new Date(2013, 1, 1, 13, 30, 0),
            title: "second event",
            roomId: 1
        });
        var selection = createSelection({
            start: new Date(2013, 1, 1, 12, 0, 0),
            end: new Date(2013, 1, 1, 12, 30, 0),
            events: [secondEvent.uid],
            groupIndex: 0,
            isAllDay: false
        });

        view.render([
            firstEvent,
            secondEvent
        ]);

        ok(view.moveToEvent(selection, true));
        equal(selection.events.length, 1);
        equal(selection.events[0], firstEvent.uid);
    });

})();