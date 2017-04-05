(function() {
    var ListBox = kendo.ui.ListBox;
    var div;
    var listbox;

    module("ListBox initialization", {
        setup: function() {
            div = $("<select />").appendTo(QUnit.fixture);
        },
        teardown: function() {
            destroyListBox(listbox);
            kendo.destroy(QUnit.fixture);
        }
    });

    test("ListBox attaches a listbox object to a target", function() {
        listbox = new ListBox(div);
        ok(div.data("kendoListBox") instanceof ListBox);
    });

    test("should add k-listbox class to wrapper", function() {
        listbox = new ListBox(div);

        equal(listbox.wrapper.hasClass("k-listbox"), true);
    });

    test("Has selectedable on", function() {
        listbox = new ListBox(div, {
            selectable: true
        });

        ok(listbox.selectable instanceof kendo.ui.Selectable);
    });

    test("Selectable is always on", function() {
        listbox = new ListBox(div, {
            selectable: false
        });

        ok(listbox.selectable instanceof kendo.ui.Selectable);
    });

    test("selectable should be destroyed on widget destroy", function() {
        listbox = new ListBox(div);
        var destroySpy = spy(listbox.selectable, "destroy");

        listbox.destroy();

        equal(destroySpy.calls("destroy"), 1);
        equal(listbox.selectable, null);
    });

    test("toolbar should be destroyed on widget destory", function() {
        listbox = new ListBox(div);

        listbox.destroy();

        equal(listbox.toolbar, null);
    });
})();
