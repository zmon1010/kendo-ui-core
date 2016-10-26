(function() {
    var Scheduler = kendo.ui.Scheduler,
        container;

    function getDate(date) {
        return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0);
    }

    module("DataBinding", {
        setup: function() {
            jasmine.clock().install();
            container = $("<div>");
        },
        teardown: function() {
            jasmine.clock().uninstall();
            kendo.destroy(container);
        }
    });

    test("creates a SchedulerDataSource", function() {
        var scheduler = new Scheduler(container);

        ok(scheduler.dataSource instanceof kendo.data.SchedulerDataSource);
    });

    test("view is bound to the event data", 1, function() {
        var eventsLength = 0;
        var scheduler = new Scheduler(container, {
            views: [ {
                    type: kendo.ui.MultiDayView.extend({
                        render: function(events) {
                            eventsLength = events.length;
                        }
                    }),
                    title: "testView"
                    }
                ],
            date: new Date(2013, 1, 3, 0, 0, 0),
            dataSource: {
                serverFiltering: true,
                transport: {
                    read: function(options) {
                        options.success([
                            { start: new Date(2013, 1, 3, 0, 0, 0), end: new Date(2013, 1, 3, 0, 0, 0) },
                            { start: new Date(2013, 1, 3, 0, 0, 0), end: new Date(2013, 1, 3, 0, 0, 0) }
                        ]);
                    }
                }
            }
        });

        jasmine.clock().tick(1);
        equal(eventsLength, 2);
    });

    test("dataItems method return valid events", function() {
        container.appendTo($("body"));

        var scheduler = new Scheduler(container, {
            views: [ {
                type: kendo.ui.MonthView,
                title: "testView"
                }
            ],
            date: new Date(2013, 1, 3, 0, 0, 0),
            dataSource: {
                serverFiltering: true,
                transport: {
                    read: function(options) {
                        options.success([
                            {title: "foo1", start: new Date(2013, 1, 3, 0, 0, 0), end: new Date(2013, 1, 3, 0, 0, 0) },
                            {title: "foo2", start: new Date(2013, 1, 3, 0, 0, 0), end: new Date(2013, 1, 3, 0, 0, 0) },
                            {title: "foo3", start: new Date(2013, 1, 3, 0, 0, 0), end: new Date(2013, 1, 3, 0, 0, 0) },
                            {title: "foo4", start: new Date(2013, 1, 3, 0, 0, 0), end: new Date(2013, 1, 3, 0, 0, 0) },
                            {title: "foo4", start: new Date(2013, 1, 4, 0, 0, 0), end: new Date(2013, 1, 4, 0, 0, 0) }
                        ]);
                    }
                }
            }
        });
          jasmine.clock().tick(1);
        equal(scheduler.wrapper.find(".k-event")[0].getAttribute("data-uid"), scheduler.dataItems()[0].uid);
        equal(scheduler.wrapper.find(".k-event")[1].getAttribute("data-uid"), scheduler.dataItems()[1].uid);
        equal(scheduler.dataItems().length, scheduler.wrapper.find(".k-event").length);
        container.detach();
    });

    test("data is filtered before is passed to the view", 1, function() {
        var eventsLength = 0;
        var scheduler = new Scheduler(container, {
            views: [ {
                    type: kendo.ui.MultiDayView.extend({
                        render: function(events) {
                            eventsLength = events.length;
                        }
                    }),
                    title: "testView"
                }
                ],
            date: new Date(2013, 1, 3, 0, 0, 0),
            dataSource: {
                serverFiltering: true,
                transport: {
                    read: function(options) {
                        options.success([
                            { start: new Date(2013, 1, 3, 0, 0, 0), end: new Date(2013, 1, 3, 0, 0, 0) },
                            { start: new Date(2013, 1, 5, 0, 0, 0), end: new Date(2013, 1, 6, 0, 0, 0) }
                        ]);
                    }
                }
            }
        });
          jasmine.clock().tick(1);
        equal(eventsLength, 1);
    });

    test("expand recurring events before calling render method", function() {
        var today = new Date(2013, 10, 10),
            year = today.getFullYear(),
            month = today.getMonth(),
            day = today.getDate(),
            view, events;

        var scheduler = new Scheduler(container, {
            views: [ "week" ],
            date: today,
            dataSource: [
                {
                    start: new Date(year, month, day, 10),
                    end: new Date(year, month, day, 11),
                    title: "Today - recurring event",
                    recurrenceRule: "FREQ=DAILY"
                },{
                    start: new Date(year, month, day, 16),
                    end: new Date(year, month, day, 17),
                    title: "Today - single event"
                }
            ]
        });
          jasmine.clock().tick(1);
        view = scheduler.view();
        stub(view, {
            render: view.render
        });

        scheduler.refresh();
        events = view.args("render", 0)[0];

        equal(events.length, 8);
    });

    test("resetting DataSource rebinds the widget", 1, function() {
        var flag = false;
        var scheduler = new Scheduler(container, {
            dataBinding: function() {
                flag = true;
            }
        });

        scheduler.setDataSource(new kendo.data.SchedulerDataSource({
            data:[{ title: "", start: new Date(), end: new Date()}]
        }));

         jasmine.clock().tick(1);
         ok(flag);
    });

    test("dataBinding event can be prevented", 0, function() {
        var scheduler = new Scheduler(container, {
            dataBinding: function(e) {
                e.preventDefault();
            },
            dataBound: function() {
                ok(false);
            }
        });
    });

    test("AutoBind=false prevents scheduler from binding", 0, function() {
        var scheduler = new Scheduler(container, {
            autoBind: false,
            dataBinding: function() {
                ok(false);
            }
        });
    });

    test("persist expanded events as a private field", function() {
        var today = new Date(2013, 10, 10),
            year = today.getFullYear(),
            month = today.getMonth(),
            day = today.getDate(),
            view, events;

        var scheduler = new Scheduler(container, {
            views: [ "week" ],
            date: today,
            dataSource: [
                {
                    start: new Date(year, month, day, 10),
                    end: new Date(year, month, day, 11),
                    title: "Today - recurring event",
                    recurrenceRule: "FREQ=DAILY"
                },{
                    start: new Date(year, month, day, 16),
                    end: new Date(year, month, day, 17),
                    title: "Today - single event"
                }
            ]
        });
          jasmine.clock().tick(1);
        scheduler.refresh();

        equal(scheduler._data.length, 8);
    });
})();
