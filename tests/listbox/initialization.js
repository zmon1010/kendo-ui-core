(function() {
    var ListBox = kendo.ui.ListBox,
        div;

    module("kendo.ui.ListBox initialization", {
        setup: function() {
            div = $("<div />").appendTo(QUnit.fixture);
        },
        teardown: function() {
            kendo.destroy(QUnit.fixture);
        }
    });

    test("ListBox attaches a listbox object to a target", function() {
        var listBox = new ListBox(div);
        ok(div.data("kendoListBox") instanceof ListBox);
    });

    test("Has selectedable on", function() {
        var listBox = new ListBox(div, {
            selectable: true
        });

        ok(listBox.selectable instanceof kendo.ui.Selectable);
    });

    test("Selectable is always on", function() {
        var listBox = new ListBox(div, {
            selectable: false
        });

        ok(listBox.selectable instanceof kendo.ui.Selectable);
    });

    test("Selectable is destroyed on widget destroy", function() {
        var listBox = new ListBox(div);
        var destroySpy = spy(listBox.selectable, "destroy");

        listBox.destroy();

        equal(destroySpy.calls("destroy"), 1);
        equal(listBox.selectable, undefined);
    });
})();
