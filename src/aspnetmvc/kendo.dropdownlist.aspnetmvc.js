(function(f, define){
    define([ "./kendo.data.aspnetmvc" ], f);
})(function(){

(function ($, undefined) {
    var kendo = window.kendo,
        ui = kendo.ui;

    if (ui && ui.DropDownList) {
        ui.DropDownList.requestData = function (selector) {
            var dropdownlist = $(selector).data("kendoDropDownList");

            if (!dropdownlist) {
                return;
            }

            var filters = dropdownlist.dataSource.filter();
            var filterInput = dropdownlist.filterInput;
            var value = filterInput ? filterInput.val() : "";

            if (!filter || !filter.filters.length) {
                value = "";
            }

            return { text: value };
        };
    }

})(window.kendo.jQuery);

}, typeof define == 'function' && define.amd ? define : function(a1, a2, a3){ (a3 || a2)(); });
