(function() {
    var dom;
    var saveAsPDF = kendo.ui.Grid.fn.saveAsPDF;

    saveAsPDFTests("Grid", function() {
        var dom = $("<div>").appendTo(QUnit.fixture);
        dom.kendoGrid({});

        return dom.getKendoGrid();
    });

    module("Grid PDF Export / UI /",  {
        setup: function() {
            dom = $("<div>");

            QUnit.fixture.append(dom);

            kendo.ui.Grid.fn.saveAsPDF = $.noop;
        },
        teardown: function() {
            kendo.destroy(QUnit.fixture);
            kendo.ui.Grid.fn.saveAsPDF = saveAsPDF;
        }
    });

    test("renders button for pdf command", function() {
        dom.kendoGrid({
            toolbar: [ { name: "pdf" }]
        });

        equal(dom.find(".k-grid-pdf").length, 1);
    });

    test("sets the default text of the pdf command", function() {
        dom.kendoGrid({
            toolbar: [ { name: "pdf" }]
        });

        equal(dom.find(".k-grid-pdf").text(), "Export to PDF");
    });

    test("clicking the pdf button calls the pdf export method", 1, function() {
        var grid = dom.kendoGrid({
            toolbar: [ { name: "pdf" }]
        }).data("kendoGrid");

        grid.saveAsPDF = function() {
            ok(true);
        };

        dom.find(".k-grid-pdf").trigger("click");
    });

    test("clicking the pdf button fires the pdfExport event", 1, function() {
        var grid = dom.kendoGrid({
            toolbar: [ { name: "pdf" }],
            pdfExport: function() {
              ok(true);
            }
        }).data("kendoGrid");

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

    function createGrid(options) {
        var dom = $("<div>").appendTo(QUnit.fixture);
        dom.kendoGrid($.extend(true, {
            dataSource: {
                data: [{}, {}, {}, {}],
                pageSize: 1
            },
            pageable: true
        }, options));

        grid = dom.getKendoGrid();
    }

    function exportNoop() {
        return $.Deferred().resolve("");
    }

    // ------------------------------------------------------------
    module("Grid PDF Export /", {
        setup: function() {
            saveAs = kendo.saveAs;
            kendo.saveAs = exportNoop;

            createGrid();
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

    test("triggers progress event for single page", function() {
        createGrid();

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

        createGrid({
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

    test("adds loading mask", function() {
        stubMethod(draw, "exportPDF", function(group) {
            equal($(".k-loading-pdf-mask", grid.wrapper).length, 1);
            return exportNoop();
        }, function() {
            grid.saveAsPDF();
        });
    });

    test("removes loading mask", function() {
        stubMethod(draw, "exportPDF", function(group) {
            return exportNoop();
        }, function() {
            grid.saveAsPDF()
            .done(function() {
                equal($(".k-loading-pdf-mask", grid.wrapper).length, 0);
            });
        });
    });

    test("does not cycle pages for single-page export", 0, function() {
        createGrid();

        grid.dataSource.bind("change", function(e) {
            ok(false);
        });

        stubMethod(draw, "exportPDF", function(group) {
            return exportNoop();
        }, function() {
            grid.saveAsPDF();
        });
    });

    // ------------------------------------------------------------
    module("Grid PDF Export / All pages /", {
        setup: function() {
            saveAs = kendo.saveAs;
            kendo.saveAs = exportNoop;

            createGrid({
                pdf: {
                    allPages: true
                }
            });
        },
        teardown: function() {
            kendo.destroy(QUnit.fixture);
            QUnit.fixture.empty();
            kendo.saveAs = saveAs;
        }
    });

    test("exports all pages", function() {
        stubMethod(draw, "exportPDF", function(group) {
            equal(group.children.length, 4);
            return exportNoop();
        }, function() {
            grid.saveAsPDF();
        });
    });

    test("cycles through all pages", function() {
        var pages = [1, 2, 3, 4, 1];
        grid.dataSource.bind("change", function(e) {
            equal(grid.dataSource.page(), pages.shift());
        });

        stubMethod(draw, "exportPDF", function(group) {
            return exportNoop();
        }, function() {
            grid.saveAsPDF();
        });
    });

    test("gets back to original page", function() {
        createGrid({
            pdf: {
                allPages: true
            },
            dataSource: {
                page: 2
            }
        });

        var pages = [1, 2, 3, 4, 2];
        grid.dataSource.bind("change", function(e) {
            equal(grid.dataSource.page(), pages.shift());
        });

        stubMethod(draw, "exportPDF", function(group) {
            return exportNoop();
        }, function() {
            grid.saveAsPDF();
        });
    });

    test("reports progress", function() {
        stubMethod(draw, "exportPDF", function(group) {
            return exportNoop();
        }, function() {
            grid.saveAsPDF()
            .progress(function(e) {
                ok(e.progress > 0);
            });
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

    test("promise is resolved for non-pageable grid", function() {
        createGrid({
            dataSource: [],
            pageable: false,
            pdf: {
                allPages: true
            }
        });

        stubMethod(draw, "exportPDF", function(group) {
            return exportNoop();
        }, function() {
            grid.saveAsPDF().done(function(e) {
                ok(true);
            });
        });
    });

})();
