(function() {
    var DataSource = kendo.data.DataSource,
        FilterCell = kendo.ui.FilterCell,
        filterCell,
        dom,
        dataSource;

    function setup(dom, options) {
        var menu = new FilterCell(dom, options);
        return menu;
    }

    module("kendo.ui.FilterCell aria", {
        setup: function() {
            kendo.effects.disable();
            dataSource = new DataSource({
                schema: {
                    model: {
                        fields: {
                            foo: {
                                type: "string"
                            },
                            bar: {
                                type: "number"
                            },
                            baz: {
                                type: "date"
                            },
                            boo: {
                                type: "boolean"
                            }
                        }
                    }
                }
            });

            dom = $("<th data-kendo-field=bar />").appendTo(QUnit.fixture);
        },
        teardown: function() {
            kendo.effects.enable();
            dataSource.unbind("change");
            kendo.destroy(QUnit.fixture);
            $(".k-row-filter").remove();
        }
    });

    test("element has aria-label attribute with column title", function() {
        filterCell = setup(dom, { column: { title: "Column title" }, dataSource: dataSource });

        equal(filterCell.input.attr("aria-label"), "Column title");
    });

    test("element has aria-label attribute with column filed", function() {
        filterCell = setup(dom, { column: { field: "Column field" }, dataSource: dataSource });

        equal(filterCell.input.attr("aria-label"), "Column field");
    });

    test("element has aria-label attribute with column title and field", function() {
        filterCell = setup(dom, { column: { title: "Column title", field: "Column field" }, dataSource: dataSource });

        equal(filterCell.input.attr("aria-label"), "Column title");
    });

    test("element changes aria label on filter operator change", function() {
        filterCell = setup(dom, {
            dataSource: dataSource,
            operators: {
                contains: "Contains",
                eq: "Is equal to"
            }
        });

        var dropdown = filterCell.element.find("input.k-dropdown-operator");

        equal(dropdown.attr("aria-label"), "Is equal to");

        filterCell.viewModel.operator = "contains";
        filterCell.viewModel.trigger("change");

        equal(dropdown.attr("aria-label"), "Contains");
    });

    test("element of type numeric has accessibilily attributes", function() {
        filterCell = setup(dom, {
            field: "bar",
            column: { title: "Column title" },
            dataSource: dataSource
        });

        equal(filterCell.input.attr("title"), "Column title");
    });

    test("element of type boolean has accessibilily attributes", function() {
        filterCell = setup(dom, {
            field: "boo",
            dataSource: dataSource
        });

        equal(filterCell.element.find(".k-operator-hidden div").text(), "eq");
    });

    test("clear filter button has accessibilily attributes", function() {
        filterCell = setup(dom, {
            column: { title: "Column title" },
            dataSource: dataSource
        });
        var clearButton = filterCell.element.find("button.k-button-icon");

        equal(clearButton.attr("aria-label"), "Clear");
    });
})();
