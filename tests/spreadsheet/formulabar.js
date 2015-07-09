(function() {
    var element;
    var formulaBar;
    var input;

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
        input = formulaBar.element.find("input");
    }

    test("renders value input", function() {
        createFormulaBar();

        ok(input.length, 1);
    });

    test("triggers change event on input change", 1, function() {
        createFormulaBar({
            change: function(e) {
                equal(e.value, "foo");
            }
        });

        input.val("foo").trigger("change");
    });

    test("value sets input value", function() {
        createFormulaBar();

        formulaBar.value("bar");

        equal(input.val(), "bar");
    });

})();
