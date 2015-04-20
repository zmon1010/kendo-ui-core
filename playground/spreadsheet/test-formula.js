var calc = kendo.spreadsheet.calc;
var Runtime = calc.Runtime;

function HOP(obj, key) {
    return Object.prototype.hasOwnProperty.call(obj, key);
}

function Spreadsheet() {
    this.sheets = {};
}

Spreadsheet.prototype = {

    onFormula: function(f, value) {
        var cell = this._getCell(f.sheet, f.col, f.row);
        if (typeof value == "number") {
            cell.type = "num";
        } else if (typeof value == "string") {
            cell.type = "str";
        }
        cell.value = value;
        this.updateDisplay(f.sheet, f.col, f.row);
    },

    _getRefCells: function(ref) {
        if (Runtime.CellRef.is(ref)) {
            var cell = this._getCell(ref.sheet, ref.col, ref.row);
            return cell ? [ cell ] : [];
        }
        if (Runtime.RangeRef.is(ref)) {
            ref = ref.intersect(this.getSheetBounds(ref.sheet));
            var a = [];
            for (var row = ref.topLeft.row; row <= ref.bottomRight.row; ++row) {
                for (var col = ref.topLeft.col; col <= ref.bottomRight.col; ++col) {
                    var cell = this._getCell(ref.sheet, col, row);
                    if (cell != null) {
                        a.push(cell);
                    }
                }
            }
            return a;
        }
        if (Runtime.UnionRef.is(ref)) {
            var a = [];
            for (var i = 0; i < ref.refs.length; ++i) {
                a = a.concat(this._getRefCells(ref.refs[i]));
            }
            return a;
        }
        if (Runtime.NullRef.is(ref)) {
            return [];
        }
        console.error("Unsupported reference", ref);
        return [];
    },

    _resolveCells: function(promise, a, single) {
        var self = this;
        var formulas = a.filter(function(cell){ return cell.formula; });
        formulas = formulas.map(function(cell){
            return cell.formula.func(self);
        });
        $.when(formulas).then(function(){
            promise.resolve(single ? a[0] : a);
        });
    },

    fetch: function(ref) {
        var promise = $.Deferred();
        this._resolveCells(promise, this._getRefCells(ref), Runtime.CellRef.is(ref));
        return promise;
    },

    getData: function(ref) {
        if (Runtime.CellRef.is(ref)) {
            var cell = this._getCell(ref.sheet, ref.col, ref.row);
            return cell ? cell.value : null;
        } else if (ref instanceof Spreadsheet.Cell) {
            return ref.value;
        }
        return ref;
    },

    recalculate: function() {
        var self = this, cells = this.getVisibleFormulas();
        cells.forEach(function(cell){
            delete cell.formula.value;
        });
        cells.forEach(function(cell){
            cell.formula.func(self);
        });
    },

    getSheetBounds: function(sheetName) {
        var sheet = this.sheets[sheetName];
        var maxrow = 1, maxcol = 1;
        Object.keys(sheet.data).forEach(function(row){
            var cells = sheet.data[row];
            row = parseFloat(row);
            if (row > maxrow) {
                maxrow = row;
            }
            var col = Math.max.apply(Math, Object.keys(cells).map(parseFloat));
            if (col > maxcol) {
                maxcol = col;
            }
        });
        return new Runtime.RangeRef(
            // top-left
            new Runtime.CellRef(1, 1),
            // bottom-right
            new Runtime.CellRef(maxcol, maxrow)
        );
    },

    getVisibleFormulas: function() {
        var formulas = [], self = this;
        self.forVisibleSheets(function(sheet){
            self.forVisibleCells(sheet, function(cell){
                if (cell.formula) {
                    formulas.push(cell);
                }
            });
        });
        return formulas;
    },

    forVisibleSheets: function(f) {
        Object.keys(this.sheets).forEach(f);
    },

    forVisibleCells: function(sheetName, f) {
        var sheet = this.sheets[sheetName];
        Object.keys(sheet.data).forEach(function(row){
            var rowData = sheet.data[row];
            Object.keys(rowData).forEach(function(col){
                var cellData = rowData[col];
                f(cellData);
            });
        });
    },

    setInputData: function(sheet, col, row, data) {
        var self = this;
        self._deleteCell(sheet, col, row);
        var cell = self._getCell(sheet, col, row, true);
        if (!/\S/.test(data)) {
            return {
                type: "str",
                display: ""
            };
        }
        cell.input = data;
        // try {
        var x = calc.parse(sheet, col, row, data), display = x.value;
        if (x.type == "exp") {
            cell.exp = x;
            cell.input = "=" + calc.print(sheet, col, row, x.ast);
            cell.formula = calc.compile(x);
            display = "...";
        } else {
            cell.value = x.value;
        }
        cell.type = x.type;
        cell.display = display;
        return {
            type: x.type,
            display: display
        };
        // } catch(ex) {
        //     cell.type = "error";
        //     return {
        //         type: "error",
        //         display: "#ERROR",
        //         tooltip: ex+""
        //     };
        // }
    },

    getDisplayData: function(sheet, col, row) {
        var cell = this._getCell(sheet, col, row, false);
        if (cell) {
            return cell.display;
        }
    },

    getInputData: function(sheet, col, row) {
        var cell = this._getCell(sheet, col, row, false);
        if (cell) {
            return cell.input;
        }
    },

    updateDisplay: function(sheet, col, row) {
        var cell = this._getCell(sheet, col, row);
        var input = _getInput("#" + sheet, col, row);
        cell.display = cell.value;
        input.val(cell.display);
        input[0].className = "type-" + cell.type;
        if (cell.tooltip) {
            input[0].setAttribute("title", cell.tooltip);
        } else {
            input[0].removeAttribute("title");
        }
    },

    _deleteCell: function(sheetName, col, row) {
        sheetName = sheetName.toLowerCase();
        var sheet = this.sheets[sheetName];
        if (sheet) {
            var rowData = sheet.data[row];
            if (rowData) {
                delete rowData[col];
                for (var i in rowData) {
                    if (HOP(rowData, i)) {
                        return;
                    }
                }
                delete sheet.data[row];
            }
        }
    },

    _getCell: function(sheetName, col, row, create) {
        sheetName = sheetName.toLowerCase();
        var sheet = this.sheets[sheetName];
        if (!sheet) {
            if (create) {
                sheet = this.sheets[sheetName] = {
                    name: sheetName,
                    data: {}
                };
            } else {
                return null;
            }
        }
        var rowData = sheet.data[row];
        if (!rowData) {
            if (create) {
                rowData = sheet.data[row] = {};
            } else {
                return null;
            }
        }
        var cellData = rowData[col];
        if (!cellData) {
            if (create) {
                cellData = rowData[col] = this._makeCell(col, row);
            } else {
                return null;
            }
        }
        return cellData;
    },

    _makeCell: function(col, row) {
        return new Spreadsheet.Cell();
    }
};

