(function() {
    var element;
    var formulaInput;

    module("Spreadsheet FormulaInput", {
        setup: function() {
            element = $("<div />").appendTo(QUnit.fixture);
        },
        teardown: function() {
            kendo.destroy(QUnit.fixture);
        }
    });

    function createFormulaInput(options) {
        options = options || {};
        formulaInput = new kendo.spreadsheet.FormulaInput(element, options);
    }

    test("decorates div element", function() {
        createFormulaInput();

        equal(element.attr("contenteditable"), "true");
        ok(element.hasClass("k-spreadsheet-formula-input"));
    });

    test("triggers change event on input change", 1, function() {
        createFormulaInput({
            change: function(e) {
                equal(e.value, "foo");
            }
        });

        element.html("foo").blur();
    });

    test("value sets input value", function() {
        createFormulaInput();

        formulaInput.value("bar");

        equal(element.html(), "bar");
    });

    test("value gets element value", function() {
        createFormulaInput();

        element.html("bar");

        equal(formulaInput.value(), "bar");
    });

})();
