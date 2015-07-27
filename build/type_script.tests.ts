// Static tests for the Kendo UI TypeScript definitions
/// <reference path="jquery.d.ts" />
/// <reference path="../dist/kendo.all.d.ts" />

var is = {
    string: (msg: string) => {
        return true;
    }
}

$(() => {
    var treeview = <kendo.ui.TreeView>$("#treeview").data("kendoTreeView");

    is.string(treeview.text("#foo"));

    treeview.text("#foo", "bar");
});