Spreadsheet.Cell = function(){};

var SPREADSHEET = new Spreadsheet();

function makeElements(container) {
    var formulaDiv = $("<div class='formula'>&nbsp</div>").appendTo(container);
    var table = $("<table cellspacing='0' cellpadding='0' width='100%'>").appendTo(container);

    var head = $("<tr class='head'><td></td>").appendTo(table);
    for (var col = 1; col <= 10; ++col) {
        head.append("<td>" + String.fromCharCode(64+col) + "</td>");
    }
    for (var row = 1; row <= 10; ++row) {
        var tr = $("<tr>").appendTo(table);
        tr.append("<td class='head'>" + row + "</td>")
        for (var col = 1; col <= 10; ++col) {
            var td = $("<td>").appendTo(tr);
            var input = $("<input style='width: 100%' data-row='" + row + "' data-col='" + col + "' />")
                .appendTo(td);
            input.on({
                focus   : _onFocus,
                blur    : _onBlur,
                keydown : _onKeyDown,
                input   : _onInput,
                change  : _onChange
            });
        }
    }
}

function _getInput(sheet, col, row) {
    sheet = $(sheet);
    return $("input[data-row='" + row + "'][data-col='" + col + "']", sheet);
}

function withInput(input, f) {
    input = $(input);
    var sheet = input.closest(".sheet");
    var row = input.data("row"), col = input.data("col");
    var sheetName = sheet[0].id;
    f(input, sheet, sheetName, col, row);
}

