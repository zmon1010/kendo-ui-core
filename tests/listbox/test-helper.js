/* exported createListBoxFromHtml */
function createListBoxFromHtml(html, options, container) {
    return $(html || "<div />").appendTo(container || QUnit.fixture[0]).kendoListBox(options).data("kendoListBox");
}

/* exported createListBoxFromOptions */
function createListBoxFromOptions(widgetOptions, options) {
    var container = QUnit.fixture;

    options = options || {};

    if (options.rtl) {
        container = $("<div class='k-rtl' />").appendTo(container);
    }

    return createListBoxFromHtml("<div />", widgetOptions, container);
}

/* exported destroyListBox */
function destroyListBox(widget) {
    if (widget && widget instanceof kendo.ui.ListBox) {
        widget.destroy();
        widget = null;
    }
}

/* exported createListBox */
function createListBox(options, html) {
    var dataItems = [{
        id: 1,
        text: "item1"
    }, {
        id: 2,
        text: "item2"
    }, {
        id: 3,
        text: "item3"
    }, {
        id: 4,
        text: "item4"
    }];

    var listbox = createListBoxFromHtml(html, $.extend({
        dataSource: {
            data: dataItems
        },
        dataTextField: "text",
        selectable: "multiple"
    }, options || {}));

    return listbox;
}

/* exported equalListItems */
function equalListItems(item1, item2) {
    equal(item1.data("uid"), item2.data("uid"));
}

/* exported getDataItem */
function getDataItem(listbox, item) {
    return listbox.dataSource.getByUid(item.data("uid"));
}

function clickButton(listbox, buttonName, event) {
    listbox.toolbar.find(".k-listbox-" + buttonName).trigger(event || $.Event({ type: "click" }));
}

/* exported clickRemoveButton */
function clickRemoveButton(listbox, event) {
    clickButton(listbox, "remove", event);
}

/* exported clickMoveDownButton */
function clickMoveDownButton(listbox, event) {
    clickButton(listbox, "movedown", event);
}

/* exported clickMoveUpButton */
function clickMoveUpButton(listbox, event) {
    clickButton(listbox, "moveup", event);
}

/* exported clickTransferToButton */
function clickTransferToButton(listbox, event) {
    clickButton(listbox, "transfer-to", event);
}

/* exported clickTransferFromButton */
function clickTransferFromButton(listbox, event) {
    clickButton(listbox, "transfer-from", event);
}