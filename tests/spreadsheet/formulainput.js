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

        formulaInput.activate();
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

    test("resize method sets width and height of the element", function() {
        createFormulaInput();

        formulaInput.resize({
            width: 50,
            height: 30
        });

        equal(element.width(), 50);
        equal(element.height(), 30);
    });

    test("activate method positions the element", function() {
        createFormulaInput();

        formulaInput.activate({
            rectangle: {
                top: 10,
                left: 20
            }
        });

        equal(element.css("left"), "20px");
        equal(element.css("top"), "10px");
    });

    test("activate method sizes the element", function() {
        createFormulaInput();

        formulaInput.activate({
            rectangle: {
                width: 100,
                height: 40
            }
        });

        equal(element.width(), 100);
        equal(element.height(), 40);
    });

    test("activate method sets widget value", function() {
        createFormulaInput();

        formulaInput.activate({
            value: "test"
        });

        equal(element.html(), "test");
    });

    test("activate method shows the element", function() {
        createFormulaInput();

        element.hide();

        formulaInput.activate();

        ok(element.is(":visible"));
    });

    test("activate method sets active state", function() {
        createFormulaInput();

        formulaInput.activate();

        ok(formulaInput.isActive());
    });

    test("deactivate method triggers change event", function() {
        var value = "test";

        createFormulaInput();

        formulaInput.activate({
            value: value
        });

        formulaInput.bind("change", function(e) {
            equal(e.value, value);
        });

        formulaInput.deactivate();
    });

    test("deactivate method hides the element", function() {
        createFormulaInput();

        formulaInput.activate();
        formulaInput.deactivate();

        ok(!element.is(":visible"));
    });

    test("deactivate method disables active state", function() {
        createFormulaInput();

        formulaInput.activate();
        formulaInput.deactivate();

        ok(!formulaInput.isActive());
    });
})();
