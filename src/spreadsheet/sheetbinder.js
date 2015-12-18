(function(f, define){
    define([ "../kendo.core", "../kendo.data", "./sheet" ], f);
})(function(){

(function(kendo) {
    if (kendo.support.browser.msie && kendo.support.browser.version < 9) {
        return;
    }

    var SheetDataSourceBinder = kendo.Class.extend({
        init: function(options) {

            this.options = $.extend({}, this.options, options);

            this.columns = this._normalizeColumns(this.options.columns);

            this._sheet();
            this._dataSource();

            this._header();

            this.dataSource.fetch();
        },

        _sheet: function() {
            this.sheet = this.options.sheet;

            this._sheetChangeHandler = this._sheetChange.bind(this);
            this._sheetDeleteRowHandler = this._sheetDeleteRow.bind(this);
            this._sheetInsertRowHandler = this._sheetInsertRow.bind(this);

            this.sheet.bind("change", this._sheetChangeHandler)
                .bind("deleteRow", this._sheetDeleteRowHandler)
                .bind("insertRow", this._sheetInsertRowHandler);
        },

        _sheetInsertRow: function(e) {
            if (e.index !== undefined) {
                this.dataSource.insert(Math.max(e.index - 1, 0), {});
            }
        },

        _sheetDeleteRow: function(e) {
            if (e.index !== undefined) {
                var dataSource = this.dataSource;
                var model = dataSource.view()[e.index - 1];

                if (model) {
                    dataSource.remove(model);
                }
            }
        },

        _header: function() {
            this.sheet.batch(function() {
                this.columns.forEach(function(column, index) {
                    this.sheet.range(0,index).value(column.title);
                }.bind(this));
            }.bind(this));
        },

        _sheetChange: function(e) {
            if (e.recalc && e.ref) {
                var dataSource = this.dataSource;
                var data = dataSource.view();
                var columns = this.columns;

                if (!columns.length && data.length) {
                    columns = Object.keys(data[0].toJSON());
                }

                this._skipRebind = true;

                var values = this.sheet.range(e.ref).values();

                e.ref.forEach(function(ref) {
                    ref = ref.toRangeRef();
                    var record;
                    var valueIndex = 0;
                    for (var ri = ref.topLeft.row; ri <= ref.bottomRight.row; ri++) {
                        record = data[ri - 1]; // skip header row

                        if (!record) {
                            record = dataSource.insert(ri - 1, {});
                            data = dataSource.view();
                        }

                        var colValueIndex = 0;
                        for (var ci = ref.topLeft.col; ci <= ref.bottomRight.col && ci < columns.length; ci++) {
                            record.set(columns[ci].field, values[valueIndex][colValueIndex++]);
                        }
                        valueIndex++;
                    }
                });

                this._skipRebind = false;
            }
        },

        _normalizeColumns: function(columns) {
            return columns.map(function(column) {
                var field = column.field || column;
                return {
                    field: field,
                    title: column.title || field
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

        _change: function() {
            if (this._skipRebind) {
                return;
            }

            var data = this.dataSource.view();
            var columns = this.columns;

            if (!columns.length && data.length) {
                this.columns = columns = this._normalizeColumns(Object.keys(data[0].toJSON()));
                this._header();
            }

            var getters = columns.map(function(column) {
                return kendo.getter(column.field);
            });

            this.sheet.batch(function() {
                for (var idx = 0, length = data.length; idx < length; idx++) {
                    for (var getterIdx = 0; getterIdx < getters.length; getterIdx++) {
                        //skip header row
                        this.sheet.range(idx + 1,getterIdx).value(getters[getterIdx](data[idx]));
                    }
                }
            }.bind(this));
        },

        destroy: function() {
            this.dataSource.unbind("change", this._changeHandler);

            this.sheet.unbind("change", this._sheetChangeHandler)
                .unbind("deleteRow", this._sheetDeleteRowHandler)
                .unbind("insertRow", this._sheetInsertRowHandler);
        },

        options: {
            columns: []
        }
    });

    kendo.spreadsheet.SheetDataSourceBinder = SheetDataSourceBinder;
})(kendo);
}, typeof define == 'function' && define.amd ? define : function(a1, a2, a3){ (a3 || a2)(); });
