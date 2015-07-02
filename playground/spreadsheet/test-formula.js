var spreadsheet = kendo.spreadsheet;
var calc = spreadsheet.calc;
var runtime = calc.runtime;

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
        if (ref instanceof spreadsheet.CellRef) {
            var cell = this._getCell(ref.sheet, ref.row, ref.col);
            return cell ? [ cell ] : [];
        }
        if (ref instanceof spreadsheet.RangeRef) {
            ref = ref.intersect(this.getSheetBounds(ref.sheet));
            if (!(ref instanceof spreadsheet.RangeRef)) {
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
        if (ref instanceof spreadsheet.UnionRef) {
            var a = [];
            for (var i = 0; i < ref.refs.length; ++i) {
                a = a.concat(this.getRefCells(ref.refs[i]));
            }
            return a;
        }
        if (ref === spreadsheet.NULLREF) {
            return [];
        }
        console.error("Unsupported reference", ref);
        return [];
    },

    getData: function(ref) {
        var data = this.getRefCells(ref).map(function(cell){
            return cell.value;
        });
        return ref instanceof spreadsheet.CellRef ? data[0] : data;
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
        return new spreadsheet.RangeRef(
            // top-left
            new spreadsheet.CellRef(0, 0, 0),
            // bottom-right
            new spreadsheet.CellRef(maxrow, maxcol, 0)
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
        data += "";
        var self = this;
        self._deleteCell(sheet, row, col);
        if (data === "") {
            return {
                type: "str",
                display: ""
            };
        }
        var cell = self._getCell(sheet, row, col, true);
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
            window.formula = cell.formula;
            return "=" + cell.formula.print(row, col);
        }
    },

    updateDisplay: function(sheet, row, col) {
        var cell = this._getCell(sheet, row, col);
        var input = _getInput("#" + sheet, row, col);
        if (!cell) {
            input.val("");
            return;
        }
        if (input[0] === document.activeElement) {
            return;
        }
        cell.display = cell.value;
        if (Array.isArray(cell.value)) {
            cell.display = JSON.stringify(cell.value);
        }
        input.val(cell.display);
        input[0].className = "type-" + cell.type;
        if (cell.tooltip) {
            input[0].setAttribute("title", cell.tooltip);
        } else {
            input[0].removeAttribute("title");
        }
        input[0].title = cell.display;
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
        this.getVisibleFormulas().forEach(function(cell){
            cell.formula.adjust("row", row, n, cell.row, cell.col);
        });
        increaseProps(sheet.data, row, n);
        this.debugFormulas();
        this.recalculate();
    },

    debugFormulas: function() {
        this.getVisibleFormulas().forEach(function(cell){
            console.log(cell.formula.print(cell.row, cell.col));
        });
    },

    deleteRows: function(sheetName, row, n) {
        var sheet = this.sheets[sheetName];
        this.getVisibleFormulas().forEach(function(cell){
            cell.formula.adjust("row", row, -n, cell.row, cell.col);
        });
        reduceProps(sheet.data, row, n);
        this.debugFormulas();
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
        formula.text(spreadsheet.Ref.display(null, row, col) + ": " + (text || "—empty—"));
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
                var exp = window.COPY.formula.print(row, col);
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
        A5: 1, B5: 1, C5: 1,

        D4: '={a1:c3}+5',
        D5: '=sumif({ A1:C3, A5:C5 }, ">3")',
        E5: '=sumif(A1:C3, ">3")',
        A4: "foo",
        B4: "foobar",
        C4: "foo bar",
        F5: "=countif(A:C, \">=3\")",
        D6: "=countif(A4:C10, \"foo*bar\")",
        D7: "=countifs(A1:C3, \">3\", G11:I13, \"<7\")",
        D9: '=sumifs(A1:C3, D1:F3, "y*")',
        D10: '=countifs(A1:C3, ">=0", D1:F3, "y*")',
        D11: '=averageifs(A1:C3, D1:F3, "y*")',
        D12: '=sumif(A1:C3, ">5", A1:C3)',
        D13: '=sumif(A1:C3, ">5")',
        D14: '=sumif(D1:F3, "y*", A1:C3)',
        D15: '=counta(A:C)',
        D16: '=count(A:C)',
        D17: '=countunique(A:C)',
        D18: '=countunique({ 1, 2, 3, A1, A2, A3, A1:A3 })',
        D19: '=countunique(1, 2, 3, A1, A2, A3, A1:A3)',

        D8: '=sumif({ A1:C1, A2:C2, A3:C3 }, ">3")',
        E8: '=sumif({ 1, 2, 3, 4, 5, 6, 7, 8, 9 }, ">3")',
        F8: '=sumif({ A1, A2, A3, B1, B2, B3, C1, C2, C3 }, ">3")',

        B9: '={ 2, 3, 4 }&"foo"',
        B10: '=1+{ 2, 3, 4 }',
        B11: '={ 1, 2, 3 }+{ 4, 5, 6 }',
        B12: '={ 2, 3, 4 }^2',
        B13: '=A1+D1&C1',
        B14: '={10, 20, 30}%',
        B15: '=-{3, 4, 5}',

        D1: 'y',
        D3: 'YES',
        F1: 'Y',
        F3: 'YYY',
        E2: 'Yaaaaas',
        E1: 'nope',

        E9: '=ISERROR(FOO())',
        E10: '=ISERROR(C1+D1)',

        G11: 1,
        G12: 2,
        G13: 3,
        H11: 4,
        H12: 5,
        H13: 6,
        I11: 7,
        I12: 8,
        I13: 9,

        G1: '=if(A1:C3<5, "foo", "bar")',
        G2: '=sum(IF(A1:B3>5, B1:C3, 0))',
        G3: '=mod(A1:C3, 2)',
        G4: '=sum(IF(NOT(MOD(A1:C3, 2)), A1:C3, 0))', // sum even numbers
        G5: '=sum(IF(AND(MOD(A1:C3, 2), A1:C3>5), A1:C3, 0))', // sum odd numbers greater than 5

        A7: "a1",
        A8: "a2",
        B8: '=indirect(A7)+indirect(A8)',
        B16: '={ A1:C1; 10, 10, 10; A2:B3, C2:C3 } * 2',

        B7: '=vlookup(2, A1:C3, 3, false)',
        B6: '=sum(a1:choose(2, b1, b2, b3))',
        B8: '=offset(B6, -2, -1)',
        C6: '=choose(A1:B2, "one", "two", "three", "four", "five", "six")',

        H1: 1, H2: 2, H3: 3, H4: 4, H5: 5, H6: 6,
        H8: '=match(3, h1:h6)',
        H9: '=match(3.5, h1:h6)',
        H10: '=match(4.5, h1:h6)',

        I1: 6, I2: 5, I3: 4, I4: 3, I5: 2, I6: 1,
        I8: '=match(3, i1:i6, -1)',
        I9: '=match(3.5, i1:i6, -1)',
        I10: '=match(4.5, i1:i6, -1)',

        J1: "foo", J2: "bar", J3: "baz", J4: "asd", J5: "qwe", J6: "zxc",
        J8: '=match("baz", J1:J6, 0)',
        J9: '=hlookup(4, A1:C3, 3)',
        J10: '=index(A1:C3, 2)',

        // XXX: Google Sheets doesn't parse this, should we err?
        // looks legit to me, if there's anything sane in Excel.
        B17: '={ A1:B3, C1:C3; -{ 1, 2, 3 }% } + A2',
        F15: '={ { 1, 2; 3, 4 }; 5, 6 }',

        C9: '=address(1, 1)',
        C10: '=column(B1:D3)',
        C11: '=row(B3:D6)',
        C12: '=transpose(A1:C2)',

        A20: '100',
        B20: '=sum(a1:c3)',
        c20: '100',
        A19: '=sum(indirect(b19):indirect(c19))',
        B19: 'a20', c19: 'c20',
        

        //E5: "=sum(A1:C3)",
        // E5: "=B2",
        // E6: "=B$2",
        // E7: "=(a1+a2)*a3",
        // E8: "=sum(A1:C3)",
        // E5: "=sum(B2:C3)",
        // E6: "=sum(I13:G11)"
        // E6: "=SUM((a1,a2,a3), (b1,b2,b3))",
    },
    sheet2: {
        A1: 'Dept',  B1: 'Employees', C1: 'Criteria',
        A2: 'A',     B2: 2,           C2: 'A',
        A3: 'B',     B3: 4,           C3: 'B',
        A4: 'C',     B4: 3,
        A5: 'A',     B5: 3,
        A6: 'B',     B6: 3,
        A7: 'C',     B7: 2,
        A8: 'A',     B8: 4,
        A9: 'C',     B9: 3,

        D1: '=SUM(IF((A2:A9="A")+(A2:A9="B"),B2:B9,0))',
        D2: '=SUM(IF(A2:A9={"A","B"},B2:B9,0))',
        D3: '=SUMIF(A2:A9,C2:C3,B2:B9)',
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
