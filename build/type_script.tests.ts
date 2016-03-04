// Static tests for the Kendo UI TypeScript definitions
/// <reference path="jquery.d.ts" />
/// <reference path="../dist/kendo.all.d.ts" />

var is = {
    string: (msg: string) => {
        return true;
    }
}

// effects

$(() => {
    kendo.effects.disable();
    kendo.effects.enable();
});

// TreeView
$(() => {
    var treeview = <kendo.ui.TreeView>$("#treeview").data("kendoTreeView");

    is.string(treeview.text("#foo"));

    treeview.text("#foo", "bar");
});

// Window
$(() => {
    var window = <kendo.ui.Window>$("#window").data("kendoWindow");

    var dom = $("<em>Foo</em>");

    window.content(dom);
});
