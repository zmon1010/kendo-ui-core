(function(f, define){
    define([ "../kendo.core", "../kendo.data", "./sheet" ], f);
})(function(){

(function(kendo) {

    var SheetDataSourceBinder = kendo.Class.extend({
        init: function(options) {

            this.options = $.extend({}, this.options, options);

            this.columns = this._normalizeColumns(this.options.columns);

            this._sheet();
            this._dataSource();

            this.dataSource.fetch();
        },

        _sheet: function() {
            this.sheet = this.options.sheet;

            this._sheetChangeHandler = this._sheetChange.bind(this);

            this.sheet.bind("change", this._sheetChangeHandler);
        },

        _sheetChange: function(e) {
            if (e.recalc && e.ref) {
                var data = this.dataSource.view();
                var columns = this.columns;

                if (!columns.length && data.length) {
                    columns = Object.keys(data[0].toJSON());
                }

                this._skipRebind = true;

                e.ref.forEach(function(ref) {
                    ref = ref.toRangeRef();
                    for (var ri = ref.topLeft.row; ri <= ref.bottomRight.row && ri < data.length; ri++) {
                        for (var ci = ref.topLeft.col; ci <= ref.bottomRight.col && ci < columns.length; ci++) {
                            data[ri].set(columns[ci].field, e.value);
                        }
                    }
                });

                this._skipRebind = false;
            }
        },

        _normalizeColumns: function(columns) {
            return columns.map(function(column) {
                return {
                    field: column.field || column
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
            if (this._skipRebind) {
                return;
            }

            var data = this.dataSource.view();
            var columns = this.columns;

            if (!columns.length && data.length) {
                this.columns = columns = this._normalizeColumns(Object.keys(data[0].toJSON()));
            }

            var getters = columns.map(function(column) {
                return kendo.getter(column.field);
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
            this.sheet.unbind("change", this._sheetChangeHandler);
        },

        options: {
            columns: []
        }
    });

    kendo.spreadsheet.SheetDataSourceBinder = SheetDataSourceBinder;
})(kendo);
}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
