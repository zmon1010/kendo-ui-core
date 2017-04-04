(function() {
    var listbox;
    var item;
    var item1;
    var item2;
    var item3;
    var item4;
    var args;

    var DOT = ".";
    var DISABLED_STATE_CLASS = "k-state-disabled";
    var SELECTED_STATE_CLASS = "k-state-selected";
    var REMOVE = "remove";
    var TRANSFER = "transfer";

    function getId(item) {
        return item.data("uid");
    }

    module("ListBox toolbar", {
        teardown: function() {
            destroyListBox(listbox);
            kendo.destroy(QUnit.fixture);
        }
    });

    test("remove action should not work without selection", function() {
        listbox = createListBox();
        var itemsLength = listbox.items().length;

        clickRemoveButton(listbox);

        equal(listbox.items().length, itemsLength);
    });

    test("remove action should call listbox.remove()", function() {
        listbox = createListBox();
        var item = listbox.items().eq(0);
        var removeStub = stub(listbox, REMOVE);
        listbox.select(item);

        clickRemoveButton(listbox);

        equal(removeStub.args(REMOVE)[0][0], item[0]);
    });

    module("ListBox toolbar", {
        setup: function() {
            listbox = createListBox();
            item1 = listbox.items().eq(0);
            item2 = listbox.items().eq(1);
            item3 = listbox.items().eq(2);
            item4 = listbox.items().eq(3);
        },
        teardown: function() {
            destroyListBox(listbox);
            kendo.destroy(QUnit.fixture);
        }
    });

    test("moveup action should not move the html element of the first list item", function() {
        listbox.select(item);

        clickMoveUpButton(listbox);

        equal(listbox.items()[0], item1[0]);
    });

    test("moveup action should not move the data item of the first list item in the dataSource", function() {
        listbox.select(item);

        clickMoveUpButton(listbox);

        equal(listbox.dataSource.at(0).uid, getId(item1));
    });

    test("moveup action should move the html element of a list item", function() {
        listbox.select(item2);

        clickMoveUpButton(listbox);

        equalListItems(listbox.items().eq(0), item2);
        equalListItems(listbox.items().eq(1), item1);
    });

    test("moveup action should move the data item of a list item in the dataSource", function() {
        listbox.select(item2);

        clickMoveUpButton(listbox);

        equal(listbox.dataSource.at(0).uid, getId(item2));
        equal(listbox.dataSource.at(1).uid, getId(item1));
    });

    test("moveup action should reorder the html elements of multiple list items", function() {
        listbox.select(item3.add(item2));

        clickMoveUpButton(listbox);

        equalListItems(listbox.items().eq(0), item2);
        equalListItems(listbox.items().eq(1), item3);
        equalListItems(listbox.items().eq(2), item1);
        equalListItems(listbox.items().eq(3), item4);
    });

    test("moveup action should reorder the data items of multiple list items in the dataSource", function() {
        listbox.select(item2.add(item3));

        clickMoveUpButton(listbox);

        equal(listbox.dataSource.at(0).uid, getId(item2));
        equal(listbox.dataSource.at(1).uid, getId(item3));
        equal(listbox.dataSource.at(2).uid, getId(item1));
        equal(listbox.dataSource.at(3).uid, getId(item4));
    });

    test("moveup action should reorder the html elements of non-adjacent list items", function() {
        listbox.select(item2.add(item4));

        clickMoveUpButton(listbox);

        equalListItems(listbox.items().eq(0), item2);
        equalListItems(listbox.items().eq(1), item1);
        equalListItems(listbox.items().eq(2), item4);
        equalListItems(listbox.items().eq(3), item3);
    });

    test("moveup action should reorder the data items of non-adjacent list items in the dataSource", function() {
        listbox.select(item4.add(item2));

        clickMoveUpButton(listbox);

        equal(listbox.dataSource.at(0).uid, getId(item2));
        equal(listbox.dataSource.at(1).uid, getId(item1));
        equal(listbox.dataSource.at(2).uid, getId(item4));
        equal(listbox.dataSource.at(3).uid, getId(item3));
    });

    test("moveup action should not reorder the html elements of multiple list items at the top", function() {
        listbox.select(item1.add(item2));

        clickMoveUpButton(listbox);

        equalListItems(listbox.items().eq(0), item1);
        equalListItems(listbox.items().eq(1), item2);
        equalListItems(listbox.items().eq(2), item3);
        equalListItems(listbox.items().eq(3), item4);
    });

    test("moveup action should not reorder the data items of multiple list items at the top in the dataSource", function() {
        listbox.select(item1.add(item2));

        clickMoveUpButton(listbox);

        equal(listbox.dataSource.at(0).uid, getId(item1));
        equal(listbox.dataSource.at(1).uid, getId(item2));
        equal(listbox.dataSource.at(2).uid, getId(item3));
        equal(listbox.dataSource.at(3).uid, getId(item4));
    });

    test("moveup action should not partially reorder the html elements of multiple list items at the top", function() {
        listbox.select(item1.add(item3));

        clickMoveUpButton(listbox);

        equalListItems(listbox.items().eq(0), item1);
        equalListItems(listbox.items().eq(1), item2);
        equalListItems(listbox.items().eq(2), item3);
        equalListItems(listbox.items().eq(3), item4);
    });

    test("moveup action should not partially reorder the data items of multiple list items at the top in the dataSource", function() {
        listbox.select(item3.add(item1));

        clickMoveUpButton(listbox);

        equal(listbox.dataSource.at(0).uid, getId(item1));
        equal(listbox.dataSource.at(1).uid, getId(item2));
        equal(listbox.dataSource.at(2).uid, getId(item3));
        equal(listbox.dataSource.at(3).uid, getId(item4));
    });

    module("ListBox toolbar", {
        setup: function() {
            listbox = createListBox();
            item1 = listbox.items().eq(0);
            item2 = listbox.items().eq(1);
            item3 = listbox.items().eq(2);
            item4 = listbox.items().eq(3);
        },
        teardown: function() {
            destroyListBox(listbox);
            kendo.destroy(QUnit.fixture);
        }
    });

    test("movedown action should not move the html element of the last list item", function() {
        listbox.select(item4);

        clickMoveDownButton(listbox);

        equal(listbox.items()[3], item4[0]);
    });

    test("movedown action should not move the data item of the last list item in the dataSource", function() {
        listbox.select(item4);

        clickMoveDownButton(listbox);

        equal(listbox.dataSource.at(3).uid, getId(item4));
    });

    test("movedown action should move the html element of a list item", function() {
        listbox.select(item1);

        clickMoveDownButton(listbox);

        equalListItems(listbox.items().eq(0), item2);
        equalListItems(listbox.items().eq(1), item1);
    });

    test("movedown action should move the data item of a list item in the dataSource", function() {
        listbox.select(item1);

        clickMoveDownButton(listbox);

        equal(listbox.dataSource.at(0).uid, getId(item2));
        equal(listbox.dataSource.at(1).uid, getId(item1));
    });

    test("movedown action should reorder the html elements of multiple list items", function() {
        listbox.select(item2.add(item3));

        clickMoveDownButton(listbox);

        equalListItems(listbox.items().eq(0), item1);
        equalListItems(listbox.items().eq(1), item4);
        equalListItems(listbox.items().eq(2), item2);
        equalListItems(listbox.items().eq(3), item3);
    });

    test("movedown action should reorder the data items of multiple list items in the dataSource", function() {
        listbox.select(item2.add(item3));

        clickMoveDownButton(listbox);

        equal(listbox.dataSource.at(0).uid, getId(item1));
        equal(listbox.dataSource.at(1).uid, getId(item4));
        equal(listbox.dataSource.at(2).uid, getId(item2));
        equal(listbox.dataSource.at(3).uid, getId(item3));
    });

    test("movedown action should reorder the html elements of non-adjacent list items", function() {
        listbox.select(item1.add(item3));

        clickMoveDownButton(listbox);

        equalListItems(listbox.items().eq(0), item2);
        equalListItems(listbox.items().eq(1), item1);
        equalListItems(listbox.items().eq(2), item4);
        equalListItems(listbox.items().eq(3), item3);
    });

    test("movedown action should reorder the data items of non-adjacent list items in the dataSource", function() {
        listbox.select(item1.add(item3));

        clickMoveDownButton(listbox);

        equal(listbox.dataSource.at(0).uid, getId(item2));
        equal(listbox.dataSource.at(1).uid, getId(item1));
        equal(listbox.dataSource.at(2).uid, getId(item4));
        equal(listbox.dataSource.at(3).uid, getId(item3));
    });

    test("movedown action should not reorder the html elements of multiple list items at the bottom", function() {
        listbox.select(item2.add(item4));

        clickMoveDownButton(listbox);

        equalListItems(listbox.items().eq(0), item1);
        equalListItems(listbox.items().eq(1), item2);
        equalListItems(listbox.items().eq(2), item3);
        equalListItems(listbox.items().eq(3), item4);
    });

    test("movedown action should not reorder the data items of multiple list items at the bottom in the dataSource", function() {
        listbox.select(item3.add(item4));

        clickMoveDownButton(listbox);

        equal(listbox.dataSource.at(0).uid, getId(item1));
        equal(listbox.dataSource.at(1).uid, getId(item2));
        equal(listbox.dataSource.at(2).uid, getId(item3));
        equal(listbox.dataSource.at(3).uid, getId(item4));
    });

    test("movedown action should not partially reorder the html elements of multiple list items at the bottom", function() {
        listbox.select(item2.add(item4));

        clickMoveDownButton(listbox);

        equalListItems(listbox.items().eq(0), item1);
        equalListItems(listbox.items().eq(1), item2);
        equalListItems(listbox.items().eq(2), item3);
        equalListItems(listbox.items().eq(3), item4);
    });

    test("movedown action should not partially reorder the data items of multiple list items at the bottom in the dataSource", function() {
        listbox.select(item2.add(item4));

        clickMoveDownButton(listbox);

        equal(listbox.dataSource.at(0).uid, getId(item1));
        equal(listbox.dataSource.at(1).uid, getId(item2));
        equal(listbox.dataSource.at(2).uid, getId(item3));
        equal(listbox.dataSource.at(3).uid, getId(item4));
    });

    module("ListBox toolbar", {
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

    test("transferTo action should not work without selection", function() {
        var itemsLength = listbox1.items().length;

        clickTransferToButton(listbox1);

        equal(listbox1.items().length, itemsLength);
        equal(listbox2.items().length, 0);
    });

    test("transferTo action should call listbox.transfer()", function() {
        var item = listbox1.items().eq(0);
        var transferStub = stub(listbox1, TRANSFER);
        listbox1.select(item);

        clickTransferToButton(listbox1);

        equal(transferStub.args(TRANSFER)[0][0], item[0]);
    });

    module("ListBox toolbar", {
        setup: function() {
            listbox1 = createListBox({
                connectWith: "#listbox2"
            }, "<select id='listbox1' />");

            listbox2 = createListBox({
                dataSource: {
                    data: [{
                        id: 5,
                        text: "item5"
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

    test("transferFrom action should not work without selection", function() {
        var itemsLength = listbox1.items().length;

        clickTransferFromButton(listbox1);

        equal(listbox1.items().length, itemsLength);
        equal(listbox2.items().length, 1);
    });

    test("transferFrom action should call transfer() from the source listbox", function() {
        var item = listbox2.items().eq(0);
        var transferStub = stub(listbox2, TRANSFER);
        listbox2.select(item);

        clickTransferFromButton(listbox1);

        equal(transferStub.args(TRANSFER)[0][0], item[0]);
    });
})();
