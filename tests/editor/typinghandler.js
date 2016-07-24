(function(){

var editor;

var TypingHandler = kendo.ui.editor.TypingHandler;
var oldEditorKeyboard;

editor_module("editor typing handler", {
    setup: function() {
        editor = $("#editor-fixture").data("kendoEditor");
        editor.focus();
        oldEditorKeyboard = editor.keyboard;
    },
    teardown: function() {
        editor.keyboard = oldEditorKeyboard;
    }
});

test('typing handler keydown creates start restore point if typing', function() {
    editor.keyboard = {
        isTypingKey: function () { return true; },
        startTyping: function () {},
        isTypingInProgress: function() { return false; }
    };

    var handler = new TypingHandler(editor);

    handler.keydown();

    ok(undefined !== handler.startRestorePoint);
});

function setStartTypingKeyboard() {
    editor.keyboard = {
        isTypingKey: function () { return true; },
        startTyping: function () {},
        isTypingInProgress: function() { return false; }
    };
}

function selectAndType(range){
    var handler = new TypingHandler(editor);
    withMock(editor, "getRange", function() { return range; }, function() {
        withMock(editor, "selectRange", $.noop, function() {
            handler.keydown();
        });
    });
}
var testContent = "<p><em>test</em></p> <p><em>test</em></p>";

if (kendo.support.browser.webkit) {
    test('typing handler keydown deletes all content if all selected', function() {
        setStartTypingKeyboard();
        var body = editor.body;
        body.innerHTML = testContent;
        var range = {collapsed: false, commonAncestorContainer: body, startContainer: body, endContainer: body, startOffset: 0, endOffset: body.childNodes.length};

        selectAndType(range);

        ok(body.innerHTML == "");
    });

    test('typing handler keydown does not delete the content if not all is selected', function() {
        setStartTypingKeyboard();
        var body = editor.body;
        body.innerHTML = testContent;
        var range = {collapsed: false, commonAncestorContainer: body, startContainer: body, endContainer: body, startOffset: 0, endOffset: 1};

        selectAndType(range);

        ok(body.innerHTML == testContent);
    });
}

test('typing handler keydown when selection is in table', function() {
    setStartTypingKeyboard();
    var body = editor.body;
    body.innerHTML = "<table><tbody><tr><td>test1</td></tr><tr><td>test2</td></tr><tr><td>test3</td></tr></tbody></table>";
    var tbody = $(body).find("tbody");
    var tds = tbody.find("td");
    var range = editor.createRange(editor.document);
    range.setStart(tds.get(0).firstChild, 2);
    range.setEnd(tds.last().get(0).firstChild, 2);

    selectAndType(range);

    ok(body.innerHTML == "<table><tbody><tr><td>te</td></tr><tr><td>\ufeff</td></tr><tr><td>st3</td></tr></tbody></table>");
});

test('typing handler keydown when table content is selected', function() {
    setStartTypingKeyboard();
    var body = editor.body;
    body.innerHTML = "<table><tbody><tr><td>test1</td></tr><tr><td>test2</td></tr><tr><td>test3</td></tr></tbody></table>";
    var tbody = $(body).find("tbody");
    var tds = tbody.find("td");
    var range = editor.createRange(editor.document);
    var lastTd = tds.last().get(0);
    range.setStart(tds.get(0).firstChild, 0);
    range.setEnd(lastTd.firstChild, lastTd.firstChild.length);

    selectAndType(range);

    ok(body.innerHTML == "<table><tbody><tr><td>\ufeff</td></tr><tr><td>\ufeff</td></tr><tr><td>\ufeff</td></tr></tbody></table>");
});

test('typing handler keydown when selection is in immutable element', function() {
    setStartTypingKeyboard();
    var body = editor.body;
    body.innerHTML = "<p contenteditable='false'>immutable</p><p>test</p>";
    editor.immutables = {};
    var range = editor.createRange(editor.document);
    var immutable = $(body).find("p[contenteditable]").get(0);
    range.setStart(immutable.firstChild, 2);
    range.setEnd(immutable.firstChild, 2);

    selectAndType(range);

    delete editor.immutables;
    ok(body.innerHTML == "\ufeff<p>test</p>");
});

test('typing handler keydown calls startTyping', function() {
    var callback;

    editor.keyboard = {
        isTypingKey: function () { return true; },
        startTyping: function () { callback = arguments[0]; },
        isTypingInProgress: function() { return false; }
    };

    var handler = new TypingHandler(editor);
    handler.keydown();
    ok(undefined !== callback);
});

test('typing handler keydown returns true', function() {
    editor.keyboard = {
        isTypingKey: function () { return true; },
        startTyping: function () {},
        isTypingInProgress: function() { return false; }
    };

    var handler = new TypingHandler(editor);
    ok(handler.keydown());
});

test('typing handler keydown returns false if typing is in progress', function() {
    editor.keyboard = {
        isTypingKey: function () { return true; },
        startTyping: function () {},
        isTypingInProgress: function() { return true; }
    };

    var handler = new TypingHandler(editor);
    ok(!handler.keydown());
});

test('typing handler keydown returns false if not typing', function() {
    editor.keyboard = {
        isTypingKey: function () { return false; },
        startTyping: function () {},
        isTypingInProgress: function() { return true; }
    };

    var handler = new TypingHandler(editor);
    ok(!handler.keydown());
});

test('typing handler keyup creates end restore point if typing', function() {
    editor.keyboard = {
        isTypingKey: function () { return true; },
        startTyping: function (callback) { this.callback = callback; },
        isTypingInProgress: function() { return false; },
        endTyping: function () { this.callback(); }
    };

    var handler = new TypingHandler(editor);

    handler.keydown();

    editor.keyboard.isTypingInProgress = function() { return true; };

    handler.keyup();

    ok(undefined !== handler.endRestorePoint);
});

test('typing handler keyup creates undo command', function() {
    editor.keyboard = {
        isTypingKey: function () { return true; },
        startTyping: function (callback) { this.callback = callback; },
        isTypingInProgress: function() { return false; },
        endTyping: function () { this.callback(); }
    };

    var command;
    editor.undoRedoStack.push = function(){ command = arguments[0]; };

    var handler = new TypingHandler(editor);

    handler.keydown();

    editor.keyboard.isTypingInProgress = function() { return true; };

    handler.keyup();

    ok(undefined !== command);
});

test('typing handler keyup returns true when typing', function() {
    editor.keyboard = {
        isTypingKey: function () { return true; },
        startTyping: function (callback) { this.callback = callback; },
        isTypingInProgress: function() { return false; },
        endTyping: function () { this.callback(); }
    };

    var command;
    editor.undoRedoStack.push = function(){ command = arguments[0]; };

    var handler = new TypingHandler(editor);

    handler.keydown();

    editor.keyboard.isTypingInProgress = function() { return true; };

    ok(handler.keyup());
});

test('typing handler keyup returns false when not typing', function() {
    editor.keyboard = {
        isTypingKey: function () { return true; },
        startTyping: function (callback) { this.callback = callback; },
        isTypingInProgress: function() { return false; },
        endTyping: function () { this.callback(); }
    };

    var command;
    editor.undoRedoStack.push = function(){ command = arguments[0]; };

    var handler = new TypingHandler(editor);

    handler.keydown();

    ok(!handler.keyup());
});

}());
