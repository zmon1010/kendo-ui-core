(function() {
    var RangeRef = kendo.spreadsheet.RangeRef;
    var ref;

    module("Spreadsheet refs", {
        setup: function() {
            ref = new RangeRef(loc(0, 0), loc(1, 1))
        }
    });

    function loc(row, col) {
        return { row: row, col: col };
    }

    test("RangeRef resize left", function() {
        equal(ref.resize({ left: 1 }).print(), 'R1C2:R2C2');
    });

    test("RangeRef resize left beyond boundary", function() {
        equal(ref.resize({ left: -1 }).print(), 'R1C1:R2C2');
    });

    test("RangeRef resize right", function() {
        equal(ref.resize({ right: 1 }).print(), 'R1C1:R2C3');
    });

    test("RangeRef resize right to empty", function() {
        equal(ref.resize({ right: -2 }).print(), '#NULL!');
    });
})();
