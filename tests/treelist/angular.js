(function() {
    var dom;
    var instance;

    module("TreeList AngularJS support", {
        setup: function() {
        },
        teardown: function() {
            kendo.destroy(QUnit.fixture);

            dom = instance = null;
        }
    });

    function createTreeList(options) {
        dom = $("<div />").appendTo(QUnit.fixture);

        dom.kendoTreeList($.extend({
            dataSource: [
                { id: 1, parentId: null },
                { id: 2, parentId: 1 }
            ]
        }, options));

        instance = dom.data("kendoTreeList");
    }

    test("clears and compiles angular bindings upon rendering rows, before dataBound", function() {
        createTreeList();

        spy(instance, "angular");

        instance.bind("dataBound", function() {
            equal(instance.calls("angular"), 2);
            equal(instance.args("angular", 0)[0], "cleanup");
            equal(instance.args("angular", 1)[0], "compile");
        });

        instance.dataSource.data([ { id: 1, parentId: null } ]);
    });

    test("preventing dataBinding does not clean up angular directives", function() {
        createTreeList();

        spy(instance, "angular");

        instance.bind("dataBinding", function(e) {
            e.preventDefault();
        });

        instance.dataSource.data([ { id: 1, parentId: null } ]);

        equal(instance.calls("angular"), 0);
    });

    test("cancelRow rebinds angular templates", function() {
        createTreeList({ editable: true });

        instance.editRow(instance.content.find("tr:first"));

        spy(instance, "angular");

        instance.cancelRow();

        equal(instance.calls("angular"), 2);
    });

    ngTest("repaint templates when changing data source", 2, function() {
        angular.module("kendo.tests").controller("mine", function($scope) {
            $scope.options = {
                dataSource: {
                    data: [
                        { id: 1, parentId: null, text: "foo" }
                    ]
                },
                columns: [
                    { field: "id" },
                    { template: "{{dataItem.text}}" }
                ]
            };
        });

        $("<div ng-controller=mine><div kendo-treelist='tree' k-options='options'></div></div>").appendTo(QUnit.fixture);
    },

    function() {
        var treeList = QUnit.fixture.find('[data-role=treelist]').getKendoTreeList();
        var dataSource = new kendo.data.TreeListDataSource({
                data: [
                    { id: 2, parentId: null, text: "bar" }
                ]
            });

        treeList.setDataSource(dataSource);

        var tds = treeList.content.find("td");
        equal(tds.eq(0).text(), "2");
        equal(tds.eq(1).text(), "bar");
    });

    ngTest("repaint templates after column reorder", 1, function() {
        angular.module("kendo.tests").controller("mine", function($scope) {
            $scope.options = {
                dataSource: {
                    data: [
                        { id: 1, parentId: null, text: "foo" }
                    ]
                },
                columns: [
                    { field: "id" },
                    { template: "{{dataItem.text}}" }
                ]
            };
        });

        $("<div ng-controller=mine><div kendo-treelist='tree' k-options='options'></div></div>").appendTo(QUnit.fixture);
    },

    function() {
        var treeList = QUnit.fixture.find('[data-role=treelist]').getKendoTreeList();

        treeList.reorderColumn(0, treeList.columns[1]);

        var tds = treeList.content.find("td");
        equal(tds.eq(0).text(), "foo");
    });

    ngTest("render headerTemplate with locked columns", 2, function() {
        angular.module("kendo.tests").controller("mine", function($scope) {
            $scope.options = {
                dataSource: {
                    data: [
                        { id: 1, parentId: null, text: "foo" }
                    ]
                },
                columns: [
                    { field: "id", headerTemplate: "{{dataItem}}", locked: true },
                    { field: "text", headerTemplate: "{{dataItem}}" }
                ]
            };
        });

        $("<div ng-controller=mine><div kendo-treelist='tree' k-options='options'></div></div>").appendTo(QUnit.fixture);
    },

    function() {
        var treeList = QUnit.fixture.find('[data-role=treelist]').getKendoTreeList();

        equal(treeList.thead.find("th").eq(0).text(), "");
        equal(treeList.lockedHeader.find("th").eq(0).text(), "");
    });

    ngTest("render template with locked columns", 2, function() {
        angular.module("kendo.tests").controller("mine", function($scope) {
            $scope.options = {
                dataSource: {
                    data: [
                        { id: 1, parentId: null, text: "foo" }
                    ]
                },
                columns: [
                    { template: "{{dataItem.id}}", locked: true },
                    { template: "{{dataItem.text}}" }
                ]
            };
        });

        $("<div ng-controller=mine><div kendo-treelist='tree' k-options='options'></div></div>").appendTo(QUnit.fixture);
    },

    function() {
        var treeList = QUnit.fixture.find('[data-role=treelist]').getKendoTreeList();

        equal(treeList.tbody.find("td").eq(0).text(), "foo");
        equal(treeList.lockedContent.find("td").eq(0).text(), "1");
    });

    ngTest("render footerTemplate with locked columns", 2, function() {
        angular.module("kendo.tests").controller("mine", function($scope) {
            $scope.options = {
                dataSource: {
                    data: [
                        { id: 1, parentId: null, text: "foo" }
                    ]
                },
                columns: [
                    { field: "id", footerTemplate: "{{dataItem}}", locked: true },
                    { field: "text", footerTemplate: "{{dataItem}}" }
                ]
            };
        });

        $("<div ng-controller=mine><div kendo-treelist='tree' k-options='options'></div></div>").appendTo(QUnit.fixture);
    },

    function() {
        var treeList = QUnit.fixture.find('[data-role=treelist]').getKendoTreeList();

        equal(treeList.tbody.find(".k-footer-template td").eq(0).text(), "");
        equal(treeList.lockedContent.find(".k-footer-template td").eq(0).text(), "");
    });
})();
