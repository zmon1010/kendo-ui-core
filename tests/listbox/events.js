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

    test("remove action should trigger remove event", function() {
        listbox = createListBox({
            remove: function(e) {
                args = e;
            }
        });
        var item = listbox.items().eq(0);
        var dataItem = getDataItem(listbox, item);
        listbox.select(item);

        clickRemoveButton(listbox);

        deepEqual(args.dataItem, dataItem);
        equal(args.item[0], item[0]);
    });

    test("remove action should trigger remove event for multiple items", function() {
        listbox = createListBox();
        var itemsLength = listbox.items().length;
        var removeSpy = spy(listbox, REMOVE);
        listbox.select(listbox.items());

        clickRemoveButton(listbox);

        equal(removeSpy.calls(REMOVE), itemsLength);
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

    test("movedown action should trigger reorder event", function() {
        listbox = createListBox({
            reorder: function(e) {
                args = e;
            }
        });
        var item = listbox.items().eq(0);
        var dataItem = getDataItem(listbox, item);
        listbox.select(item);

        clickMoveDownButton(listbox);

        deepEqual(args.dataItem, dataItem);
        equal(args.item[0], item[0]);
    });

    test("movedown action should trigger reorder event for multiple items", function() {
        listbox = createListBox();
        var item2 = listbox.items().eq(1);
        var item3 = listbox.items().eq(2);
        var itemsLength = listbox.items().length;
        var reorderSpy = spy(listbox, REORDER);
        listbox.select(item2.add(item3));

        clickMoveDownButton(listbox);

        equal(reorderSpy.calls(REORDER), 2);
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
        setup: function() {
            listbox1 = createListBox({
                connectWith: "#listbox2"
            }, "<div id='listbox1' />");

            listbox2 = createListBox({
                dataSource: {
                    data: []
                }
            }, "<div id='listbox2' />");
        },
        teardown: function() {
            destroyListBox(listbox1);
            destroyListBox(listbox2);
            kendo.destroy(QUnit.fixture);
        }
    });

    test("transferTo action should trigger transfer event", function() {
        listbox1 = createListBox({
            transfer: function(e) {
                args = e;
            }
        });
        var item = listbox1.items().eq(0);
        var dataItem = getDataItem(listbox1, item);
        listbox1.select(item);

        clickTransferToButton(listbox1);

        deepEqual(args.dataItem, dataItem);
        equal(args.item[0], item[0]);
    });

    test("transferTo action should trigger transfer event for multiple items", function() {
        var item2 = listbox1.items().eq(1);
        var item3 = listbox1.items().eq(2);
        var transferSpy = spy(listbox1, TRANSFER);
        listbox1.select(item2.add(item3));

        clickTransferToButton(listbox1);

        equal(transferSpy.calls(TRANSFER), 2);
    });

    test("transferTo action should be preventable", function() {
        var args = {};
        listbox1 = createListBox({
            transfer: function(e) {
                args = e;
                e.preventDefault();
            }
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
            listbox1 = createListBox({}, "<div id='listbox1' />");

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
            }, "<div id='listbox2' />");

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

        deepEqual(args.dataItem, dataItem);
        equal(args.item[0], item[0]);
    });

    test("transferFrom action should trigger transfer event for multiple items", function() {
        var item1 = listbox2.items().eq(0);
        var item2 = listbox2.items().eq(1);
        var transferSpy = spy(listbox2, TRANSFER);
        listbox2.select(item2.add(item1));

        clickTransferFromButton(listbox1);

        equal(transferSpy.calls(TRANSFER), 2);
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
})();
