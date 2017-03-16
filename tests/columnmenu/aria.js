(function() {
    var DataSource = kendo.data.DataSource,
        ColumnMenu = kendo.ui.ColumnMenu,
        dom,
        dataSource;

    function ownerFactory(options) {
        return $.extend(true, {}, {
            bind: $.noop, unbind: $.noop, _muteAngularRebind: $.noop
        }, options);
    }

    function setup(options) {
        options = $.extend(true, {}, {
            dataSource: dataSource,
            owner: ownerFactory({
                columns: [{ field: "foo" }, { field: "bar", hidden: true}]
            })
        }, options);

        var menu = new ColumnMenu(dom, options);
        menu._init();

        menu.menu.options.hoverDelay = 1;

        return menu;
    }

    module("kendo.ui.ColumnMenu aria", {
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

            dom = $("<div data-kendo-field=foo ></div>");
            dom.appendTo(QUnit.fixture);
        },
        teardown: function() {
            kendo.effects.enable();
            kendo.destroy(QUnit.fixture);
            dom.remove();
        }
    });

    test("menu link has aria-label", function() {
        var menu = setup();

        equal(menu.link.attr("aria-label"), "Column Settings");
    });
})();
