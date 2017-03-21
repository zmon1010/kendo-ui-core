/* exported createListBoxFromHtml */
function createListBoxFromHtml(html, options, container) {
    return $(html || "<div />").appendTo(container || QUnit.fixture).kendoListBox(options).data("kendoListBox");
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

