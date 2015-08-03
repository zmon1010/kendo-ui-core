(function(f, define){
    define([ "../kendo.core", "../kendo.data", "./sheet" ], f);
})(function(){

(function(kendo) {

    var SheetDataSourceBinder = kendo.Class.extend({
        init: function(options) {

            this.options = $.extend({}, this.options, options);

            this.sheet = options.sheet;

            this.columns = this._columns(this.options.columns);

            this._dataSource();

            this.dataSource.fetch();
        },

        _columns: function(columns) {
            return columns.map(function(column) {
                return {
                    field: column.field
                };
            });
        },

        _dataSource: function() {
            var options = this.options;
            var dataSource = options.dataSource;

            dataSource = Array.isArray(dataSource) ? { data: dataSource } : dataSource;

            if (this.dataSource && this._changeHandler) {
                this.dataSource.unbind("change", this._changeHandler);
            } else {
                this._changeHandler = this._change.bind(this);
            }

            this.dataSource = kendo.data.DataSource.create(dataSource)
                .bind("change", this._changeHandler);
        },

        _change: function(e) {
            var data = this.dataSource.view();
            var columns = this.columns;

            if (!columns.length) {
                columns = Object.keys(data[0].toJSON());
            }

            var getters = columns.map(function(column) {
                return kendo.getter(column.field || column);
            });

            this.sheet.batch(function() {
                for (var idx = 0, length = data.length; idx < length; idx++) {
                    for (var getterIdx = 0; getterIdx < getters.length; getterIdx++) {
                        this.sheet.range(idx,getterIdx).value(getters[getterIdx](data[idx]));
                    }
                }
            }.bind(this));
        },

        destroy: function() {
            this.dataSource.unbind("change", this._changeHandler);
        },

        options: {
            columns: []
        }
    });

    kendo.spreadsheet.SheetDataSourceBinder = SheetDataSourceBinder;
})(kendo);
}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
