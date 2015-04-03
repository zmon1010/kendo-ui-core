var calc = kendo.spreadsheet.calc;

function Spreadsheet() {
    this.sheets = {};
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
        var cell = this._getCell(sheet, row, col, true);
        cell.input = data;
        var x = calc.parse(sheet, row, col, data), display = x.value;
        if (x.type == "exp") {
            display = "...";
        }
        cell.display = display;
        return {
            type: x.type,
            display: display
        };
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
        input.val(text);
    });
}

function _saveInput(input) {
    withInput(input, function(input, sheet, sheetName, row, col){
        var x = SPREADSHEET.setInputData(sheetName, row, col, input.val());
        input.val(x.display);
        input[0].className = "type-" + x.type;
    });
}

function _onBlur(ev) {
    _saveInput(this);
}

function _onKeyDown(ev) {
    withInput(this, function(input, sheet, sheetName, row, col){
        if (ev.keyCode == 38) {
            _getInput(sheet, row - 1, col).focus().select();
            ev.preventDefault();
        } else if (ev.keyCode == 40 || ev.keyCode == 13) {
            _getInput(sheet, row + 1, col).focus().select();
            ev.preventDefault();
        } else if (ev.keyCode == 27) {
            input
                .val(SPREADSHEET.getInputData(sheetName, row, col))
                .select();
            ev.preventDefault();
        }
    });
}

function _onInput(ev) {

}

function _onChange(ev) {

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
        C1: "=sum(B1:B3)"
    }
});
