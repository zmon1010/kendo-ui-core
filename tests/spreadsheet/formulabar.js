(function() {
    var element;
    var formulaBar;
    var formulaInput;

    module("Spreadsheet FormulaBar", {
        setup: function() {
            element = $("<div />").appendTo(QUnit.fixture);
        },
        teardown: function() {
            kendo.destroy(QUnit.fixture);
        }
    });

    function createFormulaBar(options) {
        options = options || {};
        formulaBar = new kendo.spreadsheet.FormulaBar(element, options);
        formulaInput = formulaBar.element.find("div.k-spreadsheet-formula-input").data("kendoFormulaInput");
    }

    test("renders formula input", function() {
        createFormulaBar();

        ok(formulaInput instanceof kendo.spreadsheet.FormulaInput);
    });

})();
