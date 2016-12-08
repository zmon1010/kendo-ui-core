(function() {
    var AgendaView = kendo.ui.AgendaView,
        Scheduler = kendo.ui.Scheduler,
        Event = kendo.data.SchedulerEvent,
        keys = kendo.keys,
        container;

    function setup(options) {
        return new AgendaView(container, $.extend(true, { date: new Date(2013, 1, 2) }, options));
    }

    function createSelection(options) {
        return $.extend(true, {
                events: [],
                start: new Date(2013, 1, 2),
                end: new Date(2013, 1, 2),
                index: 0
            },
            options
        );
    }

    module("Agenda View selection", {
        setup: function() {
            jasmine.clock().install();
            container = document.createElement("div");
            QUnit.fixture[0].appendChild(container);
            container = $(container).addClass("k-scheduler");
        },
        teardown: function() {
            jasmine.clock().uninstall();
            container.data("kendoagenda").destroy();
            kendo.destroy(QUnit.fixture);
        }
    });

    test("create selection by dom element", function() {
        var view = setup();
        var event = new Event({
            start: new Date(2013, 1, 2),
            end: new Date(2013, 1, 2),
            title: "one day event"
        });

        view.render([ event ]);
        var tr = view.table.find(".k-task").closest("tr");
        var selection = view.selectionByElement(tr);

        deepEqual(selection.start, new Date(2013, 1, 2));
        deepEqual(selection.end, new Date(2013, 1, 2));
        equal(selection.index, tr.index());
        equal(selection.uid, event.uid);
    });

    test("view select: selects task row by index", function() {
        var view = setup();

        var event = new Event({
            start: new Date(2013, 1, 2),
            end: new Date(2013, 1, 2),
            title: "first event"
        });

        var secondEvent = new Event({
            start: new Date(2013, 1, 3),
            end: new Date(2013, 1, 3),
            title: "second event"
        });

        var selection = createSelection({
            index: 1
        });

        view.render([ event, secondEvent ]);
        view.select(selection);

        var row = view.table.find(".k-state-selected");
        ok(row.hasClass("k-state-selected"));
        equal(row.index(), selection.index);
    });

    test("view select: clear previous selected row", function() {
        var view = setup();
        var event = new Event({
            start: new Date(2013, 1, 2),
            end: new Date(2013, 1, 2),
            title: "first event"
        });

        var secondEvent = new Event({
            start: new Date(2013, 1, 3),
            end: new Date(2013, 1, 3),
            title: "second event"
        });

        view.render([ event, secondEvent ]);
        view.select(createSelection());
        view.select(createSelection({
            index: 1
        }));

        var row = view.table.find(".k-state-selected");
        equal(row.length, 1);
        equal(row.index(), 1);
    });

    test("key down selects next event row", function() {
        var view = setup();
        var event = new Event({
            start: new Date(2013, 1, 2),
            end: new Date(2013, 1, 2),
            title: "first event"
        });

        var secondEvent = new Event({
            start: new Date(2013, 1, 3),
            end: new Date(2013, 1, 3),
            title: "second event"
        });
        var selection = createSelection();

        view.render([ event, secondEvent ]);
        view.select(selection);
        var handled = view.move(selection, keys.DOWN);

        ok(handled);
        deepEqual(selection.start, new Date(2013, 1, 3));
        deepEqual(selection.end, new Date(2013, 1, 3));
        equal(selection.index, 1);
    });

    test("key up selects previous event row", function() {
        var view = setup();
        var event = new Event({
            start: new Date(2013, 1, 2),
            end: new Date(2013, 1, 2),
            title: "first event"
        });

        var secondEvent = new Event({
            start: new Date(2013, 1, 3),
            end: new Date(2013, 1, 3),
            title: "second event"
        });
        var selection = createSelection({
            index: 1
        });

        view.render([ event, secondEvent ]);
        view.select(selection);
        var handled = view.move(selection, keys.UP);

        ok(handled);
        deepEqual(selection.start, new Date(2013, 1, 2));
        deepEqual(selection.end, new Date(2013, 1, 2));
        equal(selection.index, 0);
    });

    test("key down selects next event between multi day event", function() {
        var view = setup();
        var event = new Event({
            start: new Date(2013, 1, 2, 7, 0, 0),
            end: new Date(2013, 1, 3, 12, 0, 0),
            title: "first event"
        });

        var secondEvent = new Event({
            start: new Date(2013, 1, 3),
            end: new Date(2013, 1, 3),
            title: "second event"
        });
        var selection = createSelection();

        view.render([ event, secondEvent ]);
        view.select(selection);
        var handled = view.move(selection, keys.DOWN);

        ok(handled);
        deepEqual(selection.start, new Date(2013, 1, 3));
        deepEqual(selection.end, new Date(2013, 1, 3));
        equal(selection.index, 1);
    });

    test("key down selects next occurance of multi day event", function() {
        var view = setup();
        var event = new Event({
            start: new Date(2013, 1, 2, 7, 0, 0),
            end: new Date(2013, 1, 3, 12, 0, 0),
            title: "first event"
        });

        var secondEvent = new Event({
            start: new Date(2013, 1, 3),
            end: new Date(2013, 1, 3),
            title: "second event"
        });
        var selection = createSelection({
            index: 1
        });

        view.render([ event, secondEvent ]);
        view.select(selection);
        var handled = view.move(selection, keys.DOWN);

        ok(handled);
        deepEqual(selection.start, new Date(2013, 1, 3, 0, 0, 0));
        deepEqual(selection.end, new Date(2013, 1, 3, 12, 0, 0));
        equal(selection.index, 2);
    });

    test("the view is in range", function() {
        var view = setup();

        ok(view.isInRange());
    });

    test("move to selection period updates selection to first event info", function() {
        var view = setup();
        var event = new Event({
            start: new Date(2013, 1, 2),
            end: new Date(2013, 1, 2),
            title: "first event"
        });

        var secondEvent = new Event({
            start: new Date(2013, 1, 3),
            end: new Date(2013, 1, 3),
            title: "second event"
        });
        var selection = createSelection({
            index: 1
        });

        view.render([ event, secondEvent ]);
        view.select(selection);
        view.constrainSelection(selection);

        deepEqual(selection.start, new Date(2013, 1, 2));
        deepEqual(selection.end, new Date(2013, 1, 2));
        equal(selection.index, 0);
        equal(selection.events.length, 1);
        equal(selection.events[0], event.uid);
    });

      function setupGroupedWidget(options) {
                options = options || {};

                options = $.extend({
                    selectable: true,
                    date: new Date(2013, 1, 3, 0, 0, 0, 0),
                    views: [
                        "agenda"
                    ],
                   
                     resources: [
                    {
                        field: "roomId",
                        name: "Rooms",
                        dataSource: [
                            { text: "Resource1", value: 1, color: "#6eb3fa" },
                            { text: "Resource2", value: 2, color: "#f58a8a" }
                        ],
                        title: "Room"
                    }, {
                        field: "attendees",
                        name: "Attendees",
                        dataSource: [
                            { text: "Alex", value: 1, color: "#f8a398" },
                            { text: "Bob", value: 2, color: "#51a0ed" },
                            { text: "Charlie", value: 3, color: "#56ca85" }
                        ],
                        multiple: true,
                        title: "Attendees"
                    }
                ]
                }, options);

                scheduler = new Scheduler(container, options);
                  jasmine.clock().tick(1);
                view = scheduler.view();

                container.focus();
      }
        
      test("grouped by date key down selects next event row", function() {
          var startDate = new Date(2013, 1, 3, 0, 0, 0, 0);
          var end = new Date(startDate);
          end.setHours(1);

          var startDate1 = new Date(2013, 1, 4, 0, 0, 0);
          var end1 = new Date(startDate1);
              end1.setHours(1);

        setupGroupedWidget({
            group: {
                resources: ["Rooms", "Attendees"],
                date: true,
            },
                dataSource: [
                    { start: startDate, end: end, title: "Test", roomId: 2, attendees: 1 },
                    { start: startDate1, end: end1, title: "Test", roomId: 2, attendees: 1 },
                    { start: startDate, end: end, title: "Test", roomId: 2, attendees: 2 },

                ],
         });
            jasmine.clock().tick(1);
        var view = scheduler.view();
        var selection = createSelection();

        view.select(selection);
        var handled = view.move(selection, keys.DOWN);

        ok(handled);
        deepEqual(selection.start, new Date(2013, 1, 4));
        deepEqual(selection.end, new Date(2013, 1, 4, 1, 0, 0));
        equal(selection.index, 1);
    });

    test("grouped by date key up selects previous event row", function() {
         var startDate = new Date(2013, 1, 3, 0, 0, 0, 0);
          var end = new Date(startDate);
          end.setHours(1);

          var startDate1 = new Date(2013, 1, 4, 0, 0, 0);
          var end1 = new Date(startDate1);
              end1.setHours(1);

        setupGroupedWidget({
            group: {
                resources: ["Rooms", "Attendees"],
                date: true,
            },
                dataSource: [
                    { start: startDate, end: end, title: "Test", roomId: 2, attendees: 1 },
                    { start: startDate1, end: end1, title: "Test", roomId: 2, attendees: 1 },
                    { start: startDate, end: end, title: "Test", roomId: 2, attendees: 2 },

                ],
         });
          jasmine.clock().tick(1);
        var view = scheduler.view();
        var selection = createSelection({
            index: 1
        });

        view.select(selection);
        var handled = view.move(selection, keys.UP);

        ok(handled);
        deepEqual(selection.start, new Date(2013, 1, 3));
        deepEqual(selection.end, new Date(2013, 1, 3, 1, 0, 0));
        equal(selection.index, 0);
    });

    test("grouped by date key down selects next event between multi day event", function() {
      var startDate = new Date(2013, 1, 3, 0, 0, 0, 0);
          var end = new Date(startDate);
          end.setHours(1);

         var startDate1 = new Date(2013, 1, 4, 0, 0, 0);
         var end1 =new Date(2013, 1, 6, 0, 0, 0);

        setupGroupedWidget({
            group: {
                resources: ["Rooms", "Attendees"],
                date: true,
            },
                dataSource: [
                    { start: startDate1, end: end1, title: "Test", roomId: 2, attendees: 1 },
                    { start: startDate, end: end, title: "Test", roomId: 2, attendees: 2 },

                ],
         });
          jasmine.clock().tick(1);
        var view = scheduler.view();
        var selection = createSelection();

        view.select(selection);
        var handled = view.move(selection, keys.DOWN);

        ok(handled);
        deepEqual(selection.start, new Date(2013, 1, 5));
        deepEqual(selection.end, new Date(2013, 1, 5));
        equal(selection.index, 1);
    });

})();
