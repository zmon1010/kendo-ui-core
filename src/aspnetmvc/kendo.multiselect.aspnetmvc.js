(function(f, define){
    define([ "./kendo.combobox.aspnetmvc" ], f);
})(function(){

(function ($, undefined) {
    var kendo = window.kendo,
        ui = kendo.ui;

    if (ui && ui.MultiSelect) {
        ui.MultiSelect.requestData = function (selector) {
            var multiselect = $(selector).data("kendoMultiSelect");
            var text = multiselect.input.val();
            
            return { text: text !== multiselect.options.placeholder ? text : "" };
        };
    }

})(window.kendo.jQuery);

}, typeof define == 'function' && define.amd ? define : function(a1, a2, a3){ (a3 || a2)(); });
