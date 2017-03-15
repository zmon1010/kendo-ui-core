/* jshint eqnull: true */
(function(f, define){
    define([ "./kendo.draganddrop", "./kendo.data" ], f);
})(function(){

var __meta__ = { // jshint ignore:line
    id: "listbox",
    name: "ListBox",
    category: "web",
    depends: ["draganddrop", "data"]
};

(function($, undefined) {
    var kendo = window.kendo,
        proxy = $.proxy,
        data = kendo.data,
        Widget = kendo.ui.Widget,
        DataSource = data.DataSource,
        CHANGE = "change";
       
    var ListBox = kendo.ui.DataBoundWidget.extend({
        init: function(element, options) {
            var that = this;
            Widget.fn.init.call(that, element, options);

            that.wrapper = element = that.element;

            that._dataSource();

            that._templates();

            if(that.options.autoBind) {
                that.dataSource.fetch();
            }
        },

        events: [
            CHANGE
        ],

        options: {
            name: "ListBox",
            autoBind: true,
            template: "",
            dataTextField: null
        },

        _dataSource: function() {
            var that = this,
                options = that.options,
                dataSource = options.dataSource || {};

            dataSource = $.isArray(dataSource) ? {data: dataSource} : dataSource;

            if (options.dataTextField) {
                dataSource.fields = [{ field: options.dataTextField }];
            }

            if (that.dataSource && that._refreshHandler) {
                that.dataSource.unbind(CHANGE, that._refreshHandler);
            } else {
                that._refreshHandler = proxy(that._refresh, that);
            }

            that.dataSource = DataSource.create(that.options.dataSource)
                                .bind(CHANGE, that._refreshHandler);
        },

        _templates: function() {
            var options = this.options;
            var template = options.template;

            if (!template) {
                template = kendo.template('<li class="k-item">${' + kendo.expr(options.dataTextField, "data") + "}</li>", { useWithBlock: false });
            } else {
                template = kendo.template(template);
            }

            this.options.template = template;
        },

        _refresh: function() {
            var that = this,
                view = that.dataSource.view(),
                template = that.options.template,
                html = "";
            
            html+= "<ul class='k-listBox'>";
            for (var idx = 0; idx < view.length; idx++) {
                html += template(view[idx]);
            }
            html+= "</ul>";
            that.element.html(html);
        },

        destroy: function() {
            var that = this;

            DataBoundWidget.fn.destroy.call(that);

            var dataSource = that.dataSource;
            dataSource.unbind(CHANGE, that._refreshHandler);

            kendo.destroy(that.element);
        }
    });

    kendo.ui.plugin(ListBox);
})(window.kendo.jQuery);

return window.kendo;

}, typeof define == 'function' && define.amd ? define : function(a1, a2, a3){ (a3 || a2)(); });
