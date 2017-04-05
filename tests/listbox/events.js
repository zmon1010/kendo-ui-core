(function() {
    var listbox;
    var item;

    var DISABLED_STATE_CLASS = "k-state-disabled";
    var SELECTED_STATE_CLASS = "k-state-selected";
    var DOT = ".";
    var REORDER = "reorder";
    var REMOVE = "remove";
    var TRANSFER = "transfer";

    module("ListBox events", {
        teardown: function() {
            destroyListBox(listbox);
            kendo.destroy(QUnit.fixture);
        }
    });

    test("remove action should trigger remove event with args", function() {
        listbox = createListBox({
            remove: function(e) {
                args = e;
            }
        });
        var item = listbox.items().eq(0);
        var items = listbox.items();
        var dataItem = listbox.dataItem(item);
        listbox.select(item);

        clickRemoveButton(listbox);

        equalDataArrays(args.dataItems, [dataItem]);
        equalListItemArrays(args.items, $(item));
    });

    test("remove action should trigger a single remove event for multiple items", function() {
        var calls = 0;
        listbox = createListBox({
            remove: function(e) {
                calls++;
            }
        });
        var removeSpy = spy(listbox, REMOVE);
        listbox.select(listbox.items());

        clickRemoveButton(listbox);

        equal(calls, 1);
    });

    test("remove action should be preventable", function() {
        var args = {};
        listbox = createListBox({
            remove: function(e) {
                args = e;
                e.preventDefault();
            }
        });
        var item = listbox.items().eq(0);
        var itemsLength = listbox.items().length;
        listbox.select(item);

        clickRemoveButton(listbox);

        equal(args.isDefaultPrevented(), true);
        equal(listbox.items().length, itemsLength);
    });

    module("ListBox events", {
        teardown: function() {
            destroyListBox(listbox);
            kendo.destroy(QUnit.fixture);
        }
    });

    test("movedown action should trigger reorder event with args", function() {
        listbox = createListBox({
            reorder: function(e) {
                args = e;
            }
        });
        var item = listbox.items().eq(0);
        var dataItem = getDataItem(listbox, item);
        listbox.select(item);

        clickMoveDownButton(listbox);

        equalDataArrays(args.dataItems, [dataItem]);
        equalListItemArrays(args.items, $(item));        
        equal(args.offset, 1);
    });

    test("movedown action should trigger a single reorder event for multiple items", function() {
        var calls = 0;
        listbox = createListBox({
            reorder: function(e) {
                calls++;
            }
        });
        var item2 = listbox.items().eq(1);
        var item3 = listbox.items().eq(2);
        listbox.select(item2.add(item3));

        clickMoveDownButton(listbox);

        equal(calls, 1);
    });

    test("movedown action should be preventable", function() {
        var args = {};
        listbox = createListBox({
            reorder: function(e) {
                args = e;
                e.preventDefault();
            }
        });
        var item = listbox.items().eq(0);
        var itemsLength = listbox.items().length;
        listbox.select(item);

        clickMoveDownButton(listbox);

        equal(args.isDefaultPrevented(), true);
        equal(listbox.items().length, itemsLength);
    });

    module("ListBox events", {
        teardown: function() {
            destroyListBox(listbox);
            kendo.destroy(QUnit.fixture);
        }
    });

    test("moveup action should trigger reorder event with args", function() {
        listbox = createListBox({
            reorder: function(e) {
                args = e;
            }
        });
        var item = listbox.items().eq(1);
        var dataItem = getDataItem(listbox, item);
        listbox.select(item);

        clickMoveUpButton(listbox);

        equalDataArrays(args.dataItems, [dataItem]);
        equalListItemArrays(args.items, $(item));        
        equal(args.offset, -1);
    });

    test("moveup action should trigger a single reorder event for multiple items", function() {
        var calls = 0;
        listbox = createListBox({
            reorder: function(e) {
                calls++;
            }
        });
        var item2 = listbox.items().eq(1);
        var item3 = listbox.items().eq(2);
        listbox.select(item2.add(item3));

        clickMoveUpButton(listbox);

        equal(calls, 1);
    });

    test("moveup action should be preventable", function() {
        var args = {};
        listbox = createListBox({
            reorder: function(e) {
                args = e;
                e.preventDefault();
            }
        });
        var item = listbox.items().eq(1);
        var itemsLength = listbox.items().length;
        listbox.select(item);

        clickMoveUpButton(listbox);

        equal(args.isDefaultPrevented(), true);
        equal(listbox.items().length, itemsLength);
    });

    module("ListBox events", {
        setup: function() {
            listbox1 = createListBox({
                connectWith: "#listbox2"
            }, "<select id='listbox1' />");

            listbox2 = createListBox({
                dataSource: {
                    data: []
                }
            }, "<select id='listbox2' />");
        },
        teardown: function() {
            destroyListBox(listbox1);
            destroyListBox(listbox2);
            kendo.destroy(QUnit.fixture);
        }
    });

    test("transferTo action should trigger transfer event with args", function() {
        listbox1.bind(TRANSFER, function(e) {
            args = e;
        });
        var item = listbox1.items().eq(0);
        var dataItem = listbox1.dataItem(item);
        listbox1.select(item);

        clickTransferToButton(listbox1);

        equalDataArrays(args.dataItems, [dataItem]);
        equalListItemArrays(args.items, $(item));
    });

    test("transferTo action should trigger a single transfer event for multiple items", function() {
        var calls = 0;
        listbox1.bind(TRANSFER, function(e) {
            calls++;
        });
        var item2 = listbox1.items().eq(1);
        var item3 = listbox1.items().eq(2);
        var transferSpy = spy(listbox1, TRANSFER);
        listbox1.select(item2.add(item3));

        clickTransferToButton(listbox1);

        equal(calls, 1);
    });

    test("transferTo action should be preventable", function() {
        var args = {};
        listbox1.bind(TRANSFER, function(e) {
            args = e;
            e.preventDefault();
        });
        var item = listbox1.items().eq(0);
        var itemsLength = listbox1.items().length;
        listbox1.select(item);

        clickTransferToButton(listbox1);

        equal(args.isDefaultPrevented(), true);
        equal(listbox1.items().length, itemsLength);
    });

    module("ListBox events", {
        setup: function() {
            listbox1 = createListBox({}, "<select id='listbox1' />");

            listbox2 = createListBox({
                dataSource: {
                    data: [{
                        id: 5,
                        text: "item5"
                    }, {
                        id: 6,
                        text: "item6"
                    }]
                },
                connectWith: "#listbox1"
            }, "<select id='listbox2' />");

             $(document.body).append(QUnit.fixture);
        },
        teardown: function() {
            destroyListBox(listbox1);
            destroyListBox(listbox2);
            kendo.destroy(QUnit.fixture);
            $(document.body).find(QUnit.fixture).off().remove();
        }
    });

    test("transferFrom action should trigger transfer event of the source listbox", function() {
        var args = {};
        listbox2.bind(TRANSFER, function(e) {
            args = e;
        });
        var item = listbox2.items().eq(0);
        var dataItem = getDataItem(listbox2, item);
        listbox2.select(item);

        clickTransferFromButton(listbox1);

        equalDataArrays(args.dataItems, [dataItem]);
        equalListItemArrays(args.items, $(item));
    });

    test("transferFrom action should trigger a single transfer event for multiple items", function() {
        var calls = 0;
        listbox2.bind(TRANSFER, function(e) {
            calls++;
        });
        var item1 = listbox2.items().eq(0);
        var item2 = listbox2.items().eq(1);
        listbox2.select(item2.add(item1));

        clickTransferFromButton(listbox1);

        equal(calls, 1);
    });

    test("transferFrom action should be preventable", function() {
        var args = {};
        listbox2.bind(TRANSFER,  function(e) {
            args = e;
            e.preventDefault();
        });
        var item = listbox2.items().eq(0);
        var itemsLength1 = listbox1.items().length;
        var itemsLength2 = listbox2.items().length;
        listbox2.select(item);

        clickTransferFromButton(listbox1);

        equal(args.isDefaultPrevented(), true);
        equal(listbox1.items().length, itemsLength1);
        equal(listbox2.items().length, itemsLength2);
    });

    module("ListBox events", {
        setup: function() {
            listbox1 = createListBox({
                connectWith: "#listbox2"
            }, "<select id='listbox1' />");

            listbox2 = createListBox({
                dataSource: {
                    data: []
                }
            }, "<select id='listbox2' />");
        },
        teardown: function() {
            destroyListBox(listbox1);
            destroyListBox(listbox2);
            kendo.destroy(QUnit.fixture);
        }
    });

    test("transferAllTo action should trigger transfer event with args", function() {
        var items = listbox1.items();
        var dataItems = listbox1.dataItems();
        listbox1.bind(TRANSFER, function(e) {
            args = e;
        });

        clickTransferAllToButton(listbox1);

        equalDataArrays(args.dataItems, dataItems);
        equalListItemArrays(args.items, $(items));
    });

    test("transferFrom action should trigger a single transfer event for all items", function() {
        var calls = 0;
        listbox1.bind(TRANSFER, function(e) {
            calls++;
        });

        clickTransferAllToButton(listbox1);

        equal(calls, 1);
    });

    test("transferAllTo action should be preventable", function() {
        var args = {};
        listbox1.bind(TRANSFER, function(e) {
            args = e;
            e.preventDefault();
        });
        var itemsLength = listbox1.items().length;

        clickTransferAllToButton(listbox1);

        equal(args.isDefaultPrevented(), true);
        equal(listbox1.items().length, itemsLength);
    });
})();
