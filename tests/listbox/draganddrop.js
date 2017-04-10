(function() {
    var ListBox = kendo.ui.ListBox,
        listA,
        listB,
        listC,
        listD;

    module("ListBox - dragdrop", {
        setup: function() {
           
            QUnit.fixture.append(
                '<select id="listA"></select>'
            );

            QUnit.fixture.append(
                '<select id="listB"></select>'
            );

            QUnit.fixture.append(
                '<select id="listC"></select>'
            );

            QUnit.fixture.append(
                '<select id="listD"></select>'
            );
            
            listA  = $("#listA").kendoListBox({ 
                    dataSource: [ {name: "Tim", id:4 }, {name: "Johny", id:5 }, {name: "Dicky", id:6 }],
                    dataTextField: "name",
                    selectable: true,
                    draggable:true,
                    dropSources: ["listB"],
                    reorderable: true
            }).getKendoListBox();


            listB = $("#listB").kendoListBox({ 
                    dataSource: [ {name: "Tom", id:1 }, {name: "Jerry", id:2 }, {name: "Donald", id:3 }],
                    dataTextField: "name",
                    selectable: true,
                    dropSources: ["listA"],
                    reorderable: true,
                    draggable:true
            }).getKendoListBox();

            listC = $("#listC").kendoListBox({ 
                    dataSource: [ {name: "Tonny", id:7 }, {name: "Jack", id:8 }, {name: "Dino", id:9 }],
                    dataTextField: "name",
                    selectable: true,
                    draggable:true
            }).getKendoListBox();

            listD = $("#listD").kendoListBox({ 
                    dataTextField: "name",
                    dataSource: [],
                    dropSources: ["listA"]
            }).getKendoListBox();

            $(document.body).append(QUnit.fixture);
        },
        teardown: function() {
            if(listA) {
              listA.destroy();
            }
            if(listB) {
              listB.destroy();
            }
            if(listC) {
              listC.destroy();
            }
            if(listD) {
              listD.destroy();
            }
            kendo.destroy(QUnit.fixture);
            $(document.body).find(QUnit.fixture).off().remove();
        }
    });

    test("Reorderable is false by default", 1, function() {
        ok(kendo.ui.ListBox.prototype.options.reorderable === false);
    });

    test("Placeholder moves across connected listboxes", 1, function() {
        var draggedElement = listB.items().first();
        var draggableOffset = kendo.getOffset(draggedElement);
        var targetElement = listA.items().first(),
            targetOffset = kendo.getOffset(targetElement);
          
        press(draggedElement, draggableOffset.left, draggableOffset.top);
        move(draggedElement, targetOffset.left, targetOffset.top);

        ok(listA._getList().children().length === 4, "Placeholder is moved to the ListA");
    });

    test("Item can be dragged from one listbox to another", 2, function() {
        var draggedElement = listB.items().first();
        var draggableOffset = kendo.getOffset(draggedElement);
        var targetElement = listA.items().first(),
            targetOffset = kendo.getOffset(targetElement);

        press(draggedElement, draggableOffset.left, draggableOffset.top);
        move(draggedElement, targetOffset.left, targetOffset.top);
        release(draggedElement, targetOffset.left, targetOffset.top);

        ok(listB.items().length == 2, "Item is removed from ListB");
        ok(listA.items().length == 4, "Item is added to ListA");
    });

    test("Item is correctly reordered in listbox using drag", 1, function() {
        var draggedElement = listB.items().first();
        var draggableOffset = kendo.getOffset(draggedElement);
        var targetElement = listB.items().last(),
            targetOffset = kendo.getOffset(targetElement);

        press(draggedElement, draggableOffset.left, draggableOffset.top);
        move(draggedElement, targetOffset.left, targetOffset.top + 10);
        release(draggedElement, targetOffset.left, targetOffset.top + 10);

        ok(listB.dataSource.view()[2].name === "Tom");
    });

    test("Item is not reordered if reordable is false", 1, function() {
        var draggedElement = listC.items().first();
        var draggableOffset = kendo.getOffset(draggedElement);
        var targetElement = listC.items().last(),
            targetOffset = kendo.getOffset(targetElement);
          
        press(draggedElement, draggableOffset.left, draggableOffset.top);
        move(draggedElement, targetOffset.left, targetOffset.top + 10);
        release(draggedElement, targetOffset.left, targetOffset.top + 10);

        ok(listC.dataSource.view()[2].name === "Dino");
    });

    test("Item is not dropped if dropSources is not set", 1, function() {
        var draggedElement = listA.items().first();
        var draggableOffset = kendo.getOffset(draggedElement);
        var targetElement = listC.items().last(),
            targetOffset = kendo.getOffset(targetElement);
          
        press(draggedElement, draggableOffset.left, draggableOffset.top);
        move(draggedElement, targetOffset.left, targetOffset.top);
        release(draggedElement, targetOffset.left, targetOffset.top);

        ok(listC.dataSource.view().length === 3);
    });

    test("Item is not dropped if dropSources is empty", 1, function() {
        var draggedElement = listA.items().first();
        var draggableOffset = kendo.getOffset(draggedElement);
        var targetElement = listD._getList();
        targetElement.height(30);
        var targetOffset = kendo.getOffset(targetElement);
          
        press(draggedElement, draggableOffset.left, draggableOffset.top);
        move(draggedElement, targetOffset.left, targetOffset.top);
        release(draggedElement, targetOffset.left, targetOffset.top);

        ok(listD.dataSource.view().length === 1);
    });
})();
