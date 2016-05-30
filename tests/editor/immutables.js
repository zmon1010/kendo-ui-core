(function(){
    var immutables, range, ev;
    var typingKeyCode = 65;
    var deleteKeyCode = 46;
    var backspaceKeyCode = 8;
    var defaultPrevented = false;
    var Editor = kendo.ui.editor;
    var dom = Editor.Dom;
    var Immutables = Editor.Immutables;
    var RangeUtils = Editor.RangeUtils;
    var keyboardTyping = {isTypingKey: function(e) { return true;}, typingInProgress: false};
    var body = document.createElement("div");
    var paragraph1 = dom.create(document, 'div', { innerHTML: "test1" });
    var paragraph2 = dom.create(document, 'div', { innerHTML: "test2" });
    var immutable = dom.create(document, 'div', { innerHTML: "immutable" });
    immutable.setAttribute("contentEditable", false);
    body.appendChild(paragraph1);
    body.appendChild(immutable);
    body.appendChild(paragraph2);
    
    var editor = { keyboard: {}, body: body };
    
    function setUpKeyboard(keyCode){
       ev = {keyCode: keyCode, preventDefault: function(){ defaultPrevented = true; }};
       editor.keyboard = keyboardTyping;
    }
    
    function setUpRange(startContainer, startOffset, endContainer, endOffset) {
        range = {collapsed: false, startContainer: startContainer, startOffset: startOffset, endContainer: endContainer, endOffset: endOffset};
        range.collapsed = startContainer === endContainer && startOffset === endOffset;
        range.commonAncestorContainer = dom.commonAncestor(startContainer, endContainer);
    }

    editor_module("editor immutables", {
        setup: function() {
            immutables = new Immutables(editor);
        }, 
        teardown: function() { 
            defaultPrevented = false;
            removeMocksIn(RangeUtils);
            removeMocksIn(Immutables.fn);
        }
    });

    test("typing when selection starts from immutable element", function() {
        setUpKeyboard(typingKeyCode);
        setUpRange(immutable.firstChild, 2, paragraph2.firstChild, 2);

        ok(immutables._cancelTyping(ev, range));
    });
    
    test("typing when selection ends in immutable element", function() {
        setUpKeyboard(typingKeyCode);
        setUpRange(paragraph1.firstChild, 2, immutable.firstChild, 2);

        ok(immutables._cancelTyping(ev, range));
    });
    
    test("delete by backspace when selection is before immutable element should delete immutable element", function() {
        setUpKeyboard(backspaceKeyCode);
        setUpRange(paragraph2.firstChild, 0, paragraph2.firstChild, 0);
        mockFunc(RangeUtils, "isStartOf", function() { return true; });
        var removed;
        mockFunc(Immutables.fn, "_removeImmutable", function(immutableEl, r) { removed = immutableEl;});

        ok(immutables._cancelDeleting(ev, range));
        ok(immutable === removed);
    });
    
    test("delete by delete when selection is after immutable element should delete immutable element", function() {
        setUpKeyboard(deleteKeyCode);
        setUpRange(paragraph1.firstChild, paragraph1.firstChild.length, paragraph1.firstChild, paragraph1.firstChild.length);
        mockFunc(RangeUtils, "isEndOf", function() { return true; });
        var removed;
        mockFunc(Immutables.fn, "_removeImmutable", function(immutableEl, r) { removed = immutableEl;});

        ok(immutables._cancelDeleting(ev, range));
        ok(immutable === removed);
    });
}());
