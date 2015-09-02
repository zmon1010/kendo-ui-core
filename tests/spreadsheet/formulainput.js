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

    test("hide method shows the element", function() {
        createFormulaInput();

        formulaInput.hide();

        ok(!element.is(":visible"));
    });

    test("show method shows the element", function() {
        createFormulaInput();

        element.hide();

        formulaInput.show();

        ok(element.is(":visible"));
    });

    test("syncWith method updates passed editor on value change", function() {
        createFormulaInput();

        var value = "test";
        var editor = new kendo.spreadsheet.FormulaInput($("<div/>"));

        formulaInput.syncWith(editor);

        formulaInput.element.focus();
        formulaInput.element.html(value).trigger("input");

        equal(editor.value(), value);
    });

    test("isActive method returns true if element is focused", function() {
        createFormulaInput();

        formulaInput.element.focus();

        ok(formulaInput.isActive());
    });

    test("isActive method returns false if element is focused", function() {
        createFormulaInput();

        ok(!formulaInput.isActive());
    });

    test("selectAll method does nothing if element is not focused", function() {
        createFormulaInput();

        formulaInput.value("test");
        formulaInput.caretToEnd();

        var selection = window.getSelection();

        ok(!formulaInput.isActive());
        equal(selection.focusOffset, 0);
    });

    test("selectAll method does nothing if element is empty", function() {
        createFormulaInput();

        formulaInput.caretToEnd();

        var selection = window.getSelection();

        ok(!formulaInput.isActive());
        equal(selection.focusOffset, 0);
    });

    test("selectAll method does nothing if element is empty", function() {
        createFormulaInput();

        formulaInput.value("test");
        formulaInput.element.focus();

        formulaInput.caretToEnd();

        var selection = window.getSelection();

        ok(formulaInput.isActive());
        equal(selection.focusOffset, 4);
        equal(selection.type, "Caret");
    });
})();
