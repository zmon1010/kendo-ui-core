var calc = kendo.spreadsheet.calc;
var Runtime = calc.Runtime;

function HOP(obj, key) {
    return Object.prototype.hasOwnProperty.call(obj, key);
}

function Spreadsheet() {
    this.sheets = {};
}

Spreadsheet.prototype = {

    onFormula: function(sheet, row, col, value) {
        var cell = this._getCell(sheet, row, col);
        if (typeof value == "number") {
            cell.type = "num";
        } else if (typeof value == "string") {
            cell.type = "str";
        }
        cell.value = value;
        this.updateDisplay(sheet, row, col);
    },

    getRefCells: function(ref) {
        if (ref instanceof Runtime.CellRef) {
            var cell = this._getCell(ref.sheet, ref.row, ref.col);
            return cell ? [ cell ] : [];
        }
        if (ref instanceof Runtime.RangeRef) {
            ref = ref.intersect(this.getSheetBounds(ref.sheet));
            if (!(ref instanceof Runtime.RangeRef)) {
                return this.getRefCells(ref);
            }
            var a = [];
            for (var row = ref.topLeft.row; row <= ref.bottomRight.row; ++row) {
                for (var col = ref.topLeft.col; col <= ref.bottomRight.col; ++col) {
                    var cell = this._getCell(ref.sheet, row, col);
                    if (cell != null) {
                        a.push(cell);
                    }
                }
            }
            return a;
        }
        if (ref instanceof Runtime.UnionRef) {
            var a = [];
            for (var i = 0; i < ref.refs.length; ++i) {
                a = a.concat(this.getRefCells(ref.refs[i]));
            }
            return a;
        }
        if (ref instanceof Runtime.NullRef) {
            return [];
        }
        console.error("Unsupported reference", ref);
        return [];
    },

    getData: function(ref) {
        var self = this;
        if (ref instanceof Spreadsheet.Cell) {
            return ref.value;
        }
        if (ref instanceof Runtime.Ref) {
            var data = self.getRefCells(ref).map(function(cell){
                return cell.value;
            });
            return ref instanceof Runtime.CellRef ? data[0] : data;
        }
        return ref;
    },

    recalculate: function() {
        var self = this, cells = this.getVisibleFormulas();
        cells.forEach(function(cell){
            cell.formula.reset();
        });
        cells.forEach(function(cell){
            cell.formula.exec(self, cell.sheet, cell.row, cell.col);
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
            new Runtime.CellRef(0, 0, 0),
            // bottom-right
            new Runtime.CellRef(maxrow, maxcol, 0)
        ).setSheet(sheetName, false);
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
        var self = this, sheet = self.sheets[sheetName];
        Object.keys(sheet.data).forEach(function(row){
            var rowData = sheet.data[row];
            Object.keys(rowData).forEach(function(col){
                f(self._getCell(sheetName, row|0, col|0));
            });
        });
    },

    setInputData: function(sheet, row, col, data) {
        var self = this;
        self._deleteCell(sheet, row, col);
        var cell = self._getCell(sheet, row, col, true);
        if (!/\S/.test(data)) {
            return {
                type: "str",
                display: ""
            };
        }
        cell.input = data;
        // try {
        var x = calc.parse(sheet, row, col, data), display = x.value;
        if (x.type == "exp") {
            cell.exp = x;
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

    getDisplayData: function(sheet, row, col) {
        var cell = this._getCell(sheet, row, col, false);
        if (cell) {
            return cell.display;
        }
    },

    getInputData: function(sheet, row, col) {
        var cell = this._getCell(sheet, row, col, false);
        if (cell) {
            if (!cell.formula)
                return cell.input;
            return "=" + calc.print(sheet, row, col, cell.exp, cell);
        }
    },

    updateDisplay: function(sheet, row, col) {
        var cell = this._getCell(sheet, row, col);
        var input = _getInput("#" + sheet, row, col);
        if (input[0] === document.activeElement) {
            return;
        }
        cell.display = cell.value;
        input.val(cell.display);
        input[0].className = "type-" + cell.type;
        if (cell.tooltip) {
            input[0].setAttribute("title", cell.tooltip);
        } else {
            input[0].removeAttribute("title");
        }
    },

    _deleteCell: function(sheetName, row, col) {
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

    _getCell: function(sheetName, row, col, create) {
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
                cellData = rowData[col] = this._makeCell(row, col);
            } else {
                return null;
            }
        }
        cellData.sheet = sheetName;
        cellData.row = row;
        cellData.col = col;
        return cellData;
    },

    _makeCell: function(row, col) {
        return new Spreadsheet.Cell();
    },

    insertRows: function(sheetName, row, n) {
        var sheet = this.sheets[sheetName];
        increaseProps(sheet.data, row, n);
        this.getVisibleFormulas().forEach(function(cell){
            cell.formula.adjust("row", row, n);
        });
        this.recalculate();
    },

    deleteRows: function(sheetName, row, n) {
        var sheet = this.sheets[sheetName];
        reduceProps(sheet.data, row, n);
        this.getVisibleFormulas().forEach(function(cell){
            cell.formula.adjust("row", row, -n);
        });
        this.recalculate();
    },

    insertCols: function(sheetName, col, n) {

    },

    deleteCols: function(sheetName, col, n) {

    }
};

function numericAsc(a, b) {
    return parseFloat(a) - parseFloat(b);
}

function numericDesc(a, b) {
    return parseFloat(b) - parseFloat(a);
}

function reduceProps(object, start, n) {
    Object.keys(object).sort(numericAsc).forEach(function(key){
        key = parseFloat(key);
        if (key >= start && key < start + n) {
            delete object[key];
        }
        else if (key > start) {
            var tmp = object[key];
            delete object[key];
            object[key-n] = tmp;
        }
    });
}

function increaseProps(object, start, n) {
    Object.keys(object).sort(numericDesc).forEach(function(key){
        key = parseFloat(key);
        if (key >= start) {
            var tmp = object[key];
            delete object[key];
            object[key+n] = tmp;
        }
    });
}

Spreadsheet.Cell = function(){};

var SPREADSHEET = new Spreadsheet();

function makeElements(container) {
    var formulaDiv = $("<div class='formula'>&nbsp</div>").appendTo(container);
    var table = $("<table cellspacing='0' cellpadding='0' width='100%'>").appendTo(container);

    var head = $("<tr class='head'><td></td>").appendTo(table);
    for (var col = 1; col <= 10; ++col) {
        head.append("<td class='colhead'>");
    }
    for (var row = 1; row <= 100; ++row) {
        var tr = $("<tr class='row'>").appendTo(table);
        tr.append("<td class='head rowhead'>");
        for (var col = 1; col <= 10; ++col) {
            var td = $("<td>").appendTo(tr);
            $("<input style='width: 100%' />").appendTo(td);
        }
    }
    $(container)
        .on("mousedown", ".colhead", _adjustCol)
        .on("mousedown", ".rowhead", _adjustRow)
        .on("focus", "input", _onFocus)
        .on("blur", "input", _onBlur)
        .on("keydown", "input", _onKeyDown)
        .on("input", "input", _onInput)
        .on("change", "input", _onChange);
}

function _getInput(sheet, row, col) {
    return $("table tr:nth-child(" + (row+2) + ") td:nth-child(" + (col+2) + ") input", sheet);
}

function withInput(input, f) {
    input = $(input);
    var sheet = input.closest(".sheet");
    var sheetName = sheet[0].id;
    var td = input.closest("td"), tr = input.closest("tr");
    var col = td[0].cellIndex - 1, row = tr[0].rowIndex - 1;
    f(input, sheet, sheetName, row, col);
}

function _onFocus(ev) {
    withInput(this, function(input, sheet, sheetName, row, col){
        var formula = $(".formula", sheet);
        var text = SPREADSHEET.getInputData(sheetName, row, col);
        if (!text || !/\S/.test(text)) {
            text = "";
        }
        formula.text(calc.makeReference(null, row, col) + ": " + (text || "—empty—"));
        input.val(text).select();
    });
}

function _saveInput(input) {
    withInput(input, function(input, sheet, sheetName, row, col){
        var x = SPREADSHEET.setInputData(sheetName, row, col, input.val());
        SPREADSHEET.updateDisplay(sheetName, row, col);
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
    withInput(this, function(input, sheet, sheetName, row, col){
        if (ev.keyCode == 38) {
            // UP
            _getInput(sheet, row - 1, col).focus().select();
            ev.preventDefault();
        } else if (ev.keyCode == 40 || ev.keyCode == 13) {
            // DOWN or ENTER
            _getInput(sheet, row + 1, col).focus().select();
            ev.preventDefault();
        } else if (ev.keyCode == 27) {
            // ESCAPE
            input
                .val(SPREADSHEET.getInputData(sheetName, row, col))
                .select();
            ev.preventDefault();
        } else if (ev.keyCode == 37) {
            // LEFT
            if (input[0].selectionStart == 0) {
                _getInput(sheet, row, col - 1).focus().select();
                ev.preventDefault();
            }
        } else if (ev.keyCode == 39) {
            // RIGHT
            if (input[0].selectionEnd == input.val().length) {
                _getInput(sheet, row, col + 1).focus().select();
                ev.preventDefault();
            }
        } else if (ev.keyCode == 9) {
            // TAB
            var diff = ev.shiftKey ? -1 : 1;
            var next = _getInput(sheet, row, col + diff);
            if (next.length == 0 && !ev.shiftKey) {
                next = _getInput(sheet, row + 1, 1);
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
            var cell = SPREADSHEET._getCell(sheetName, row, col);
            if (!cell || !cell.exp) {
                alert("No expression here");
            } else {
                window.COPY = cell;
            }
            ev.preventDefault();
        } else if (ev.keyCode == 86 && ev.shiftKey && ev.ctrlKey) {
            // C-S-v
            if (!window.COPY) {
                alert("Copy an expression first");
            } else {
                var exp = calc.print(sheetName, row, col, window.COPY.exp, window.COPY);
                input.val("=" + exp);
            }
            input.select();
            ev.preventDefault();
        }
    });
}

function _onInput(ev) {

}

function _adjustCol(ev) {
    ev.preventDefault();
    var td = ev.target;
    var col = td.cellIndex - 1;
    var sheet = $(td).closest(".sheet");
    var sheetName = sheet[0].id;
    if (ev.shiftKey) {
        SPREADSHEET.deleteCols(sheetName, col, 1);
    } else {
        SPREADSHEET.insertCols(sheetName, col, 1);
    }
}

function _adjustRow(ev) {
    ev.preventDefault();
    var td = ev.target, tr = td.parentNode;
    var row = tr.rowIndex - 1;
    var sheet = $(td).closest(".sheet");
    var sheetName = sheet[0].id;
    if (ev.shiftKey) {
        $(tr).remove();
        SPREADSHEET.deleteRows(sheetName, row, 1);
    } else {
        $(tr).clone().insertBefore(tr).find("input").val("").removeClass();
        SPREADSHEET.insertRows(sheetName, row, 1);
    }
}

function fillElements(data) {
    $.each(data, function(sheet, data){
        var cont = $("#" + sheet.toLowerCase());
        $.each(data, function(key, val){
            var x = calc.parseReference(key);
            var input = _getInput(cont, x.row, x.col);
            var x = SPREADSHEET.setInputData(sheet, x.row, x.col, val);
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
        A1: 1,
        A2: 2,
        A3: 3,
        B1: 4,
        B2: 5,
        B3: 6,
        C1: 7,
        C2: 8,
        C3: 9,
        //E5: "=sum(A1:C3)",
        E5: "=A1",
        E6: "=SUM((a1,a2,a3), (b1,b2,b3))",
    },
    sheet2: {
        A1: "=sum(sheet1!a1:c3)"
    }
    // sheet1: {
    //     A1: '=CURRENCY("USD", "EUR") + CURRENCY("USD", "EUR")'
    // }
    // sheet1: {
    //     A1: '=A2*A3',
    //     A2: 10,
    //     A3: '=currency("USD", "EUR")'
    // }

    // sheet1: {
    //     A1: 10,
    //     A2: 20,
    //     B1: "=A1+A2",
    //     C1: '=sum((A1,A2))',
    //     C2: '=sum(((A1,A3,A5,A7,A9) A1:B10))',
    //     D1: '=sum(A:C)',
    //     E1: '=sum(sum(A1:A3 A1:B3)+10, C1:D3)',
    //     F1: '=E1 * H1 & " USD"',
    //     G1: "EUR/USD →",
    //     H1: '=currency("USD", "EUR")',

    //     A5: "CHF",
    //     A6: "EUR",
    //     A7: "=currency(A5, A6)"
    // },
    // sheet2: {
    //     A1: 10,
    //     A2: 20,
    //     B1: "=A1+A2",
    //     D1: "a1:b4",
    //     E1: "=sum(indirect(D1))"
    //     // A1: "=sum(C1, B1)",
    //     // B1: 5,
    //     // B2: 10,
    //     // B3: 15,
    //     // C1: "=  sum  (  b1  :  b3  )"
    // }
});