function _onFocus(ev) {
    withInput(this, function(input, sheet, sheetName, col, row){
        var formula = $(".formula", sheet);
        var text = SPREADSHEET.getInputData(sheetName, col, row);
        if (!text || !/\S/.test(text)) {
            text = "";
        }
        formula.text(calc.make_reference(null, col, row) + ": " + (text || "—empty—"));
        input.val(text).select();
    });
}

function _saveInput(input) {
    withInput(input, function(input, sheet, sheetName, col, row){
        var x = SPREADSHEET.setInputData(sheetName, col, row, input.val());
        SPREADSHEET.updateDisplay(sheetName, col, row);
        SPREADSHEET.recalculate();
    });
}

function _onBlur(ev) {
    _saveInput(this);
}

function _onChange(ev) {
    // _saveInput(this);
}

function _onKeyDown(ev) {
    withInput(this, function(input, sheet, sheetName, col, row){
        if (ev.keyCode == 38) {
            // UP
            _getInput(sheet, col, row - 1).focus().select();
            ev.preventDefault();
        } else if (ev.keyCode == 40 || ev.keyCode == 13) {
            // DOWN or ENTER
            _getInput(sheet, col, row + 1).focus().select();
            ev.preventDefault();
        } else if (ev.keyCode == 27) {
            // ESCAPE
            input
                .val(SPREADSHEET.getInputData(sheetName, col, row))
                .select();
            ev.preventDefault();
        } else if (ev.keyCode == 37) {
            // LEFT
            if (input[0].selectionStart == 0) {
                _getInput(sheet, col - 1, row).focus().select();
                ev.preventDefault();
            }
        } else if (ev.keyCode == 39) {
            // RIGHT
            if (input[0].selectionEnd == input.val().length) {
                _getInput(sheet, col + 1, row).focus().select();
                ev.preventDefault();
            }
        } else if (ev.keyCode == 9) {
            // TAB
            var diff = ev.shiftKey ? -1 : 1;
            var next = _getInput(sheet, col + diff, row);
            if (next.length == 0 && !ev.shiftKey) {
                next = _getInput(sheet, 1, row + 1);
            }
            next.focus().select();
            ev.preventDefault();
        } else if (ev.keyCode == 113) {
            // F2
            input[0].selectionStart = 0;
            input[0].selectionEnd = 0;
            ev.preventDefault();
        } else if (ev.keyCode == 67 && ev.shiftKey && ev.ctrlKey) {
            // C-S-c
            var cell = SPREADSHEET._getCell(sheetName, col, row);
            if (!cell || !cell.exp) {
                alert("No expression here");
            } else {
                window.COPY = cell.exp;
            }
            ev.preventDefault();
        } else if (ev.keyCode == 86 && ev.shiftKey && ev.ctrlKey) {
            // C-S-v
            if (!window.COPY) {
                alert("Copy an expression first");
            } else {
                var exp = calc.print(sheetName, col, row, window.COPY.ast);
                input.val("=" + exp);
            }
            input.select();
            ev.preventDefault();
        }
    });
}

function _onInput(ev) {

}

function fillElements(data) {
    $.each(data, function(sheet, data){
        var cont = $("#" + sheet.toLowerCase());
        $.each(data, function(key, val){
            var x = calc.parse_reference(key);
            var input = _getInput(cont, x.col, x.row);
            var x = SPREADSHEET.setInputData(sheet, x.col, x.row, val);
            input.val(x.display);
            input[0].className = "type-" + x.type;
        });
    });
    SPREADSHEET.recalculate();
}

// init

makeElements(".sheet");

fillElements({
    sheet1: {
        A1: 10,
        A2: 20,
        B1: "=A1+A2",
        C1: '=sum((A1,A2))',
        C2: '=sum(((A1,A3,A5,A7,A9) A1:B10))',
        D1: '=sum(A:C)',
        E1: '=sum(sum(A1:A3 A1:B3)+10, C1:D3)'
    },
    sheet2: {
        A1: 10,
        A2: 20,
        B1: "=A1+A2",
        D1: "a1:b4",
        E1: "=sum(indirect(D1))"
        // A1: "=sum(C1, B1)",
        // B1: 5,
        // B2: 10,
        // B3: 15,
        // C1: "=  sum  (  b1  :  b3  )"
    }
});
