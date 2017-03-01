(function() {
    var Scheduler = kendo.ui.Scheduler,
         container;

    function getDate(date) {
        return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0);
    }

    module("editing destroy", {
        setup: function() {
            container = $("<div>");
        },
        teardown: function() {
            kendo.destroy(container);
        }
    });

    function setup(options) {
        return new Scheduler(container,
            $.extend({
                editable: {
                    confirmation: false
                },
                dataSource: {
                    data: [{ start: new Date(), end: new Date(), isAllDay: true, title: "my event" }]
                }
            }, options)
        );
    }

    asyncTest("removing model triggers updates the view", function() {
        var scheduler = setup();

        setTimeout(function() {
            var dataSource = scheduler.dataSource;
            var render = stub(scheduler.view(), "render");
            dataSource.remove(dataSource.at(0));



            start();
            equal(render.calls("render"), 1);
        });
    });

    asyncTest("clicking the destroy button calls datasource remove", function() {
        var scheduler = setup(),
            dataSource = scheduler.dataSource,
            remove = stub(dataSource, "remove");


        setTimeout(function() {
            var uid = dataSource.at(0).uid;
            scheduler.wrapper.find(".k-event a:has(.k-i-close)").click();
            start()
            equal(remove.calls("remove"), 1);
            equal(remove.args("remove")[0].uid, uid);
        });
    });

    asyncTest("confirmation message is shown when editor template is set", function() {
        var scheduler = setup({
            editable: {
                template: " "
            }
        }),
            dataSource = scheduler.dataSource,
            remove = stub(dataSource, "remove");
        setTimeout(function() {
            scheduler.wrapper.find(".k-event a:has(.k-i-close)").click();
            start();
            equal(remove.calls("remove"), 0);
        });
    });

    asyncTest("clicking the destroy button does not call datasource remove if editable is false", function() {
        var scheduler = setup({ editable: false }),
            dataSource = scheduler.dataSource,
            remove = stub(dataSource, "remove");
        setTimeout(function() {
            scheduler.wrapper.find(".k-event a:has(.k-i-close)").click();
            start();
            equal(remove.calls("remove"), 0);
        });
    });

    asyncTest("clicking the destroy button calls datasource sync", function() {
        var scheduler = setup(),
        dataSource = scheduler.dataSource;

        var sync = stub(dataSource, "sync");
        setTimeout(function() {
            scheduler.wrapper.find(".k-event a:has(.k-i-close)").click();

            start();
            equal(sync.calls("sync"), 1);
        });
    });

    asyncTest("removeRow calls _confirmation if delete confirm is true", function() {
        var scheduler = setup(),
            method = stub(scheduler, "_confirmation");

        setTimeout(function() {
            scheduler.removeEvent(scheduler.wrapper.find(".k-event").data("uid"));
            start();
            ok(method.calls("_confirmation"));
        });
    });

    asyncTest("removeRow does not call datasource remove if element does not exist", function() {
        var scheduler = setup(),
            remove = stub(scheduler.dataSource, "remove");

        setTimeout(function() {
            scheduler.removeEvent("<div/>");
            start()
            equal(remove.calls("remove"), 0);
        });
    });

    asyncTest("removeRow raises remove event", 1, function() {
        var scheduler = setup({
            remove: function() {
                start();
                ok(true);
            }
        });
        setTimeout(function() {
            scheduler.removeEvent(scheduler.wrapper.find(".k-event").data("uid"));
        });
    });

    asyncTest("removeRow raises remove event passing the event object and the element", 1, function() {
        var scheduler = setup({
            remove: function(e) {
                start()
                ok(e.event instanceof kendo.data.ObservableObject);
            }
        });
        setTimeout(function() {
            scheduler.removeEvent(scheduler.wrapper.find(".k-event").data("uid"));
        });
    });

    asyncTest("the destroy confirmation uses the text set through the options", function() {
        var scheduler = setup({
            dataBound: scheduler_dataBound,
            editable: { confirmation: "foo" }
        });
        function scheduler_dataBound(e) {
            setTimeout(function() {
                start();
                scheduler.removeEvent(scheduler.wrapper.find(".k-event").data("uid"));

                equal($(".k-popup-message").text(), "foo");
            });
        }
    });

    asyncTest("the destroy confirmation uses the text set through the messages options", function() {
        var scheduler = setup({
            dataBound: scheduler_dataBound,
            editable: true, messages: { editable: { confirmation: "foo" } }
        });
        function scheduler_dataBound(e) {
            setTimeout(function() {
                start();
                scheduler.removeEvent(scheduler.wrapper.find(".k-event").data("uid"));

                equal($(".k-popup-message").text(), "foo");
            });
        }
    });

    asyncTest("the destroy confirmation uses default text if not set", 1, function() {
        var scheduler = setup({
            editable: true
        });
        setTimeout(function() {
            start();
            scheduler.removeEvent(scheduler.wrapper.find(".k-event").data("uid"));


            equal($(".k-popup-message").text(), "Are you sure you want to delete this event?");
        });
    });

    asyncTest("switching views does not trigger multiple remove events", 1, function() {
        var scheduler = setup({}),
            removeEvent = stub(scheduler, "removeEvent");

        scheduler.view("week");
        scheduler.view("day");
        setTimeout(function() {
            start();
            scheduler.wrapper.find(".k-event a:has(.k-i-close)").click();

            equal(removeEvent.calls("removeEvent"), 1);
        });
    });

    asyncTest("multiple calls to same views does not trigger multiple remove events", 1, function() {
        var scheduler = setup({}),
            removeEvent = stub(scheduler, "removeEvent");

        scheduler.view("day");
        scheduler.view("day");

        setTimeout(function() {
            start();
            scheduler.wrapper.find(".k-event a:has(.k-i-close)").click();
            equal(removeEvent.calls("removeEvent"), 1);
        });
        //  }
    });

    asyncTest("Remove recurring event opens delete recurring dialog", 1, function() {
        var scheduler = setup({
            dataBound: scheduler_dataBound,
            dataSource: {
                data: [{ recurrenceRule: "FREQ=DAILY", start: new Date(), end: new Date(), isAllDay: true, title: "my event" }]
            },
            editable: true
        });
        function scheduler_dataBound(e) {
            setTimeout(function() {
                start();
                scheduler.removeEvent(scheduler.wrapper.find(".k-event:first").data("uid"));

                equal($(".k-popup-message").text(), "Do you want to delete only this event occurrence or the whole series?");
            });
        }
    });

    asyncTest("Remove only current recurring event will remove only current occurrence", 1, function() {
        var scheduler = setup({
            dataSource: {
                data: [{ id: 1, recurrenceRule: "FREQ=DAILY", start: new Date(), end: new Date(), isAllDay: true, title: "my event" }]
            },
            editable: true
        });

        stub(scheduler.dataSource, {
            remove: scheduler.dataSource.remove
        });
        setTimeout(function() {
            start();
            scheduler.removeEvent(scheduler.wrapper.find(".k-event:last").data("uid"));
            $(".k-window").find(".k-content .k-button:first").click();

            ok(scheduler.dataSource.args("remove")[0].isOccurrence());
        });
    });

    asyncTest("Remove an occurrence with startTimezone does not move head start date", 1, function() {
        var startTime = new Date(2013, 10, 10, 5);
        var end = new Date(2013, 10, 10, 6);

        var scheduler = setup({
            timezone: "Etc/UTC",
            views: ["week"],
            dataSource: {
                data: [{ startTimezone: "Europe/Berlin", id: 1, recurrenceRule: "FREQ=DAILY", start: new Date(startTime), end: new Date(end), title: "my event" }]
            },
            editable: true
        });

        setTimeout(function() {

            startTime = new Date(scheduler.dataSource.at(0).start);

            scheduler.removeEvent(scheduler.wrapper.find(".k-event:last").data("uid"));
            $(".k-window").find(".k-content .k-button:first").click();

            setTimeout(function() {
                start();
                deepEqual(scheduler.dataSource.data()[0].start, startTime);
            });
        });
    });

    asyncTest("Remove recurrence head will remove the corresponding series", 1, function() {
        var scheduler = setup({
            dataSource: {
                data: [{ id: 1, recurrenceRule: "FREQ=DAILY", start: new Date(), end: new Date(), isAllDay: true, title: "my event" }]
            },
            views: ["week"],
            editable: true
        });

        stub(scheduler.dataSource, {
            remove: scheduler.dataSource.remove
        });
        setTimeout(function() {

            scheduler.removeEvent(scheduler.wrapper.find(".k-event:last").data("uid"));
            $(".k-window").find(".k-content .k-button:last").click();
            start();
            ok(scheduler.dataSource.args("remove")[0].isRecurrenceHead());
        });
    });

    asyncTest("Canceling event removal persist instance in the DataSource", 2, function() {
        var scheduler = setup({
            dataBound: scheduler_dataBound,
            dataSource: {
                data: [{ id: 1, start: new Date(), end: new Date(), isAllDay: true, title: "my event" }]
            },
            editable: true
        });

        stub(scheduler.dataSource, {
            remove: scheduler.dataSource.remove
        });
        function scheduler_dataBound(e) {
            setTimeout(function() {
                start();
                scheduler.removeEvent(scheduler.wrapper.find(".k-event:last").data("uid"));
                $(".k-window").find(".k-content .k-button:last").click();

                equal(scheduler.dataSource.calls("remove"), 0);
                equal(scheduler.dataSource.data().length, 1);
            });
        }
    })

    asyncTest("Cancel event after edit prevent does not throw exception", 0, function() {
        var scheduler = setup({
            dataBound: scheduler_dataBound,
            dataSource: {
                data: [
                    { id: 1, start: new Date(), end: new Date(), isAllDay: true, title: "my event" }
                ]
            },
            edit: function(e) {
                e.preventDefault();
            }
        });
        function scheduler_dataBound(e) {
            setTimeout(function() {
                start();
                scheduler.editEvent(scheduler.dataSource.view()[0].uid);

                scheduler.cancelEvent();
            });
        }
    })

    asyncTest("Remove recurring event opens delete recurring dialog when editRecurringMode is set to series", 1, function() {
        var scheduler = setup({
            dataBound: scheduler_dataBound,
            dataSource: {
                data: [{ recurrenceRule: "FREQ=DAILY", start: new Date(), end: new Date(), isAllDay: true, title: "my event" }]
            },
            editable: {
                editRecurringMode: "series"
            }
        });
        function scheduler_dataBound(e) {
            setTimeout(function() {
                scheduler.removeEvent(scheduler.wrapper.find(".k-event:first").data("uid"));
                start();
                equal($(".k-popup-message").text(), "Are you sure you want to delete this event?");
            });
        }
    });

    asyncTest("Remove recurring event opens delete recurring dialog when editRecurringMode is set to occurrence", 1, function() {
        var scheduler = setup({
            dataBound: scheduler_dataBound,
            dataSource: {
                data: [{ recurrenceRule: "FREQ=DAILY", start: new Date(), end: new Date(), isAllDay: true, title: "my event" }]
            },
            editable: {
                editRecurringMode: "occurrence"
            }
        });
        function scheduler_dataBound(e) {
            setTimeout(function() {
                e.sender.removeEvent(e.sender.wrapper.find(".k-event:first").data("uid"));

                start();
                equal($(".k-popup-message").text(), "Are you sure you want to delete this event?");
            });

        }

    });

    test("Remove recurring event does not open delete recurring dialog when editRecurringMode is set to series", 2, function() {
        var scheduler = setup({
            dataSource: {
                data: [{ recurrenceRule: "FREQ=DAILY", start: new Date(), end: new Date(), isAllDay: true, title: "my event" }]
            },
            editable: {
                editRecurringMode: "series",
                confirmation: false
            }
        });

        scheduler.removeEvent(scheduler.wrapper.find(".k-event:first").data("uid"));

        equal($(".k-popup-message").length, 0);
        equal($(".k-event").length, 0);
    });

  test("Remove recurring event does not open delete recurring dialog when editRecurringMode is set to occurrence", 2, function() {
        var scheduler = setup({
            dataSource: {
                data: [ { recurrenceRule: "FREQ=DAILY", start: new Date(), end: new Date(), isAllDay: true, title: "my event" } ]
            },
            editable: {
                editRecurringMode: "occurrence",
                confirmation: false
            }
        });

        scheduler.removeEvent(scheduler.wrapper.find(".k-event:first").data("uid"));

        equal($(".k-popup-message").length, 0);
        equal($(".k-event").length, 0);
    });
})();
