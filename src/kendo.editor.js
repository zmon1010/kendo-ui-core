(function(f, define){
    define([
        "./kendo.combobox", "./kendo.dropdownlist", "./kendo.resizable", "./kendo.window", "./kendo.colorpicker", "./kendo.imagebrowser",

        "./util/undoredostack",
        "./editor/main",
        "./editor/dom",
        "./editor/serializer",
        "./editor/range",
        "./editor/system",
        "./editor/inlineformat",
        "./editor/formatblock",
        "./editor/linebreak",
        "./editor/lists",
        "./editor/link",
        "./editor/file",
        "./editor/image",
        "./editor/components",
        "./editor/indent",
        "./editor/viewhtml",
        "./editor/formatting",
        "./editor/toolbar",
        "./editor/tables",
        "./editor/resizing/column-resizing",
        "./editor/resizing/table-resizing",
        "./editor/resizing/table-resize-handle",
        "./editor/immutables"
    ], f);
})(function(){

    var __meta__ = { // jshint ignore:line
        id: "editor",
        name: "Editor",
        category: "web",
        description: "Rich text editor component",
        depends: [ "combobox", "dropdownlist", "window", "colorpicker" ],
        features: [ {
            id: "editor-imagebrowser",
            name: "Image Browser",
            description: "Support for uploading and inserting images",
            depends: [ "imagebrowser" ]
        }, {
            id: "editor-resizable",
            name: "Resize handle",
            description: "Support for resizing the content area via a resize handle",
            depends: [ "resizable" ]
        }, {
            id: "editor-pdf-export",
            name: "PDF export",
            description: "Export Editor content as PDF",
            depends: [ "pdf", "drawing" ]
        }]
    };

}, typeof define == 'function' && define.amd ? define : function(a1, a2, a3){ (a3 || a2)(); });
