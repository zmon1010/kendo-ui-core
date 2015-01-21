(function() {
    module("TreeView AngularJS integration", {
        setup: function() {
            fixtureData = new kendo.data.ObservableArray([
                { text: "Foo", id: 1, items: [
                    { text: "Baz", id: 3 }
                ] },
                { text: "Bar", id: 2 }
            ]);
        },
        teardown: function() {
            kendo.destroy(QUnit.fixture);
        }
    });

    var fixtureData;

    function trigger(type, el, e) {
        el.trigger($.Event(type, e));
    }


    ngTest("item template is initially compiled", 2, function() {
        angular.module("kendo.tests").controller("mine", function($scope) {
            $scope.options = {
                dataSource: fixtureData,
                template: "{{dataItem.text}} | {{dataItem.id}}"
            };
        });
        $("<div ng-controller=mine><div kendo-treeview='tree' k-options='options'></div></div>").appendTo(QUnit.fixture);
        }, function () {
            var tree = QUnit.fixture.find('[data-role=treeview]').getKendoTreeView();
            var items = tree.items();
            equal(items.eq(0).text(), "Foo | 1");
            equal(items.eq(1).text(), "Bar | 2");
    });

    ngTest("draggable hint is compiled in scope of dragged element", 1, function() {
        angular.module("kendo.tests").controller("mine", function($scope) {
            $scope.options = {
                dataSource: fixtureData,
                template: "{{dataItem.text}}/{{dataItem.id}}",
                dragAndDrop: true
            };
        });
        $("<div ng-controller=mine><div kendo-treeview='tree' k-options='options'></div></div>").appendTo(QUnit.fixture);
        }, function () {
            var tree = QUnit.fixture.find('[data-role=treeview]').getKendoTreeView();
            var item = tree.items().eq(0).find(".k-in:first");
            var pos = item.offset();
            trigger("mousedown", item, { pageX: pos.left, pageY: pos.top });
            trigger("mousemove", $(document.documentElement), {
                pageX: pos.left + 50,
                pageY: pos.top + 50
            });
            equal(tree.dragging._draggable.hint.text(), "Foo/1");
    });

    ngTest("item template is recompiled upon", 1, function() {
        angular.module("kendo.tests").controller("mine", function($scope) {
            $scope.options = {
                dataSource: fixtureData,
                template: "{{dataItem.text}}"
            };
        });
        $("<div ng-controller=mine><div kendo-treeview='tree' k-options='options'></div></div>").appendTo(QUnit.fixture);
        }, function () {
            var tree = QUnit.fixture.find('[data-role=treeview]').getKendoTreeView();
            tree.dataSource.get(1).set("expanded", true);

            equal(tree.element.find(".k-in:first").text(), "Foo");
    });

})();

