(function() {
    module("kendo.ui.StaticList MVVM binding", {
        setup: function() {
            QUnit.fixture
                .append("<script type='text/x-kendo-template' id='item-template'>#:data#</script>");
        },
        teardown: function() {
            kendo.destroy(QUnit.fixture);
        }
    });

    test("declarative initialization", function() {
        var dom = $("<ul data-role='staticlist' />").appendTo(QUnit.fixture);

        kendo.bind(QUnit.fixture);

        ok(dom.data("kendoStaticList"));
    });

    test("source binding", function() {
        var dom = $("<ul data-role='staticlist' " +
                        "data-template='item-template' " +
                        "data-bind='source: items' />").appendTo(QUnit.fixture);

        kendo.bind(QUnit.fixture, {
            items: [ "foo", "bar", "baz" ]
        });

        equal(dom.find(".k-item").length, 3);
    });

    test("two-way value binding", function() {
        var dom = $("<ul data-role='staticlist' " +
                        "data-template='item-template' " +
                        "data-value-field='value' " +
                        "data-bind='source: items, value: selected' />").appendTo(QUnit.fixture);

        var viewModel = kendo.observable({
            items: [
                { text: "foo", value: "foo" },
                { text: "bar", value: "bar" },
                { text: "baz", value: "baz" }
            ],
            selected: "bar"
        });

        kendo.bind(QUnit.fixture, viewModel);

        ok(dom.find(".k-item").eq(1).hasClass("k-state-selected"));

        viewModel.set("selected", "foo");

        ok(dom.find(".k-item").eq(0).hasClass("k-state-selected"));
        ok(!dom.find(".k-item").eq(1).hasClass("k-state-selected"));
    });
})();
