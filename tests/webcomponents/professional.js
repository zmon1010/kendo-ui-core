(function() {
    var proWidgets = [
        "Editor",
        "Grid",
        "Scheduler",
    ];
    module("WebComponents - Kendo UI Pro", {
        setup: function() {
            dom = $("<div/>").appendTo(QUnit.fixture);
        },
        teardown: function() {
            kendo.destroy(dom);
            dom.remove();
        }
    });

    test("custom elements are created for professional widgets", function() {
        proWidgets.forEach(function(name) {
            var element= $("<kendo-"+ name.toLowerCase() +"/>").appendTo(dom)[0];
            ok(element.widget instanceof kendo.ui[name]);
        });
    });

})();
