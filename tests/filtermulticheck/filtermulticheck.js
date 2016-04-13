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
                    serverPaging: false,
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

    test("data is not fetched from the server when values are provided", 0, function() {
        setup({
            values: [
                { text: "foo", value: "bar"},
                { text: "baz", value: "trqs"},
            ],
            dataSource: dataSource({
                serverPaging: true,
                requestStart: function() {
                    ok(false);
                }
            }),
            field: "foo"
        });
    });

    test("uses custom dataSource if both custom dataSource and values are provided",  function() {
        setup({
            values: [
                { text: "foo", value: "bar"},
                { text: "baz", value: "trqs"},
            ],
            dataSource: dataSource(),
            forceUnique: false,
            checkSource: [{foo: "foo"}, {foo: "baz"}],
            field: "foo",
            refresh: function () {
                var chkbxs = this.container.find(":checkbox:not(.k-check-all)");
                equal(chkbxs.length, 2);
                equal(chkbxs.eq(0).val(), "foo");
                equal(chkbxs.eq(0).closest("label").text(), "foo");
                equal(chkbxs.eq(1).val(), "baz");
                equal(chkbxs.eq(1).closest("label").text(), "baz");
            }
        });
    });

    test("checkboxes are updated when using local operations and parent ds is changed", function() {
        var ds = new kendo.data.DataSource({
            serverPaging: false,
            data: [{
                foo: "some string"
            }]
        });
        ds.read();

        widget = setup({
            dataSource: ds,
            field: "foo"
        });

        var chkbxs = widget.container.find(":checkbox:not(.k-check-all)");
        equal(chkbxs.length, 1);
        equal(chkbxs.eq(0).val(), "some string");
        equal(chkbxs.eq(0).closest("label").text(), "some string");

        ds.data()[0].set("foo", "new string");

        var chkbxs = widget.container.find(":checkbox:not(.k-check-all)");
        equal(chkbxs.length, 1);
        equal(chkbxs.eq(0).val(), "new string");
        equal(chkbxs.eq(0).closest("label").text(), "new string");
    });

    test("checkboxes are updated when using custom dataSource is changed", function() {
        var customDS = new kendo.data.DataSource({
            data: [{
                foo: "some string"
            }]
        });

        widget = setup({
            forceUnique: false,
            dataSource: new kendo.data.DataSource({
                serverPaging: false,
                data: [{
                    foo: "some string"
                }]
            }),
            checkSource: customDS,
            field: "foo"
        });

        customDS.data()[0].set("foo", "new string");

        var chkbxs = widget.container.find(":checkbox:not(.k-check-all)");
        equal(chkbxs.length, 1);
        equal(chkbxs.eq(0).val(), "new string");
        equal(chkbxs.eq(0).closest("label").text(), "new string");
    });

    test("checkboxes shown are the one from the view() when using custom dataSource", function() {
        var customDS = new kendo.data.DataSource({
            data: [{
                foo: "first string"
            }, {
                foo: "second string"
            }]
        });

        widget = setup({
            forceUnique: false,
            dataSource: new kendo.data.DataSource({
                serverPaging: false,
                data: [{
                    foo: "some string"
                }]
            }),
            checkSource: customDS,
            field: "foo"
        });

        customDS.filter({ field: "foo", operator: "contains", value: "second"});

        var chkbxs = widget.container.find(":checkbox:not(.k-check-all)");
        equal(chkbxs.length, 1);
        equal(chkbxs.eq(0).val(), "second string");
        equal(chkbxs.eq(0).closest("label").text(), "second string");
    });

    test("checkboxes are updated when using local operations and parent ds is changed", function() {
        var ds = new kendo.data.DataSource({
            serverPaging: false,
            data: [{
                foo: "some string"
            }, {
                foo: "other string"
            }, {
                foo: ""
            }]
        });
        ds.read();

        widget = setup({
            dataSource: ds,
            field: "foo"
        });
        var emptyCheckbox = widget.container.find("[value='']");
        emptyCheckbox.prop("checked", "checked");
        $("[type='submit']").click();
        equal(widget.dataSource.view().length, 1);
    });

    test("pushcreate with autosync updates the items", function() {
        var ds = new kendo.data.DataSource({
            serverPaging: false,
            data: [{
                foo: "some string"
            }]
        });
        ds.read();

        widget = setup({
            dataSource: ds,
            field: "foo"
        });

        var chkbxs = widget.container.find(":checkbox:not(.k-check-all)");
        equal(chkbxs.length, 1);
        equal(chkbxs.eq(0).val(), "some string");
        equal(chkbxs.eq(0).closest("label").text(), "some string");

        ds.pushCreate({ foo: "new" });

        chkbxs = widget.container.find(":checkbox:not(.k-check-all)");
        equal(chkbxs.length, 2);
        equal(chkbxs.eq(0).val(), "some string");
        equal(chkbxs.eq(0).closest("label").text(), "some string");
        equal(chkbxs.eq(1).val(), "new");
        equal(chkbxs.eq(1).closest("label").text(), "new");
    });

    test("pushUpdate with autosync updates the items", function() {
        var ds = new kendo.data.DataSource({
            data: [{
                id: 0,
                foo: "some string"
            }],
            schema: {
                model: {
                    id: "id"
                }
            },
            autoSync: true
        });

        ds.read();

        widget = setup({
            dataSource: ds,
            field: "foo"
        });

        var chkbxs = widget.container.find(":checkbox:not(.k-check-all)");
        equal(chkbxs.length, 1);
        equal(chkbxs.eq(0).val(), "some string");
        equal(chkbxs.eq(0).closest("label").text(), "some string");

        ds.pushUpdate({id:0, foo: "new string" });

        chkbxs = widget.container.find(":checkbox:not(.k-check-all)");
        equal(chkbxs.length, 1);
        equal(chkbxs.eq(0).val(), "new string");
        equal(chkbxs.eq(0).closest("label").text(), "new string");
    });

    test("checkboxes are filtered case sensitive", function() {
        widget = setup({
            dataSource: new kendo.data.DataSource({
                data: [
                    { foo: "some string" },
                    { foo: "sOme String" },
                    { foo: "other string" }
                ]
            }),
            checkAll:true,
            search: true,
            ignoreCase: false
        });
        var chkbxs = widget.container.find(":checkbox:not(.k-check-all)");
        equal(chkbxs.length,3);
        
		widget.searchTextBox[0].value = "striNg";
        widget.search();		
        equal(widget.container.find("li").length , 4);
        equal(widget.container.find("li[style*='display: none']").length , 3);
        
		widget.searchTextBox[0].value = "some";
        widget.search();
        equal(widget.container.find("li[style*='display: none']").length , 2);
        
		widget.searchTextBox[0].value = "tring";
        widget.search();
        equal(widget.container.find("li[style*='display: none']").length , 0);
        
		widget.searchTextBox[0].value = "me";
        widget.search();
        equal(widget.container.find("li[style*='display: none']").length , 1);
    });
	
	test("checkboxes are filtered case insensitive", function(){
        widget = setup({
            dataSource: new kendo.data.DataSource({
                data: [
                    { foo: "some string" },
                    { foo: "sOme String" },
                    { foo: "other string" }
                ]
            }),
            checkAll:false,
            search: true,
            ignoreCase: true
        });
        var chkbxs = widget.container.find(":checkbox");
        equal(chkbxs.length,3);
        
		widget.searchTextBox[0].value = "striNg";
        widget.search();		
        equal(widget.container.find("li").length , 3);
        equal(widget.container.find("li[style*='display: none']").length , 0);
		
		widget.searchTextBox[0].value = "Some";
        widget.search();
        equal(widget.container.find("li[style*='display: none']").length , 1);
		
		widget.searchTextBox[0].value = "other";
        widget.search();
        equal(widget.container.find("li[style*='display: none']").length , 2);
	});
	
	test("checkboxes are visible after Clear filter", function(){
        widget = setup({
            dataSource: new kendo.data.DataSource({
                data: [
                    { foo: "value1" },
                    { foo: "value2" },
                    { foo: "value3" }
                ]
            }),
            checkAll:true,
            search: true,
            ignoreCase: true
        });        
		widget.searchTextBox[0].value = "2";
        widget.search();		
        equal(widget.container.find("li").length , 4);
        equal(widget.container.find("li[style*='display: none']").length , 2);		
        widget._reset();
		equal(widget.container.find("li").length , 4);
        equal(widget.container.find("li[style*='display: none']").length , 0);		
	});	

    test("filters numbers when using non cultures with comma as separator", function(){
        var dataSource = new kendo.data.DataSource({
            data: [
                { foo: 1 },
                { foo: 2.12345 },
                { foo: 3 }
            ],
            schema: {
                model: {
                    fields: {
                        foo: { type: "number" }
                    }
                }
            }
        });
        var culture = kendo.culture().name;
        try {
            kendo.culture("de-DE");
            widget = setup({
                dataSource: dataSource
            });
            widget.form.find(":checkbox:not(.k-check-all)").eq(1).prop("checked", true);
            widget.form.submit();
            var filter = dataSource.filter().filters[0];
            equal(filter.value, 2.12345);
        } finally {
            kendo.culture(culture);
        }
	});
})();
