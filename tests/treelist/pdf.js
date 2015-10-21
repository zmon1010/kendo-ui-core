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
        var treelist = dom.kendoTreeList({
            toolbar: [ { name: "pdf" }]
        }).data("kendoTreeList");

        treelist.saveAsPDF = function() {
            ok(true);
        };

        dom.find(".k-grid-pdf").trigger("click");
    });

    test("clicking the pdf button fires the pdfExport event", 1, function() {
        var treelist = dom.kendoTreeList({
            toolbar: [ { name: "pdf" }],
            pdfExport: function() {
              ok(true);
            }
        }).data("kendoTreeList");

        treelist.saveAsPDF = function() {
            this.trigger("pdfExport");
        };

        dom.find(".k-grid-pdf").trigger("click");
    });
}());

// ------------------------------------------------------------
(function() {
    var draw = kendo.drawing;
    var treelist;
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

        treelist = dom.getKendoTreeList();
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

    asyncTest("passes reference to page content", 1, function () {
        pdfStubMethod(draw, "exportPDF", function (group) {
            return exportNoop();
        }, function () {
            return treelist.saveAsPDF()
                .progress(function (e) {
                    ok(e.page instanceof kendo.drawing.Group);
                });
        });
    });

    asyncTest("triggers progress event", 1, function () {
        pdfStubMethod(draw, "exportPDF", function (group) {
            return exportNoop();
        }, function () {
            return treelist.saveAsPDF().progress(function (e) {
                equal(e.progress, 1);
            });
        });
    });


    asyncTest("promise is available in event args", 1, function () {
        var promise = "foo", result;

        createTreeList({
            pdfExport: function (e) {
                promise = e.promise;
            }
        });

        pdfStubMethod(draw, "exportPDF", function (group) {
            equal(result, promise);
            return exportNoop();
        }, function () {
            result = treelist.saveAsPDF();
            return result;

        });
    });

    asyncTest("promise is resolved", 1, function () {
        pdfStubMethod(draw, "exportPDF", function (group) {
            return exportNoop();
        }, function () {
            return treelist.saveAsPDF().done(function (e) {
                ok(true);
            });
        });
    });

    asyncTest("promise is rejected on error", 1, function () {
        pdfStubMethod(draw, "exportPDF", function (group) {
            return $.Deferred().reject();
        }, function () {
            return treelist.saveAsPDF()
                .fail(function (e) {
                    ok(true);
                });
        });
    });

    asyncTest("promise is rejected on drawing error", 1, function () {
        pdfStubMethod(draw, "drawDOM", function (group) {
            return $.Deferred().reject();
        }, function () {
            return treelist.saveAsPDF()
                .fail(function (e) {
                    ok(true);
                });
        });
    });

    asyncTest("avoidLinks is passed through", 1, function() {
        pdfStubMethod(draw, "drawDOM", function(group, options) {
            ok(options.avoidLinks);
            return $.Deferred().resolve(new kendo.drawing.Group());
        }, function() {
            treelist.options.pdf.avoidLinks = true;
            return treelist.saveAsPDF()
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
            return treelist.saveAsPDF()
                .fail(function(e) {
                    ok(true);
                });
        });
    });

})();
