(function() {
    return;
    var proWidgets = [
        "Editor",
        "Grid",
        "PivotGrid",
        "Scheduler",
        "Gantt",
        "TreeView",
        "TreeList",
        "Upload",
    ];
    var vizWidgets = [
        "Barcode",
        "QRCode",
        "Sparkline",
        "Chart",
        "StockChart",
        "Diagram",
        "TreeMap",
        "Map",
        "RadialGauge",
        "LinearGauge",
    ];
    var dom;
    module("WebComponents - Kendo UI Pro", {
        setup: function() {
            QUnit.fixture.empty();
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

    test("custom elements are created for dataviz widgets", function() {
        vizWidgets.forEach(function(name) {
            var element= $("<kendo-"+ name.toLowerCase() +"/>").appendTo(dom)[0];
            ok(element.widget instanceof kendo.dataviz.ui[name]);
        });
    });

})();
