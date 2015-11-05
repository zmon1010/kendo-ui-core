(function() {
    var element;
    var formulaInput;

    var CellRef = kendo.spreadsheet.CellRef;
    var A1 = new CellRef(0, 0);

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

    test("renders tooltip element", function() {
        createFormulaInput();

        equal(formulaInput._cellTooltip[0], QUnit.fixture.find(".k-tooltip")[0]);
        ok(!formulaInput._cellTooltip.is(":visible"));
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

    test("position method sets top and left of the tooltip", function() {
        createFormulaInput();

        formulaInput.position({
            top: 50,
            left: 30
        });

        var resultTop = 50 - formulaInput._cellTooltip.height() - 10;

        equal(formulaInput._cellTooltip.css("top"), resultTop + "px");
        equal(formulaInput._cellTooltip.css("left"), "30px");
    });

    test("resize method sets width and height of the element", function() {
        createFormulaInput();

        formulaInput.resize({
            width: 50,
            height: 30
        });

        equal(element.width(), 51);
        equal(element.height(), 31);
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

        equal(formulaInput.element.width(), initialWidth+1);
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

    test("canRef method allows insert after formula '('", function() {
        createFormulaInput();

        formulaInput.value("=SUM(");
        formulaInput.end();

        ok(formulaInput.canInsertRef());
    });

    test("canRef method allows insert after formula ','", function() {
        createFormulaInput();

        formulaInput.value("=SUM(,");
        formulaInput.end();

        ok(formulaInput.canInsertRef());
    });

    test("canRef method DOES allow insert after '='", function() {
        createFormulaInput();

        formulaInput.value("=SUM(,");
        formulaInput.setPos(1);

        ok(!!formulaInput.canInsertRef());
    });

    test("canRef method doesn't allow insert when in middle of func", function() {
        createFormulaInput();

        formulaInput.value("=SUM(,");
        formulaInput.setPos(2);

        ok(!formulaInput.canInsertRef());
    });

    test("canRef method doesn't allow insertion after ')'", function() {
        createFormulaInput();

        formulaInput.value("=SUM()");
        formulaInput.end();

        ok(!formulaInput.canInsertRef());
    });

    test("canRef method in strict mode doesn't replace origin value token", function() {
        createFormulaInput();

        formulaInput.value("=SUM(A1:B1, C1:C2, SUM(D1:D2))");
        formulaInput.setPos(5);

         ok(!formulaInput.canInsertRef(true));
    });

    test("canRef method in strict mode doesn't allow insertion between '=' and 'func'", function() {
        createFormulaInput();

        formulaInput.value("=SUM(A1:B1, C1:C2, SUM(D1:D2))");
        formulaInput.setPos(1);

         ok(!formulaInput.canInsertRef(true));
    });

    test("canRef method in strict mode allows insertion after punc", function() {
        createFormulaInput();

        formulaInput.value("=SUM(");
        formulaInput.setPos(5);

         ok(formulaInput.canInsertRef(true));
    });

    test("canRef method in strict mode allows insertion b/n ',' and ')'", function() {
        createFormulaInput();

        formulaInput.value("=SUM(,)");
        formulaInput.setPos(6);

         ok(formulaInput.canInsertRef(true));
    });

    test("canRef method in strict mode doesn't allow insertion b/n '(' and ')'", function() {
        createFormulaInput();

        formulaInput.value("=SUM()");
        formulaInput.setPos(5);

         ok(!formulaInput.canInsertRef(true));
    });

    asyncTest("canRef method in strict mode doesn't allow replace of typed range", function() {
        createFormulaInput();

        formulaInput.value("=SUM(A1,");
        formulaInput.setPos(8);
        formulaInput.element.trigger("keydown");

        setTimeout(function() {
            start();
            formulaInput.setPos(7); //move back to range
            ok(!formulaInput.canInsertRef(true));
        });
    });

    test("ref method inserts passed ref address", 2, function() {
        createFormulaInput();

        formulaInput.value("=SUM(");
        formulaInput.end();

        formulaInput.refAtPoint(A1);

        equal(formulaInput.value(), "=SUM(A1");
        equal(formulaInput.getPos().begin, 7);
    });

    test("ref method replaces current single cell ref", 2, function() {
        createFormulaInput();

        formulaInput.value("=SUM(B1,");

        //simulate typed value after value set
        formulaInput.element.html(formulaInput.element.html() + "B2");
        formulaInput.end();

        formulaInput.refAtPoint(A1);

        equal(formulaInput.value(), "=SUM(B1,A1");
        equal(formulaInput.getPos().begin, 10);
    });

    test("ref method replaces current range ref", 2, function() {
        createFormulaInput();

        formulaInput.value("=SUM(B2,");

        //simulate typed value after value set
        formulaInput.element.html(formulaInput.element.html() + "B1:c1");
        formulaInput.end();
        formulaInput.refAtPoint(A1);

        equal(formulaInput.value(), "=SUM(B2,A1");
        equal(formulaInput.getPos().begin, 10);
    });

    test("ref method does nothing if caret is not in correct place", 1, function() {
        createFormulaInput();

        formulaInput.value("=SUM(sum");
        formulaInput.setPos(2); // the last sum *will* be replaced.
        formulaInput.refAtPoint(A1);

        equal(formulaInput.value(), "=SUM(sum");
    });

    test("tooltip method updates text of the tooltip element", function() {
        createFormulaInput();

        formulaInput.tooltip("test");

        equal(formulaInput._cellTooltip.text(), "test");
    });

    test("toggleTooltip method toggles tooltip element", function() {
        createFormulaInput();

        formulaInput.toggleTooltip(true);

        ok(formulaInput._cellTooltip.is(":visible"));
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

        var PRIVATE_FORMULA_CHECK = /(^_|[^a-z0-9]$)/i;
        var funcs = Object.keys(kendo.spreadsheet.calc.runtime.FUNCS).filter(function(key){
            return !PRIVATE_FORMULA_CHECK.test(key);
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
        formulaInput.end();
        element.trigger("keyup");

        ok(formulaInput.popup.visible());
    });

    test("position popup if already opened", 1, function() {
        createFormulaInput();

        element.focus();
        element.text("=s");
        formulaInput.end();
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
        formulaInput.end();

        stub(formulaInput, { filter: formulaInput.filter });

        element.trigger("keyup");

        equal(formulaInput.calls("filter"), 1);
        equal(formulaInput.args("filter")[0], "s");
    });

    test("filter list if after '*' symbol", 2, function() {
        createFormulaInput();

        element.focus();
        element.text("=*s");
        formulaInput.end();

        stub(formulaInput, { filter: formulaInput.filter });

        element.trigger("keyup");

        equal(formulaInput.calls("filter"), 1);
        equal(formulaInput.args("filter")[0], "s");
    });

    test("filter list if after '/' symbol", 2, function() {
        createFormulaInput();

        element.focus();
        element.text("=/s");
        formulaInput.end();

        stub(formulaInput, { filter: formulaInput.filter });

        element.trigger("keyup");

        equal(formulaInput.calls("filter"), 1);
        equal(formulaInput.args("filter")[0], "s");
    });

    test("filter list if after '*' and space", 2, function() {
        createFormulaInput();

        element.focus();
        element.text("= A1 * s * SUM(");
        formulaInput.setPos(8);

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
        formulaInput.end();

        stub(formulaInput, { filter: formulaInput.filter });

        element.trigger("keyup");

        equal(formulaInput.calls("filter"), 0);
    });

    function filterInput(filter, inputValue) {
        formulaInput.filter(filter);
        formulaInput.popup.open();

        element.focus();
        element.text(inputValue);
        formulaInput.end();
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

    test("replace formula value on enter if in middle", 1, function() {
        createFormulaInput();

        filterInput("sm", "=SM(");
        formulaInput.setPos(2);

        var list = formulaInput.list;

        list.focusFirst();

        element.trigger({
            type: "keydown",
            keyCode: kendo.keys.ENTER
        });

        equal(element.text(), "=SMALL(");
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
        formulaInput.end();

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
        formulaInput.end();

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
        formulaInput.end();

        formulaInput.list.select(0);

        equal(editor.value(), "=SUM(SIN(");
    });

    test("set formulaTokens on value update", function() {
        createFormulaInput();

        formulaInput.value("=SUM(A1:B1, C1:C2, SUM(D1:D2))");

        var tokens = formulaInput.highlightedRefs();

        equal(tokens.length, 3);
        equal(tokens[0].ref.toString(), "A1:B1");
        equal(tokens[0].cls, "k-syntax-ref,k-series-a");

        equal(tokens[1].ref.toString(), "C1:C2");
        equal(tokens[1].cls, "k-syntax-ref,k-series-b");

        equal(tokens[2].ref.toString(), "D1:D2");
        equal(tokens[2].cls, "k-syntax-ref,k-series-c");
    });

    module("Spreadsheet FormulaInput events", {
        setup: function() {
            element = $("<div />").appendTo(QUnit.fixture);
        },
        teardown: function() {
            kendo.destroy(QUnit.fixture);
        }
    });

    test("trigger keyup event on element keyup", 1, function() {
        createFormulaInput({
            keyup: function() {
                ok(true);
            }
        });

        formulaInput.element.trigger("keyup");
    });
})();
