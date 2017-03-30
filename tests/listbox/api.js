(function() {
    var listbox;
    var listbox1;
    var listbox2;
    var dataSource;
    var data;
    var item;
    var item1;
    var item2;
    var dataItems = [{
        id: 1,
        text: "item1"
    }, {
        id: 2,
        text: "item2"
    }, {
        id: 3,
        text: "item3"
    }, {
        id: 4,
        text: "item4"
    }];

    var DISABLED_STATE_CLASS = "k-state-disabled";
    var SELECTED_STATE_CLASS = "k-state-selected";
    var DOT = ".";

    function createListBox(options, html) {
        var listbox = createListBoxFromHtml(html, $.extend({
            dataSource: {
                data: dataItems
            },
            dataTextField: "text"
        }, options || {}));

        return listbox;
    }

    function getDataItem(listbox, item) {
        return listbox.dataSource.getByUid(getId(item));
    }

    function getId(item) {
        return item.data("uid");
    }

    function getList(listbox) {
        return listbox.wrapper.find(".k-listBox");
    }

    module("ListBox api", {
        setup: function() {
            listbox = createListBox();
            item1 = listbox.items().eq(0);
        },
        teardown: function() {
            destroyListBox(listbox);
            kendo.destroy(QUnit.fixture);
        }
    });

    test("remove() should remove the item from the dataSource", function() {
        listbox.remove(item1);

        equal(listbox.dataSource.data().length, 3);
        equal(getDataItem(listbox, item1), undefined);
    });

    test("remove() should remove the html element of the item", function() {
        listbox.remove(item1);

        equal(listbox.items().length, 3);
        equal(listbox.items().eq(0).html(), dataItems[1].text);
        equal(listbox.items().eq(1).html(), dataItems[2].text);
    });

    test("remove() should not remove an item that shouldn't exist", function() {
        listbox.remove(null);

        equal(listbox.dataSource.data().length, 4);
    });

    test("remove() should remove multiple items from the dataSource", function() {
        listbox.remove(listbox.items());

        equal(listbox.dataSource.data().length, 0);
    });

    test("remove() should remove multiple html elements of the items", function() {
        listbox.remove(listbox.items());

        equal(listbox.items().length, 0);
    });

    module("ListBox api", {
        setup: function() {
            listbox = createListBox();
        },
        teardown: function() {
            destroyListBox(listbox);
            kendo.destroy(QUnit.fixture);
        }
    });

    test("dataItem() should return data item for element", function() {
        var dataItem = listbox.dataItem(listbox.items().eq(0));

        equal(dataItem.id, dataItems[0].id);
    });

    test("dataItem() should not return dataItem for non-existing element", function() {
        var dataItem = listbox.dataItem(null);

        equal(dataItem, undefined);
    });

    module("ListBox api", {
        setup: function() {
            listbox1 = createListBox({
                connectWith: "#listbox2"
            }, "<div id='listbox1' />");

            listbox2 = createListBox({
                dataSource: {
                    data: []
                }
            }, "<div id='listbox2' />");

            item1 = listbox1.items().eq(0);
        },
        teardown: function() {
            destroyListBox(listbox1);
            destroyListBox(listbox2);
            kendo.destroy(QUnit.fixture);
        }
    });

    test("transfer() should remove a data item from the source listbox dataSource", function() {
        listbox1.transfer(item1);

        equal(listbox1.dataSource.data().length, 3);
        equal(getDataItem(listbox1, item1), undefined);
    });

    test("transfer() should remove element from the source listbox html", function() {
        listbox1.transfer(item1);

        equal(listbox1.items().length, 3);
        equal(listbox1.items().eq(0).html(), dataItems[1].text);
        equal(listbox1.items().eq(1).html(), dataItems[2].text);
    });

    test("transfer() should remove the selected item from the source listbox dataSource", function() {
        listbox1.select(item1);

        listbox1.transfer(listbox1.select());

        equal(listbox1.dataSource.data().length, 3);
        equal(listbox.dataSource.at(0).uid, getId(listbox.items().eq(0)));
    });

    test("transfer() should remove selected element from the source listbox html", function() {
        listbox1.select(item1);

        listbox1.transfer(listbox1.select());

        equal(listbox1.items().length, 3);
        equal(listbox1.items().eq(0).html(), dataItems[1].text);
        equal(listbox1.items().eq(1).html(), dataItems[2].text);
    });

    test("transfer() should remove multiple items from the source listbox", function() {
        listbox1.transfer(listbox1.items());

        equal(listbox1.dataSource.data().length, 0);
        equal(listbox1.items().length, 0);
    });

    test("transfer() should add a data item to the destination listbox dataSource", function() {
        listbox1.transfer(item1);
        data = listbox2.dataSource.data();

        equal(listbox2.dataSource.data().length, 1);
        equal(listbox2.dataSource.at(0).uid, getId(item1));
    });

    test("transfer() should add element to the destination listbox html", function() {
        listbox1.transfer(item1);

        equal(listbox2.dataSource.data().length, 1);
        equal(listbox2.items().eq(0).html(), item1.html());
    });

    test("transfer() should add the selected item to the destination listbox dataSource", function() {
        listbox1.select(item1);

        listbox1.transfer(listbox1.select());

        equal(listbox2.dataSource.data().length, 1);
        equal(listbox2.dataSource.at(0).uid, getId(item1));
    });

    test("transfer() should add selected element to the destination listbox html", function() {
        listbox1.select(item1);

        listbox1.transfer(listbox1.select());

        equal(listbox2.items().length, 1);
        equal(listbox2.items().eq(0).html(), item1.html());
    });

    test("transfer() should add multiple items to the destination listbox", function() {
        var transferredItems = listbox1.items();

        listbox1.transfer(transferredItems);

        equal(listbox2.dataSource.data().length, transferredItems.length);
        equal(listbox2.items().length, transferredItems.length);
    });

    test("transfer() should not change selection in destiantion listbox", function() {
        listbox2.dataSource.add({ id: 21, text: "item21" });
        listbox2.select(listbox2.items());
        listbox1.select(item1);

        listbox1.transfer(listbox1.select());

        equal(listbox2.items().eq(0).hasClass(SELECTED_STATE_CLASS), true);
    });

    test("transfer() should not change disabled state of items in destiantion listbox", function() {
        listbox2.dataSource.add({ id: 21, text: "item21" });
        listbox2.select(listbox2.items().addClass(DISABLED_STATE_CLASS));
        listbox1.select(item1);

        listbox1.transfer(listbox1.select());

        equal(listbox2.items().eq(0).hasClass(DISABLED_STATE_CLASS), true);
    });

    module("ListBox api", {
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

    test("reorder() should move the html element of a list item", function() {
        listbox.reorder(item1, 1);

        equalListItems(listbox.items().eq(0), item2);
        equalListItems(listbox.items().eq(1), item1);
    });

    test("reorder() should move the data item of a list item in the dataSource", function() {
        listbox.reorder(item1, 1);

        equal(listbox.dataSource.at(0).uid, getId(item2));
        equal(listbox.dataSource.at(1).uid, getId(item1));
    });

    test("reorder() should not reorder at invalid index", function() {
        listbox.reorder(item1, -1);

        equalListItems(listbox.items().eq(0), item1);
    });

    test("reorder() should not reorder with invalid item", function() {
        listbox.reorder($(), 0);

        equalListItems(listbox.items().eq(0), item1);
    });

    test("reorder() should keep item selection", function() {
        item1.addClass(SELECTED_STATE_CLASS);

        listbox.reorder(item1, 1);

        equal(listbox.items().eq(1).hasClass(SELECTED_STATE_CLASS), true);
    });

    test("reorder() should keep item disabled state", function() {
        item1.addClass(DISABLED_STATE_CLASS);

        listbox.reorder(item1, 1);

        equal(listbox.items().eq(1).hasClass(DISABLED_STATE_CLASS), true);
    });

    module("ListBox api", {
        setup: function() {
            listbox = createListBox();
            dataSource = new kendo.data.DataSource({
                data: [{ value: 1 }]
            });
        },
        teardown: function() {
            destroyListBox(listbox);
            kendo.destroy(QUnit.fixture);
        }
    });

    test("setDataSource() should set options.dataSource", function() {
        var dataSource = [1, 2, 3];

        listbox.setDataSource(dataSource);

        equal(listbox.options.dataSource, dataSource);
    });

    test("setDataSource() should change dataSource items", function() {
        listbox.setDataSource(dataSource);

        equal(listbox.dataSource.data()[0].uid, dataSource.data()[0].uid);
    });

    test("setDataSource() should call fetch if autoBind is true", function() {
        listbox = createListBox({ autoBind: true });
        var fetchSpy = spy(dataSource, "fetch");

        listbox.setDataSource(dataSource);

        equal(fetchSpy.calls("fetch"), 1);
    });

    test("setDataSource() should not call fetch if autoBind is false", function() {
        listbox = createListBox({ autoBind: false });
        var fetchSpy = spy(dataSource, "fetch");

        listbox.setDataSource(dataSource);

        equal(fetchSpy.calls("fetch"), 0);
    });

    module("ListBox api", {
        setup: function() {
            listbox = createListBox();
        },
        teardown: function() {
            destroyListBox(listbox);
            kendo.destroy(QUnit.fixture);
        }
    });

    test("refresh() should render list items", function() {
        listbox.element.find(".k-item").remove();

        listbox.refresh();

        deepEqual(listbox.items().length, listbox.dataSource.data().length);
    });

    module("ListBox api", {
        setup: function() {
            listbox = createListBox();
            item1 = listbox.items().eq(0);
            item2 = listbox.items().eq(1);
        },
        teardown: function() {
            destroyListBox(listbox);
            kendo.destroy(QUnit.fixture);
        }
    });

    test("enable() should enable single item", function() {
        listbox.enable(item1);

        equal(item1.hasClass(DISABLED_STATE_CLASS), false);
    });

    test("enable() should enable multiple items", function() {
        listbox.enable(item1.add(item2));

        equal(item1.hasClass(DISABLED_STATE_CLASS), false);
        equal(item2.hasClass(DISABLED_STATE_CLASS), false);
    });

    test("enable(true) should enable single item", function() {
        listbox.enable(item1, true);

        equal(item1.hasClass(DISABLED_STATE_CLASS), false);
    });

    test("enable(true) should enable multiple items", function() {
        listbox.enable(item1.add(item2), true);

        equal(item1.hasClass(DISABLED_STATE_CLASS), false);
        equal(item2.hasClass(DISABLED_STATE_CLASS), false);
    });

    test("enable() should disable single item", function() {
        listbox.enable(item1, false);

        equal(item1.hasClass(DISABLED_STATE_CLASS), true);
    });

    test("enable() should disable multiple items", function() {
        listbox.enable(item1.add(item2), false);

        equal(item1.hasClass(DISABLED_STATE_CLASS), true);
        equal(item2.hasClass(DISABLED_STATE_CLASS), true);
    });

    test("enable() should remove selection", function() {
        listbox.select(item1);

        listbox.enable(item1, false);

        equal(item1.hasClass(SELECTED_STATE_CLASS), false);
        equal(item1.hasClass(DISABLED_STATE_CLASS), true);
    });
})();
