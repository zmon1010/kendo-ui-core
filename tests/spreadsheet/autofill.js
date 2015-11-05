(function() {
    var sheet;
    var calculator;
    var defaults = kendo.ui.Spreadsheet.prototype.options;

    function getRef(ref) {
        return sheet._ref(ref);
    }

    /* global console */ //jshint ignore:line

    function eqRef(ref, string) {
        equal(ref.toString(), string);
    }

    module("AutoFill destination", {
        setup: function() {
            sheet = new kendo.spreadsheet.Sheet(defaults.rows, defaults.columns, defaults.rowHeight, defaults.columnWidth);
            calculator = new kendo.spreadsheet.AutoFillCalculator(sheet._grid);
        }
    });

    test("4th quadrant expand", function() {
        eqRef(calculator.autoFillDest(getRef("A1:B3"), getRef("B5")), "A1:B5"); // down
        eqRef(calculator.autoFillDest(getRef("A1:B3"), getRef("F3")), "A1:F3"); // right
        eqRef(calculator.autoFillDest(getRef("A1:B3"), getRef("C7")), "A1:B7"); // down + right
        eqRef(calculator.autoFillDest(getRef("A1:B3"), getRef("A5")), "A1:B5"); // down + inner
        eqRef(calculator.autoFillDest(getRef("A1:B3"), getRef("D5")), "A1:D3"); // right + down
        eqRef(calculator.autoFillDest(getRef("A1:B3"), getRef("F1")), "A1:F3"); // right + inner
    });

    test("4th quadrant collapse", function() {
        eqRef(calculator.autoFillDest(getRef("A1:C3"), getRef("C2")), "A1:C2"); // up
        eqRef(calculator.autoFillDest(getRef("A1:C3"), getRef("A2")), "A1:A3"); // left
    });

    test("3rd quadrant expand", function() {
        eqRef(calculator.autoFillDest(getRef("C1:D3"), getRef("B7")), "C1:D7"); // down + left
        eqRef(calculator.autoFillDest(getRef("C1:D3"), getRef("A4")), "A1:D3"); // down + left
    });

    test("3rd quadrant collapse", function() {
        eqRef(calculator.autoFillDest(getRef("C1:D3"), getRef("B2")), "B1:D3"); // left + up
    });

    test("2nd quadrant expand", function() {
        eqRef(calculator.autoFillDest(getRef("C3:D4"), getRef("F2")), "C3:F4"); // up + right
        eqRef(calculator.autoFillDest(getRef("C6:D7"), getRef("E1")), "C1:D7"); // up
    });

    test("2nd quadrant collapse", function() {
        eqRef(calculator.autoFillDest(getRef("C3:D4"), getRef("C2")), "C2:D4"); // up + right
    });

    test("1st quadrant", function() {
        eqRef(calculator.autoFillDest(getRef("C3:D4"), getRef("A2")), "A3:D4"); // horizontal
        eqRef(calculator.autoFillDest(getRef("C5:D6"), getRef("B1")), "C1:D6"); // vertical
    });
})();
