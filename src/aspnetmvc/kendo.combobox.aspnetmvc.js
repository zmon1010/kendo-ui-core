(function(f, define){
    define([ "./kendo.data.aspnetmvc" ], f);
})(function(){

(function ($, undefined) {
    var kendo = window.kendo,
        ui = kendo.ui;

    if (ui && ui.ComboBox) {
        ui.ComboBox.requestData = function (selector) {
            var combobox = $(selector).data("kendoComboBox");

            if (!combobox) {
                return;
            }

            var filter = combobox.dataSource.filter();
            var value = combobox.input.val();

            if (!filter || !filter.filters.length) {
                value = "";
            }

            return { text: value };
        };
    }

})(window.kendo.jQuery);

}, typeof define == 'function' && define.amd ? define : function(a1, a2, a3){ (a3 || a2)(); });
