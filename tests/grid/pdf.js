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

    asyncTest("passes reference to page content", 1, function() {
        pdfStubMethod(draw, "exportPDF", function(group) {
            return exportNoop();
        }, function() {
            return grid.saveAsPDF()
                .progress(function(e) {
                    ok(e.page instanceof kendo.drawing.Group);
                });
        });
    });

    asyncTest("triggers progress event for single page", 1, function() {
        createGrid();

        pdfStubMethod(draw, "exportPDF", function(group) {
            return exportNoop();
        }, function() {
            return grid.saveAsPDF().progress(function(e) {
                equal(e.progress, 1);
            });
        });
    });

    asyncTest("promise is available in event args", 1, function() {
        var promise = "foo", result;

        createGrid({
            pdfExport: function(e) {
                promise = e.promise;
            }
        });

        pdfStubMethod(draw, "exportPDF", function(group) {
            equal(result, promise);
            return exportNoop();
        }, function() {
            return result = grid.saveAsPDF();
        });
    });

    asyncTest("promise is resolved", 1, function() {
        pdfStubMethod(draw, "exportPDF", function(group) {
            return exportNoop();
        }, function() {
            return grid.saveAsPDF().done(function(e) {
                ok(true);
            });
        });
    });

    asyncTest("promise is rejected on error", 1, function() {
        pdfStubMethod(draw, "exportPDF", function(group) {
            return $.Deferred().reject();
        }, function() {
            return grid.saveAsPDF()
                .fail(function(e) {
                    ok(true);
                });
        });
    });

    asyncTest("promise is rejected on drawing error", 1, function() {
        pdfStubMethod(draw, "drawDOM", function(group) {
            return $.Deferred().reject();
        }, function() {
            return grid.saveAsPDF()
                .fail(function(e) {
                    ok(true);
                });
        });
    });

    asyncTest("avoidLinks is passed through", 1, function() {
        pdfStubMethod(draw, "drawDOM", function(group, options) {
            ok(options.avoidLinks);
            return $.Deferred().resolve(new kendo.drawing.Group());
        }, function() {
            grid.options.pdf.avoidLinks = true;
            return grid.saveAsPDF()
                .fail(function(e) {
                    ok(true);
                });
        });
    });

    asyncTest("avoidLinks is false by default", 1, function() {
        pdfStubMethod(draw, "drawDOM", function(group, options) {
            ok(!options.avoidLinks);
            return $.Deferred().resolve(new kendo.drawing.Group());
        }, function() {
            return grid.saveAsPDF()
                .fail(function(e) {
                    ok(true);
                });
        });
    });

    asyncTest("adds loading mask", 1, function() {
        pdfStubMethod(draw, "exportPDF", function(group) {
            equal($(".k-loading-pdf-mask", grid.wrapper).length, 1);
            return exportNoop();
        }, function() {
            return grid.saveAsPDF();
        });
    });

    asyncTest("removes loading mask", 1, function() {
        pdfStubMethod(draw, "exportPDF", function(group) {
            return exportNoop();
        }, function() {
            return grid.saveAsPDF()
                .done(function() {
                    equal($(".k-loading-pdf-mask", grid.wrapper).length, 0);
                });
        });
    });

    asyncTest("does not cycle pages for single-page export", 1, function() {
        createGrid();

        grid.dataSource.bind("change", function(e) {
            ok(false);
        });

        pdfStubMethod(draw, "exportPDF", function(group) {
            ok(true);
            return exportNoop();
        }, function() {
            return grid.saveAsPDF();
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

    asyncTest("exports all pages", 1, function() {
        pdfStubMethod(draw, "exportPDF", function(group) {
            equal(group.children.length, 4);
            return exportNoop();
        }, function() {
            return grid.saveAsPDF();
        });
    });

    asyncTest("cycles through all pages", 5, function() {
        var pages = [1, 2, 3, 4, 1];
        grid.dataSource.bind("change", function(e) {
            equal(grid.dataSource.page(), pages.shift());
        });

        pdfStubMethod(draw, "exportPDF", function(group) {
            return exportNoop();
        }, function() {
            return grid.saveAsPDF();
        });
    });

    asyncTest("gets back to original page", 5, function() {
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

        pdfStubMethod(draw, "exportPDF", function(group) {
            return exportNoop();
        }, function() {
            return grid.saveAsPDF();
        });
    });

    asyncTest("reports progress", 4, function() {
        pdfStubMethod(draw, "exportPDF", function(group) {
            return exportNoop();
        }, function() {
            return grid.saveAsPDF()
                .progress(function(e) {
                    ok(e.progress > 0);
                });
        });
    });

    asyncTest("promise is resolved", 1, function() {
        pdfStubMethod(draw, "exportPDF", function(group) {
            return exportNoop();
        }, function() {
            return grid.saveAsPDF().done(function(e) {
                ok(true);
            });
        });
    });

    asyncTest("promise is resolved for non-pageable grid", 1, function() {
        createGrid({
            dataSource: [],
            pageable: false,
            pdf: {
                allPages: true
            }
        });

        pdfStubMethod(draw, "exportPDF", function(group) {
            return exportNoop();
        }, function() {
            return grid.saveAsPDF().done(function(e) {
                ok(true);
            });
        });
    });

})();
