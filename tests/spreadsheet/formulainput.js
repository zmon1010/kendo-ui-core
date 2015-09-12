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

    function getFormula(name) {
        return kendo.spreadsheet.calc.runtime.FUNCS[name];
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

    test("position method sets top and left of the element", function() {
        createFormulaInput();

        formulaInput.position({
            top: 50,
            left: 30
        });

        equal(element.css("top"), "50px");
        equal(element.css("left"), "30px");
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
        var editor = new kendo.spreadsheet.FormulaInput($("<div/>").appendTo(QUnit.fixture));

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

    test("caretToEnd method does nothing if element is not focused", function() {
        createFormulaInput();

        formulaInput.value("test");
        formulaInput.caretToEnd();

        var selection = window.getSelection();

        ok(!formulaInput.isActive());
        equal(selection.focusOffset, 0);
    });

    test("caretToEnd method does nothing if element is empty", function() {
        createFormulaInput();

        formulaInput.caretToEnd();

        var selection = window.getSelection();

        ok(!formulaInput.isActive());
        equal(selection.focusOffset, 0);
    });

    test("caretToEnd method does nothing if element is empty", function() {
        createFormulaInput();

        formulaInput.value("test");
        formulaInput.element.focus();

        formulaInput.caretToEnd();

        var selection = window.getSelection();

        ok(formulaInput.isActive());
        equal(selection.focusOffset, 4);
        equal(selection.type, "Caret");
    });

    //TODO: test caretAt

    test("scale updates width of the element based on its value", function() {
        var initialWidth = 50;

        createFormulaInput();

        formulaInput.element.width(initialWidth);
        formulaInput.value("looooooooooooooooooooooooooong text");

        formulaInput.scale();

        ok(formulaInput.element.width() > initialWidth);
    });

    test("scale method does not set width to the input less than cell width", function() {
        var initialWidth = 100;

        createFormulaInput({
            autoScale: true
        });

        formulaInput.resize({
            width: initialWidth,
            height: 30
        });

        formulaInput.value("s text");
        formulaInput.element.triggerHandler("input");

        equal(formulaInput.element.width(), initialWidth);
    });

    test("scale sets input width to cell width", function() {
        var initialWidth = 50;

        createFormulaInput({
            autoScale: true
        });

        formulaInput.element.width(initialWidth);
        formulaInput.value("looooooooooooooooooooooooooong text");
        formulaInput.element.triggerHandler("input");

        ok(formulaInput.element.width() > initialWidth);
    });

    test("activeFormula returns formula if caret is after '('", 1, function() {
        createFormulaInput();

        formulaInput.value("=SUM(");
        var selection = window.getSelection();
        var range = document.createRange();

        range.setStart(element[0].childNodes[0], 5);
        selection.removeAllRanges();
        selection.addRange(range);

        var formula = formulaInput.activeFormula();

        equal(formula, getFormula("sum"));
    });

    test("activeFormula returns formula if caret is after ','", 1, function() {
        createFormulaInput();

        formulaInput.value("=SUM(,");
        var selection = window.getSelection();
        var range = document.createRange();

        range.setStart(element[0].childNodes[0], 6);
        selection.removeAllRanges();
        selection.addRange(range);

        var formula = formulaInput.activeFormula();

        equal(formula, getFormula("sum"));
    });

    test("activeFormula returns null if caret is not in correct place", 1, function() {
        createFormulaInput();

        formulaInput.value("=SUM(sin,");
        var selection = window.getSelection();
        var range = document.createRange();

        range.setStart(element[0].childNodes[0], 6);
        selection.removeAllRanges();
        selection.addRange(range);

        var formula = formulaInput.activeFormula();

        equal(formula, null);
    });

    test("ref method inserts passed ref address", 2, function() {
        createFormulaInput();

        formulaInput.value("=SUM(");

        var selection = window.getSelection();
        var range = document.createRange();

        range.setStart(element[0].childNodes[0], 5);
        selection.removeAllRanges();
        selection.addRange(range);

        formulaInput.ref("A1");

        equal(formulaInput.value(), "=SUM(A1");
        equal(selection.focusOffset, 5);
    });

    test("ref method replaces current single cell ref", 2, function() {
        createFormulaInput();

        formulaInput.value("=SUM(B1");

        var selection = window.getSelection();
        var range = document.createRange();

        range.setStart(element[0].childNodes[0], 5);
        selection.removeAllRanges();
        selection.addRange(range);

        formulaInput.ref("A1");

        equal(formulaInput.value(), "=SUM(A1");
        equal(selection.focusOffset, 5);
    });

    test("ref method replaces current range ref", 2, function() {
        createFormulaInput();

        formulaInput.value("=SUM(B1:c1");

        var selection = window.getSelection();
        var range = document.createRange();

        range.setStart(element[0].childNodes[0], 5);
        selection.removeAllRanges();
        selection.addRange(range);

        formulaInput.ref("A1");

        equal(formulaInput.value(), "=SUM(A1");
        equal(selection.focusOffset, 5);
    });

    test("ref method does nothing if caret is not in correct place", 1, function() {
        createFormulaInput();

        formulaInput.value("=SUM(sum");

        var selection = window.getSelection();
        var range = document.createRange();

        range.setStart(element[0].childNodes[0], 6);
        selection.removeAllRanges();
        selection.addRange(range);

        formulaInput.ref("A1");

        equal(formulaInput.value(), "=SUM(sum");
    });

    module("Spreadsheet searching", {
        setup: function() {
            element = $("<div />").appendTo(QUnit.fixture);
        },
        teardown: function() {
            kendo.destroy(QUnit.fixture);
        }
    });

    test("creates formula source with all available functions", 3, function() {
        createFormulaInput();

        var source = formulaInput.formulaSource;

        source.read();

        var data = source.data();

        var funcs = Object.keys(kendo.spreadsheet.calc.runtime.FUNCS).filter(function(key){
            return /[a-z0-9]$/i.test(key);
        });

        equal(data.length, funcs.length);
        equal(data[0].text, "IF");
        equal(data[0].value, "IF");
    });

    test("creates StaticList bound to formulaSource", function() {
        createFormulaInput();

        ok(formulaInput.list instanceof kendo.ui.StaticList);
        equal(formulaInput.list.dataSource, formulaInput.formulaSource);
        ok(formulaInput.list.element.hasClass("k-spreadsheet-formula-list"));
    });

    test("creates Popup with widget anchor", function() {
        createFormulaInput();

        ok(formulaInput.popup instanceof kendo.ui.Popup);
        equal(formulaInput.popup.options.anchor[0], element[0]);
    });

    test("filters source based on value", function() {
        createFormulaInput();

        formulaInput.filter("su");

        var ul = formulaInput.list.element;
        var children = ul.children();

        ok(children.length > 1);
        ok(children.eq(0).text(), "SUM");
    });

    test("does not filter if text is shorter than minLength", 0, function() {
        createFormulaInput();

        formulaInput.formulaSource.bind("change", function() {
            ok(false);
        });

        formulaInput.filter("");
    });

    test("clears previous selection of selectlist on search", 1, function() {
        createFormulaInput();

        formulaInput.filter("sum");
        formulaInput.list.select(0);
        formulaInput.filter("su");

        ok(!formulaInput.list.value()[0]);
    });

    test("show formula list on typing", 1, function() {
        createFormulaInput();

        element.focus();
        element.text("=s");
        formulaInput.caretToEnd();
        element.trigger("keyup");

        ok(formulaInput.popup.visible());
    });

    test("position popup if already opened", 1, function() {
        createFormulaInput();

        element.focus();
        element.text("=s");
        formulaInput.caretToEnd();
        element.trigger("keyup");

        stub(formulaInput.popup, {
            position: formulaInput.popup.position
        });

        element.trigger("keyup");

        equal(formulaInput.popup.calls("position"), 1);
    });

    test("filter list on typing", 2, function() {
        createFormulaInput();

        element.focus();
        element.text("=s");
        formulaInput.caretToEnd();

        stub(formulaInput, { filter: formulaInput.filter });

        element.trigger("keyup");

        equal(formulaInput.calls("filter"), 1);
        equal(formulaInput.args("filter")[0], "s");
    });

    test("show result when caret is in the middle of node", 2, function() {
        createFormulaInput();

        element.focus();
        element.text("=su(sin");

        var selection = window.getSelection();
        var range = document.createRange();

        range.setStart(element[0].childNodes[0], 3);
        selection.removeAllRanges();
        selection.addRange(range);

        stub(formulaInput, { filter: formulaInput.filter });

        element.trigger("keyup");

        equal(formulaInput.calls("filter"), 1);
        equal(formulaInput.args("filter")[0], "su");
    });

    test("do not filter if text does not contain '=' at the begining of the input", 1, function() {
        createFormulaInput();

        element.focus();
        element.text("s");
        formulaInput.caretToEnd();

        stub(formulaInput, { filter: formulaInput.filter });

        element.trigger("keyup");

        equal(formulaInput.calls("filter"), 0);
    });

    function filterInput(filter, inputValue) {
        formulaInput.filter(filter);
        formulaInput.popup.open();

        element.focus();
        element.text(inputValue);
        formulaInput.caretToEnd();
    }

    test("close popup if formula value contains '(' symbol", 1, function() {
        kendo.effects.disable();
        createFormulaInput();

        filterInput("sum", "=sum(");

        element.trigger("keyup");

        ok(!formulaInput.popup.visible());
        kendo.effects.enable();
    });

    test("close popup if formula value contains ',' symbol", 1, function() {
        kendo.effects.disable();
        createFormulaInput();

        filterInput("sum", "=sum,");

        element.trigger("keyup");

        ok(!formulaInput.popup.visible());
        kendo.effects.enable();
    });

    test("close popup if filter result is empty", 1, function() {
        kendo.effects.disable();
        createFormulaInput();

        filterInput("sum", "=fake");

        element.trigger("keyup");

        ok(!formulaInput.popup.visible());
        kendo.effects.enable();
    });

    test("close popup on 'left/right' arrow", 1, function() {
        kendo.effects.disable();
        createFormulaInput();

        filterInput("sum", "=sum");

        element.trigger({
            type: "keydown",
            keyCode: kendo.keys.LEFT
        });

        ok(!formulaInput.popup.visible());
        kendo.effects.enable();
    });

    test("close popup on 'enter' arrow", 1, function() {
        kendo.effects.disable();
        createFormulaInput();

        filterInput("sum", "=sum");

        element.trigger({
            type: "keydown",
            keyCode: kendo.keys.ENTER
        });

        ok(!formulaInput.popup.visible());
        kendo.effects.enable();
    });

    test("close popup on 'esc' arrow", 1, function() {
        kendo.effects.disable();
        createFormulaInput();

        filterInput("sum", "=sum");

        element.trigger({
            type: "keydown",
            keyCode: kendo.keys.ESC
        });

        ok(!formulaInput.popup.visible());
        kendo.effects.enable();
    });

    test("close popup on 'spacebar' arrow", 1, function() {
        kendo.effects.disable();
        createFormulaInput();

        filterInput("sum", "=sum");

        element.trigger({
            type: "keydown",
            keyCode: kendo.keys.SPACEBAR
        });

        ok(!formulaInput.popup.visible());
        kendo.effects.enable();
    });

    test("close popup on 'home/end' arrow", 1, function() {
        kendo.effects.disable();
        createFormulaInput();

        filterInput("sum", "=sum");

        element.trigger({
            type: "keydown",
            keyCode: kendo.keys.HOME
        });

        ok(!formulaInput.popup.visible());
        kendo.effects.enable();
    });

    test("close popup on blur", 1, function() {
        kendo.effects.disable();
        createFormulaInput();

        filterInput("sum", "=sum");

        element.blur();

        ok(!formulaInput.popup.visible());
        kendo.effects.enable();
    });

    module("Spreadsheet navigation", {
        setup: function() {
            kendo.effects.disable();
            element = $("<div />").appendTo(QUnit.fixture);
        },
        teardown: function() {
            kendo.destroy(QUnit.fixture);
            kendo.effects.enable();
        }
    });

    test("focus first item on open", 1, function() {
        createFormulaInput();

        filterInput("su", "=su");

        element.trigger({
            type: "keyup"
        });

        var list = formulaInput.list;

        equal(list.focus()[0], list.element.children().eq(0)[0]);
    });

    test("focus next item on 'down'", 1, function() {
        createFormulaInput();

        filterInput("su", "=su");

        var list = formulaInput.list;
        list.focus(0);

        element.trigger({
            type: "keydown",
            keyCode: kendo.keys.DOWN
        });

        equal(list.focus()[0], list.element.children().eq(1)[0]);
    });

    test("focus first item on 'down' if last is focused", 1, function() {
        createFormulaInput();

        filterInput("su", "=su");

        var list = formulaInput.list;

        list.focusLast();

        element.trigger({
            type: "keydown",
            keyCode: kendo.keys.DOWN
        });

        equal(list.focus()[0], list.element.children().eq(0)[0]);
    });

    test("focus prev item on 'up'", 1, function() {
        createFormulaInput();

        filterInput("su", "=su");

        var list = formulaInput.list;

        list.focus(1);

        element.trigger({
            type: "keydown",
            keyCode: kendo.keys.UP
        });


        equal(list.focus()[0], list.element.children().eq(0)[0]);
    });

    test("focus last item on 'up' if first is focused", 1, function() {
        createFormulaInput();

        filterInput("su", "=su");

        var list = formulaInput.list;

        list.focusFirst();

        element.trigger({
            type: "keydown",
            keyCode: kendo.keys.UP
        });

        equal(list.focus()[0], list.element.children().last()[0]);
    });

    test("focus last item on 'pagedown'", 1, function() {
        createFormulaInput();

        filterInput("su", "=su");

        var list = formulaInput.list;

        list.focus(0);

        element.trigger({
            type: "keydown",
            keyCode: kendo.keys.PAGEDOWN
        });

        equal(list.focus()[0], list.element.children().last()[0]);
    });

    test("focus last item on 'pageup'", 1, function() {
        createFormulaInput();

        filterInput("su", "=su");

        var list = formulaInput.list;

        list.focusFirst();

        element.trigger({
            type: "keydown",
            keyCode: kendo.keys.PAGEUP
        });

        equal(list.focus()[0], list.element.children().first()[0]);
    });

    test("select focused item on 'enter'", 1, function() {
        createFormulaInput();

        filterInput("su", "=su");

        var list = formulaInput.list;

        list.focusFirst();

        element.trigger({
            type: "keydown",
            keyCode: kendo.keys.ENTER
        });

        equal(list.value(), "SUM");
    });

    test("if no focused item just close popup on 'enter'", 3, function() {
        createFormulaInput();

        filterInput("su", "=su");

        var list = formulaInput.list;

        element.trigger({
            type: "keydown",
            keyCode: kendo.keys.ENTER
        });

        equal(list.value(), "");
        equal(element.text(), "=su");
        ok(!formulaInput.popup.visible());
    });

    test("replace formula value on enter", 1, function() {
        createFormulaInput();

        filterInput("su", "=su");

        var list = formulaInput.list;

        list.focusFirst();

        element.trigger({
            type: "keydown",
            keyCode: kendo.keys.ENTER
        });

        equal(element.text(), "=SUM(");
    });

    test("autocomplete formula on TAB", 1, function() {
        createFormulaInput();

        filterInput("su", "=su");

        var list = formulaInput.list;

        list.focusFirst();

        element.trigger({
            type: "keydown",
            keyCode: kendo.keys.TAB
        });

        equal(element.text(), "=SUM(");
    });

    test("do not filter during navigation", 1, function() {
        createFormulaInput();

        filterInput("su", "=su");

        var list = formulaInput.list;

        element.trigger({
            type: "keydown",
            keyCode: kendo.keys.DOWN
        });

        element.trigger({
            type: "keyup",
            keyCode: kendo.keys.DOWN
        });

        equal(list.focus()[0], list.element.children().first()[0]);
    });

    test("do not open popup on 'right' arrow", 1, function() {
        createFormulaInput();

        filterInput("sum", "=sum");

        var list = formulaInput.list;

        element.trigger({
            type: "keydown",
            keyCode: kendo.keys.RIGHT
        });

        element.trigger({
            type: "keyup",
            keyCode: kendo.keys.RIGHT
        });

        ok(!formulaInput.popup.visible());
    });

    test("do not de-select when filter value is empty string", 1, function() {
        createFormulaInput();

        filterInput("sum(", "=sum(");

        stub(formulaInput.formulaSource, {
            filter: formulaInput.formulaSource.filter
        });

        element.trigger({
            type: "keyup",
            keyCode: kendo.keys.RIGHT
        });

        equal(formulaInput.formulaSource.calls("filter"), 0);
    });

    test("clear selection silently on filter", 1, function() {
        createFormulaInput();

        filterInput("si", "=SUM(si");
        formulaInput.element.focus();
        formulaInput.caretToEnd();

        formulaInput.list.select(0);

        equal(element.text(), "=SUM(SIN(");
    });

    test("do not add '(' if already in place", 1, function() {
        createFormulaInput();

        filterInput("s", "=s(");
        var selection = window.getSelection();
        var range = document.createRange();

        range.setStart(element[0].childNodes[0], 2);
        selection.removeAllRanges();
        selection.addRange(range);

        formulaInput.list.select(0);

        var value = formulaInput.list.value()[0];

        equal(element.text(), "=" + value + "(");
    });

    test("search when value contains white spaces", 1, function() {
        createFormulaInput();

        formulaInput.element.text("=SUM(A1,  s");
        formulaInput.element.focus();
        formulaInput.caretToEnd();

        element.trigger({
            type: "keyup",
            keyCode: 0
        });

        ok(formulaInput.popup.visible());
    });

    test("update wired editor on click", 1, function() {
        createFormulaInput();

        var value = "test";
        var editor = new kendo.spreadsheet.FormulaInput($("<div/>").appendTo(QUnit.fixture));

        formulaInput.syncWith(editor);

        filterInput("si", "=SUM(si");
        formulaInput.element.focus();
        formulaInput.caretToEnd();

        formulaInput.list.select(0);

        equal(editor.value(), "=SUM(SIN(");
    });
})();
