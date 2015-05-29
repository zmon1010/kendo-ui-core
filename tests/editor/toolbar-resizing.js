(function(){

var editor, textarea, options;

module("editor resizable toolbar", {
    setup: function() {
        QUnit.fixture.append(
            '<div id="wrapper" style="width: 1200px"><textarea cols="20" rows="4" id="editor"></textarea></div>'
        );

        textarea = $("#editor");

        options = {
            resizable: {
                content: false,
                toolbar: true
            },
            tools: [
                "bold",
                "italic",
                "underline",
                "strikethrough",
                "fontName",
                "fontSize",
                "foreColor",
                "backColor",
                "justifyLeft",
                "justifyCenter",
                "justifyRight",
                "justifyFull",
                "insertUnorderedList",
                "insertOrderedList",
                "indent",
                "outdent",
                "formatting",
                "createLink",
                "unlink",
                "insertImage"
            ]
        }
    },
    teardown: function() {
        kendo.destroy(QUnit.fixture);
        QUnit.fixture.empty();
    }
});

test('has class k-toolbar-resizable', function () {
    var editor = textarea.kendoEditor(options).data("kendoEditor");
    ok(editor.toolbar.element.hasClass("k-toolbar-resizable"));
});

test('does not add k-toolbar-resizable class if resizable is set to false', function() {
    var editor = textarea.kendoEditor($.extend(options, { resizable: false })).data("kendoEditor");
    ok(!editor.toolbar.element.hasClass("k-toolbar-resizable"));
});

test('renders "overflow" tool', function () {
    var editor = textarea.kendoEditor(options).data("kendoEditor");
    ok(editor.toolbar.element.children("li.k-overflow-tools").length);
});

test('tool groups that fit in the toolbar container are visible', function() {
    var editor = textarea.kendoEditor(options).data("kendoEditor");
    var toolbarElement = editor.toolbar.element;

    ok(toolbarElement.children("li").first().is(":visible"));
});

test('tool groups has data overflow property', function() {
    var editor = textarea.kendoEditor(options).data("kendoEditor");
    var toolbarElement = editor.toolbar.element;

    equal(toolbarElement.children("li.k-tool-group").eq(0).data("overflow"), true);
    equal(toolbarElement.children("li.k-tool-group").eq(1).data("overflow"), false);
});

test('tool groups that contain tools with popup has overflow: false', function() {
    var customOptions = { resizable: { content: false, toolbar: true }, tools: [ "fontName", "fontSize", "foreColor", "backColor", "formatting" ] };
    var editor = textarea.kendoEditor(customOptions).data("kendoEditor");
    var toolbarElement = editor.toolbar.element;

    toolbarElement.children("li.k-tool-group").each(function(idx, element) {
        equal($(element).data("overflow"), false);
    });
});

test('"overflowAnchor" button is not visible if there are no items in the "overflow" popup', function() {
    var editor = textarea.kendoEditor(options).data("kendoEditor");
    var toolbarElement = editor.toolbar.element;

    equal(toolbarElement.children("li.k-overflow-tools").css("visibility"), "hidden");
});

test('"overflowAnchor" button is visible if there are items in the "overflow" popup', function() {
    $("#wrapper").width(400);

    var editor = textarea.kendoEditor(options).data("kendoEditor");
    var toolbarElement = editor.toolbar.element;

    equal(toolbarElement.children("li.k-overflow-tools").css("visibility"), "visible");
});

test('tools groups with "overflow: true" that do not fit in the toolbar width are moved to the popup', 4, function() {
    $("#wrapper").width(600);

    var editor = textarea.kendoEditor(options).data("kendoEditor");

    var movedToolGroups = editor.toolbar.overflowPopup.element.children();

    equal(movedToolGroups.length, 3);
    movedToolGroups.each(function(idx, element) {
       equal($(element).data("overflow"), true);
    });
});

test('tools groups with "overflow: false" that do not fit in the toolbar width are hidden', 4, function() {
    $("#wrapper").width(600);

    var editor = textarea.kendoEditor(options).data("kendoEditor");
    var toolbarElement = editor.toolbar.element;

    var hiddenToolGroups = toolbarElement.children("li.k-tool-group:hidden");

    equal(hiddenToolGroups.length, 3);
    hiddenToolGroups.each(function(idx, element) {
       equal($(element).data("overflow"), false);
    });
});

test('tools groups that do fit in the toolbar are visible', function() {
    $("#wrapper").width(600);

    var editor = textarea.kendoEditor(options).data("kendoEditor");
    var toolbarElement = editor.toolbar.element;

    var visibleToolGroups = toolbarElement.children("li.k-tool-group:visible");

    equal(visibleToolGroups.length, 1);
});

test('dynamic resizing: "overflowAnchor" button is visible if there are items in the "overflow" popup', function() {
    var editor = textarea.kendoEditor(options).data("kendoEditor");
    var toolbarElement = editor.toolbar.element;

    equal(toolbarElement.children("li.k-overflow-tools").css("visibility"), "hidden");

    $("#wrapper").width(400);
    editor.toolbar.resize();

    equal(toolbarElement.children("li.k-overflow-tools").css("visibility"), "visible");
});

test('dynamic resizing: tools groups with "overflow: true" that do not fit in the toolbar width are moved to the popup', 5, function() {
    var editor = textarea.kendoEditor(options).data("kendoEditor");

    var movedToolGroups = editor.toolbar.overflowPopup.element.children();
    equal(movedToolGroups.length, 0);

    $("#wrapper").width(600);
    editor.toolbar.resize();

    movedToolGroups = editor.toolbar.overflowPopup.element.children();

    equal(movedToolGroups.length, 3);
    movedToolGroups.each(function(idx, element) {
       equal($(element).data("overflow"), true);
    });
});

test('dynamic resizing: tools groups with "overflow: false" that do not fit in the toolbar width are hidden', 4, function() {
    var editor = textarea.kendoEditor(options).data("kendoEditor");
    var toolbarElement = editor.toolbar.element;

    $("#wrapper").width(600);
    editor.toolbar.resize();

    var hiddenToolGroups = toolbarElement.children("li.k-tool-group:hidden");

    equal(hiddenToolGroups.length, 3);
    hiddenToolGroups.each(function(idx, element) {
       equal($(element).data("overflow"), false);
    });
});

test('dynamic resizing: tools groups that do fit in the toolbar are visible', function() {
    var editor = textarea.kendoEditor(options).data("kendoEditor");
    var toolbarElement = editor.toolbar.element;

    $("#wrapper").width(600);
    editor.toolbar.resize();

    var visibleToolGroups = toolbarElement.children("li.k-tool-group:visible");

    equal(visibleToolGroups.length, 1);
});

test('resizable toolbar creates overflowPopup', function() {
    var editor = textarea.kendoEditor(options).data("kendoEditor");
    var toolbar = editor.toolbar;
    
    ok(toolbar.overflowPopup instanceof kendo.ui.Popup);
    ok(toolbar.overflowPopup.element.is("ul.k-editor-overflow-popup"));
});

test('click on "overflow" button does not open the overflowPopup if it is empty', function() {
    var editor = textarea.kendoEditor(options).data("kendoEditor");
    var toolbarElement = editor.toolbar.element;

    toolbarElement.find(".k-overflow-anchor").trigger("click");

    ok(!editor.toolbar.overflowPopup.visible());
});

test('click on "overflow" button opens the overflowPopup if it contains items', function() {
    $("#wrapper").width(600);
    var editor = textarea.kendoEditor(options).data("kendoEditor");
    var toolbarElement = editor.toolbar.element;

    toolbarElement.find(".k-overflow-anchor").trigger("click");

    ok(editor.toolbar.overflowPopup.visible());
});

test('overflowPopup is closed on resize', function() {
    $("#wrapper").width(600);
    var editor = textarea.kendoEditor(options).data("kendoEditor");
    var toolbarElement = editor.toolbar.element;

    toolbarElement.find(".k-overflow-anchor").trigger("click");

    $("#wrapper").width(800);
    editor.toolbar.resize();

    ok(!editor.toolbar.overflowPopup.visible());
});

test('tools are refreshed on resize', function() {
    var editor = textarea.kendoEditor(options).data("kendoEditor");
    var refreshTools = stub(editor.toolbar, "refreshTools");

    $("#wrapper").width(800);
    editor.toolbar.resize();

    equal(refreshTools.calls("refreshTools"), 1);
});

test('tool state does not change when the tool is send to the overflow popup', function() {
    var editorOptions = {
        resizable: { content: false, toolbar: true },
        tools: [
            "justifyLeft",
            "justifyCenter",
            "justifyRight",
            "justifyFull",

            "bold",
            "italic",
            "underline",
            "strikethrough"
        ]
    };

    var editor = textarea.kendoEditor(editorOptions).data("kendoEditor");
    editor.value("foo");
    editor.exec("bold");

    ok(editor.toolbar.element.find("a[title=Bold]").hasClass("k-state-selected"));

    $("#wrapper").width(200);
    editor.toolbar.resize();

    ok(editor.toolbar.overflowPopup.element.find("a[title=Bold]").hasClass("k-state-selected"));
});

var editor;
var keys = kendo.keys;

module("editor resizable toolbar keyboard navigation", {
    setup: function() {
        QUnit.fixture.append(
            '<div id="wrapper" style="width: 100px"><textarea cols="20" rows="4" id="editor"></textarea></div>'
        );

        textarea = $("#editor");

        options = {
            resizable: {
                content: false,
                toolbar: true
            },
            tools: [
                "bold",
                "italic",
                "underline",
                "strikethrough",
                "createTable",
                "justifyLeft",
                "justifyCenter",
                "justifyRight",
                "justifyFull"
            ]
        }

        $.fn.press = function (key) {
            $(this).trigger({
                type: "keydown",
                keyCode: key
            });
        };

        kendo.effects.disable();
    },
    teardown: function() {
        kendo.destroy(QUnit.fixture);
        QUnit.fixture.empty();
    }
});

function getTool(className) {
    var tool = editor.toolbar.overflowPopup.element.find(".k-" + className);

    if (tool.hasClass("k-tool-icon")) {
        tool = tool.closest(".k-tool");
    }

    return tool;
}

function active() {
    return $(kendo._activeElement());
}

function isToolActive(className) {
    return active()[0] == getTool(className)[0];
}

test('when overflowPopup is opened, first tool receives focus', function() {
    editor = textarea.kendoEditor(options).data("kendoEditor");
    editor.toolbar.overflowPopup.open();

    ok(isToolActive("bold"));
});

test('down arrow focuses the next tool in overflowPopup', function() {
    editor = textarea.kendoEditor(options).data("kendoEditor");
    editor.toolbar.overflowPopup.open();

    getTool("bold").press(keys.DOWN);

    ok(isToolActive("italic"));
});

test('up arrow focuses previous tool in overflowPopup', function() {
    editor = textarea.kendoEditor(options).data("kendoEditor");
    editor.toolbar.overflowPopup.open();

    getTool("underline").focus().press(keys.UP);

    ok(isToolActive("italic"));
});

test('down arrow focuses last tool from next group in overflowPopup', function() {
    editor = textarea.kendoEditor(options).data("kendoEditor");
    editor.toolbar.overflowPopup.open();

    getTool("strikethrough").focus().press(keys.DOWN);

    ok(isToolActive("createTable"));
});

test('up arrow focuses first tool from previous group in overflowPopup', function() {
    editor = textarea.kendoEditor(options).data("kendoEditor");
    editor.toolbar.overflowPopup.open();

    getTool("createTable").focus().press(keys.UP);

    ok(isToolActive("strikethrough"));
});

test('down arrow changes the activeElement when createTable tool has focus', function() {
    editor = textarea.kendoEditor(options).data("kendoEditor");
    editor.toolbar.overflowPopup.open();

    getTool("createTable").focus().press(keys.DOWN);

    ok(isToolActive("justifyLeft"));
});

test('up arrow changes the activeElement when createTable tool has focus', function() {
    editor = textarea.kendoEditor(options).data("kendoEditor");
    editor.toolbar.overflowPopup.open();

    getTool("createTable").focus().press(keys.UP);

    ok(isToolActive("strikethrough"));
});

test('down arrow skips disabled tools', function() {
    editor = textarea.kendoEditor(options).data("kendoEditor");
    editor.toolbar.overflowPopup.open();

    getTool("italic").addClass("k-state-disabled");
    getTool("bold").focus().press(keys.DOWN);

    ok(isToolActive("underline"));
});

test('up arrow skips disabled tools', function() {
    editor = textarea.kendoEditor(options).data("kendoEditor");
    editor.toolbar.overflowPopup.open();

    getTool("underline").addClass("k-state-disabled");
    getTool("strikethrough").focus().press(keys.UP);

    ok(isToolActive("italic"));
});

}());
