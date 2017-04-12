(function() {
    var ListBox = kendo.ui.ListBox,
        keys = kendo.keys,
        listA;

    module("ListBox - dragdrop", {
        setup: function() {
           
            QUnit.fixture.append(
                '<select id="listA"></select>'
            );

            listA  = $("#listA").kendoListBox({ 
                    dataSource: [ {name: "Tim", id:4 }, {name: "Johny", id:5 }, {name: "Dicky", id:6 }],
                    dataTextField: "name",
                    selectable: true,
                    navigatable:true
            }).getKendoListBox();

            $(document.body).append(QUnit.fixture);
        },
        teardown: function() {
            if(listA) {
              listA.destroy();
            }
            kendo.destroy(QUnit.fixture);
            $(document.body).find(QUnit.fixture).off().remove();
        }
    });

    test("List has a data role set", 1, function() {
        ok(listA._getList().attr("role") === "listbox");
    });

    test("All items have id and role set", 1, function() {
        var allSet = true;
        listA.items().each(function () {
            if(!$(this).attr("id") || $(this).attr("role") !== "option") {
                allSet = false;
            }
        });

        ok(allSet === true);
    });

    test("aria-activedescendant is properly set", 1, function() {
        listA.focus();
        listA._keyDown({ keyCode: keys.DOWN, preventDefault: $.noop });

        ok(listA._getList().attr("aria-activedescendant") === listA.items().first().attr("id"));
    });

    test("aria-activedescendant is properly set", 1, function() {
        listA.focus();
        listA._keyDown({ keyCode: keys.DOWN, preventDefault: $.noop });

        ok(listA._getList().attr("aria-activedescendant") === listA.items().first().attr("id"));
    });

    test("blur clears aria-activedescendant", 1, function() {
        listA.focus();
        listA._keyDown({ keyCode: keys.DOWN, preventDefault: $.noop });
        listA._blur();   
        ok(!listA._getList().attr("aria-activedescendant"));
    });

    test("click sets aria-activedescendant", 1, function() {
        listA._click({ currentTarget: listA.items().first() });
        ok(listA._getList().attr("aria-activedescendant") === listA.items().first().attr("id"));
    });
    
})();
