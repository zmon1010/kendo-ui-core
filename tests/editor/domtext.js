(function () {
    var traverser;
    var detector;
    var DomTextLinkDetection = kendo.ui.editor.DomTextLinkDetection;
    var LeftDomTextTraverser = kendo.ui.editor.LeftDomTextTraverser;
    var RightDomTextTraverser = kendo.ui.editor.RightDomTextTraverser;

    QUnit.module("left DOM text traverser");

    test("traverse from end of single text node", function() {
        var content = addContent("content");
        var traverser = new LeftDomTextTraverser({
            node: content.childNodes[0],
            offset: 7
        });

        traverser.traverse(function (text, node, offset) {
            equal(text, "content");
        });
    });

    test("traverse from middle of text", function() {
        var content = addContent("content");
        var traverser = new LeftDomTextTraverser({
            node: content.childNodes[0],
            offset: 3
        });

        traverser.traverse(function (text, node, offset) {
            equal(text, "con");
            equal(offset, 3);
        });
    });

    test("traverse over inline node", function() {
        var content = addContent("con<strong>te</strong>nt");
        var traverser = new LeftDomTextTraverser({
            node: content.childNodes[2],
            offset: 1
        });

        var texts = ["con", "te", "n"];
        var offsets = [undefined, undefined, 1];
        var callback = initMock(function(text, node, offset) {
            equal(text, texts.pop());
            equal(offset, offsets.pop());
        });

        traverser.traverse(callback);

        equal(callback.callCount, 3);
    });

    test("double inline formatting", function() {
        var content = addContent("co<strong><em>n</em><em>te</em></strong>nt");
        var traverser = new LeftDomTextTraverser({
            node: content.childNodes[2],
            offset: 1
        });

        var texts = ["co", "n", "te", "n"];
        var offsets = [undefined, undefined, undefined, 1];

        var callback = initMock(function(text, node, offset) {
            equal(text, texts.pop());
            equal(offset, offsets.pop());
        });

        traverser.traverse(callback);

        equal(callback.callCount, 4);
    });

    test("traverse from inline node", function () {
        var content = addContent("conte<strong>nt</strong>");
        var traverser = new LeftDomTextTraverser({
            node: content.childNodes[1].firstChild,
            offset: 1
        });

        var texts = ["conte", "n"];
        var offsets = [undefined, 1];
        var callback = initMock(function(text, node, offset) {
            equal(text, texts.pop());
            equal(offset, offsets.pop());
        });

        traverser.traverse(callback);

        equal(callback.callCount, 2);
    });

    test("cancel midway", function() {
        var content = addContent("con<strong>te</strong>nt");
        var traverser = new LeftDomTextTraverser({
            node: content.childNodes[2],
            offset: 1
        });

        var texts = ["te", "n"];
        var offsets = [undefined, 1];
        var callback = initMock(function(text, node, offset) {
            equal(text, texts.pop());
            equal(offset, offsets.pop());

            return texts.length > 0;
        });

        traverser.traverse(callback);

        equal(callback.callCount, 2);
    });

    QUnit.module("right DOM text traverser");

    test("traverse from start of single text node", function() {
        var content = addContent("content");
        var traverser = new RightDomTextTraverser({
            node: content.childNodes[0],
            offset: 0
        });

        traverser.traverse(function (text, node, offset) {
            equal(text, "content");
        });
    });

    test("traverse from middle of text", function() {
        var content = addContent("content");
        var traverser = new RightDomTextTraverser({
            node: content.childNodes[0],
            offset: 3
        });

        traverser.traverse(function (text, node, offset) {
            equal(text, "tent");
            equal(offset, 3);
        });
    });

    test("traverse over inline node", function() {
        var content = addContent("con<strong>te</strong>nt");
        var traverser = new RightDomTextTraverser({
            node: content.childNodes[0],
            offset: 1
        });

        var texts = ["on", "te", "nt"];
        var offsets = [1, undefined, undefined];
        var callback = initMock(function(text, node, offset) {
            equal(text, texts.shift());
            equal(offset, offsets.shift());
        });

        traverser.traverse(callback);

        equal(callback.callCount, 3);
    });

    test("double inline formatting", function() {
        var content = addContent("co<strong><em>n</em><em>te</em></strong>nt");
        var traverser = new RightDomTextTraverser({
            node: content.childNodes[0],
            offset: 1
        });

        var texts = ["o", "n", "te", "nt"];
        var offsets = [1, undefined, undefined, undefined];

        var callback = initMock(function(text, node, offset) {
            equal(text, texts.shift());
            equal(offset, offsets.shift());
        });

        traverser.traverse(callback);

        equal(callback.callCount, 4);
    });

    test("traverse from inline node", function () {
        var content = addContent("<strong>con</strong>tent");
        var traverser = new RightDomTextTraverser({
            node: content.childNodes[0].firstChild,
            offset: 1
        });

        var texts = ["on", "tent"];
        var offsets = [1, undefined];
        var callback = initMock(function(text, node, offset) {
            equal(text, texts.shift());
            equal(offset, offsets.shift());
        });

        traverser.traverse(callback);

        equal(callback.callCount, 2);
    });

    test("cancel midway", function() {
        var content = addContent("con<strong>te</strong>nt");
        var traverser = new RightDomTextTraverser({
            node: content.childNodes[0],
            offset: 1
        });

        var texts = ["on", "te"];
        var offsets = [1, undefined];
        var callback = initMock(function(text, node, offset) {
            equal(text, texts.shift());
            equal(offset, offsets.shift());

            return texts.length > 0;
        });

        traverser.traverse(callback);

        equal(callback.callCount, 2);
    });

    QUnit.module("detection of link");

    test("no link detected", function() {
        var detection = initDetection("content ", 0);

        var result = detection.detectLink();

        ok(!result);
    });

    test("detect link", function() {
        var detection = initDetection("http://www.telerik.com ", 0);

        var result = detection.detectLink();

        equal(result.end.node.data, "http://www.telerik.com ");
    });

    test("detect link over inline nodes", function () {
        var detection = initDetection("http://www.te<strong>le</strong>rik.com ", 2);

        var result = detection.detectLink();

        equal(result.start.node.data, "http://www.te");
        equal(result.start.offset, 0);
        equal(result.end.node.data, "rik.com ");
        equal(result.end.offset, 7);
        equal(result.text, "http://www.telerik.com");
    });

    test("detect link in non-URL chars at end", function () {
        var text = "http://www.telerik.com''''';;; ";
        var detection = initDetection("http://www.telerik.com''''';;; ", 0);

        var result = detection.detectLink();

        equal(result.start.node.data, text);
        equal(result.start.offset, 0);
        equal(result.end.node.data, text);
        equal(result.end.offset, 22);
        equal(result.text, "http://www.telerik.com");
    });

    test("detect link in mixed non-URL and URL chars at end", function () {
        var text = "http://www.telerik.com||$ ";
        var detection = initDetection(text, 0);

        var result = detection.detectLink();

        equal(result.start.node.data, text);
        equal(result.start.offset, 0);
        equal(result.end.node.data, text);
        equal(result.end.offset, 25);
        equal(result.text, "http://www.telerik.com||$");
    });

    test("detect link in middle of the text", function () {
        var text = "word http://www.telerik.com ";
        var detection = initDetection(text, 0);

        var result = detection.detectLink();

        equal(result.start.node.data, text);
        equal(result.start.offset, 5);
        equal(result.end.node.data, text);
        equal(result.end.offset, 27);
        equal(result.text, "http://www.telerik.com");
    });

    function initDetection(html, nodeIndex, offset) {
        var content = addContent(html);
        var traverser = new LeftDomTextTraverser({
            node: content.childNodes[nodeIndex],
            offset: offset
        });

        return new DomTextLinkDetection(traverser);
    }

    function addContent(html) {
        return $("#qunit-fixture").html(html)[0];
    }

    function __test() {}
})();