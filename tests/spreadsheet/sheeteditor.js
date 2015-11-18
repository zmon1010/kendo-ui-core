(function() {
    var bar;
    var input;
    var CellRef = kendo.spreadsheet.CellRef;

    module("Spreadsheet Editor", {
        setup: function() {
            bar = new kendo.spreadsheet.FormulaBar($("<div />").appendTo(QUnit.fixture));
            input = new kendo.spreadsheet.FormulaInput($("<div />").hide().appendTo(QUnit.fixture));
        },
        teardown: function() {
            kendo.destroy(QUnit.fixture);
        }
    });

    function createEditor() {
        return new kendo.spreadsheet.SheetEditor({
            formulaBar: bar,
            formulaInput: input
        });
    }

    test("activate method calls cell formulaInput position method", 2, function() {
        var editor = createEditor();
        var rect = { top: 0, left: 0 };

        stub(editor.cellInput, {
            position: editor.cellInput.position
        });

        editor.activate({ rect: rect });

        equal(editor.cellInput.calls("position"), 1);
        equal(editor.cellInput.args("position")[0], rect);
    });

    test("activate method calls cell formulaInput resize method", 2, function() {
        var editor = createEditor();
        var rect = { top: 0, left: 0 };

        stub(editor.cellInput, {
            resize: editor.cellInput.resize
        });

        editor.activate({ rect: rect });

        equal(editor.cellInput.calls("resize"), 1);
        equal(editor.cellInput.args("resize")[0], rect);
    });

    test("activate method calls cell formulaInput tooltip method", 2, function() {
        var editor = createEditor();
        var rect = { top: 0, left: 0 };

        stub(editor.cellInput, {
            tooltip: editor.cellInput.tooltip
        });

        editor.activate({ rect: rect, tooltip: "B2" });

        equal(editor.cellInput.calls("tooltip"), 1);
        equal(editor.cellInput.args("tooltip")[0], "B2");
    });

    test("focus method focuses cell formulaInput", 1, function() {
        var editor = createEditor();

        editor.activate({ rect: { rect: { top: 0, left: 0 } } });
        editor.focus();

        equal(editor.cellInput.element[0], document.activeElement);
    });

    test("focus method places the caret to the end", 2, function() {
        var editor = createEditor();
        var cellInput = editor.cellInput;
        var value = "test";

        stub(cellInput, {
            setPos: cellInput.setPos
        });

        editor.activate({ rect: { rect: { top: 0, left: 0 } } });
        editor.value(value);
        editor.focus();

        equal(cellInput.calls("setPos"), 1);
        equal(cellInput.args("setPos")[0], value.length);
    });

    test("formulaInputs are not synced when editing is not active", function() {
        var editor = createEditor();
        var barInput = bar.formulaInput.element;

        barInput.html("test").trigger("input");

        equal(input.element.html(), "");
    });

    test("barInput is synced with cellInput when typing", function() {
        var editor = createEditor();
        var barInput = bar.formulaInput.element;
        var value = "test";

        editor.activate({ rect: { top: 0, left: 0 } });

        barInput.focus().html(value).trigger("input");

        equal(input.element.html(), value);
    });

    test("cellInput is synced with barInput when typing", function() {
        var editor = createEditor();
        var barInput = bar.formulaInput.element;
        var cellInput = input.element;
        var value = "test";

        editor.activate({ rect: { top: 0, left: 0 } });
        editor.focus();

        cellInput.html(value).trigger("input");

        equal(barInput.html(), value);
    });

    test("toggleTooltip method shows formulainput tooltip", 2, function() {
        var editor = createEditor();
        var rect = { top: 0, left: 0 };

        stub(editor.cellInput, {
            toggleTooltip: editor.cellInput.toggleTooltip
        });

        editor.activate({ rect: rect, tooltip: "A1" });

        editor.toggleTooltip({ top: 10, left: 0 });

        equal(editor.cellInput.calls("toggleTooltip"), 1);
        equal(editor.cellInput.args("toggleTooltip")[0], true);
    });

    test("toggleTooltip method hides formulainput tooltip", 1, function() {
        var editor = createEditor();
        var rect = { top: 0, left: 0 };

        editor.activate({ rect: rect, tooltip: "A1" });
        editor.toggleTooltip({ top: 10, left: 0 });

        stub(editor.cellInput, {
            toggleTooltip: editor.cellInput.toggleTooltip
        });

        editor.toggleTooltip(rect);

        equal(editor.cellInput.args("toggleTooltip")[0], false);
    });

    test("scale method calls cell formulaInput scale method", 1, function() {
        var editor = createEditor();

        stub(editor.cellInput, {
            scale: editor.cellInput.scale
        });

        editor.scale();

        equal(editor.cellInput.calls("scale"), 1);
    });

    test("value method sets the value of both editors", 2, function() {
        var editor = createEditor();
        var value = "test";

        editor.value(value);

        equal(editor.barInput.value(), value);
        equal(editor.cellInput.value(), value);
    });

    test("value method returns the current editor value", 1, function() {
        var editor = createEditor();
        var value = "test";

        editor.barInput.value(value);

        equal(editor.value(), value);
    });

    test("isActive returns true if editing is enabled", function() {
        var editor = createEditor();

        editor.activate({ rect: { top: 0, left: 0 } });

        ok(editor.isActive());
    });

    test("isActive returns false if editing is enabled", function() {
        var editor = createEditor();

        ok(!editor.isActive());
    });

    test("cellElement retuns cell formulaInput html element", function() {
        var editor = createEditor();

        equal(editor.cellElement(), editor.cellInput.element);
    });

    test("barElement retuns bar formulaInput html element", function() {
        var editor = createEditor();

        equal(editor.barElement(), editor.barInput.element);
    });

    test("isFiltered returns true if formulaInput popup is opened", function() {
        var editor = createEditor();

        editor.activate({ rect: { top: 0, left: 0 } });

        editor.cellInput.filter("sum");
        editor.cellInput.popup.open();

        ok(editor.isFiltered());
    });

    test("activeEditor returns the focused cell formula input", function() {
        var editor = createEditor();

        editor.activate({ rect: { top: 0, left: 0 } });

        input.element.focus();

        equal(editor.activeEditor(), input);
    });

    test("activeEditor returns the focused bar formula input", function() {
        var editor = createEditor();

        editor.activate({ rect: { top: 0, left: 0 } });

        bar.formulaInput.element.focus();

        equal(editor.activeEditor(), bar.formulaInput);
    });

    test("activeEditor returns null if no focused formulaInput", function() {
        var editor = createEditor();

        editor.activate({ rect: { top: 0, left: 0 } });

        equal(editor.activeEditor(), null);
    });

    test("canInsertRef calls formulaInput canInsertRef method", function() {
        var editor = createEditor();

        editor.activate({ rect: { top: 0, left: 0 } });
        editor.focus();

        stub(editor.cellInput, {
            canInsertRef: editor.cellInput.canInsertRef
        });

        editor.canInsertRef();

        equal(editor.cellInput.calls("canInsertRef"), 1);
    });

    module("Spreadsheet Editor events", {
        setup: function() {
            bar = new kendo.spreadsheet.FormulaBar($("<div />").appendTo(QUnit.fixture));
            input = new kendo.spreadsheet.FormulaInput($("<div />").hide().appendTo(QUnit.fixture));
        },
        teardown: function() {
            kendo.destroy(QUnit.fixture);
        }
    });

    test("activate method triggers active", 1, function() {
        var editor = createEditor();

        editor.bind("activate", function() {
            ok(true);
        });

        editor.activate({ rect: { top: 0, left: 0 } });
    });

    test("deactivate method triggers deactivate", 1, function() {
        var editor = createEditor();

        editor.bind("deactivate", function() {
            ok(true);
        });

        editor.activate({ rect: { top: 0, left: 0 } });
        editor.deactivate();
    });

    test("deactivate method does not trigger events if editor is not active", 0, function() {
        var editor = createEditor();

        editor.bind("deactivate", function() {
            ok(false);
        });

        editor.deactivate();
    });

    test("deactivate method does not trigger events if editor is not active", 0, function() {
        var editor = createEditor();

        editor.bind("deactivate", function() {
            ok(false);
        });

        editor.deactivate();
    });

    test("deactivate method calls cell input hide method", 1, function() {
        var editor = createEditor();
        var rect = { top: 0, left: 0 };

        stub(editor.cellInput, {
            hide: editor.cellInput.hide
        });

        editor.activate({ rect: rect });
        editor.deactivate();

        equal(editor.cellInput.calls("hide"), 1);
    });

    test("deactivate method calls change event if value has been changed", 1, function() {
        var editor = createEditor();
        var rect = { top: 0, left: 0 };
        var newValue = "changed";

        editor.bind("change", function(e) {
            equal(e.value, newValue);
        });

        editor.activate({ rect: rect });
        editor.value("test");

        editor.cellInput.value(newValue);

        editor.deactivate();
    });

    test("deactivate does not hide cellInput if change event is prevented", 0, function() {
        var editor = createEditor();
        var rect = { top: 0, left: 0 };
        var newValue = "changed";

        editor.bind("change", function(e) {
            e.preventDefault();
        });

        editor.cellInput.hide = function() {
            ok(true);
        };

        editor.activate({ rect: rect });
        editor.value("test");

        editor.cellInput.value(newValue);

        editor.deactivate();
    });

    test("deactivate method does not trigger deactivate event if change event is prevented", 0, function() {
        var editor = createEditor();

        editor.bind("change", function(e) {
            e.preventDefault();
        });

        editor.bind("deactivate", function() {
            ok(true);
        });

        editor.activate({ rect: { top: 0, left: 0 } });
        editor.deactivate();
    });

    test("deactivate method does not trigger change if no value change", 0, function() {
        var editor = createEditor();
        var rect = { top: 0, left: 0 };
        var newValue = "changed";

        editor.bind("change", function(e) {
            ok(false);
        });

        editor.activate({ rect: rect });
        editor.value("test");

        editor.deactivate();
    });

    test("trigger update event on cell formulainput keyup", 1, function() {
        var editor = createEditor();
        var rect = { top: 0, left: 0 };
        var value = "test";

        editor.bind("update", function(e) {
            equal(e.value, value);
        });

        editor.activate({ rect: rect });
        editor.value(value);

        editor.cellInput.trigger("keyup");
    });

    test("trigger update event on cell formulainput keyup", 1, function() {
        var editor = createEditor();
        var rect = { top: 0, left: 0 };
        var value = "test";

        editor.bind("update", function(e) {
            equal(e.value, value);
        });

        editor.activate({ rect: rect });
        editor.value(value);

        editor.barInput.trigger("keyup");
    });
})();
