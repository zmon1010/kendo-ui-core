(function() {
    var container,
        view,
        resourceView;

    module("SchedulerView", {
        setup: function() {
            container = $('<div>');
            view =  new kendo.ui.SchedulerView(container, {
                name: "SchedulerView"
            });
            view.groups = [];

            resourceView =  view._addResourceView();
        },
        teardown: function() {
            if (container.data("kendoSchedulerView")) {
                container.data("kendoSchedulerView").destroy();
            }

            kendo.destroy(QUnit.fixture);
        }
    });

    test("slotByPosition works for horizontal slots when table cells have gaps between them", function() {
        //Required for IE and FF in some cases have gaps between cells reported
        //when using offsetLeft + offsetWidth -> offsetLeft
        //For more info: https://github.com/telerik/kendo/issues/4504

        var date = kendo.date.getDate(new Date());

        var collection = resourceView.addTimeSlotCollection(date, kendo.date.addDays(date, 1));

        var mockedElements = [
            { offsetLeft: 0, offsetWidth: 100, offsetTop: 0, offsetHeight: 100, clientWidth: 100, clientHeight: 100 },
            { offsetLeft: 101, offsetWidth: 100, offsetTop: 0, offsetHeight: 100, clientWidth: 100, clientHeight: 100 },
            { offsetLeft: 207.343, offsetWidth: 100, offsetTop: 0, offsetHeight: 100, clientWidth: 100, clientHeight: 100 },
        ];

        collection.addTimeSlot(mockedElements[0], new Date(), new Date(), true);
        collection.addTimeSlot(mockedElements[1], new Date(), new Date(), true);
        collection.addTimeSlot(mockedElements[2], new Date(), new Date(), true);

        //regular position
        ok(resourceView.timeSlotByPosition(23, 0));
        //position in gape between cell 1 and 2
        ok(resourceView.timeSlotByPosition(100, 0));
        //position in gape between cell 2 and 3
        ok(resourceView.timeSlotByPosition(203.23, 0));
    });

    test("slotByPosition works for vertical slots when table cells have gaps between them", function() {
        //Required for IE and FF in some cases have gaps between cells reported
        //when using offsetLeft + offsetWidth -> offsetLeft
        //For more info: https://github.com/telerik/kendo/issues/4504

        var date = kendo.date.getDate(new Date());

        var collection = resourceView.addTimeSlotCollection(date, kendo.date.addDays(date, 1));

        var mockedElements = [
            { offsetLeft: 0, offsetWidth: 100, offsetTop: 0, offsetHeight: 100, clientWidth: 100, clientHeight: 100 },
            { offsetLeft: 0, offsetWidth: 100, offsetTop: 101, offsetHeight: 100, clientWidth: 100, clientHeight: 100 },
            { offsetLeft: 0, offsetWidth: 100, offsetTop: 207.343, offsetHeight: 100, clientWidth: 100, clientHeight: 100 },
        ];

        collection.addTimeSlot(mockedElements[0], new Date(), new Date(), false);
        collection.addTimeSlot(mockedElements[1], new Date(), new Date(), false);
        collection.addTimeSlot(mockedElements[2], new Date(), new Date(), false);

        //regular position
        ok(resourceView.timeSlotByPosition(0, 23));
        //position in gape between cell 1 and 2
        ok(resourceView.timeSlotByPosition(0, 100));
        //position in gape between cell 2 and 3
        ok(resourceView.timeSlotByPosition(0, 203.23));
    });
})();
