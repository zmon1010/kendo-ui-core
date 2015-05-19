var spreadsheet = $("#spreadsheet").kendoSpreadsheet({
    columns: 10,
    rows: 20
}).data("kendoSpreadsheet");

var sheet = spreadsheet.activeSheet();
var calc = kendo.spreadsheet.calc;

var Glue = {

    getRefCells: function(ref) {
        if (ref instanceof calc.Runtime.CellRef) {
            var formula = sheet.range(ref.row-1, ref.col-1).formula() || null;
            var value = sheet.range(ref.row-1, ref.col-1).value();
            if (formula != null || value != null)
                return [{ formula: formula, value: value, row: ref.row, col: ref.col, sheet: "sheet1" }];

        }
        if (ref instanceof calc.Runtime.RangeRef) {
            // ref = ref.intersect(this.getSheetBounds());
            // if (!(ref instanceof calc.Runtime.RangeRef))
            //     return this.getRefCells(ref);
            var startCellIndex = sheet._grid.index(ref.topLeft.row-1, ref.topLeft.col-1);
            var endCellIndex = sheet._grid.index(ref.bottomRight.row-1, ref.bottomRight.col-1);
            var formulas = sheet._formulas.iterator(startCellIndex, endCellIndex);
            var values = sheet._values.iterator(startCellIndex, endCellIndex);
            var a = [];
            for (var row = ref.topLeft.row; row <= ref.bottomRight.row; ++row) {
                for (var col = ref.topLeft.col; col <= ref.bottomRight.col; ++col) {
                    var index = sheet._grid.index(row-1, col-1);
                    var formula = formulas.at(index) || null;
                    var value = values.at(index);
                    console.log(row, col, index, value);
                    if (formula != null || value != null) {
                        a.push({ formula: formula, value: value, row: row, col: col, sheet: "sheet1" });
                    }
                }
            }
            console.log(a);
            return a;
        }
        if (ref instanceof calc.Runtime.UnionRef) {
            var a = [], self = this;
            ref.refs.forEach(function(ref){
                a = a.concat(self.getRefCells(ref));
            });
            return a;
        }
        if (ref instanceof calc.Runtime.NullRef) {
            return [];
        }
        console.error("Unsupported reference", ref);
        return [];
    },

    getData: function(ref) {
        var self = this;
        if (ref instanceof calc.Runtime.Ref) {
            var data = self.getRefCells(ref).map(function(cell){
                return cell.value;
            });
            return ref instanceof calc.Runtime.CellRef ? data[0] : data;
        }
        return ref;
    },

    getSheetBounds: function() {
        var lastIndex = sheet._values.lastRangeStart() - 1;
        var addr = sheet._grid.address(lastIndex);
        var maxrow = addr.row + 1;
        var maxcol = addr.column + 1;
        return calc.Runtime.makeRangeRef(
            calc.Runtime.makeCellRef(1, 1),
            calc.Runtime.makeCellRef(maxrow, maxcol)
        ).setSheet("sheet1");
    },

    onFormula: function(sheetName, row, col, val) {
        console.log("onFormula:", sheetName, row, col, val);
        sheet.range(row-1, col-1).value(val);
        refreshThrottled();
    },

};



var refreshThrottled = (function(){
    var timer;
    return function() {
        clearTimeout(timer);
        timer = setTimeout(function(){
            spreadsheet.refresh();
        }, 50);
    };
})();

function recalculate() {
    var formulaCells = Glue.getRefCells(Glue.getSheetBounds()).filter(function(cell){
        return cell.formula;
    });
    formulaCells.forEach(function(cell){
        cell.formula.reset();
    });
    formulaCells.forEach(function(cell){
        cell.formula.exec(Glue, "sheet1", cell.row, cell.col);
    });
}

function Empty() {}
Empty.prototype.toString = function(){ return "" };

function fill(sheet, data) {
    for (var i in data) {
        var val = data[i];
        var ref = calc.parse_reference(i);
        var x = calc.parse("sheet1", ref.row, ref.col, val);
        if (x.type == "exp") {
            sheet.range(ref.row-1, ref.col-1).formula(calc.compile(x));

            // XXX: dirty hack so that getSheetBounds below considers this cell too
            sheet.range(ref.row-1, ref.col-1).value(new Empty());
        } else {
            sheet.range(ref.row-1, ref.col-1).value(x.value);
        }
    }
    refreshThrottled();
    recalculate();
};

fill(sheet, {
    A1: 1, A2: 4, A3: 7,
    B1: 2, B2: 5, B3: 8,
    C1: 3, C2: 6, C3: 9,

    D1: "=sum(a1,b1,c1)",
    D2: "=sum(a1:c3)",
    //E1: "=sum(A:D)",
});
