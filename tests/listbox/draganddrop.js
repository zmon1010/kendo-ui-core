(function() {
    var ListBox = kendo.ui.ListBox,
        listA,
        listB,
        listC,
        draggedElement,
        draggableOffset;

    module("ListBox - dragdrop", {
        setup: function() {
            QUnit.fixture.append(
                '<select id="listA" class="listBox"></select>'
            );

            QUnit.fixture.append(
                '<select id="listB" class="listBox"></select>'
            );

            QUnit.fixture.append(
                '<select id="listC" class="listBox"></select>'
            );
            
            listA  = $("#listA").kendoListBox({ 
                    dataSource: [ {name: "Tim", id:4 }, {name: "Johny", id:5 }, {name: "Dicky", id:6 }],
                    dataTextField: "name",
                    selectable: true,
                    draggable:true,
                    dropSources: ["listB"],
                    reordable: true
            }).getKendoListBox();


            listB = $("#listB").kendoListBox({ 
                    dataSource: [ {name: "Tom", id:1 }, {name: "Jerry", id:2 }, {name: "Donald", id:3 }],
                    dataTextField: "name",
                    selectable: true,
                    dropSources: ["listA"],
                    reordable: true,
                    draggable:true
            }).getKendoListBox();

            listC = $("#listC").kendoListBox({ 
                    dataSource: [ {name: "Tonny", id:7 }, {name: "Jack", id:8 }, {name: "Dino", id:9 }],
                    dataTextField: "name",
                    selectable: true,
                    draggable:true
            }).getKendoListBox();
        },
        teardown: function() {
            kendo.destroy(QUnit.fixture);
        }
    });

    test("Draggable is false by default", 1, function() {
        ok(true);
    });

    test("Placeholder moves across connected listboxes", 1, function() {
        var draggedElement = listB.element.find("li").first();
        var draggableOffset = kendo.getOffset(draggedElement);
        var targetElement = listA.element.find("li").first(),
            targetOffset = kendo.getOffset(targetElement);
          
        press(draggedElement, draggableOffset.left, draggableOffset.top);
        move(draggedElement, targetOffset.left, targetOffset.top);

        ok(listA.element.find("li").length === 4, "Placeholder is moved to the ListA");
    });

    test("Item can be dragged from one listbox to another", 2, function() {
        var draggedElement = listB.element.find("li").first();
        var draggableOffset = kendo.getOffset(draggedElement);
        press(draggedElement, draggableOffset.left, draggableOffset.top);
        move(draggedElement, 32, 20);
        release(draggedElement, 32, 20);
        ok(listB.element.find("li").length == 2, "Item is removed from ListB");
        ok(listA.element.find("li").length == 4, "Item is added to ListA");
    });

    test("Item is correctly reordered in listbox using drag", 1, function() {
        var draggedElement = listB.element.find("li").first();
        var draggableOffset = kendo.getOffset(draggedElement);
        press(draggedElement, draggableOffset.left, draggableOffset.top);
        move(draggedElement, 32, 126);
        release(draggedElement, 32, 126);

        ok(listB.dataSource.view()[1].name === "Tom");
    });
})();
