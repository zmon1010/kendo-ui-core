var calc = kendo.spreadsheet.calc;

function HOP(obj, key) {
    return Object.prototype.hasOwnProperty.call(obj, key);
}

function Spreadsheet() {
    this.sheets = {};
    this.formulas = {};
    this.deps = {};
}

Spreadsheet.prototype = {

    // async (return promise)
    fetchCellData: function(sheet, row, col) {

    },

    // async (return promise)
    fetchRange: function(sheet, r1, c1, r2, c2) {

    },

    // sync (return data)
    getCellData: function(sheet, row, col) {

    },

    setInputData: function(sheet, row, col, data) {
        this._deleteCell(sheet, row, col);
        var cell = this._getCell(sheet, row, col, true);
        if (!/\S/.test(data)) {
            return {
                type: "str",
                display: ""
            };
        }
        cell.input = data;
        try {
            var x = calc.parse(sheet, row, col, data), display = x.value;
            if (x.type == "exp") {
                cell.exp = x;
                cell.input = "=" + calc.print(sheet, row, col, x.ast);
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
        } catch(ex) {
            cell.type = "error";
            return {
                type: "error",
                display: "#ERROR",
                tooltip: ex+""
            };
        }
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
            return cell.input;
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
        return cellData;
    },

    _makeCell: function(row, col) {
        return {};
    }
};

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

function _getInput(sheet, row, col) {
    sheet = $(sheet);
    return $("input[data-row='" + row + "'][data-col='" + col + "']", sheet);
}

function withInput(input, f) {
    input = $(input);
    var sheet = input.closest(".sheet");
    var row = input.data("row"), col = input.data("col");
    var sheetName = sheet[0].id;
    f(input, sheet, sheetName, row, col);
}

function _onFocus(ev) {
    withInput(this, function(input, sheet, sheetName, row, col){
        var formula = $(".formula", sheet);
        var text = SPREADSHEET.getInputData(sheetName, row, col);
        if (!text || !/\S/.test(text)) {
            text = "";
        }
        formula.text(calc.make_reference(null, row, col) + ": " + (text || "—empty—"));
        input.val(text).select();
    });
}

function _saveInput(input) {
    withInput(input, function(input, sheet, sheetName, row, col){
        var x = SPREADSHEET.setInputData(sheetName, row, col, input.val());
        input.val(x.display);
        input[0].className = "type-" + x.type;
        if (x.tooltip) {
            input[0].setAttribute("title", x.tooltip);
        } else {
            input[0].removeAttribute("title");
        }
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
                window.COPY = cell.exp;
            }
            ev.preventDefault();
        } else if (ev.keyCode == 86 && ev.shiftKey && ev.ctrlKey) {
            // C-S-v
            if (!window.COPY) {
                alert("Copy an expression first");
            } else {
                var exp = calc.print(sheetName, row, col, window.COPY.ast);
                input.val("=" + exp);
            }
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
            var input = _getInput(cont, x.row, x.col);
            var x = SPREADSHEET.setInputData(sheet, x.row, x.col, val);
            input.val(x.display);
            input[0].className = "type-" + x.type;
        });
    });
}

// init

makeElements(".sheet");

fillElements({
    sheet1: {
        A1: 10,
        A2: 20
    },
    sheet2: {
        B1: 5,
        B2: 10,
        B3: 15,
        C1: "=  sum  (  b1  :  b3  )"
    }
});
