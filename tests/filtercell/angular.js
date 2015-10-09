(function() {
    var dom;
    var instance;
    var dataSource;
    var noop = $.noop;

    module("FilterCell AngularJS support", {
        setup: function() {
            kendo.effects.disable();

            dataSource = new kendo.data.DataSource({
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
        },
        teardown: function() {
            kendo.effects.enable();
            kendo.destroy(QUnit.fixture);
            $(".k-row-filter").remove();

            dom = instance = null;
        }
    });

    function createFilterCell(options) {
        dom = $("<th data-kendo-field=foo />").appendTo(QUnit.fixture);

        var options = $.extend(true, {}, { dataSource: dataSource }, options);

        instance = new kendo.ui.FilterCell(dom, options);
    }

    test("clears angular bindings on destroy", function() {
        createFilterCell();

        spy(instance, "angular");

        instance.destroy();

        equal(instance.args("angular", 0)[0], "cleanup");
    });

    ngTest("complies template from the scope", 1, function() {
        angular.module("kendo.tests").controller("mine", function($scope) {
            $scope.myField = "angular_template";

            $scope.options = {
                dataSource: dataSource,
                filterable: {
                    mode: "row"
                },
                columns: [
                    {
                        field: "foo",
                        filterable: {
                            cell: {
                                template: function(args) {
                                    args.element.replaceWith("{{myField}}");
                                }
                            }
                        }
                    }
                ]
            };
        });

        $("<div ng-controller='mine'><kendo-grid options='options'></kendo-grid></div>").appendTo(QUnit.fixture);
    },

    function() {
        var grid = QUnit.fixture.find('[data-role=grid]').getKendoGrid();
        var cellContent = grid.thead.find(".k-filtercell>span").contents().first().text();

        equal(cellContent, "angular_template");
    });

    ngTest("column info is pased to the template", 1, function() {
        angular.module("kendo.tests").controller("mine", function($scope) {
            $scope.options = {
                dataSource: dataSource,
                filterable: {
                    mode: "row"
                },
                columns: [
                    {
                        field: "foo",
                        filterable: {
                            cell: {
                                template: function(args) {
                                    args.element.replaceWith("{{column.field}}");
                                }
                            }
                        }
                    }
                ]
            };
        });

        $("<div ng-controller='mine'><kendo-grid options='options'></kendo-grid></div>").appendTo(QUnit.fixture);
    },

    function() {
        var grid = QUnit.fixture.find('[data-role=grid]').getKendoGrid();
        var cellContent = grid.thead.find(".k-filtercell>span").contents().first().text();

        equal(cellContent, grid.columns[0].field);
    });
})();
