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

    test("triggers change event on formula input change", 1, function() {
        createFormulaBar({
            change: function(e) {
                equal(e.value, "foo");
            }
        });

        formulaInput.value("foo");
        formulaInput.element.trigger("blur");
    });

    test("value sets input value", function() {
        createFormulaBar();

        formulaBar.value("bar");

        equal(formulaInput.value(), "bar");
    });

})();
