(function() {
    var dnd;
    var fixture;

    module("HierarchicalDragAndDrop", {
        setup: function() {
            fixture = QUnit.fixture;
        },
        teardown: function() {
            kendo.destroy(fixture);
            fixture = null;
        }
    });

    function createHierarchicalDND(options) {
        return new kendo.ui.HierarchicalDragAndDrop(fixture, $.extend({
            hintText: $.noop
        }, options));
    }

    test("dragstart method triggers dragstart handler", function() {
        var handler = spy();

        dnd = createHierarchicalDND({ dragstart: handler });

        dnd.dragstart({ currentTarget: fixture });

        equal(handler.calls, 1);
    });

    test("dragstart provides closest item to handler", function() {
        var handler = spy();

        dnd = createHierarchicalDND({
            itemSelector: "div",
            dragstart: handler
        });

        var item = $("<div><span /></div>").appendTo(fixture);

        dnd.dragstart({ currentTarget: item.children("span") });

        var firstArg = handler.args[0][0];
        equal(firstArg[0], item[0]);
    });

    test("returning true in dragstart method prevents draggable dragstart", function() {
        var handler = spy();

        dnd = createHierarchicalDND({
            dragstart: function() { return true; }
        });

        dnd.dragstart({
            preventDefault: handler,
            currentTarget: fixture
        });

        equal(handler.calls, 1);
    });

    test("dragstart creates drag hint when reorderable is true", function() {
        dnd = createHierarchicalDND({ reorderable: true });

        dnd.dragstart({ currentTarget: fixture });

        equal(fixture.find(".k-drop-hint").length, 1);
    });

    test("dragstart does not create drag hint when reorderable is false", function() {
        dnd = createHierarchicalDND({ reorderable: false });

        dnd.dragstart({ currentTarget: fixture });

        equal(fixture.find(".k-drop-hint").length, 0);
    });

    test("drag method triggers drag handler", function() {
        var handler = spy();

        dnd = createHierarchicalDND({
            reorderable: false,
            drag: handler
        });

        press(fixture, 1, 1);
        move(fixture, 10, 10);

        equal(handler.calls, 1);
    });

    test("dragend method triggers drop handler", function() {
        var drop = spy();
        var dragend = spy();

        dnd = createHierarchicalDND({
            reorderable: false,
            drop: drop,
            dragend: dragend
        });

        press(fixture, 1, 1);
        move(fixture, 10, 10);
        release(fixture, 11, 11);

        equal(drop.calls, 1);
        equal(dragend.calls, 0); // invalid drag by default
    });

    test("dragend method triggers dragend handler on valid drag", function() {
        var dragend = spy();

        dnd = createHierarchicalDND({
            reorderable: false,
            drop: function(e) {
                e.valid = true;
            },
            dragend: dragend
        });

        press(fixture, 1, 1);
        move(fixture, 10, 10);
        release(fixture, 11, 11);

        equal(dragend.calls, 1);
    });
})();
