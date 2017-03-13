(function() {
    var FilterMenu = kendo.ui.FilterMenu,
        DataSource = kendo.data.DataSource,
        filterMenu,
        dom,
        dataSource;


    function setup(dom, options, init) {
        var menu = new FilterMenu(dom, options);
        if (init !== false) {
            menu._init();
        }
        return menu;
    }

    module("kendo.ui.FilterMenu aria", {
        setup: function() {
            dataSource = new DataSource({
                schema: {
                    model: {
                        fields: {
                            foo: {
                                type: "string"
                            }
                        }
                    }
                }
            });

            dom = $("<th data-kendo-field=foo />").appendTo(QUnit.fixture);
        },

        teardown: function() {
            kendo.destroy(QUnit.fixture);
            $(".k-filter-menu").remove();
        }
    });

    test("menu link has aria label", function() {
         filterMenu = setup(dom, {dataSource: dataSource});

         equal(filterMenu.link.attr("aria-label"), "Filter");
    });
})();

(function() {
    var FilterMultiCheck = kendo.ui.FilterMultiCheck,
        DataSource = kendo.data.DataSource,
        filterMultiCheck,
        dom,
        dataSource;

    function setupMulti(dom, options, init) {
        var menu = new FilterMultiCheck(dom, options);
        if (init !== false) {
            menu._init();
        }
        return menu;
    }

    module("kendo.ui.FilterMultiCheck", {
        setup: function() {
            dataSource = new DataSource({
                schema: {
                    model: {
                        fields: {
                            foo: {
                                type: "string"
                            }
                        }
                    }
                }
            });

            dom = $("<th data-kendo-field=foo />").appendTo(QUnit.fixture);
        },

        teardown: function() {
            kendo.destroy(QUnit.fixture);
            $(".k-filter-menu").remove();
        }
    });

    test("multicheck menu link has aria label", function() {
         filterMultiCheck = setupMulti(dom, {dataSource: dataSource});
         equal(filterMultiCheck._link.attr("aria-label"), "Filter");
    });
})();
