(function() {
    var dom;
    var saveAsPDF = kendo.ui.Scheduler.fn.saveAsPDF;

    saveAsPDFTests("Scheduler", function() {
        var dom = $("<div>").appendTo(QUnit.fixture);
        dom.kendoScheduler({});

        return dom.getKendoScheduler();
    });

    module("Scheduler PDF Export / UI /",  {
        setup: function() {
            dom = $("<div>");

            QUnit.fixture.append(dom);

            kendo.ui.Scheduler.fn.saveAsPDF = $.noop;
        },
        teardown: function() {
            kendo.destroy(QUnit.fixture);
            kendo.ui.Scheduler.fn.saveAsPDF = saveAsPDF;
        }
    });

    test("renders button for pdf command", function() {
        dom.kendoScheduler({
            toolbar: [ { name: "pdf" }]
        });

        equal(dom.find(".k-pdf").length, 1);
    });

    test("sets the default text of the pdf command", function() {
        dom.kendoScheduler({
            toolbar: [ { name: "pdf" }]
        });

        equal(dom.find(".k-pdf").text(), "Export to PDF");
    });

    test("clicking the pdf button calls the pdf export method", 1, function() {
        var scheduler = dom.kendoScheduler({
            toolbar: [ { name: "pdf" }]
        }).data("kendoScheduler");

        scheduler.saveAsPDF = function() {
            ok(true);
        };

        dom.find(".k-pdf").trigger("click");
    });

    test("clicking the pdf button fires the pdfExport event", 1, function() {
        var scheduler = dom.kendoScheduler({
            toolbar: [ { name: "pdf" }],
            pdfExport: function() {
              ok(true);
            }
        }).data("kendoScheduler");

        scheduler.saveAsPDF = function() {
            this.trigger("pdfExport");
        };

        dom.find(".k-pdf").trigger("click");
    });
}());

// ------------------------------------------------------------
(function() {
    var draw = kendo.drawing;
    var scheduler;
    var saveAs;

    function createScheduler(options) {
        var dom = $("<div>").appendTo(QUnit.fixture);
        dom.kendoScheduler(options);
        scheduler = dom.getKendoScheduler();
    }

    function exportNoop() {
        return $.Deferred().resolve("");
    }

    // ------------------------------------------------------------
    module("Scheduler PDF Export /", {
        setup: function() {
            saveAs = kendo.saveAs;
            kendo.saveAs = exportNoop;

            createScheduler();
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
            return scheduler.saveAsPDF()
                .progress(function(e) {
                    ok(e.page instanceof kendo.drawing.Group);
                });
        });
    });

    asyncTest("triggers progress event", 1, function() {
        createScheduler();

        pdfStubMethod(draw, "exportPDF", function(group) {
            return exportNoop();
        }, function() {
            return scheduler.saveAsPDF().progress(function(e) {
                equal(e.progress, 1);
            });
        });
    });

    asyncTest("promise is available in event args", 1, function() {
        var promise = "foo", result;

        createScheduler({
            pdfExport: function(e) {
                promise = e.promise;
            }
        });

        pdfStubMethod(draw, "exportPDF", function(group) {
            equal(result, promise);
            return exportNoop();
        }, function() {
            return result = scheduler.saveAsPDF();
        });
    });

    asyncTest("promise is resolved", 1, function() {
        pdfStubMethod(draw, "exportPDF", function(group) {
            return exportNoop();
        }, function() {
            return scheduler.saveAsPDF().done(function(e) {
                ok(true);
            });
        });
    });

    asyncTest("promise is rejected on error", 1, function() {
        pdfStubMethod(draw, "exportPDF", function(group) {
            return $.Deferred().reject();
        }, function() {
            return scheduler.saveAsPDF()
                .fail(function(e) {
                    ok(true);
                });
        });
    });

    asyncTest("promise is rejected on drawing error", 1, function() {
        pdfStubMethod(draw, "drawDOM", function(group) {
            return $.Deferred().reject();
        }, function() {
            return scheduler.saveAsPDF()
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
            scheduler.options.pdf.avoidLinks = true;
            return scheduler.saveAsPDF()
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
            return scheduler.saveAsPDF()
                .fail(function(e) {
                    ok(true);
                });
        });
    });

})();
