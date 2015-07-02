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

    test("passes reference to page content", function() {
        stubMethod(draw, "exportPDF", function(group) {
            return exportNoop();
        }, function() {
            scheduler.saveAsPDF()
            .progress(function(e) {
                ok(e.page instanceof kendo.drawing.Group);
            });
        });
    });

    test("triggers progress event", function() {
        createScheduler();

        stubMethod(draw, "exportPDF", function(group) {
            return exportNoop();
        }, function() {
            scheduler.saveAsPDF().progress(function(e) {
                equal(e.progress, 1);
            });
        });
    });

    test("promise is available in event args", function() {
        var promise = "foo";

        createScheduler({
            pdfExport: function(e) {
                promise = e.promise;
            }
        });

        stubMethod(draw, "exportPDF", function(group) {
            return exportNoop();
        }, function() {
            var result = scheduler.saveAsPDF();
            equal(result, promise);
        });
    });

    test("promise is resolved", function() {
        stubMethod(draw, "exportPDF", function(group) {
            return exportNoop();
        }, function() {
            scheduler.saveAsPDF().done(function(e) {
                ok(true);
            });
        });
    });

    test("promise is rejected on error", function() {
        stubMethod(draw, "exportPDF", function(group) {
            return $.Deferred().reject();
        }, function() {
            scheduler.saveAsPDF()
            .fail(function(e) {
                ok(true);
            });
        });
    });

    test("promise is rejected on drawing error", function() {
        stubMethod(draw, "drawDOM", function(group) {
            return $.Deferred().reject();
        }, function() {
            scheduler.saveAsPDF()
            .fail(function(e) {
                ok(true);
            });
        });
    });

})();
