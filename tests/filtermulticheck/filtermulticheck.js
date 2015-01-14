(function() {
    var DataSource = kendo.data.DataSource,
        MultiCheck = kendo.ui.FilterMultiCheck,
        dom,
        dataSource;

    module("kendo.ui.FilterMultiCheck", {
        setup: function() {
            kendo.effects.disable();
            kendo.ns = "kendo-";
            dataSource = function (options) {
                return new DataSource($.extend(true, {
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
                        },
                        data: "data"
                    },
                    transport: {
                        read: function(e) {
                            setTimeout(function() {
                                e.success({
                                    data: [
                                    { foo: "some string", bar: 22, baz: kendo.parseDate("12/12/12", "dd/MM/yy"), boo: true },
                                    { foo: "some other", bar: 33, baz: kendo.parseDate("11/11/11", "dd/MM/yy"), boo: false }
                                    ]
                                })
                            }, 200)
                        }
                    }
                }, options));
            };

            dom = $("<th data-kendo-field=foo />").appendTo(QUnit.fixture);
        },

        teardown: function() {
            kendo.effects.enable();
            kendo.destroy(QUnit.fixture);
            QUnit.fixture.empty();
            kendo.ns = "";
        }
    });

    function setup(options, init) {
        var menu = new MultiCheck(dom, options);
        if (init !== false) {
            menu._init();
        }
        return menu;
    }

    asyncTest("renders checkboxes with corresponding values", 5, function() {
        var menu = setup({
            dataSource: dataSource()
        });
        menu.one("refresh" , function () {
            var chkbxs = menu.form.find(":checkbox");
            equal(chkbxs.length, 2);
            equal(chkbxs.eq(0).val(), "some string");
            equal(chkbxs.eq(1).val(), "some other");
            equal(chkbxs.eq(0).closest("label").text(), "some string");
            equal(chkbxs.eq(1).closest("label").text(), "some other");
            start();
        })
    });

    test("renders checkboxes with corresponding values when providing initial data", function() {
        setup({
                dataSource: new kendo.data.DataSource({
                    data: [{ foo: "some string", bar: 22, baz: kendo.parseDate("12/12/12", "dd/MM/yy"), boo: true }]
                }),
                refresh: function () {
                    var chkbxs = this.form.find(":checkbox");
                    equal(chkbxs.length, 1);
                    equal(chkbxs.eq(0).val(), "some string");
                    equal(chkbxs.eq(0).closest("label").text(), "some string");
                }
        });
    });

    test("renders checkboxes for the unique items for that field", function() {
        setup({
                dataSource: new kendo.data.DataSource({
                    data: [
                        { foo: "some string" },
                        { foo: "some string" }
                    ]
                }),
                refresh: function () {
                    var chkbxs = this.form.find(":checkbox");
                    equal(chkbxs.length, 1);
                    equal(chkbxs.eq(0).val(), "some string");
                    equal(chkbxs.eq(0).closest("label").text(), "some string");
                }
        });
    });
})();
