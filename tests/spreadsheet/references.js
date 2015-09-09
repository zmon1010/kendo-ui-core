(function() {
    var RangeRef = kendo.spreadsheet.RangeRef;
    var CellRef = kendo.spreadsheet.CellRef;
    var UnionRef = kendo.spreadsheet.UnionRef;
    var ref;

    module("Spreadsheet refs", {
        setup: function() {
            ref = new RangeRef(loc(0, 0), loc(1, 1))
        }
    });

    function loc(row, col) {
        return new CellRef(row, col);
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

    test("cell ref is equal to the same", function() {
        ok(new CellRef(1, 1).eq(new CellRef(1, 1)));
    });

    test("cell ref does not equal another", function() {
        ok(!new CellRef(1, 1).eq(new CellRef(2, 1)));
    });

    test("cell ref is equal to the same range ref", function() {
        ok(new CellRef(1, 1).eq(new RangeRef(loc(1, 1), loc(1, 1))));
    });

    test("cell ref is equal to the same union ref", function() {
        ok(new CellRef(1, 1).eq(new UnionRef([ new CellRef(1, 1) ])));
    });

    test("range ref is equal to the same cell ref", function() {
        ok(new RangeRef(loc(1, 1), loc(1, 1)).eq(new CellRef(1, 1)));
    });

    test("range ref is equal to the same", function() {
        var ref2 = new RangeRef(loc(0, 0), loc(1, 1))
        ok(ref.eq(ref2));
    });

    test("range ref does not equal another", function() {
        var ref2 = new RangeRef(loc(0, 1), loc(1, 1))
        ok(!ref.eq(ref2));
    });

    test("range ref is equal to the same union", function() {
        var ref2 = new UnionRef([new RangeRef(loc(0, 0), loc(1, 1))]);
        ok(ref.eq(ref2));
    });

    test("union ref is equal to the same cell ref", function() {
        ok(new UnionRef([ new CellRef(1, 1) ]).eq(new CellRef(1, 1)));
    });

    test("union ref is equal to the same union ref", function() {
        var ref2 = new UnionRef([new RangeRef(loc(0, 0), loc(1, 1))]);
        var ref3 = new UnionRef([new RangeRef(loc(0, 0), loc(1, 1))]);
        ok(ref2.eq(ref3));
    });

    test("union ref does not equal another union ref", function() {
        var ref2 = new UnionRef([new RangeRef(loc(0, 0), loc(1, 1))]);
        var ref3 = new UnionRef([new RangeRef(loc(1, 0), loc(1, 1))]);
        ok(!ref2.eq(ref3));
    });

    test("forEachRow provides correct row references to the callback", function() {
        ref = new RangeRef(loc(0,0), loc(2, 2));
        var rows = [];

        ref.forEachRow(function(ref) {
            rows.push(ref.print());
        });

        equal(rows.toString(), "R1C1:R1C3,R2C1:R2C3,R3C1:R3C3");
    });

    test("forEachColumn provides correct row references to the callback", function() {
        ref = new RangeRef(loc(0,0), loc(2, 2));
        var rows = [];

        ref.forEachColumn(function(ref) {
            rows.push(ref.print());
        });

        equal(rows.toString(), "R1C1:R3C1,R1C2:R3C2,R1C3:R3C3");
    });
})();
