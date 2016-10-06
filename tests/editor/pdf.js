(function(){
    
var editor;

editor_module("editor pdf export", {
    beforeEach: function() {
        editor = $("#editor-fixture").data("kendoEditor");
    },
    afterEach: function() {
        removeMocksIn(kendo.drawing);
        removeMocksIn(kendo);
    }
});

asyncTest("pdf.options.paperSize is a4", function() {
    editor.setOptions({pdf: {paperSize: "A4"}});
    
    mockFunc(kendo.drawing, "drawDOM", function(node, options) {
            var deffered = new $.Deferred();
            deffered.resolve();
            return deffered.promise();
    });
    
    mockFunc(kendo.drawing, "exportPDF", function(root, options){
        equal(options.paperSize, "A4");
    });
    
    mockFunc(kendo, "saveAs", function(){});
    editor.saveAsPDF();
   
    setTimeout(function() {
        start();
        equal(kendo.drawing.exportPDF.called, true);
    });
});

}());