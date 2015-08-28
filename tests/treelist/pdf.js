(function() {
    var dom;
    var saveAsPDF = kendo.ui.TreeList.fn.saveAsPDF;

    saveAsPDFTests("TreeList", function() {
        var dom = $("<div>").appendTo(QUnit.fixture);
        dom.kendoTreeList({});

        return dom.getKendoTreeList();
    });

    module("TreeList PDF Export / UI /",  {
        setup: function() {
            dom = $("<div>");

            QUnit.fixture.append(dom);

            kendo.ui.TreeList.fn.saveAsPDF = $.noop;
        },
        teardown: function() {
            kendo.destroy(QUnit.fixture);
            kendo.ui.TreeList.fn.saveAsPDF = saveAsPDF;
        }
    });

    test("renders button for pdf command", function() {
        dom.kendoTreeList({
            toolbar: [ { name: "pdf" }]
        });

        equal(dom.find(".k-grid-pdf").length, 1);
    });

    test("sets the default text of the pdf command", function() {
        dom.kendoTreeList({
            toolbar: [ { name: "pdf" }]
        });

        equal(dom.find(".k-grid-pdf").text(), "Export to PDF");
    });

    test("clicking the pdf button calls the pdf export method", 1, function() {
        var grid = dom.kendoTreeList({
            toolbar: [ { name: "pdf" }]
        }).data("kendoTreeList");

        grid.saveAsPDF = function() {
            ok(true);
        };

        dom.find(".k-grid-pdf").trigger("click");
    });

    test("clicking the pdf button fires the pdfExport event", 1, function() {
        var grid = dom.kendoTreeList({
            toolbar: [ { name: "pdf" }],
            pdfExport: function() {
              ok(true);
            }
        }).data("kendoTreeList");

        grid.saveAsPDF = function() {
            this.trigger("pdfExport");
        };

        dom.find(".k-grid-pdf").trigger("click");
    });
}());

// ------------------------------------------------------------
(function() {
    var draw = kendo.drawing;
    var grid;
    var saveAs;

    function createTreeList(options) {
        var dom = $("<div>").appendTo(QUnit.fixture);
        dom.kendoTreeList($.extend(true, {
            dataSource: {
                data: [{}, {}, {}, {}],
                pageSize: 1
            },
            pageable: true
        }, options));

        grid = dom.getKendoTreeList();
    }

    function exportNoop() {
        return $.Deferred().resolve("");
    }

    // ------------------------------------------------------------
    module("TreeList PDF Export /", {
        setup: function() {
            saveAs = kendo.saveAs;
            kendo.saveAs = exportNoop;

            createTreeList();
        },
        teardown: function() {
            kendo.destroy(QUnit.fixture);
            QUnit.fixture.empty();
            kendo.saveAs = saveAs;
        }
    });

    test("passes reference to page content", function() {
        stubMethod(draw, "exportPDF", function(group) {
            return exportNoop();
        }, function() {
            grid.saveAsPDF()
            .progress(function(e) {
                ok(e.page instanceof kendo.drawing.Group);
            });
        });
    });

    test("triggers progress event", function() {
        createTreeList();

        stubMethod(draw, "exportPDF", function(group) {
            return exportNoop();
        }, function() {
            grid.saveAsPDF().progress(function(e) {
                equal(e.progress, 1);
            });
        });
    });

    test("promise is available in event args", function() {
        var promise = "foo";

        createTreeList({
            pdfExport: function(e) {
                promise = e.promise;
            }
        });

        stubMethod(draw, "exportPDF", function(group) {
            return exportNoop();
        }, function() {
            var result = grid.saveAsPDF();
            equal(result, promise);
        });
    });

    test("promise is resolved", function() {
        stubMethod(draw, "exportPDF", function(group) {
            return exportNoop();
        }, function() {
            grid.saveAsPDF().done(function(e) {
                ok(true);
            });
        });
    });

    test("promise is rejected on error", function() {
        stubMethod(draw, "exportPDF", function(group) {
            return $.Deferred().reject();
        }, function() {
            grid.saveAsPDF()
            .fail(function(e) {
                ok(true);
            });
        });
    });

    test("promise is rejected on drawing error", function() {
        stubMethod(draw, "drawDOM", function(group) {
            return $.Deferred().reject();
        }, function() {
            grid.saveAsPDF()
            .fail(function(e) {
                ok(true);
            });
        });
    });

})();
