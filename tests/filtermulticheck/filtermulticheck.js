(function() {
    var DataSource = kendo.data.DataSource,
        MultiCheck = kendo.ui.FilterMultiCheck,
        dom,
        async,
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
                    serverPaging: true,
                    transport: {
                        read: function(e) {
                            var data = {
                                        data: [
                                        { foo: "some string", bar: 22, baz: kendo.parseDate("12/12/12", "dd/MM/yy"), boo: true },
                                        { foo: "some other", bar: 33, baz: kendo.parseDate("11/11/11", "dd/MM/yy"), boo: false }
                                        ].slice(0, e.data.pageSize)
                                    };
                            if (async == true) {
                                setTimeout(function() {
                                        e.success(data)
                                }, 200);
                            }
                            else {
                                e.success(data)
                            }
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
            async = false;
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
        async = true;
        var menu = setup({
            dataSource: dataSource()
        });
        menu.one("refresh" , function () {
            var chkbxs = menu.container.find(":checkbox:not(.k-check-all)");
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
                    var chkbxs = this.container.find(":checkbox:not(.k-check-all)");
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
                    var chkbxs = this.container.find(":checkbox:not(.k-check-all)");
                    equal(chkbxs.length, 1);
                    equal(chkbxs.eq(0).val(), "some string");
                    equal(chkbxs.eq(0).closest("label").text(), "some string");
                }
        });
    });

        test("handles the dataSource when it is initially grouped", function() {
        setup({
                dataSource: dataSource({
                    group: { field: "foo"}
                }),
                refresh: function () {
                    var chkbxs = this.container.find(":checkbox:not(.k-check-all)");
                    equal(chkbxs.length, 2);
                    equal(chkbxs.eq(0).val(), "some string");
                    equal(chkbxs.eq(0).closest("label").text(), "some string");
                }
        });
    });

    test("renders checkboxes for all the items neglecting the pageSize", function() {
        setup({
                dataSource: dataSource({ pageSize: 1 }),
                refresh: function () {
                    var chkbxs = this.container.find(":checkbox:not(.k-check-all)");
                    equal(chkbxs.length, 2);
                    equal(chkbxs.eq(0).val(), "some string");
                    equal(chkbxs.eq(0).closest("label").text(), "some string");
                }
        });
    });

    test("renders numbers", function() {
        setup({
                dataSource: dataSource(),
                field: "bar",
                refresh: function () {
                    var chkbxs = this.container.find(":checkbox:not(.k-check-all)");
                    equal(chkbxs.length, 2);
                    equal(chkbxs.eq(0).val(), "22");
                    equal(chkbxs.eq(0).closest("label").text(), "22");
                    equal(chkbxs.eq(1).val(), "33");
                    equal(chkbxs.eq(1).closest("label").text(), "33");
                }
        });
    });

    test("renders dates and respect format", function() {
        var counter = 0;
        setup({
                dataSource: dataSource(),
                field: "baz",
                format: "{0:dd/MM}",
                refresh: function () {
                    var chkbxs = this.container.find(":checkbox:not(.k-check-all)");
                    equal(chkbxs.length, 2);
                    equal(chkbxs.eq(0).val().indexOf("2012-12-12T00:00:00"), 0);
                    equal(chkbxs.eq(0).closest("label").text(), "12/12");

                    equal(chkbxs.eq(1).val().indexOf("2011-11-11T00:00:00"), 0);
                    equal(chkbxs.eq(1).closest("label").text(), "11/11");
                }
        });

    });

    test("does not render items for undefined values", function() {
        setup({
                dataSource: new kendo.data.DataSource({ data: [{foo: "some"}, {}] }),
                field: "foo",
                refresh: function () {
                    var chkbxs = this.container.find(":checkbox:not(.k-check-all)");
                    equal(chkbxs.length, 1);
                    equal(chkbxs.eq(0).val(), "some");
                    equal(chkbxs.eq(0).closest("label").text(), "some");
                }
        });
    });

    test("does not render items for undefined values when boolean", function() {
        setup({
                dataSource: new kendo.data.DataSource({ data: [{foo: true}, {foo: false}, {foo: undefined}, {}] }),
                field: "foo",
                refresh: function () {
                    var chkbxs = this.container.find(":checkbox:not(.k-check-all)");
                    equal(chkbxs.length, 2);
                    equal(chkbxs.eq(0).val(), "true");
                    equal(chkbxs.eq(0).closest("label").text(), "true");
                    equal(chkbxs.eq(1).val(), "false");
                    equal(chkbxs.eq(1).closest("label").text(), "false");
                }
        });
    });

    test("template is used and options for template are available", function() {
        setup({
            dataSource: dataSource(),
            checkAll: false,
            itemTemplate: function (options) {
                return "<span class='foo' id='#=" + options.field + "#'>" + options.field + "</span>";
            },
            field: "foo",
            refresh: function () {
                var children = this.container.find(".foo");
                equal(children.eq(0).text(), "foo");
                equal(children.eq(1).attr("id"), "some other");
            }
        });
    });

    test("checkboxes use values when provided", function() {
        setup({
            values: [
                { text: "foo", value: "bar"},
                { text: "baz", value: "trqs"},
            ],
            dataSource: dataSource(),
            field: "foo",
            refresh: function () {
                var chkbxs = this.container.find(":checkbox:not(.k-check-all)");
                equal(chkbxs.length, 2);
                equal(chkbxs.eq(0).val(), "bar");
                equal(chkbxs.eq(0).closest("label").text(), "foo");
                equal(chkbxs.eq(1).val(), "trqs");
                equal(chkbxs.eq(1).closest("label").text(), "baz");
            }
        });
    });
})();
