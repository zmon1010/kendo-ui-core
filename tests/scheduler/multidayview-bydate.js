(function() {
    var SchedulerEvent = kendo.data.SchedulerEvent,
        container,
        customOrientation;

    function slotHeight(table, slotsCount) {
        var height = Math.ceil(table.height() / table[0].rows.length);
        return Math.round((height * slotsCount) - 4);
    }

    function equalWithRound(value, expected) {
        QUnit.close(value, expected, 2);
    }

    function applyDefaultLeftOffset(value) {
        return value + 2;
    }

    function applySlotDefaultRightOffset(value, cell) {
        return Math.round(value - cell[0].clientWidth * 0.10);
    }

    function applyDefaultRightOffset(value) {
        return value - 4;
    }

    function setupGroupedScheduler(element, orientation, view, options) {
        orientation = orientation || "horizontal";
        options = $.extend({}, {
            date: new Date("2013/6/6"),
            startTime: new Date("2013/6/6 08:00"),
            endTime: new Date("2013/6/6 08:30"),
            editable: false,
            draggable: false,
            group: {
                resources: ["ResourceName", "ResourceName2"],
                date: true,
                orientation: orientation
            },
            resources: [
                {
                    field: "rooms",
                    name: "ResourceName",
                    dataSource: [
                        { text: "Room1", value: 1 },
                        { text: "Room2", value: 2 }
                    ]
                },
                {
                    field: "persons",
                    name: "ResourceName2",
                    dataSource: [
                        { text: "Fred", value: 1 },
                        { text: "Barny", value: 2 }
                    ]
                }
            ],
            views: [view || "week"]
        }, options);

        new kendo.ui.Scheduler(element, options);
    }

    module("Multi Day View grouped by date horizontally", {
        setup: function() {
            jasmine.clock().install();
            customOrientation = "horizontal";
            container = $('<div class="k-scheduler" style="width:1000px;height:800px">');
            container.appendTo(QUnit.fixture);
        },
        teardown: function() {
            jasmine.clock().uninstall();
            if (container.data("kendoMultiDayView")) {
                container.data("kendoMultiDayView").destroy();
            }

            kendo.destroy(QUnit.fixture);
        }
    });

    test("renders times header slots", function() {

        setupGroupedScheduler(container, customOrientation, {
            type: "day"
        });

        var sch = $(container).data("kendoScheduler");
        jasmine.clock().tick(1);
        ok(container.find(".k-scheduler-times").length);
        equal(sch.view().timesHeader[0], container.find(".k-scheduler-times")[0]);
    });

    test("renders headers for selected dates", function() {

        setupGroupedScheduler(container, customOrientation, {
            type: "day"
        }, { allDaySlot: false });

        var sch = $(container).data("kendoScheduler");
        jasmine.clock().tick(1);
        ok(sch.view().datesHeader.hasClass("k-scheduler-header"));
        equal(sch.view().datesHeader.find("th").length, 7);
    });

    test("k-today is render if date is today", function() {
        setupGroupedScheduler(container, customOrientation, {
            type: "day"
        }, { date: new Date() });

        var sch = $(container).data("kendoScheduler");
        jasmine.clock().tick(1);
        equal(sch.view().datesHeader.find("th.k-today").length, 1);
    });

    test("k-today is not render if date is not today", function() {
        setupGroupedScheduler(container, customOrientation, {
            type: "day"
        });

        var sch = $(container).data("kendoScheduler");
        jasmine.clock().tick(1);
        ok(!sch.view().datesHeader.find("th.k-today").length);
    });

    test("dates are formatted", function() {
        setupGroupedScheduler(container, customOrientation, {
            type: "day"
        });

        var sch = $(container).data("kendoScheduler");
        jasmine.clock().tick(1);
        equal(sch.view().datesHeader.find("th").first().text(), "Thu 6/06");
    });

    test("title is read from the options", function() {
        setupGroupedScheduler(container, customOrientation, {
            type: "day",
            title: "the title"
        });

        var sch = $(container).data("kendoScheduler");
        jasmine.clock().tick(1);
        equal(sch.view().title, "the title");
    });

    test("render time slots", function() {
        setupGroupedScheduler(container, customOrientation, {
            type: "day"
        });

        var sch = $(container).data("kendoScheduler");
        jasmine.clock().tick(1);
        equal(sch.view().times.find("th").length, 1);
        equal(sch.view().times.find("th:first").text(), "8:00 AM");
    });

    test("render day slots", function() {
        setupGroupedScheduler(container, customOrientation, {
            type: "week"
        });

        var sch = $(container).data("kendoScheduler");
        jasmine.clock().tick(1);
        equal(sch.view().content.find("tr").length, 1);
        equal(sch.view().content.find("td").length, 28);
    });

    test("render day slots template", function() {

        setupGroupedScheduler(container, customOrientation, {
            type: "week",
            slotTemplate: "foo"
        });

        var sch = $(container).data("kendoScheduler");
        jasmine.clock().tick(1);
        equal(sch.view().content.find("td").first().text(), "foo");
        equal(sch.view().content.find("td").last().text(), "foo");
    });

    test("correct date is passed to slotTemplate", function() {
        setupGroupedScheduler(container, customOrientation, {
            type: "day",
            slotTemplate: function(data) {
                deepEqual(kendo.date.getDate(data.date), new Date("6/06/2013"));
            }
        });
        jasmine.clock().tick(1);
        var sch = $(container).data("kendoScheduler");


    });

    test("correct resources is passed to slotTemplate (horizontal grouping)", function() {
        var group1, group2, group3, group4;
        var element = $("<div>").appendTo(QUnit.fixture);

        setupGroupedScheduler(element, customOrientation, {
            type: "day",
            slotTemplate: function(data) {
                var resources = data.resources();

                if (resources.rooms == 1 && resources.persons == 1) {
                    group1 = true;
                }

                if (resources.rooms == 1 && resources.persons == 2) {
                    group2 = true;
                }

                if (resources.rooms == 2 && resources.persons == 1) {
                    group3 = true;
                }

                if (resources.rooms == 2 && resources.persons == 2) {
                    group4 = true;
                }
            }
        });
        jasmine.clock().tick(1);
        ok(group1 && group2 && group3 && group4);
    });

    test("texts and values of resources are passed to groupHeaderTemplate", function() {
        var texts = [], values = [];
        var element = $("<div>").appendTo(QUnit.fixture);

        setupGroupedScheduler(element, customOrientation, {
            type: "day",
            groupHeaderTemplate: function(data) {
                texts.push(data.text);
                values.push(data.value);
                return data.text + data.value;
            }
        });
        jasmine.clock().tick(1);
        var view = element.getKendoScheduler().view();

        equal(texts.indexOf("Room1"), 0);
        equal(texts.indexOf("Barny"), 2);
        equal(values.indexOf(1), 0);
        equal(values.indexOf(2), 2);
        equal(view.datesHeader.find("tr:first th:first").html(), '<span class="k-link k-nav-day">Thu 6/06</span>');
    });



    test("correct groupIndex is passed to slotTemplate (horizontal grouping)", function() {
        var group1, group2, group3, group4;
        var element = $("<div>").appendTo(QUnit.fixture);

        setupGroupedScheduler(element, customOrientation, {
            type: "day",
            allDaySlotTemplate: function(data) {
                var resources = data.resources();

                if (resources.rooms == 1 && resources.persons == 1) {
                    group1 = true;
                }

                if (resources.rooms == 1 && resources.persons == 2) {
                    group2 = true;
                }

                if (resources.rooms == 2 && resources.persons == 1) {
                    group3 = true;
                }

                if (resources.rooms == 2 && resources.persons == 2) {
                    group4 = true;
                }
            }
        });
        jasmine.clock().tick(1);
        ok(group1 && group2 && group3 && group4);
    });

    test("render all day slots template", function() {
        setupGroupedScheduler(container, customOrientation, {
            type: "day",
            allDaySlotTemplate: "foo"
        });

        var sch = $(container).data("kendoScheduler");
        jasmine.clock().tick(1);
        equal(sch.view().element.find(".k-scheduler-header-all-day td").first().text(), "foo");
    });

    test("slot date is pass in the slots template", function() {
        setupGroupedScheduler(container, customOrientation, {
            type: "day",
            allDaySlotTemplate: function(e) {
                deepEqual(e.date, new Date("6/6/2013"));
            }
        });
        jasmine.clock().tick(1);
        var sch = $(container).data("kendoScheduler");
    });

    test("apply css to day slot", function() {
        setupGroupedScheduler(container, customOrientation, {
            type: "day"
        });

        var sch = $(container).data("kendoScheduler");
        jasmine.clock().tick(1);
        equal(sch.view().content.find("tr.k-middle-row").length, 1);
        equal(sch.view().content.find("tr:not(.k-middle-row)").length, 0);
    });

    test("all day slot is rendered", function() {
        setupGroupedScheduler(container, customOrientation, {
            type: "day",
            allDaySlotTemplate: "foo"
        });

        var sch = $(container).data("kendoScheduler");
        jasmine.clock().tick(1);
        equal(sch.view().datesHeader.find(".k-scheduler-table").length, 2);
        equal(sch.view().element.find(".k-scheduler-header-all-day td").length, 4);
    });

    test("all day slot is not rendered if disabled", function() {

        setupGroupedScheduler(container, customOrientation, {
            type: "day",
            allDaySlot: false
        });

        var sch = $(container).data("kendoScheduler");
        jasmine.clock().tick(1);
        equal(sch.view().datesHeader.find(".k-scheduler-table").length, 1);
        ok(!sch.view().allDayHeader);
    });

    test("display basic event", function() {
        setupGroupedScheduler(container, customOrientation, {
            type: "day"
        }, {
            date: new Date(2013, 1, 26)
        });

        var sch = $(container).data("kendoScheduler");

        var events = [new SchedulerEvent({ uid: "uid", start: new Date(2013, 1, 26, 8, 0, 0), end: new Date(2013, 1, 26, 9, 0, 0), title: "my event", rooms: 1, persons: 1 })];
        jasmine.clock().tick(1);
        sch.view().render(events);

        equal(sch.view().content.find("div.k-event").length, 1);
        equal(sch.view().content.find(".k-event .k-event-template").last().text(), "my event");
    });

    test("multiple events are displayed", function() {
        setupGroupedScheduler(container, customOrientation, {
            type: "day"
        }, {
            date: new Date(2013, 1, 26)
        });

        var sch = $(container).data("kendoScheduler");

        var events = [new SchedulerEvent({ uid: "uid", start: new Date(2013, 1, 26, 8, 0, 0), end: new Date(2013, 1, 26, 9, 0, 0), title: "event1", rooms: 1, persons: 1 }),
        new SchedulerEvent({ uid: "uid", start: new Date(2013, 1, 26, 8, 0, 0), end: new Date(2013, 1, 26, 9, 0, 0), title: "event2", rooms: 2, persons: 1 })
        ];
        jasmine.clock().tick(1);
        sch.view().render(events);

        equal(sch.view().content.find("div.k-event").length, 2);
        equal(sch.view().content.find(".k-event:first .k-event-template").last().text(), "event1");
        equal(sch.view().content.find(".k-event:last .k-event-template").last().text(), "event2");
    });

    test("display basic allday event", function() {
        setupGroupedScheduler(container, customOrientation, {
            type: "day"
        }, {
            date: new Date(2013, 1, 26)
        });

        var sch = $(container).data("kendoScheduler");

        var events = [new SchedulerEvent({ uid: "uid", start: new Date(2013, 1, 26), end: new Date(2013, 1, 27), title: "my event", rooms: 1, persons: 1 })];
        jasmine.clock().tick(1);
        sch.view().render(events);

        equal(sch.view().datesHeader.find("div.k-event").length, 1);
        equal(sch.view().datesHeader.find(".k-event .k-event-template").last().text(), "my event");
    });

    test("multiple allday events are displayed", function() {
        setupGroupedScheduler(container, customOrientation, {
            type: "day"
        }, {
            date: new Date(2013, 1, 26)
        });

        var sch = $(container).data("kendoScheduler");

        var events = [new SchedulerEvent({ uid: "uid", start: new Date(2013, 1, 26), end: new Date(2013, 1, 27), title: "event1", rooms: 1, persons: 1 }),
        new SchedulerEvent({ uid: "uid", start: new Date(2013, 1, 26), end: new Date(2013, 1, 27), title: "event2", rooms: 2, persons: 1 })
        ];
        jasmine.clock().tick(1);
        sch.view().render(events);

        equal(sch.view().datesHeader.find("div.k-event").length, 2);
        equal(sch.view().datesHeader.find(".k-event:first .k-event-template").last().text(), "event1");
        equal(sch.view().datesHeader.find(".k-event:last .k-event-template").last().text(), "event2");
    });

    test("custom event template", function() {
        setupGroupedScheduler(container, customOrientation, {
            type: "day"
        }, {
            eventTemplate: '${title}',
            date: new Date(2013, 1, 26)
        });

        var sch = $(container).data("kendoScheduler");

        var events = [new SchedulerEvent({ uid: "uid", start: new Date(2013, 1, 26, 8, 0, 0), end: new Date(2013, 1, 26, 9, 0, 0), title: "my event", rooms: 1, persons: 1 })];
        jasmine.clock().tick(1);
        sch.view().render(events);

        equal(sch.view().content.find("div.k-event").text(), "my event");
    });

    test("custom event allday template", function() {
        setupGroupedScheduler(container, customOrientation, {
            type: "day"
        }, {
            allDayEventTemplate: '${title}',
            date: new Date(2013, 1, 26)
        });

        var sch = $(container).data("kendoScheduler");

        var events = [new SchedulerEvent({ uid: "uid", start: new Date(2013, 1, 26), end: new Date(2013, 1, 27), title: "my event", rooms: 1, persons: 1 })];
        jasmine.clock().tick(1);
        sch.view().render(events);

        equal(sch.view().datesHeader.find("div.k-event").text(), "my event");
    });

    test("events set as all day are not render for next day slot", function() {
        setupGroupedScheduler(container, customOrientation, {
            type: "day"
        }, {
            allDayEventTemplate: '${title}',
            date: new Date(2013, 1, 27)
        });

        var sch = $(container).data("kendoScheduler");

        var events = [new SchedulerEvent({ uid: "uid", start: new Date(2013, 1, 26), end: new Date(2013, 1, 26), title: "all day event", isAllDay: true, rooms: 1, persons: 1 })];
        jasmine.clock().tick(1);
        sch.view().render(events);

        equal(sch.view().datesHeader.find("div.k-event").length, 0);
    });

    test("events set as all day are not render for prev day slot", function() {
        setupGroupedScheduler(container, customOrientation, {
            type: "day"
        }, {
            allDayEventTemplate: '${title}',
            date: new Date(2013, 1, 25)
        });

        var sch = $(container).data("kendoScheduler");

        var events = [new SchedulerEvent({ uid: "uid", start: new Date(2013, 1, 26), end: new Date(2013, 1, 26), title: "all day event", isAllDay: true, rooms: 1, persons: 1 })];
        jasmine.clock().tick(1);
        sch.view().render(events);

        equal(sch.view().datesHeader.find("div.k-event").length, 0);
    });

    test("west arrow is shown if multiday event starts before view's start date and ends before end of the view", function() {

        setupGroupedScheduler(container, customOrientation, {
            type: "day"
        }, {
            allDayEventTemplate: '${title}',
            date: new Date(2013, 1, 26)
        });

        var sch = $(container).data("kendoScheduler");

        var events = [new SchedulerEvent({ uid: "uid", start: new Date(2013, 1, 25), end: new Date(2013, 1, 26), title: "all day event", isAllDay: true, rooms: 1, persons: 1 })];
        jasmine.clock().tick(1);
        sch.view().render(events);

        equal(sch.view().datesHeader.find(".k-event .k-i-arrow-w").length, 1);
        equal(sch.view().datesHeader.find(".k-event .k-i-arrow-e").length, 0);
    });


    tzTest("Sofia", "Current time marker is rendered correctly", function() {

        setupGroupedScheduler(container, customOrientation, {
            type: "day"
        }, {
            date: new Date(),
            startTime: new Date("2013/6/6 01:00"),
            endTime: new Date("2013/6/6 00:59"),
        });

        var sch = $(container).data("kendoScheduler");
        jasmine.clock().tick(1);
        var timeElementsCount = sch.view().element.find(".k-current-time").length;
        equal(timeElementsCount, 2);
    });

    test("gap below all day events if they do not start or end in 12:00 am", function() {
        setupGroupedScheduler(container, customOrientation, {
            type: "day"
        }, {
            date: new Date("2013/6/6"),
        });

        var events = [
            new SchedulerEvent({
                uid: "uid",
                start: new Date("2013/6/6 2:00"),
                end: new Date("2013/6/7 2:00"),
                isAllDay: true,
                title: "",
                rooms: 1, persons: 1
            })
        ];

        var sch = $(container).data("kendoScheduler");
        jasmine.clock().tick(1);
        sch.view().render(events);

        ok(sch.view().element.find(".k-scheduler-header-all-day td").outerHeight() >= sch.view().element.find(".k-event").outerHeight() * 2);
    });

    test("leaves empty space after all day slot", function() {
        setupGroupedScheduler(container, customOrientation, {
            type: "week"
        }, {
            date: new Date("2013/6/6"),
        });

        var events = [
            new SchedulerEvent({
                uid: "uid",
                start: new Date("2013/6/6"),
                end: new Date("2013/6/6"),
                isAllDay: true,
                title: "event", rooms: 1, persons: 1
            }), new SchedulerEvent({
                uid: "uid",
                start: new Date("2013/6/7"),
                end: new Date("2013/6/7"),
                isAllDay: true,
                title: "event",
                rooms: 1, persons: 1
            })
        ];
        jasmine.clock().tick(1);
        var sch = $(container).data("kendoScheduler");
        sch.view().render(events);

        equalWithRound(sch.view().element.find(".k-scheduler-header-all-day td").height(), sch.view().element.find(".k-event").height() * 2);
    });

    test("get time slot index for date", function() {
        setupGroupedScheduler(container, customOrientation, {
            type: "week"
        }, {
            date: new Date("2013/1/26"),
            startTime: new Date("2013/6/6 01:00"),
            endTime: new Date("2013/6/6 00:59")
        });
        var sch = $(container).data("kendoScheduler");
        jasmine.clock().tick(1);
        var index = sch.view()._timeSlotIndex(new Date(2013, 1, 26, 10, 0, 0));

        equal(index, 18);
    });

    test("position basic event in the correct time slot", function() {
        setupGroupedScheduler(container, customOrientation, {
            type: "week"
        }, {
            eventTemplate: '${title}',
            date: new Date(2013, 1, 26),
            startTime: new Date("2013/1/26 08:00"),
            endTime: new Date("2013/1/26 12:00")
        });

        var sch = $(container).data("kendoScheduler");

        var events = [new SchedulerEvent({ uid: "uid", start: new Date(2013, 1, 26, 8, 0, 0), end: new Date(2013, 1, 26, 9, 0, 0), title: "my event", rooms: 1, persons: 1 })];
        jasmine.clock().tick(1);
        sch.view().render(events);

        var eventPosition = sch.view().content.find("div.k-event").offset();
        var timeSlotPosition = sch.view().content.find("tr").eq(0).find("td").eq(8).offset();

        equalWithRound(timeSlotPosition.top, eventPosition.top);
        equalWithRound(applyDefaultLeftOffset(timeSlotPosition.left), eventPosition.left);
    });

    test("multiple day event position is set to the date slot", function() {
        setupGroupedScheduler(container, customOrientation, {
            type: "week"
        }, {
            date: new Date(2013, 1, 26)
        });

        var sch = $(container).data("kendoScheduler");

        var events = [new SchedulerEvent({ uid: "uid", start: new Date(2013, 1, 26, 8, 0, 0), end: new Date(2013, 1, 27, 11, 0, 0), title: "my event", rooms: 1, persons: 1 })];
        jasmine.clock().tick(1);
        sch.view().render(events);

        var eventOffsetFirst = sch.view().datesHeader.find("div.k-event").first().offset();
        var eventOffsetLast = sch.view().datesHeader.find("div.k-event").last().offset();

        var firstSlotOffset = sch.view().element.find(".k-scheduler-header-all-day td").eq(8).offset();
        var lastSlotOffset = sch.view().element.find(".k-scheduler-header-all-day td").eq(12).offset();

        equalWithRound(eventOffsetFirst.top, firstSlotOffset.top);
        equalWithRound(eventOffsetFirst.left, applyDefaultLeftOffset(firstSlotOffset.left));
        equalWithRound(eventOffsetLast.top, lastSlotOffset.top);
        equalWithRound(eventOffsetLast.left, applyDefaultLeftOffset(lastSlotOffset.left));
    });

    test("multiple day event position is set to the date slot with multiple slots", function() {
        setupGroupedScheduler(container, customOrientation, {
            type: "week"
        }, {
            date: new Date(2013, 1, 26)
        });

        var sch = $(container).data("kendoScheduler");

        var events = [new SchedulerEvent({ uid: "uid", start: new Date(2013, 1, 26, 10, 0, 0), end: new Date(2013, 1, 27, 11, 0, 0), title: "my event", rooms: 1, persons: 1 })];
        jasmine.clock().tick(1);
        sch.view().render(events);
        var eventOffset = sch.view().datesHeader.find("div.k-event").offset();
        var slotOffset = sch.view().element.find(".k-scheduler-header-all-day td").eq(8).offset();
        var slotWidth = 0;

        sch.view().element.find(".k-scheduler-header-all-day td").first().each(function() {
            slotWidth += $(this).innerWidth();
        });

        equalWithRound(eventOffset.top, slotOffset.top);

        equalWithRound(eventOffset.left, applyDefaultLeftOffset(slotOffset.left));
        equalWithRound(sch.view().datesHeader.find("div.k-event").width(), applyDefaultRightOffset(slotWidth));
    });


    test("position multiday event which starts before the selected range", function() {
        setupGroupedScheduler(container, customOrientation, {
            type: "week"
        }, {
            eventTemplate: '${title}',
            date: new Date(2013, 1, 26)
        });

        var sch = $(container).data("kendoScheduler");

        var events = [new SchedulerEvent({ uid: "uid", start: new Date(2013, 1, 24, 10, 0, 0), end: new Date(2013, 1, 26, 11, 0, 0), title: "my event", rooms: 1, persons: 1 })];
        jasmine.clock().tick(1);
        sch.view().render(events);

        var slotWidth = sch.view().element.find(".k-scheduler-header-all-day td")[0].clientWidth;

        equal(sch.view().datesHeader.find("div.k-event").length, 3);
        equal(sch.view().datesHeader.find("div.k-event").width(), applyDefaultRightOffset(slotWidth));
    });

    test("position multiday event which ends after the selected range", function() {
        setupGroupedScheduler(container, customOrientation, {
            type: "day"
        }, {
            eventTemplate: '${title}',
            date: new Date(2013, 1, 26)
        });

        var sch = $(container).data("kendoScheduler");

        var events = [new SchedulerEvent({ uid: "uid", start: new Date(2013, 1, 26, 10, 0, 0), end: new Date(2013, 1, 27, 11, 0, 0), title: "my event", rooms: 1, persons: 1 })];
        jasmine.clock().tick(1);
        sch.view().render(events);

        equal(sch.view().datesHeader.find("div.k-event").length, 1);
    });

    test("position day event which start in the last slot", function() {
        var selectedDate = new Date(2013, 1, 26, 0, 0, 0);

        setupGroupedScheduler(container, customOrientation, {
            type: "day"
        }, {
            date: selectedDate
        });

        var sch = $(container).data("kendoScheduler");

        var events = [new SchedulerEvent({ uid: "uid", start: new Date(2013, 1, 26, 8, 0, 0), end: new Date(2013, 1, 26, 10, 0, 0), title: "my event", rooms: 2, persons: 2 })];
        jasmine.clock().tick(1);
        sch.view().render(events);

        var eventElement = sch.view().content.find("div.k-event");
        equal(eventElement.length, 1);
        equalWithRound(eventElement.offset().top, sch.view().content.find("tr").eq(0).offset().top);
        equalWithRound(eventElement.height(), slotHeight(sch.view().content.find("table"), 1));
    });

    test("set offsetHeight of allDay slots when there are collinding events", function() {
        var selectedDate = new Date(2013, 1, 26, 0, 0, 0);
        setupGroupedScheduler(container, customOrientation, {
            type: "day"
        }, {
            date: selectedDate
        });

        var sch = $(container).data("kendoScheduler");

        var events = [
            new SchedulerEvent({ uid: "uid", start: new Date(2013, 1, 26, 0, 0, 0), end: new Date(2013, 1, 26, 0, 0, 0), title: "first event", isAllDay: true, rooms: 1, persons: 1 }),
            new SchedulerEvent({ uid: "uid", start: new Date(2013, 1, 26, 0, 0, 0), end: new Date(2013, 1, 26, 0, 0, 0), title: "second event", isAllDay: true, rooms: 1, persons: 1 }),
            new SchedulerEvent({ uid: "uid", start: new Date(2013, 1, 26, 0, 0, 0), end: new Date(2013, 1, 26, 0, 0, 0), title: "third event", isAllDay: true, rooms: 1, persons: 1 })
        ];
        jasmine.clock().tick(1);
        sch.view().render(events);

        var eventSlotOffsetHeight = sch.view().element.find(".k-scheduler-header-all-day td").eq(0)[0].offsetHeight;
        var slotObjectOffsetHeight = sch.view().groups[0]._daySlotCollections[0]._slots[0].offsetHeight;

        equalWithRound(eventSlotOffsetHeight, slotObjectOffsetHeight);
    });

    test("slotByCell returns date for slot", function() {
        var selectedDate = new Date(2013, 1, 26, 0, 0, 0);
        setupGroupedScheduler(container, customOrientation, {
            type: "week"
        }, {
            date: selectedDate
        });
        var sch = $(container).data("kendoScheduler");
        jasmine.clock().tick(1);
        var result = sch.view().selectionByElement(sch.view().content.find("td").eq(2));

        equal(result.groupIndex, 2);
        deepEqual(result.startDate(), new Date(2013, 1, 24, 8, 0, 0));
        deepEqual(result.endDate(), new Date(2013, 1, 24, 8, 30, 0));
    });

    test("_dateSlotIndex returns correct index if date is same as endTime", function() {
        var selectedDate = new Date(2013, 1, 26, 0, 0, 0);
        setupGroupedScheduler(container, customOrientation, {
            type: "week"
        }, {
            date: selectedDate
        });
        var sch = $(container).data("kendoScheduler");
        jasmine.clock().tick(1);
        equal(sch.view()._dateSlotIndex(new Date(2013, 1, 25, 10, 0, 0)), 1);
    });

    test("two day all day event is rendered correctly", function() {
        setupGroupedScheduler(container, customOrientation, {
            type: "week"
        }, {
            date: new Date(2013, 1, 2)
        });
        var sch = $(container).data("kendoScheduler");
        jasmine.clock().tick(1);
        sch.view().render([new SchedulerEvent({
            uid: "foo", title: "",
            start: new Date(2013, 1, 1, 0, 0, 0),
            end: new Date(2013, 1, 3, 0, 0, 0),
            isAllDay: true,
            id: "2", rooms: 1, persons: 1
        })]);

        equal(sch.view().groups[0].getDaySlotCollection(0).events()[0].start, 5);
        equal(sch.view().groups[0].getDaySlotCollection(0).events()[0].end, 5);

        ok(sch.view().datesHeader.find(".k-event").length);
    });

    test("last slot end date is set correctly when view end is restricted", function() {
        setupGroupedScheduler(container, customOrientation, {
            type: "day"
        }, {
            startTime: new Date("2013/6/6 01:00"),
            endTime: new Date("2013/6/6 20:00")
        });
        var sch = $(container).data("kendoScheduler");
        jasmine.clock().tick(1);
        var slots = sch.view().groups[0].getTimeSlotCollection(0);
        deepEqual(slots.last().startDate(), new Date("2013/6/6 19:30"));
        deepEqual(slots.last().endDate(), new Date("2013/6/6 20:00"));
    });

    test("next to last slot end date is set correctly", function() {
        setupGroupedScheduler(container, customOrientation, {
            type: "day"
        }, {
            startTime: new Date("2013/6/6 01:00"),
            endTime: new Date("2013/6/6 23:59"),
        });

        var sch = $(container).data("kendoScheduler");
        jasmine.clock().tick(1);
        var slots = sch.view().groups[0].getTimeSlotCollection(0);
        var count = slots.count();
        deepEqual(slots.at(count - 2).startDate(), new Date("2013/6/6 23:00"));
        deepEqual(slots.at(count - 2).endDate(), new Date("2013/6/6 23:30"));
    });

    test("clicking the cell link trigger navigate event", 2, function() {
        setupGroupedScheduler(container, customOrientation, {
            type: "week"
        }, {
            date: new Date(2013, 1, 26)
        });

        var sch = $(container).data("kendoScheduler");
        jasmine.clock().tick(1);
        sch.view().bind("navigate", function(e) {
            equal(e.view, "day");
            equal(e.date.getTime(), new Date("2013/2/24 08:00").getTime());
        });
        sch.view().datesHeader.find("th").find(".k-nav-day").first().click();
    });

    test("Do not render events if daySlot is disabled", function() {
        setupGroupedScheduler(container, customOrientation, {
            type: "week"
        }, {
            allDaySlot: false,
            date: new Date(2013, 1, 26),
            startTime: new Date("2013/6/6 08:00"),
            endTime: new Date("2013/6/6 20:00")
        });

        var sch = $(container).data("kendoScheduler");


        var events = [new SchedulerEvent({ uid: "uid", start: new Date(2013, 1, 26, 0, 0, 0), end: new Date(2013, 1, 26, 0, 0, 0), isAllDay: true, title: '["my event"]', rooms: 1, persons: 1 })];
        jasmine.clock().tick(1);
        sch.view().render(events);

        equal(sch.view().element.find("div.k-event>div").length, 0);
    });

    module("Multi Day View grouped by date vertically", {
        setup: function() {
            jasmine.clock().install();
            customOrientation = "vertical";
            container = $('<div class="k-scheduler" style="width:1000px;height:800px">');
            container.appendTo(QUnit.fixture);
        },
        teardown: function() {
            jasmine.clock().uninstall();
            if (container.data("kendoMultiDayView")) {
                container.data("kendoMultiDayView").destroy();
            }

            kendo.destroy(QUnit.fixture);
        }
    });

    test("renders times header slots", function() {

        setupGroupedScheduler(container, customOrientation, {
            type: "day"
        });

        var sch = $(container).data("kendoScheduler");
        jasmine.clock().tick(1);
        ok(container.find(".k-scheduler-times").length);
        equal(sch.view().timesHeader[0], container.find(".k-scheduler-times")[0]);
    });

    test("renders headers for selected dates", function() {

        setupGroupedScheduler(container, customOrientation, {
            type: "week"
        }, { allDaySlot: false });

        var sch = $(container).data("kendoScheduler");
        jasmine.clock().tick(1);
        ok(sch.view().datesHeader.hasClass("k-scheduler-header"));
        equal(sch.view().times.find("th").length, 14);
    });

    test("k-today is render if date is today", function() {
        setupGroupedScheduler(container, customOrientation, {
            type: "day"
        }, { date: new Date() });

        var sch = $(container).data("kendoScheduler");
        jasmine.clock().tick(1);
        equal(sch.view().times.find("th.k-today").length, 1);
    });

    test("k-today is not render if date is not today", function() {
        setupGroupedScheduler(container, customOrientation, {
            type: "day"
        });

        var sch = $(container).data("kendoScheduler");
        jasmine.clock().tick(1);
        ok(!sch.view().datesHeader.find("th.k-today").length);
    });

    test("dates are formatted", function() {
        setupGroupedScheduler(container, customOrientation, {
            type: "day"
        });

        var sch = $(container).data("kendoScheduler");
        jasmine.clock().tick(1);
        equal(sch.view().times.find("th").first().text(), "Thu 6/06");
    });

    test("title is read from the options", function() {
        setupGroupedScheduler(container, customOrientation, {
            type: "day",
            title: "the title"
        });

        var sch = $(container).data("kendoScheduler");
        jasmine.clock().tick(1);
        equal(sch.view().title, "the title");
    });

    test("render time slots", function() {
        setupGroupedScheduler(container, customOrientation, {
            type: "day"
        });

        var sch = $(container).data("kendoScheduler");
        jasmine.clock().tick(1);
        equal(sch.view().times.find("th").length, 3);
        equal(sch.view().times.find("th").eq(2).text(), "8:00 AM");
    });

    test("render day slots", function() {
        setupGroupedScheduler(container, customOrientation, {
            type: "week"
        });

        var sch = $(container).data("kendoScheduler");
        jasmine.clock().tick(1);
        equal(sch.view().content.find("tr").length, 14);
        equal(sch.view().content.find("td").length, 56);
    });

    test("render day slots template", function() {

        setupGroupedScheduler(container, customOrientation, {
            allDaySlot: false,
            type: "week",
            slotTemplate: "foo"
        });

        var sch = $(container).data("kendoScheduler");
        jasmine.clock().tick(1);
        equal(sch.view().content.find("td").first().text(), "foo");
        equal(sch.view().content.find("td").last().text(), "foo");
    });

    test("correct date is passed to slotTemplate", function() {
        setupGroupedScheduler(container, customOrientation, {
            type: "day",
            slotTemplate: function(data) {
                deepEqual(kendo.date.getDate(data.date), new Date("6/06/2013"));
            }
        });
        jasmine.clock().tick(1);
        var sch = $(container).data("kendoScheduler");

    });

    test("correct resources is passed to slotTemplate (horizontal grouping)", function() {
        var group1, group2, group3, group4;
        var element = $("<div>").appendTo(QUnit.fixture);

        setupGroupedScheduler(element, customOrientation, {
            type: "day",
            slotTemplate: function(data) {
                var resources = data.resources();

                if (resources.rooms == 1 && resources.persons == 1) {
                    group1 = true;
                }

                if (resources.rooms == 1 && resources.persons == 2) {
                    group2 = true;
                }

                if (resources.rooms == 2 && resources.persons == 1) {
                    group3 = true;
                }

                if (resources.rooms == 2 && resources.persons == 2) {
                    group4 = true;
                }
            }
        });
        jasmine.clock().tick(1);
        ok(group1 && group2 && group3 && group4);
    });

    test("texts and values of resources are passed to groupHeaderTemplate", function() {
        var texts = [], values = [];
        var element = $("<div>").appendTo(QUnit.fixture);

        setupGroupedScheduler(element, customOrientation, {
            type: "day",
            groupHeaderTemplate: function(data) {
                texts.push(data.text);
                values.push(data.value);
                return data.text + data.value;
            }
        });
        jasmine.clock().tick(1);
        var view = element.getKendoScheduler().view();

        equal(texts.indexOf("Room1"), 0);
        equal(texts.indexOf("Barny"), 2);
        equal(values.indexOf(1), 0);
        equal(values.indexOf(2), 2);
        equal(view.datesHeader.find("tr:first th:first").html(), 'Room11');
    });



    test("correct groupIndex is passed to slotTemplate (horizontal grouping)", function() {
        var group1, group2, group3, group4;
        var element = $("<div>").appendTo(QUnit.fixture);

        setupGroupedScheduler(element, customOrientation, {
            type: "day",
            allDaySlotTemplate: function(data) {
                var resources = data.resources();

                if (resources.rooms == 1 && resources.persons == 1) {
                    group1 = true;
                }

                if (resources.rooms == 1 && resources.persons == 2) {
                    group2 = true;
                }

                if (resources.rooms == 2 && resources.persons == 1) {
                    group3 = true;
                }

                if (resources.rooms == 2 && resources.persons == 2) {
                    group4 = true;
                }
            }
        });
        jasmine.clock().tick(1);
        ok(group1 && group2 && group3 && group4);
    });

    test("render all day slots template", function() {
        setupGroupedScheduler(container, customOrientation, {
            type: "day",
            allDaySlotTemplate: "foo"
        });

        var sch = $(container).data("kendoScheduler");
        jasmine.clock().tick(1);
        equal(sch.view().element.find(".k-scheduler-header-all-day td").first().text(), "foo");
    });

    test("slot date is pass in the slots template", function() {
        setupGroupedScheduler(container, customOrientation, {
            type: "day",
            allDaySlotTemplate: function(e) {
                deepEqual(e.date, new Date("6/6/2013"));
            }
        });
        jasmine.clock().tick(1);
        var sch = $(container).data("kendoScheduler");
    });

    test("apply css to day slot", function() {
        setupGroupedScheduler(container, customOrientation, {
            allDaySlot: false,
            type: "day"
        });

        var sch = $(container).data("kendoScheduler");
        jasmine.clock().tick(1);
        equal(sch.view().content.find("tr.k-middle-row").length, 1);
        equal(sch.view().content.find("tr:not(.k-middle-row)").length, 0);
    });

    test("all day slot is rendered", function() {
        setupGroupedScheduler(container, customOrientation, {
            type: "day",
            allDaySlotTemplate: "foo"
        });

        var sch = $(container).data("kendoScheduler");
        jasmine.clock().tick(1);
        equal(sch.view().datesHeader.find(".k-scheduler-table").length, 1);
        equal(sch.view().element.find(".k-scheduler-header-all-day td").length, 4);
    });

    test("all day slot is not rendered if disabled", function() {

        setupGroupedScheduler(container, customOrientation, {
            type: "day",
            allDaySlot: false
        });

        var sch = $(container).data("kendoScheduler");
        jasmine.clock().tick(1);
        equal(sch.view().datesHeader.find(".k-scheduler-table").length, 1);
        ok(!sch.view().allDayHeader);
    });

    test("display basic event", function() {
        setupGroupedScheduler(container, customOrientation, {
            type: "day"
        }, {
            date: new Date(2013, 1, 26)
        });

        var sch = $(container).data("kendoScheduler");

        var events = [new SchedulerEvent({ uid: "uid", start: new Date(2013, 1, 26, 8, 0, 0), end: new Date(2013, 1, 26, 9, 0, 0), title: "my event", rooms: 1, persons: 1 })];
        jasmine.clock().tick(1);
        sch.view().render(events);

        equal(sch.view().content.find("div.k-event").length, 1);
        equal(sch.view().content.find(".k-event .k-event-template").last().text(), "my event");
    });

    test("multiple events are displayed", function() {
        setupGroupedScheduler(container, customOrientation, {
            type: "day"
        }, {
            date: new Date(2013, 1, 26)
        });

        var sch = $(container).data("kendoScheduler");

        var events = [new SchedulerEvent({ uid: "uid", start: new Date(2013, 1, 26, 8, 0, 0), end: new Date(2013, 1, 26, 9, 0, 0), title: "event1", rooms: 1, persons: 1 }),
        new SchedulerEvent({ uid: "uid", start: new Date(2013, 1, 26, 8, 0, 0), end: new Date(2013, 1, 26, 9, 0, 0), title: "event2", rooms: 2, persons: 1 })
        ];
        jasmine.clock().tick(1);
        sch.view().render(events);

        equal(sch.view().content.find("div.k-event").length, 2);
        equal(sch.view().content.find(".k-event:first .k-event-template").last().text(), "event1");
        equal(sch.view().content.find(".k-event:last .k-event-template").last().text(), "event2");
    });

    test("display basic allday event", function() {
        setupGroupedScheduler(container, customOrientation, {
            type: "day"
        }, {
            date: new Date(2013, 1, 26)
        });

        var sch = $(container).data("kendoScheduler");

        var events = [new SchedulerEvent({ uid: "uid", start: new Date(2013, 1, 26), end: new Date(2013, 1, 27), title: "my event", rooms: 1, persons: 1 })];
        jasmine.clock().tick(1);
        sch.view().render(events);

        equal(sch.view().content.find("div.k-event").length, 1);
        equal(sch.view().content.find(".k-event .k-event-template").last().text(), "my event");
    });

    test("multiple allday events are displayed", function() {
        setupGroupedScheduler(container, customOrientation, {
            type: "day"
        }, {
            date: new Date(2013, 1, 26)
        });

        var sch = $(container).data("kendoScheduler");

        var events = [new SchedulerEvent({ uid: "uid", start: new Date(2013, 1, 26), end: new Date(2013, 1, 27), title: "event1", rooms: 1, persons: 1 }),
        new SchedulerEvent({ uid: "uid", start: new Date(2013, 1, 26), end: new Date(2013, 1, 27), title: "event2", rooms: 2, persons: 1 })
        ];
        jasmine.clock().tick(1);
        sch.view().render(events);

        equal(sch.view().content.find("div.k-event").length, 2);
        equal(sch.view().content.find(".k-event:first .k-event-template").last().text(), "event1");
        equal(sch.view().content.find(".k-event:last .k-event-template").last().text(), "event2");
    });

    test("custom event template", function() {
        setupGroupedScheduler(container, customOrientation, {
            type: "day"
        }, {
            eventTemplate: '${title}',
            date: new Date(2013, 1, 26)
        });

        var sch = $(container).data("kendoScheduler");

        var events = [new SchedulerEvent({ uid: "uid", start: new Date(2013, 1, 26, 8, 0, 0), end: new Date(2013, 1, 26, 9, 0, 0), title: "my event", rooms: 1, persons: 1 })];
        jasmine.clock().tick(1);
        sch.view().render(events);

        equal(sch.view().content.find("div.k-event").text(), "my event");
    });

    test("custom event allday template", function() {
        setupGroupedScheduler(container, customOrientation, {
            type: "day"
        }, {
            allDayEventTemplate: '${title}',
            date: new Date(2013, 1, 26)
        });

        var sch = $(container).data("kendoScheduler");

        var events = [new SchedulerEvent({ uid: "uid", start: new Date(2013, 1, 26), end: new Date(2013, 1, 27), title: "my event", rooms: 1, persons: 1 })];
        jasmine.clock().tick(1);
        sch.view().render(events);

        equal(sch.view().content.find("div.k-event").text(), "my event");
    });

    test("events set as all day are not render for next day slot", function() {
        setupGroupedScheduler(container, customOrientation, {
            type: "day"
        }, {
            allDayEventTemplate: '${title}',
            date: new Date(2013, 1, 27)
        });

        var sch = $(container).data("kendoScheduler");

        var events = [new SchedulerEvent({ uid: "uid", start: new Date(2013, 1, 26), end: new Date(2013, 1, 26), title: "all day event", isAllDay: true, rooms: 1, persons: 1 })];
        jasmine.clock().tick(1);
        sch.view().render(events);

        equal(sch.view().content.find("div.k-event").length, 0);
    });

    test("events set as all day are not render for prev day slot", function() {
        setupGroupedScheduler(container, customOrientation, {
            type: "day"
        }, {
            allDayEventTemplate: '${title}',
            date: new Date(2013, 1, 25)
        });

        var sch = $(container).data("kendoScheduler");

        var events = [new SchedulerEvent({ uid: "uid", start: new Date(2013, 1, 26), end: new Date(2013, 1, 26), title: "all day event", isAllDay: true, rooms: 1, persons: 1 })];
        jasmine.clock().tick(1);
        sch.view().render(events);

        equal(sch.view().content.find("div.k-event").length, 0);
    });

    test("west arrow is shown if multiday event starts before view's start date and ends before end of the view", function() {

        setupGroupedScheduler(container, customOrientation, {
            type: "day"
        }, {
            allDayEventTemplate: '${title}',
            date: new Date(2013, 1, 26)
        });

        var sch = $(container).data("kendoScheduler");

        var events = [new SchedulerEvent({ uid: "uid", start: new Date(2013, 1, 25), end: new Date(2013, 1, 26), title: "all day event", isAllDay: true, rooms: 1, persons: 1 })];
        jasmine.clock().tick(1);
        sch.view().render(events);

        equal(sch.view().content.find(".k-event .k-i-arrow-w").length, 1);
        equal(sch.view().content.find(".k-event .k-i-arrow-e").length, 0);
    });


    tzTest("Sofia", "Current time marker is rendered correctly", function() {

        setupGroupedScheduler(container, customOrientation, {
            type: "day"
        }, {
            date: new Date(),
            startTime: new Date("2013/6/6 01:00"),
            endTime: new Date("2013/6/6 00:59"),
        });

        var sch = $(container).data("kendoScheduler");
        jasmine.clock().tick(1);
        var timeElementsCount = sch.view().element.find(".k-current-time").length;
        equal(timeElementsCount, 8);
    });

    test("gap below all day events if they do not start or end in 12:00 am", function() {
        setupGroupedScheduler(container, customOrientation, {
            type: "day"
        }, {
            date: new Date("2013/6/6"),
        });

        var events = [
            new SchedulerEvent({
                uid: "uid",
                start: new Date("2013/6/6 2:00"),
                end: new Date("2013/6/6 2:00"),
                isAllDay: true,
                title: "",
                rooms: 1, persons: 1
            })
        ];
        jasmine.clock().tick(1);
        var sch = $(container).data("kendoScheduler");
        sch.view().render(events);

        ok(sch.view().element.find(".k-scheduler-header-all-day td").outerHeight() >= sch.view().element.find(".k-event").outerHeight() * 2);
    });

    test("leaves empty space after all day slot", function() {
        setupGroupedScheduler(container, customOrientation, {
            type: "week"
        }, {
            date: new Date("2013/6/6"),
        });

        var events = [
            new SchedulerEvent({
                uid: "uid",
                start: new Date("2013/6/6"),
                end: new Date("2013/6/6"),
                isAllDay: true,
                title: "event", rooms: 1, persons: 1
            }), new SchedulerEvent({
                uid: "uid",
                start: new Date("2013/6/7"),
                end: new Date("2013/6/7"),
                isAllDay: true,
                title: "event",
                rooms: 1, persons: 1
            })
        ];
        jasmine.clock().tick(1);
        var sch = $(container).data("kendoScheduler");
        sch.view().render(events);

        equalWithRound(sch.view().element.find(".k-scheduler-header-all-day td").height(), sch.view().element.find(".k-event").height() * 2);
    });

    test("get time slot index for date", function() {
        setupGroupedScheduler(container, customOrientation, {
            type: "week"
        }, {
            date: new Date("2013/1/26"),
            startTime: new Date("2013/6/6 01:00"),
            endTime: new Date("2013/6/6 00:59")
        });
        jasmine.clock().tick(1);
        var sch = $(container).data("kendoScheduler");
        var index = sch.view()._timeSlotIndex(new Date(2013, 1, 26, 10, 0, 0));

        equal(index, 18);
    });

    test("position basic event in the correct time slot", function() {
        setupGroupedScheduler(container, customOrientation, {
            type: "week"
        }, {
            eventTemplate: '${title}',
            date: new Date(2013, 1, 26),
            startTime: new Date("2013/1/26 08:00"),
            endTime: new Date("2013/1/26 12:00")
        });

        var sch = $(container).data("kendoScheduler");

        var events = [new SchedulerEvent({ uid: "uid", start: new Date(2013, 1, 26, 8, 0, 0), end: new Date(2013, 1, 26, 9, 0, 0), title: "my event", rooms: 1, persons: 1 })];
        jasmine.clock().tick(1);
        sch.view().render(events);

        var eventPosition = sch.view().content.find("div.k-event").offset();
        var timeSlotPosition = sch.view().content.find("tr").eq(19).offset();

        equalWithRound(timeSlotPosition.top, eventPosition.top);
        equalWithRound(applyDefaultLeftOffset(timeSlotPosition.left), eventPosition.left);
    });

    test("multiple day event position is set to the date slot", function() {
        setupGroupedScheduler(container, customOrientation, {
            type: "week"
        }, {
            date: new Date(2013, 1, 26)
        });

        var sch = $(container).data("kendoScheduler");

        var events = [new SchedulerEvent({ uid: "uid", start: new Date(2013, 1, 26, 8, 0, 0), end: new Date(2013, 1, 27, 11, 0, 0), title: "my event", rooms: 1, persons: 1 })];
        jasmine.clock().tick(1);
        sch.view().render(events);

        var eventOffsetFirst = sch.view().content.find("div.k-event").first().offset();
        var eventOffsetLast = sch.view().content.find("div.k-event").last().offset();

        var firstSlotOffset = sch.view().element.find(".k-scheduler-header-all-day td").eq(8).offset();
        var lastSlotOffset = sch.view().element.find(".k-scheduler-header-all-day td").eq(12).offset();

        equalWithRound(eventOffsetFirst.top, firstSlotOffset.top);
        equalWithRound(eventOffsetFirst.left, applyDefaultLeftOffset(firstSlotOffset.left));
        equalWithRound(eventOffsetLast.top, lastSlotOffset.top);
        equalWithRound(eventOffsetLast.left, applyDefaultLeftOffset(lastSlotOffset.left));
    });

    test("multiple day event position is set to the date slot with multiple slots", function() {
        setupGroupedScheduler(container, customOrientation, {
            type: "week"
        }, {
            date: new Date(2013, 1, 26)
        });

        var sch = $(container).data("kendoScheduler");

        var events = [new SchedulerEvent({ uid: "uid", start: new Date(2013, 1, 26, 10, 0, 0), end: new Date(2013, 1, 27, 11, 0, 0), title: "my event", rooms: 1, persons: 1 })];
        jasmine.clock().tick(1);
        sch.view().render(events);
        var eventOffset = sch.view().content.find("div.k-event").offset();
        var slotOffset = sch.view().element.find(".k-scheduler-header-all-day td").eq(8).offset();
        var slotWidth = 0;

        sch.view().element.find(".k-scheduler-header-all-day td").first().each(function() {
            slotWidth += $(this).innerWidth();
        });

        equalWithRound(eventOffset.top, slotOffset.top);

        equalWithRound(eventOffset.left, applyDefaultLeftOffset(slotOffset.left));
        equalWithRound(sch.view().content.find("div.k-event").width(), applyDefaultRightOffset(slotWidth));
    });


    test("position multiday event which starts before the selected range", function() {
        setupGroupedScheduler(container, customOrientation, {
            type: "week"
        }, {
            eventTemplate: '${title}',
            date: new Date(2013, 1, 26)
        });

        var sch = $(container).data("kendoScheduler");

        var events = [new SchedulerEvent({ uid: "uid", start: new Date(2013, 1, 24, 10, 0, 0), end: new Date(2013, 1, 26, 11, 0, 0), title: "my event", rooms: 1, persons: 1 })];
        jasmine.clock().tick(1);
        sch.view().render(events);

        var slotWidth = sch.view().element.find(".k-scheduler-header-all-day td")[0].clientWidth;

        equal(sch.view().content.find("div.k-event").length, 3);
        equal(sch.view().content.find("div.k-event").width(), applyDefaultRightOffset(slotWidth));
    });

    test("position multiday event which ends after the selected range", function() {
        setupGroupedScheduler(container, customOrientation, {
            type: "day"
        }, {
            eventTemplate: '${title}',
            date: new Date(2013, 1, 26)
        });

        var sch = $(container).data("kendoScheduler");

        var events = [new SchedulerEvent({ uid: "uid", start: new Date(2013, 1, 26, 10, 0, 0), end: new Date(2013, 1, 27, 11, 0, 0), title: "my event", rooms: 1, persons: 1 })];
        jasmine.clock().tick(1);
        sch.view().render(events);

        equal(sch.view().content.find("div.k-event").length, 1);
    });

    test("position day event which start in the last slot", function() {
        var selectedDate = new Date(2013, 1, 26, 0, 0, 0);

        setupGroupedScheduler(container, customOrientation, {
            type: "day"
        }, {
            date: selectedDate
        });

        var sch = $(container).data("kendoScheduler");

        var events = [new SchedulerEvent({ uid: "uid", start: new Date(2013, 1, 26, 8, 0, 0), end: new Date(2013, 1, 26, 10, 0, 0), title: "my event", rooms: 2, persons: 2 })];
        jasmine.clock().tick(1);
        sch.view().render(events);

        var eventElement = sch.view().content.find("div.k-event");
        equal(eventElement.length, 1);
        equalWithRound(eventElement.offset().top, sch.view().content.find("tr").eq(1).offset().top);
        equalWithRound(eventElement.height(), slotHeight(sch.view().content.find("table"), 1));
    });

    test("set offsetHeight of allDay slots when there are collinding events", function() {
        var selectedDate = new Date(2013, 1, 26, 0, 0, 0);
        setupGroupedScheduler(container, customOrientation, {
            type: "day"
        }, {
            date: selectedDate
        });

        var sch = $(container).data("kendoScheduler");

        var events = [
            new SchedulerEvent({ uid: "uid", start: new Date(2013, 1, 26, 0, 0, 0), end: new Date(2013, 1, 26, 0, 0, 0), title: "first event", isAllDay: true, rooms: 1, persons: 1 }),
            new SchedulerEvent({ uid: "uid", start: new Date(2013, 1, 26, 0, 0, 0), end: new Date(2013, 1, 26, 0, 0, 0), title: "second event", isAllDay: true, rooms: 1, persons: 1 }),
            new SchedulerEvent({ uid: "uid", start: new Date(2013, 1, 26, 0, 0, 0), end: new Date(2013, 1, 26, 0, 0, 0), title: "third event", isAllDay: true, rooms: 1, persons: 1 })
        ];
        jasmine.clock().tick(1);
        sch.view().render(events);

        var eventSlotOffsetHeight = sch.view().element.find(".k-scheduler-header-all-day td").eq(0)[0].offsetHeight;
        var slotObjectOffsetHeight = sch.view().groups[0]._daySlotCollections[0]._slots[0].offsetHeight;

        equalWithRound(eventSlotOffsetHeight, slotObjectOffsetHeight);
    });

    test("slotByCell returns date for slot", function() {
        var selectedDate = new Date(2013, 1, 26, 0, 0, 0);
        setupGroupedScheduler(container, customOrientation, {
            type: "week"
        }, {
            date: selectedDate
        });
        var sch = $(container).data("kendoScheduler");
        jasmine.clock().tick(1);
        var result = sch.view().selectionByElement(sch.view().content.find("tr").eq(1).find("td").eq(2));

        equal(result.groupIndex, 2);
        deepEqual(result.startDate(), new Date(2013, 1, 24, 8, 0, 0));
        deepEqual(result.endDate(), new Date(2013, 1, 24, 8, 30, 0));
    });

    test("_dateSlotIndex returns correct index if date is same as endTime", function() {
        var selectedDate = new Date(2013, 1, 26, 0, 0, 0);
        setupGroupedScheduler(container, customOrientation, {
            type: "week"
        }, {
            date: selectedDate
        });
        var sch = $(container).data("kendoScheduler");
        jasmine.clock().tick(1);
        equal(sch.view()._dateSlotIndex(new Date(2013, 1, 25, 10, 0, 0)), 1);
    });

    test("two day all day event is rendered correctly", function() {
        setupGroupedScheduler(container, customOrientation, {
            type: "week"
        }, {
            date: new Date(2013, 1, 2)
        });
        var sch = $(container).data("kendoScheduler");
        jasmine.clock().tick(1);
        sch.view().render([new SchedulerEvent({
            uid: "foo", title: "",
            start: new Date(2013, 1, 1, 0, 0, 0),
            end: new Date(2013, 1, 3, 0, 0, 0),
            isAllDay: true,
            id: "2", rooms: 1, persons: 1
        })]);

        equal(sch.view().groups[0].getDaySlotCollection(0).events()[0].start, 5);
        equal(sch.view().groups[0].getDaySlotCollection(0).events()[0].end, 5);

        ok(sch.view().content.find(".k-event").length);
    });

    test("last slot end date is set correctly when view end is restricted", function() {
        setupGroupedScheduler(container, customOrientation, {
            type: "day"
        }, {
            startTime: new Date("2013/6/6 01:00"),
            endTime: new Date("2013/6/6 20:00")
        });
        var sch = $(container).data("kendoScheduler");
        jasmine.clock().tick(1);
        var slots = sch.view().groups[0].getTimeSlotCollection(0);
        deepEqual(slots.last().startDate(), new Date("2013/6/6 19:30"));
        deepEqual(slots.last().endDate(), new Date("2013/6/6 20:00"));
    });

    test("next to last slot end date is set correctly", function() {
        setupGroupedScheduler(container, customOrientation, {
            type: "day"
        }, {
            startTime: new Date("2013/6/6 01:00"),
            endTime: new Date("2013/6/6 23:59"),
        });

        var sch = $(container).data("kendoScheduler");
        jasmine.clock().tick(1);
        var slots = sch.view().groups[0].getTimeSlotCollection(0);
        var count = slots.count();
        deepEqual(slots.at(count - 2).startDate(), new Date("2013/6/6 23:00"));
        deepEqual(slots.at(count - 2).endDate(), new Date("2013/6/6 23:30"));
    });

    test("clicking the cell link trigger navigate event", 2, function() {
        setupGroupedScheduler(container, customOrientation, {
            type: "week"
        }, {
            date: new Date(2013, 1, 26)
        });

        var sch = $(container).data("kendoScheduler");
        jasmine.clock().tick(1);
        sch.view().bind("navigate", function(e) {
            equal(e.view, "day");
            equal(e.date.getTime(), new Date("2013/2/24 00:00").getTime());
        });
        sch.view().times.find("th").find(".k-nav-day").first().click();
    });

    test("Do not render events if daySlot is disabled", function() {
        setupGroupedScheduler(container, customOrientation, {
            type: "week"
        }, {
            allDaySlot: false,
            date: new Date(2013, 1, 26),
            startTime: new Date("2013/6/6 08:00"),
            endTime: new Date("2013/6/6 20:00")
        });

        var sch = $(container).data("kendoScheduler");


        var events = [new SchedulerEvent({ uid: "uid", start: new Date(2013, 1, 26, 0, 0, 0), end: new Date(2013, 1, 26, 0, 0, 0), isAllDay: true, title: '["my event"]', rooms: 1, persons: 1 })];
        jasmine.clock().tick(1);
        sch.view().render(events);

        equal(sch.view().element.find("div.k-event>div").length, 0);
    });

})();
