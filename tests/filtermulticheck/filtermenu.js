(function() {
    var DataSource = kendo.data.DataSource,
        FilterMenu = kendo.ui.FilterMenu,
        filterMenu,
        model,
        dom,
        dataSource;

    module("kendo.ui.FilterMenu", {
        setup: function() {
            kendo.effects.disable();
            kendo.ns = "kendo-";
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

            dom = $("<th data-kendo-field=foo />").appendTo(QUnit.fixture);
        },

        teardown: function() {
            kendo.effects.enable();
            dataSource.unbind("change");
            kendo.destroy(QUnit.fixture);
            $(".k-filter-menu").remove();
            kendo.ns = "";
        }
    });

    function setup(dom, options, init) {
        var menu = new FilterMenu(dom, options);
        if (init !== false) {
            menu._init();
        }
        return menu;
    }

    test("menu link has negative tabindex", function() {

    });
})();
