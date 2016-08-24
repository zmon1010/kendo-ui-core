(function() {
    var SchedulerEvent = kendo.data.SchedulerEvent;
    var Scheduler = kendo.ui.Scheduler;
    var container;
    var scheduler;

    function setupScheduler(options) {
        options = options || {};

        options = $.extend({
            views: [
                "month"
            ],
            dataSource: []
        }, options);

        scheduler = new Scheduler(container, options);
    }

    module("Month View rendering when grouped by date", {
        setup: function() {
            container = $('<div class="k-scheduler" style="width:1000px;height:800px">');
            QUnit.fixture.append(container);
        },
        teardown: function() {
            kendo.destroy(QUnit.fixture);
        }
    });

    test("renders headers for selected dates", function() {

        setupScheduler({
            date: new Date("2013/1/6"),
            minorTickCount: 3,
            majorTick: 120,
            startTime: new Date("2013/1/6 06:00"),
            endTime: new Date("2013/1/6 12:00"),
            views: [
                "month"
            ],
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

        var sch = $(container).data("kendoScheduler");

        ok(sch.view().datesHeader.hasClass("k-scheduler-header"));
        equal(sch.view().datesHeader.find("th").length, 21);
    });

    test("dates are formatted", function() {
         setupScheduler({
            date: new Date("2013/1/6"),
            minorTickCount: 3,
            majorTick: 120,
            startTime: new Date("2013/1/6 06:00"),
            endTime: new Date("2013/1/6 12:00"),
            views: [
                {
                    type: "month",
                    dateHeaderTemplate: kendo.template("<strong>#=kendo.toString(date, 'd')#</strong>"),
                    minorTickCount: 3
            }],
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

        var sch = $(container).data("kendoScheduler");

        equal(sch.view().datesHeader.find("th").first().text(), "Sunday");
    });

     test("render time slots horizontal", function() {
        setupScheduler({
            date: new Date("2013/1/6"),
            minorTickCount: 3,
            majorTick: 120,
            startTime: new Date("2013/1/6 06:00"),
            endTime: new Date("2013/1/6 12:00"),
            views: [
                {
                    type: "month",
                    dateHeaderTemplate: kendo.template("<strong>#=kendo.toString(date, 'd')#</strong>"),
                    minorTickCount: 3
            }],
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

        var sch = $(container).data("kendoScheduler");

        equal(sch.view().times.find("th").length, 0);
        equal(sch.view().times.find("th:first").text(), "");
    });

    test("render time slots", function() {
        setupScheduler({
            date: new Date("2013/1/6"),
            minorTickCount: 3,
            majorTick: 120,
            startTime: new Date("2013/1/6 06:00"),
            endTime: new Date("2013/1/6 12:00"),
            views: [
                {
                    type: "month",
                    dateHeaderTemplate: kendo.template("<strong>#=kendo.toString(date, 'd')#</strong>"),
                    minorTickCount: 3
            }],
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

        var sch = $(container).data("kendoScheduler");

        equal(sch.view().times.find("th").length, 7);
        equal(sch.view().times.find("th:first").text(), "Sunday");
        equal(sch.view().times.find("th").eq(1).text(), "Monday");
    });

    test("render day slots", function() {
       setupScheduler({
            date: new Date("2013/1/6"),
            minorTickCount: 3,
            majorTick: 120,
            startTime: new Date("2013/1/6 06:00"),
            endTime: new Date("2013/1/6 12:00"),
            views: [
                {
                    type: "month",
                    dateHeaderTemplate: kendo.template("<strong>#=kendo.toString(date, 'd')#</strong>"),
                    minorTickCount: 3
            }],
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

        var sch = $(container).data("kendoScheduler");

        equal(sch.view().content.find("tr").length, 7);
        equal(sch.view().content.find("td").length, 84);
    });


    test("week view shows the same amount of cells in header and content with odd minorTicks and grouping", function () {
        setupScheduler({
            date: new Date("2013/1/6"),
            minorTickCount: 3,
            majorTick: 120,
            startTime: new Date("2013/1/6 06:00"),
            endTime: new Date("2013/1/6 11:00"),
            views: [
                "month"
            ],
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

        var view = scheduler.view();

        equal(view.datesHeader.find("table tr:last").children().length,  view.content.find("table tr:first").children().length);
    });

    test("groupHeaderTemplate is used in horizontal grouping", function () {
        setupScheduler({
            date: new Date("2013/1/6"),
            minorTickCount: 3,
            majorTick: 120,
            startTime: new Date("2013/1/6 06:00"),
            endTime: new Date("2013/1/6 11:00"),
            groupHeaderTemplate: "#=text#TEST",
            views: [
                "month"
            ],
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
                        { text: "Resource1", value: 1, color: "#6eb3fa" },
                        { text: "Resource2", value: 2, color: "#f58a8a" }
                    ],
                    title: "Room"
                }]

        });

        var view = scheduler.view();

        equal(view.datesHeader.find("tr").eq(1).find("th:first").html(), 'Resource1TEST');
    });

    test("groupHeaderTemplate is used in vertical grouping", function () {
        setupScheduler({
            date: new Date("2013/1/6"),
            minorTickCount: 3,
            majorTick: 120,
            startTime: new Date("2013/1/6 06:00"),
            endTime: new Date("2013/1/6 11:00"),
            groupHeaderTemplate: "#=text#TEST",
            views: [
                "month"
            ],
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
                        { text: "Resource1", value: 1, color: "#6eb3fa" },
                        { text: "Resource2", value: 2, color: "#f58a8a" }
                    ],
                    title: "Room"
                }]

        });

        var view = scheduler.view();

       equal(view.datesHeader.find("tr").eq(0).find("th:first").html(), 'Resource1TEST');

    });

    test("groupHeaderTemplate that contains color and value arguments", function () {
        setupScheduler({
            date: new Date("2013/1/6"),
            minorTickCount: 3,
            majorTick: 120,
            startTime: new Date("2013/1/6 06:00"),
            endTime: new Date("2013/1/6 11:00"),
            groupHeaderTemplate: "#=value##=color#",
            views: [
                "month"
            ],
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
                        { text: "Resource1", value: 1, color: "#ebeeee" },
                        { text: "Resource2", value: 2, color: "#f58a8a" }
                    ],
                    title: "Room"
                }]

        });

        var view = scheduler.view();
        var headerText = view.datesHeader.find("tr:first th:first").html();

        ok(headerText.indexOf("1") > -1);
        ok(headerText.indexOf("ebeeee") > -1);
    });

    test("week view shows the same amount of cells in header and content with even minorTicks and grouping", function () {
        setupScheduler({
            date: new Date("2013/1/6"),
            minorTickCount: 2,
            majorTick: 120,
            startTime: new Date("2013/1/6 06:00"),
            endTime: new Date("2013/1/6 11:00"),
            views: [
                "month"
            ],
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

        var view = scheduler.view();

        equal(view.datesHeader.find("table tr:last").children().length,  view.content.find("table tr:first").children().length);
    });

      module("Month View grouped horizontally by date", {
        setup: function() {
            container = $('<div class="k-scheduler" style="width:1000px;height:800px">');
            QUnit.fixture.append(container);
        },
        teardown: function() {
            kendo.destroy(QUnit.fixture);
        }
    });

    test("non-overlapping events are not rendered on different rows", function() {       
         setupScheduler({
            date: new Date(2013, 1, 2),
            views: [
                {
                    type: "month",
            }],
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

        var view = scheduler.view();

        view.render([new SchedulerEvent({
            uid: "foo",
            title: "",
            start: new Date(2013, 1, 1, 2, 0, 0),
            end: new Date(2013, 1, 1, 2, 10, 0),
            isAllDay: false,
            id: "2",
            roomId: 1
        }), new SchedulerEvent({
            uid: "bar",
            title: "",
            start: new Date(2013, 1, 2, 2, 20, 0),
            end: new Date(2013, 1, 2, 2, 40, 0),
            isAllDay: false,
            id: "3",
            roomId: 1
        })]);

        var events = view.groups[0].getDaySlotCollection(0).events();
        var firstEventTop = events[0].element.offset().top;
        var secondEventTop = events[1].element.offset().top;

        equal(firstEventTop, secondEventTop);
        equal(view.element.find(".k-event").length, 2);
    });

    test("non-overlapping events with zero duration are rendered on different rows when eventMinWidth is set", function() {
        var minWidth = 20;
        setupScheduler({
             date: new Date(2013, 1, 2),
             eventMinWidth: minWidth,
            views: [
                {
                    type: "month",
            }],
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

        var view = scheduler.view();
        view.render([new SchedulerEvent({
            uid: "foo",
            title: "",
            start: new Date(2013, 1, 2, 2, 10, 0),
            end: new Date(2013, 1, 2, 2, 10, 0),
            isAllDay: false,
            id: "2",
            roomId: 1
        }), new SchedulerEvent({
            uid: "bar",
            title: "",
            start: new Date(2013, 1, 2, 2, 12, 0),
            end: new Date(2013, 1, 2, 2, 12, 0),
            isAllDay: false,
            id: "3",
            roomId: 1
        })]);

        var events = view.groups[0].getDaySlotCollection(0).events();
        var firstEventTop = events[0].element.offset().top;
        var secondEventTop = events[1].element.offset().top;

        notEqual(firstEventTop, secondEventTop);
        equal(view.element.find(".k-event").length, 2);
    });

    test("event with zero duration and min width is not rendered outside the Scheduler", function() {
        var minWidth = 21;
        setupScheduler({
             date: new Date(2013, 1, 2),
             eventMinWidth: minWidth,
             startTime: new Date(2013, 1, 2, 10, 0, 0),
            endTime: new Date(2013, 1, 2, 12, 0, 0),
            views: [
                {
                    type: "month",
            }],
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

        var view = scheduler.view();

        view.render([new SchedulerEvent({
            uid: "foo",
            title: "",
            start: new Date(2013, 1, 2, 11, 59, 0),
            end: new Date(2013, 1, 2, 11, 59, 0),
            isAllDay: false,
            id: "2",
             roomId: 2
        })]);

        var eventElement = $(".k-event")[0];
        var eventRightOffset =  eventElement.offsetLeft + eventElement.offsetWidth;
        var lastSlot = view.content.find("td[role=gridcell]:last")[0];
        var lastSlotRightOffset = lastSlot.offsetLeft + lastSlot.offsetWidth - 1;

        equal(lastSlotRightOffset, eventRightOffset);
        equal(view.element.find(".k-event").length, 1);
    });

     module("Month View grouped vertically by date", {
        setup: function() {
            container = $('<div class="k-scheduler" style="width:1000px;height:800px">');
            QUnit.fixture.append(container);
        },
        teardown: function() {
            kendo.destroy(QUnit.fixture);
        }
    });

    test("overlapping events are rendered on different rows", function() {       
         setupScheduler({
            date: new Date(2013, 1, 2),
            views: [
                {
                    type: "month",
            }],
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

        var view = scheduler.view();

        view.render([new SchedulerEvent({
            uid: "foo",
            title: "",
            start: new Date(2013, 1, 2, 2, 0, 0),
            end: new Date(2013, 1, 2, 2, 10, 0),
            isAllDay: false,
            id: "2",
            roomId: 1
        }), new SchedulerEvent({
            uid: "bar",
            title: "",
            start: new Date(2013, 1, 2, 2, 20, 0),
            end: new Date(2013, 1, 2, 2, 40, 0),
            isAllDay: false,
            id: "3",
            roomId: 1
        })]);

        var events = view.groups[0].getDaySlotCollection(0).events();
        var firstEventTop = events[0].element.offset().top;
        var secondEventTop = events[1].element.offset().top;

        notEqual(firstEventTop, secondEventTop);
        equal(view.element.find(".k-event").length, 2);
    });

    test("event with zero duration and min width is not rendered outside the Scheduler", function() {
        var minWidth = 21;
        setupScheduler({
             date: new Date(2013, 1, 2),
             eventMinWidth: minWidth,
             startTime: new Date(2013, 1, 2, 10, 0, 0),
            endTime: new Date(2013, 1, 2, 12, 0, 0),
            views: [
                {
                    type: "month",
            }],
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

        var view = scheduler.view();

        view.render([new SchedulerEvent({
            uid: "foo",
            title: "",
            start: new Date(2013, 1, 2, 11, 59, 0),
            end: new Date(2013, 1, 2, 11, 59, 0),
            isAllDay: false,
            id: "2",
             roomId: 2
        })]);

        var eventElement = $(".k-event")[0];
        var eventRightOffset =  eventElement.offsetLeft + eventElement.offsetWidth;
        var lastSlot = view.content.find("td[role=gridcell]").eq(1)[0];
        var lastSlotRightOffset = lastSlot.offsetLeft + lastSlot.offsetWidth - 1;

        equal(lastSlotRightOffset, eventRightOffset);
        equal(view.element.find(".k-event").length, 1);
    });

    module("Month View group by date horizontally", {
        setup: function() {
            container = $('<div class="k-scheduler" style="width:1000px;height:800px">');
            QUnit.fixture.append(container);
        },
        teardown: function() {
            kendo.destroy(QUnit.fixture);
        }
    });
    //allDay events with no slot holes:
    test("two day all day event is rendered correctly", function() {
         setupScheduler({
             date: new Date(2013, 1, 3),
            views: [
                {
                    type: "month",
            }],
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

        var view = scheduler.view();

        view.render([new SchedulerEvent({
            uid: "foo",
            title: "",
            start: new Date(2013, 1, 3, 0, 0, 0),
            end: new Date(2013, 1, 4, 0, 0, 0),
            isAllDay: true,
            id: "2",
            roomId: 2
        })]);

        equal(view.groups[1].getDaySlotCollection(1).events()[0].start, 0);
        equal(view.groups[1].getDaySlotCollection(1).events()[0].end, 0);

        ok(view.element.find(".k-event").length);
    });

    test("day all day event is rendered correctly in month view", function() {
          setupScheduler({
             date: new Date(2013, 1, 3),
            views: [
                {
                    type: "month",
            }],
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

        var view = scheduler.view();

        view.render([new SchedulerEvent({
            uid: "foo",
            title: "",
            start: new Date(2013, 1, 3, 0, 0, 0),
            end: new Date(2013, 1, 4, 0, 0, 0),
            isAllDay: true,
            id: "2",
            roomId: 2
        })]);

        equal(view.groups[1].getDaySlotCollection(1).events()[0].start, 0);
        equal(view.groups[1].getDaySlotCollection(1).events()[0].end, 0);

        ok(view.element.find(".k-event").length);
    });

    test("day all day event is rendered correctly when starts in previous date", function() {
         setupScheduler({
             date: new Date(2013, 1, 3),
            views: [
                {
                    type: "month",
            }],
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

        var view = scheduler.view();

        view.render([new SchedulerEvent({
            uid: "foo",
            title: "",
            start: new Date(2013, 1, 2, 0, 0, 0),
            end: new Date(2013, 1, 3, 0, 0, 0),
            isAllDay: true,
            id: "2",
             roomId: 1
        })]);

        equal(view.groups[0].getDaySlotCollection(0).events()[0].start, 6);
        equal(view.groups[0].getDaySlotCollection(0).events()[0].end, 6);

        ok(view.element.find(".k-event").length);
    });

    test("two day all day event is rendered correctly when ends in next date", function() {
         setupScheduler({
             date: new Date(2013, 1, 2),
            views: [
                {
                    type: "month",
            }],
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

        var view = scheduler.view();

        view.render([new SchedulerEvent({
            uid: "foo",
            title: "",
            start: new Date(2013, 1, 2, 0, 0, 0),
            end: new Date(2013, 1, 3, 0, 0, 0),
            isAllDay: true,
            id: "2",
             roomId: 1
        })]);

        var events = view.groups[0].getDaySlotCollection(0).events();

        equal(events[0].start, 6);
        equal(events[0].end, 6);
       var events1 = view.groups[0].getDaySlotCollection(1).events();

        equal(events1[0].start, 0);
        equal(events1[0].end, 0);

        ok(view.element.find(".k-event").length);
    });

    test("two day all day event is rendered correctly when starts before start date and ends after end date", function() {
       setupScheduler({
             date: new Date(2013, 1, 2),
            views: [
                {
                    type: "month",
            }],
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

        var view = scheduler.view();

        view.render([new SchedulerEvent({
            uid: "foo",
            title: "",
            start: new Date(2013, 1, 1, 0, 0, 0),
            end: new Date(2013, 1, 5, 0, 0, 0),
            isAllDay: true,
            id: "2",
            roomId: 1
        })]);

         var events = view.groups[0].getDaySlotCollection(0).events();

        equal(events[0].start, 5);
        equal(events[0].end, 5);
        equal(events[events.length -1].start, 6);
        equal(events[events.length - 1].end, 6);

         var events = view.groups[0].getDaySlotCollection(1).events();

        equal(events[0].start, 0);
        equal(events[0].end, 0);
        equal(events[events.length -1].start, 2);
        equal(events[events.length -1].end, 2);

        ok(view.element.find(".k-event").length);
    });

    test("all day event is not rendered when ends in start date", function() {
      setupScheduler({
             date: new Date(2013, 1, 3),
            views: [
                {
                    type: "month",
            }],
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

        var view = scheduler.view();

        view.render([new SchedulerEvent({
            uid: "foo",
            title: "",
            start: new Date(2013, 1, 2, 0, 0, 0),
            end: new Date(2013, 1, 2, 0, 0, 0),
            isAllDay: true,
            id: "2"
        })]);

        ok(!view.element.find(".k-event").length);
    });

    test("all day event is not rendered when starts in end date", function() {
         setupScheduler({
             date: new Date(2013, 1, 2),
            views: [
                {
                    type: "month",
            }],
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

        var view = scheduler.view();

        view.render([new SchedulerEvent({
            uid: "foo",
            title: "",
            start: new Date(2013, 3, 3, 0, 0, 0),
            end: new Date(2013, 3, 3, 0, 0, 0),
            isAllDay: true,
            id: "2",
             roomId: 1
        })]);

        ok(!view.element.find(".k-event").length);
    });

    test("all day event is rendered correctly", function() {
         setupScheduler({
             date: new Date(2013, 1, 3),
            views: [
                {
                    type: "month",
            }],
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

        var view = scheduler.view();

        view.render([new SchedulerEvent({
            uid: "foo",
            title: "",
            start: new Date(2013, 1, 4, 0, 0, 0),
            end: new Date(2013, 1, 4, 0, 0, 0),
            isAllDay: true,
            id: "2",
            roomId: 1
        })]);

         var events = view.groups[0].getDaySlotCollection(1).events();

        equal(events[0].start, 1);
        equal(events[0].end, 1);
        equal(events[events.length -1].start, 1);
        equal(events[events.length -1].end, 1);

        ok(view.element.find(".k-event").length);
    });

    test("event between two dates is rendered correctly", function() {
        setupScheduler({
             date: new Date(2013, 1, 3),
            views: [
                {
                    type: "month",
            }],
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

        var view = scheduler.view();

        view.render([new SchedulerEvent({
            uid: "foo",
            title: "",
            start: new Date(2013, 1, 3, 18, 0, 0),
            end: new Date(2013, 1, 4, 10, 0, 0),
            isAllDay: false,
            id: "2",
            roomId: 1
        })]);

         var events = view.groups[0].getDaySlotCollection(1).events();

        equal(events[0].start, 0);
        equal(events[0].end, 0);
        equal(events[events.length -1].start, 1);
        equal(events[events.length - 1].end, 1);

        ok(view.element.find(".k-event").length);
    }); 

    test("all day event and regular event starting in same slot are rendered correctly", function() {
         setupScheduler({
             date: new Date(2013, 1, 2),
             startTime: new Date(2013, 1, 2, 10, 0, 0, 0),
            endTime: new Date(2013, 1, 2, 18, 0, 0, 0),
            views: [
                {
                    type: "month",
            }],
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

        var view = scheduler.view();

        view.render([new SchedulerEvent({
            uid: "foo",
            title: "",
            start: new Date(2013, 1, 2, 0, 0, 0),
            end: new Date(2013, 1, 2, 0, 0, 0),
            isAllDay: true,
            id: "1",
             roomId: 1
        }), new SchedulerEvent({
            uid: "bar",
            title: "",
            start: new Date(2013, 1, 2, 10, 0, 0),
            end: new Date(2013, 1, 2, 12, 0, 0),
            isAllDay: false,
            id: "2",
             roomId: 1
        })]);

        equal(view.groups[0].getDaySlotCollection(0).events()[0].start, 6);
        equal(view.groups[0].getDaySlotCollection(0).events()[0].end, 6);

        equal(view.groups[0].getDaySlotCollection(0).events()[1].start, 6);
        equal(view.groups[0].getDaySlotCollection(0).events()[1].end, 6);

        equal(view.element.find(".k-event").length, 2);
    });

    test("recurring event is rendered correctly", function() {
        setupScheduler({
             date: new Date(2013, 1, 3),
             startTime: new Date(2013, 1, 2, 10, 0, 0, 0),
            endTime: new Date(2013, 1, 2, 18, 0, 0, 0),
            views: [
                {
                    type: "month",
            }],
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

        var view = scheduler.view();

        var start =  new Date(2013, 1, 3, 10, 0, 0);
        var end = new Date(2013, 1, 3, 12, 0, 0);

        view.render([new SchedulerEvent({
            uid: "foo",
            title: "",
            start: start,
            startTime: kendo.date.toUtcTime(start),
            end: end,
            endTime: kendo.date.toUtcTime(end),
            recurrenceRule: "FREQ=DAILY",
            isAllDay: false,
            id: "2",
             roomId: 1
        })]);

        equal(view.groups[0].getDaySlotCollection(1).events()[0].start, 0);
        equal(view.groups[0].getDaySlotCollection(1).events()[0].end, 0);

        equal(view.element.find(".k-event").length, 1);
    });

      module("Month View grouped vertically by date", {
        setup: function() {
            container = $('<div class="k-scheduler" style="width:1000px;height:800px">');
            QUnit.fixture.append(container);
        },
        teardown: function() {
            kendo.destroy(QUnit.fixture);
        }
    });

    test("non-overlapping events are not rendered on different rows", function() {       
         setupScheduler({
            date: new Date(2013, 1, 2),
            views: [
                {
                    type: "month",
            }],
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

        var view = scheduler.view();

        view.render([new SchedulerEvent({
            uid: "foo",
            title: "",
            start: new Date(2013, 1, 1, 2, 0, 0),
            end: new Date(2013, 1, 1, 2, 10, 0),
            isAllDay: false,
            id: "2",
            roomId: 1
        }), new SchedulerEvent({
            uid: "bar",
            title: "",
            start: new Date(2013, 1, 2, 2, 20, 0),
            end: new Date(2013, 1, 2, 2, 40, 0),
            isAllDay: false,
            id: "3",
            roomId: 1
        })]);

        var events = view.groups[0].getDaySlotCollection(0).events();
        var firstEventTop = events[0].element.offset().top;
        var secondEventTop = events[1].element.offset().top;

        equal(firstEventTop, secondEventTop);
        equal(view.element.find(".k-event").length, 2);
    });

    test("non-overlapping events with zero duration are rendered on different rows when eventMinWidth is set", function() {
        var minWidth = 20;
        setupScheduler({
             date: new Date(2013, 1, 2),
             eventMinWidth: minWidth,
            views: [
                {
                    type: "month",
            }],
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

        var view = scheduler.view();
        view.render([new SchedulerEvent({
            uid: "foo",
            title: "",
            start: new Date(2013, 1, 2, 2, 10, 0),
            end: new Date(2013, 1, 2, 2, 10, 0),
            isAllDay: false,
            id: "2",
            roomId: 1
        }), new SchedulerEvent({
            uid: "bar",
            title: "",
            start: new Date(2013, 1, 2, 2, 12, 0),
            end: new Date(2013, 1, 2, 2, 12, 0),
            isAllDay: false,
            id: "3",
            roomId: 1
        })]);

        var events = view.groups[0].getDaySlotCollection(0).events();
        var firstEventTop = events[0].element.offset().top;
        var secondEventTop = events[1].element.offset().top;

        notEqual(firstEventTop, secondEventTop);
        equal(view.element.find(".k-event").length, 2);
    });

    test("event with zero duration is rendered according eventMinWidth", function() {
        var minWidth = 21;
         setupScheduler({
             date: new Date(2013, 1, 2),
             eventMinWidth: minWidth,
            views: [
                {
                    type: "month",
            }],
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

        var view = scheduler.view();
        view.render([new SchedulerEvent({
            uid: "foo",
            title: "",
            start: new Date(2013, 1, 2, 2, 0, 0),
            end: new Date(2013, 1, 2, 2, 0, 0),
            isAllDay: false,
            id: "2",
             roomId: 1
        })]);

        var events = view.groups[0].getDaySlotCollection(0).events();

        notEqual(events[0].element.width(), minWidth);
        equal(view.element.find(".k-event").length, 1);
    });

    test("event with zero duration and min width is not rendered outside the Scheduler", function() {
        var minWidth = 21;
        setupScheduler({
             date: new Date(2013, 1, 2),
             eventMinWidth: minWidth,
             startTime: new Date(2013, 1, 2, 10, 0, 0),
            endTime: new Date(2013, 1, 2, 12, 0, 0),
            views: [
                {
                    type: "month",
            }],
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

        var view = scheduler.view();

        view.render([new SchedulerEvent({
            uid: "foo",
            title: "",
            start: new Date(2013, 1, 2, 11, 59, 0),
            end: new Date(2013, 1, 2, 11, 59, 0),
            isAllDay: false,
            id: "2",
             roomId: 2
        })]);

        var eventElement = $(".k-event")[0];
        var eventRightOffset =  eventElement.offsetLeft + eventElement.offsetWidth;
        var lastSlot = view.content.find("td[role=gridcell]:last")[0];
        var lastSlotRightOffset = lastSlot.offsetLeft + lastSlot.offsetWidth - 1;

        equal(lastSlotRightOffset, eventRightOffset);
        equal(view.element.find(".k-event").length, 1);
    });

     module("Month View grouped vertically by date", {
        setup: function() {
            container = $('<div class="k-scheduler" style="width:1000px;height:800px">');
            QUnit.fixture.append(container);
        },
        teardown: function() {
            kendo.destroy(QUnit.fixture);
        }
    });

    test("overlapping events are not rendered on different rows", function() {       
         setupScheduler({
            date: new Date(2013, 1, 2),
            views: [
                {
                    type: "month",
            }],
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

        var view = scheduler.view();

        view.render([new SchedulerEvent({
            uid: "foo",
            title: "",
            start: new Date(2013, 1, 2, 2, 0, 0),
            end: new Date(2013, 1, 2, 2, 10, 0),
            isAllDay: false,
            id: "2",
            roomId: 1
        }), new SchedulerEvent({
            uid: "bar",
            title: "",
            start: new Date(2013, 1, 2, 2, 20, 0),
            end: new Date(2013, 1, 2, 2, 40, 0),
            isAllDay: false,
            id: "3",
            roomId: 1
        })]);

        var events = view.groups[0].getDaySlotCollection(0).events();
        var firstEventTop = events[0].element.offset().top;
        var secondEventTop = events[1].element.offset().top;

        notEqual(firstEventTop, secondEventTop);
        equal(view.element.find(".k-event").length, 2);
    });

    test("non-overlapping events with zero duration are rendered on different rows when eventMinWidth is set", function() {
        var minWidth = 20;
        setupScheduler({
             date: new Date(2013, 1, 2),
             eventMinWidth: minWidth,
            views: [
                {
                    type: "month",
            }],
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

        var view = scheduler.view();
        view.render([new SchedulerEvent({
            uid: "foo",
            title: "",
            start: new Date(2013, 1, 2, 2, 10, 0),
            end: new Date(2013, 1, 2, 2, 10, 0),
            isAllDay: false,
            id: "2",
            roomId: 1
        }), new SchedulerEvent({
            uid: "bar",
            title: "",
            start: new Date(2013, 1, 2, 2, 12, 0),
            end: new Date(2013, 1, 2, 2, 12, 0),
            isAllDay: false,
            id: "3",
            roomId: 1
        })]);

        var events = view.groups[0].getDaySlotCollection(0).events();
        var firstEventTop = events[0].element.offset().top;
        var secondEventTop = events[1].element.offset().top;

        notEqual(firstEventTop, secondEventTop);
        equal(view.element.find(".k-event").length, 2);
    });

    test("event with zero duration is rendered according eventMinWidth", function() {
        var minWidth = 21;
         setupScheduler({
             date: new Date(2013, 1, 2),
             eventMinWidth: minWidth,
            views: [
                {
                    type: "month",
            }],
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

        var view = scheduler.view();
        view.render([new SchedulerEvent({
            uid: "foo",
            title: "",
            start: new Date(2013, 1, 2, 2, 0, 0),
            end: new Date(2013, 1, 2, 2, 0, 0),
            isAllDay: false,
            id: "2",
             roomId: 1
        })]);

        var events = view.groups[0].getDaySlotCollection(0).events();

        notEqual(events[0].element.width(), minWidth);
        equal(view.element.find(".k-event").length, 1);
    });

    test("event with zero duration and min width is not rendered outside the Scheduler", function() {
        var minWidth = 21;
        setupScheduler({
             date: new Date(2013, 1, 2),
             eventMinWidth: minWidth,
             startTime: new Date(2013, 1, 2, 10, 0, 0),
            endTime: new Date(2013, 1, 2, 12, 0, 0),
            views: [
                {
                    type: "month",
            }],
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

        var view = scheduler.view();

        view.render([new SchedulerEvent({
            uid: "foo",
            title: "",
            start: new Date(2013, 1, 2, 11, 59, 0),
            end: new Date(2013, 1, 2, 11, 59, 0),
            isAllDay: false,
            id: "2",
             roomId: 2
        })]);

        var eventElement = $(".k-event")[0];
        var eventRightOffset =  eventElement.offsetLeft + eventElement.offsetWidth;
        var lastSlot = view.content.find("td[role=gridcell]").eq(1)[0];
        var lastSlotRightOffset = lastSlot.offsetLeft + lastSlot.offsetWidth -1;

        equal(lastSlotRightOffset, eventRightOffset);
        equal(view.element.find(".k-event").length, 1);
    });

    module("Month View group by date horizontally", {
        setup: function() {
            container = $('<div class="k-scheduler" style="width:1000px;height:800px">');
            QUnit.fixture.append(container);
        },
        teardown: function() {
            kendo.destroy(QUnit.fixture);
        }
    });
    //allDay events with no slot holes:
    test("two day all day event is rendered correctly", function() {
         setupScheduler({
             date: new Date(2013, 1, 3),
            views: [
                {
                    type: "month",
            }],
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

        var view = scheduler.view();

        view.render([new SchedulerEvent({
            uid: "foo",
            title: "",
            start: new Date(2013, 1, 3, 0, 0, 0),
            end: new Date(2013, 1, 4, 0, 0, 0),
            isAllDay: true,
            id: "2",
            roomId: 2
        })]);

        equal(view.groups[1].getDaySlotCollection(1).events()[0].start, 0);
        equal(view.groups[1].getDaySlotCollection(1).events()[0].end, 0);

        ok(view.element.find(".k-event").length);
    });

    

    test("day all day event is rendered correctly when starts in previous date", function() {
         setupScheduler({
             date: new Date(2013, 1, 3),
            views: [
                {
                    type: "month",
            }],
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

        var view = scheduler.view();

        view.render([new SchedulerEvent({
            uid: "foo",
            title: "",
            start: new Date(2013, 1, 2, 0, 0, 0),
            end: new Date(2013, 1, 3, 0, 0, 0),
            isAllDay: true,
            id: "2",
             roomId: 1
        })]);

        equal(view.groups[0].getDaySlotCollection(1).events()[0].start, 0);
        equal(view.groups[0].getDaySlotCollection(1).events()[0].end, 0);

        equal(view.groups[0].getDaySlotCollection(0).events()[0].start, 6);
        equal(view.groups[0].getDaySlotCollection(0).events()[0].end, 6);
        equal(view.element.find(".k-event").length, 2);
    });

    test("two day all day event is rendered correctly when ends in next date", function() {
         setupScheduler({
             date: new Date(2013, 1, 2),
            views: [
                {
                    type: "month",
            }],
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

        var view = scheduler.view();

        view.render([new SchedulerEvent({
            uid: "foo",
            title: "",
            start: new Date(2013, 1, 2, 0, 0, 0),
            end: new Date(2013, 1, 3, 0, 0, 0),
            isAllDay: true,
            id: "2",
             roomId: 1
        })]);

        var events = view.groups[0].getDaySlotCollection(1).events();

        equal(view.element.find(".k-event").length, 2);
        equal(view.element.find(".k-event").first().find(".k-resize-w").length, 1);
        equal(view.element.find(".k-event").last().find(".k-resize-e").length, 1);
    });

    test("two day all day event is rendered correctly when starts before start date and ends after end date", function() {
       setupScheduler({
             date: new Date(2013, 1, 2),
            views: [
                {
                    type: "month",
            }],
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

        var view = scheduler.view();

        view.render([new SchedulerEvent({
            uid: "foo",
            title: "",
            start: new Date(2013, 1, 1, 0, 0, 0),
            end: new Date(2013, 1, 5, 0, 0, 0),
            isAllDay: true,
            id: "2",
            roomId: 1
        })]);

         var events = view.groups[0].getDaySlotCollection(0).events();

        equal(events[0].start, 5);
        equal(events[0].end, 5);
        equal(events[events.length -1].start, 6);
        equal(events[events.length -1].end, 6);

        ok(view.element.find(".k-event").length);
    });

    test("all day event is not rendered when ends in start date", function() {
      setupScheduler({
             date: new Date(2013, 1, 3),
            views: [
                {
                    type: "month",
            }],
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

        var view = scheduler.view();

        view.render([new SchedulerEvent({
            uid: "foo",
            title: "",
            start: new Date(2013, 1, 2, 0, 0, 0),
            end: new Date(2013, 1, 2, 0, 0, 0),
            isAllDay: true,
            id: "2"
        })]);

        ok(!view.element.find(".k-event").length);
    });

    test("all day event is not rendered when starts in end date", function() {
         setupScheduler({
             date: new Date(2013, 1, 2),
            views: [
                {
                    type: "month",
            }],
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

        var view = scheduler.view();

        view.render([new SchedulerEvent({
            uid: "foo",
            title: "",
            start: new Date(2013, 3, 3, 0, 0, 0),
            end: new Date(2013, 3, 3, 0, 0, 0),
            isAllDay: true,
            id: "2",
             roomId: 1
        })]);

        ok(!view.element.find(".k-event").length);
    });

    test("all day event is rendered correctly", function() {
       setupScheduler({
             date: new Date(2013, 1, 3),
            views: [
                {
                    type: "month",
            }],
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

        var view = scheduler.view();

        view.render([new SchedulerEvent({
            uid: "foo",
            title: "",
            start: new Date(2013, 1, 4, 0, 0, 0),
            end: new Date(2013, 1, 5, 0, 0, 0),
            isAllDay: true,
            id: "2",
            roomId: 1
        })]);

         var events = view.groups[0].getDaySlotCollection(1).events();

        equal(events[0].start, 1);
        equal(events[0].end, 1);
        equal(events[events.length -1].start, 2);
        equal(events[events.length -1].end, 2);

        ok(view.element.find(".k-event").length);
    });

    test("event between two dates is rendered correctly", function() {
        setupScheduler({
             date: new Date(2013, 1, 3),
            views: [
                {
                    type: "month",
            }],
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

        var view = scheduler.view();

        view.render([new SchedulerEvent({
            uid: "foo",
            title: "",
            start: new Date(2013, 1, 3, 18, 0, 0),
            end: new Date(2013, 1, 4, 10, 0, 0),
            isAllDay: false,
            id: "2",
            roomId: 1
        })]);

         var events = view.groups[0].getDaySlotCollection(1).events();

        equal(events[0].start, 0);
        equal(events[0].end, 0);
        equal(events[events.length -1].start, 1);
        equal(events[events.length - 1].end, 1);

        ok(view.element.find(".k-event").length);
    }); 

    test("all day event and regular event starting in same slot are rendered correctly", function() {
         setupScheduler({
             date: new Date(2013, 1, 2),
             startTime: new Date(2013, 1, 2, 10, 0, 0, 0),
            endTime: new Date(2013, 1, 2, 18, 0, 0, 0),
            views: [
                {
                    type: "month",
            }],
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

        var view = scheduler.view();

        view.render([new SchedulerEvent({
            uid: "foo",
            title: "",
            start: new Date(2013, 1, 2, 0, 0, 0),
            end: new Date(2013, 1, 2, 0, 0, 0),
            isAllDay: true,
            id: "1",
             roomId: 1
        }), new SchedulerEvent({
            uid: "bar",
            title: "",
            start: new Date(2013, 1, 2, 10, 0, 0),
            end: new Date(2013, 1, 2, 12, 0, 0),
            isAllDay: false,
            id: "2",
             roomId: 1
        })]);

        equal(view.groups[0].getDaySlotCollection(0).events()[0].start, 6);
        equal(view.groups[0].getDaySlotCollection(0).events()[0].end, 6);

        equal(view.groups[0].getDaySlotCollection(0).events()[1].start, 6);
        equal(view.groups[0].getDaySlotCollection(0).events()[1].end, 6);

        equal(view.element.find(".k-event").length, 2);
    });

    test("recurring event is rendered correctly", function() {
        setupScheduler({
             date: new Date(2013, 1, 3),
             startTime: new Date(2013, 1, 2, 10, 0, 0, 0),
            endTime: new Date(2013, 1, 2, 18, 0, 0, 0),
            views: [
                {
                    type: "month",
            }],
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

        var view = scheduler.view();

        var start =  new Date(2013, 1, 3, 10, 0, 0);
        var end = new Date(2013, 1, 3, 12, 0, 0);

        view.render([new SchedulerEvent({
            uid: "foo",
            title: "",
            start: start,
            startTime: kendo.date.toUtcTime(start),
            end: end,
            endTime: kendo.date.toUtcTime(end),
            recurrenceRule: "FREQ=DAILY",
            isAllDay: false,
            id: "2",
             roomId: 1
        })]);

        equal(view.groups[0].getDaySlotCollection(1).events()[0].start, 0);
        equal(view.groups[0].getDaySlotCollection(1).events()[0].end, 0);

        equal(view.element.find(".k-event").length, 1);
         });
    
})();
