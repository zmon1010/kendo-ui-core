(function(){

    var ss;

    module("Formula parser/printer/evaluator", {
        setup: function() {
            ss = new Spreadsheet();
            ss.fill({
                A1: 1, B1: 2, C1: 3,
                A2: 4, B2: 5, C2: 6,
                A3: 7, B3: 8, C3: 9,

                e1: 1, e2: 2, e3: 3, e4: 4, e5: 5, e6: 6, e7: 7, e8: 8,
                f2: 7, f3: 6, f4: 5, f5: 4, f6: 3, f7: 2, f8: 1,
                g1: "aaa", g2: "bbb", g3: "ccc", g4: "ddd", g5: "eee", g6: "fff", g7: "ggg", g8: "hhh",
                h1: "hhh", h2: "ggg", h3: "fff", h4: "eee", h5: "ddd", h6: "ccc", h7: "bbb", h8: "aaa",
            });
        },
        teardown: function() {
        }
    });

    var spreadsheet = kendo.spreadsheet;
    var calc = spreadsheet.calc;
    var runtime = calc.runtime;

    // check for the existence of `props` in `obj` (deep).  does not
    // mind if `obj` contains additional properties, but those
    // specified in 'props' must be present and have same values.
    function hasProps(obj, props) {
        for (var i in props) {
            if (Object.prototype.hasOwnProperty.call(props, i)) {
                var val = props[i];
                if (Array.isArray(val) || (typeof val == "object" && val != null)) {
                    hasProps(obj[i], val);
                } else {
                    equal(obj[i], val);
                }
            }
        }
    }

    // minimal data object with the glue functionality so we
    // can run expressions.
    var Spreadsheet = kendo.Class.extend({
        init: function() {
            this.data = {};
            this.maxrow = 0;
            this.maxcol = 0;
        },
        onFormula: function(sheet, row, col, value) {
            this.maxrow = Math.max(row, this.maxrow);
            this.maxcol = Math.max(col, this.maxcol);
            var cell = this.data[this.id(row, col)];
            if (!cell) {
                this.data[this.id(row, col)] = cell = {};
            }
            cell.value = value;
        },
        getRefCells: function(ref) {
            if (ref instanceof spreadsheet.CellRef) {
                var cell = this.get(ref.row, ref.col);
                if (cell) {
                    cell.sheet = "sheet1";
                    cell.row = ref.row;
                    cell.col = ref.col;
                }
                return cell ? [ cell ] : [];
            }
            if (ref instanceof spreadsheet.RangeRef) {
                ref = ref.intersect(this.bounds());
                if (!(ref instanceof spreadsheet.RangeRef)) {
                    return this.getRefCells(ref);
                }
                var a = [];
                for (var row = ref.topLeft.row; row <= ref.bottomRight.row; ++row) {
                    for (var col = ref.topLeft.col; col <= ref.bottomRight.col; ++col) {
                        var cell = this.get(row, col);
                        if (cell) {
                            cell.sheet = "sheet1";
                            cell.row = row;
                            cell.col = col;
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
            return [];
        },
        getData: function(ref) {
            if (!(ref instanceof spreadsheet.Ref)) {
                return ref;
            }
            var a = this.getRefCells(ref).filter(function(cell){
                return cell.value != null;
            }).map(function(cell){
                return cell.value;
            });
            return ref instanceof spreadsheet.CellRef ? a[0] : a;
        },
        makeRef: function(ref) {
            if (ref instanceof spreadsheet.Ref) {
                return ref;
            }
            return calc.parseReference(ref);
        },
        set: function(row, col, val) {
            val += "";
            val = calc.parse("sheet1", row, col, val);
            if (val.type == "exp") {
                val = { formula: calc.compile(val), exp: val };
            }
            this.maxrow = Math.max(row, this.maxrow);
            this.maxcol = Math.max(col, this.maxcol);
            this.data[this.id(row, col)] = val;
        },
        bounds: function() {
            return new spreadsheet.RangeRef(
                new spreadsheet.CellRef(0, 0, 0),
                new spreadsheet.CellRef(this.maxrow, this.maxcol, 0)
            ).setSheet("sheet1");
        },
        get: function(row, col) {
            return this.data[this.id(row, col)];
        },
        id: function(row, col) {
            return row + ":" + col;
        },
        fill: function(data) {
            var self = this;
            Object.keys(data).forEach(function(key){
                var ref = self.makeRef(key);
                self.set(ref.row, ref.col, data[key]);
            });
        },
        recalculate: function(callback) {
            var self = this;
            var cells = self.getRefCells(self.bounds()).filter(function(cell){
                if (cell.formula) {
                    cell.formula.reset();
                    return true;
                }
            });
            var count = cells.length;
            if (callback && !count) {
                callback();
            }
            cells.forEach(function(cell){
                cell.formula.exec(self, "sheet1", cell.row, cell.col, function(){
                    if (callback && !--count) {
                        callback();
                    }
                });
            });
        },
        $: function(x) {
            return this.getData(this.makeRef(x));
        },
        expectEqual: function(hash) {
            var self = this;
            Object.keys(hash).forEach(function(cell){
                equal(self.$(cell), hash[cell]);
            });
        }
    });

    // test async function
    runtime.defineFunction("asum", function(callback, args) {
        var self = this, timeout = args.shift();
        setTimeout(function(){
            var sum = 0;
            self.forNumbers(args, function(num){
                sum += num;
            });
            callback(sum);
        }, timeout);
    });

    // these two will be used to test conditional evaluation
    runtime.defineFunction("foo", function(callback, args){
        if (!this.ss.fooCount)
            this.ss.fooCount = 0;
        ++this.ss.fooCount;
        callback("foo");
    });
    runtime.defineFunction("bar", function(callback, args){
        if (!this.ss.barCount)
            this.ss.barCount = 0;
        ++this.ss.barCount;
        callback("bar");
    });

    /* -----[ parser tests ]----- */

    test("cell reference", function(){
        var exp = calc.parse("sheet1", 0, 0, "=G5");
        hasProps(exp, {
            type: "exp",
            ast: {
                type: "ref",
                ref: "cell",
                sheet: "sheet1",
                row: 4,
                col: 6,
                rel: 3
            }
        });
    });

    test("normalizes range reference", function(){
        var exp = calc.parse("sheet1", 0, 0, "=A4:C2");
        hasProps(exp, {
            type: "exp",
            ast: {
                type: "ref",
                ref: "range",
                sheet: "sheet1",
                topLeft: {      // A2
                    type: "ref",
                    ref: "cell",
                    row: 1,
                    col: 0,
                    rel: 3
                },
                bottomRight: {  // C4
                    type: "ref",
                    ref: "cell",
                    row: 3,
                    col: 2,
                    rel: 3
                }
            }
        });
    });

    test("function call", function(){
        var exp = calc.parse("sheet1", 0, 0, "=sum(A2, A3, A4)");
        hasProps(exp, {
            type: "exp",
            ast: {
                type: "func",
                func: "sum",
                args: [
                    { type: "ref", ref: "cell", row: 1, col: 0 },
                    { type: "ref", ref: "cell", row: 2, col: 0 },
                    { type: "ref", ref: "cell", row: 3, col: 0 },
                ]
            }
        });
    });

    test("union operator", function(){
        var exp = calc.parse("sheet1", 0, 0, "=sum((A2, A3, A4))");
        hasProps(exp, {
            type: "exp",
            ast: {
                type: "func",
                func: "sum",
                args: [
                    { type: "binary", op: ",",
                      left: { type: "binary", op: ",",
                              left: { type: "ref", ref: "cell", row: 1, col: 0 },
                              right: { type: "ref", ref: "cell", row: 2, col: 0 }
                            },
                      right: { type: "ref", ref: "cell", row: 3, col: 0 }
                    }
                ]
            }
        });
    });

    test("intersection operator", function(){
        var exp = calc.parse("sheet1", 0, 0, "=sum(A2:A5 A3:A4, Sheet2!FOO)");
        hasProps(exp, {
            type: "exp",
            ast: {
                type: "func",
                func: "sum",
                args: [
                    // first arg is intersection of A2:A5 x A3:A4
                    { type: "binary", op: " ",
                      left: { type: "ref", ref: "range", // A2:A5
                              topLeft: { type: "ref", ref: "cell", row: 1, col: 0 },
                              bottomRight: { type: "ref", ref: "cell", row: 4, col: 0 },
                            },
                      right: { type: "ref", ref: "range", // A3:A4
                               topLeft: { type: "ref", ref: "cell", row: 2, col: 0 },
                               bottomRight: { type: "ref", ref: "cell", row: 3, col: 0 },
                             },
                    },
                    // second arg is the user-defined name FOO
                    { type: "ref", ref: "name", name: "FOO", sheet: "Sheet2", _hasSheet: true }
                ]
            }
        });
    });

    test("operator precedence", function(){
        var exp = calc.parse("sheet1", 0, 0, "=a + b * c + d / e");
        hasProps(exp, {
            type: "exp",
            ast: {
                type: "binary", op: "+",
                left: { type: "binary", op: "+", // a+b*c
                        left: { name: "a" },
                        right: { type: "binary", op: "*", // b*c
                                 left: { name: "b" },
                                 right: { name: "c" }
                               }
                      },
                right: { type: "binary", op: "/", // d/e
                         left: { name: "d" },
                         right: { name: "e" }
                       }
            }
        });
    });

    test("intersection and union precedence", function(){
        var exp = calc.parse("sheet1", 0, 0, "=areas((A1:C3 B2, B3:B4))");
        var f = calc.compile(exp);
        equal(f.print(0, 0), "areas((A1:C3 B2,B3:B4))");

        var exp = calc.parse("sheet1", 0, 0, "=areas(A1:C3 (B2, B3:B4))");
        var f = calc.compile(exp);
        equal(f.print(0, 0), "areas(A1:C3 (B2,B3:B4))");
    });

    test("range as cell:funcall", function(){
        var exp = calc.parse("sheet1", 0, 0, "=sum(a1:choose(2, b1, b2, b3))");
        var f = calc.compile(exp);
        equal(f.print(0, 0), "sum(A1:choose(2, B1, B2, B3))");
    });

    test("column range and union intersection", function(){
        var exp = calc.parse("sheet1", 0, 0, "=aaa:ccc (a1, a2, a3)");
        var f = calc.compile(exp);
        equal(f.print(0, 0), "AAA:CCC (A1,A2,A3)");
    });

    test("omit intermediate arguments in funcall", function(){
        var exp = calc.parse("sheet1", 0, 0, "=sum(a1,,b1)");
        var f = calc.compile(exp);
        equal(f.print(0, 0), "sum(A1, , B1)");
    });

    /* -----[ printer tests ]----- */

    test("print adjusts cell references", function(){
        var exp = calc.parse("sheet1", 0, 1, "=sum(A1:A5)");
        var formula = calc.compile(exp);
        var origCell = { formula: formula, row: 0, col: 1, sheet: "sheet1" };

        var str = formula.print(1, 1);
        equal(str, "sum(A2:A6)");

        var str = formula.print(2, 2);
        equal(str, "sum(B3:B7)");
    });

    test("print absolute references", function(){
        function testOne(input, output) {
            var exp = calc.parse("sheet1", 0, 1, input);
            var formula = calc.compile(exp);
            var origCell = { formula: formula, row: 0, col: 1, sheet: "sheet1" };

            var str = formula.print(4, 4);
            equal(str, output);
        }
        testOne("=A1", "D5");
        testOne("=$A1", "$A5");
        testOne("=A$1", "D$1");
        testOne("=$A$1", "$A$1");

        testOne("=sum(A1:C3)", "sum(D5:F7)");
        testOne("=sum($A1:C3)", "sum($A5:F7)");
        testOne("=sum(A$1:C3)", "sum(D$1:F7)");
        testOne("=sum($A$1:C3)", "sum($A$1:F7)");
        testOne("=sum(A1:$C3)", "sum(D5:$C7)");
        testOne("=sum(A1:C$3)", "sum(D5:F$3)");
        testOne("=sum(A1:$C$3)", "sum(D5:$C$3)");
    });

    test("print in RC notation", function(){
        function testOne(input, output) {
            var exp = calc.parse("sheet1", 4, 4, input);
            var formula = calc.compile(exp);
            equal(formula.print(), output);
        }

        testOne("=A1", "R[-4]C[-4]");
        testOne("=A2", "R[-3]C[-4]");
        testOne("=B1", "R[-4]C[-3]");
        testOne("=B2", "R[-3]C[-3]");
        testOne("=$C$3", "R3C3");
        testOne("=$C3", "R[-2]C3");
        testOne("=C$3", "R3C[-2]");
        testOne("=C3", "R[-2]C[-2]");
    });

    test("formula cache", function(){
        function testOne(f1, f2) {
            var e1 = calc.parse("sheet1", 0, 0, f1);
            var e2 = calc.parse("sheet1", 1, 0, f2);
            f1 = calc.compile(e1);
            f2 = calc.compile(e2);
            ok(f1.refs === f2.refs);
            ok(f1.handler === f2.handler);
            ok(f1.print === f2.print);
        }

        testOne("=B1+C1", "=B2+C2");
        testOne("=sum(3:5)", "=sum(4:6)");
        testOne("=sum(C2:E5)", "=sum(C3:E6)");
        testOne("=B$1+C1", "=B$1+C2");
    });

    test("formula adjustment", function(){
        function makeFormula(input) {
            return calc.compile(calc.parse("sheet1", 5, 5, input));
        }
        var f = makeFormula("=sum(a10:c15)");

        // insert 3 rows before row 7; the formula is at 5,5
        f.adjust("row", 7, 3, 5, 5);
        equal(f.print(5, 5), "sum(A13:C18)");

        // insert 2 cols before col 1; the formula will move to 5,7
        f.adjust("col", 1, 2, 5, 5);
        equal(f.print(5, 7), "sum(A13:E18)");

        // insert 1 col before col A; the formula moves to 5,8
        f.adjust("col", 0, 1, 5, 7);
        equal(f.print(5, 8), "sum(B13:F18)");

        // delete col A; the formula moves back to 5,7
        f.adjust("col", 0, -1, 5, 8);
        equal(f.print(5, 7), "sum(A13:E18)");

        // delete col E; the formula moves to 5,6
        f.adjust("col", 4, -1, 5, 7);
        equal(f.print(5, 6), "sum(A13:D18)");

        // delete cols C and D; the formula moves to 5,4
        f.adjust("col", 2, -2, 5, 6);
        equal(f.print(5, 4), "sum(A13:B18)");

        // delete rows 1-4; the formula moves to 1,4
        f.adjust("row", 0, -4, 5, 4);
        equal(f.print(1, 4), "sum(A9:B14)");

        // delete row 10
        f.adjust("row", 9, -1, 1, 4);
        equal(f.print(1, 4), "sum(A9:B13)");

        // delete rows 9 and 10
        f.adjust("row", 8, -2, 1, 4);
        equal(f.print(1, 4), "sum(A9:B11)");

        // delete col A; the formula moves to 1,3
        f.adjust("col", 0, -1, 1, 4);
        equal(f.print(1, 3), "sum(A9:A11)");
    });

    /* -----[ reference operations ]----- */

    test("reference intersection", function(){
        function ref(input) {
            var exp = calc.parse("sheet1", 0, 0, "=" + input);
            hasProps(exp, {
                type: "exp",
                ast: {
                    type: "ref"
                }
            });
            ok(exp.ast instanceof spreadsheet.Ref);
            return exp.ast;
        }
        function print(ref) {
            return ref.print(0, 0);
        }
        function intersect(r1, r2) {
            return print(ref(r1).intersect(ref(r2)));
        }
        equal(intersect("B3:D6", "A1:E7"), "$B$3:$D$6");
        equal(intersect("B3:D6", "B6:D10"), "$B$6:$D$6");
        equal(intersect("A1:A3", "A3:A6"), "$A$3");
        equal(intersect("A1:A3", "A4:A5"), "#NULL!");

        equal(intersect("B3:D6", "A1:B3"), "$B$3");
        equal(intersect("B3:D6", "A1:C4"), "$B$3:$C$4");

        equal(intersect("B3:D6", "D1:D10"), "$D$3:$D$6");
        equal(intersect("B3:D6", "E1:E10"), "#NULL!");
        equal(intersect("B3:D6", "D1:D3"), "$D$3");

        equal(intersect("B3:D6", "D5:E10"), "$D$5:$D$6");
        equal(intersect("B3:D6", "D6:E10"), "$D$6");
        equal(intersect("B3:D6", "D7:E10"), "#NULL!");

        equal(intersect("B3:D6", "A5:D6"), "$B$5:$D$6");
        equal(intersect("B3:D6", "A6:D6"), "$B$6:$D$6");
        equal(intersect("B3:D6", "A7:D8"), "#NULL!");
        equal(intersect("B3:D6", "A6:B6"), "$B$6");

        equal(intersect("B3:D6", "1:2"), "#NULL!");
        equal(intersect("B3:D6", "2:3"), "$B$3:$D$3");
        equal(intersect("B3:D6", "3:4"), "$B$3:$D$4");
        equal(intersect("B3:D6", "A:E"), "$B$3:$D$6");
        equal(intersect("B3:D6", "A:C"), "$B$3:$C$6");
        equal(intersect("B3:D6", "C:C"), "$C$3:$C$6");
        equal(intersect("B3:D6", "C:E"), "$C$3:$D$6");
        equal(intersect("B3:D6", "E:F"), "#NULL!");
    });

    /* -----[ expression evaluation ]----- */

    test("evaluate simple sum", function(){
        ss.fill({
            D1: "=sum(A1:C3)"
        });
        ss.recalculate(function(){
            equal(ss.getData(ss.makeRef("D1")), 45);
        });
    });

    test("evaluate average", function(){
        ss.fill({
            D1: "=average(A1:C3)"
        });
        ss.recalculate(function(){
            equal(ss.getData(ss.makeRef("D1")), 5);
        });
    });

    test("AVERAGE and AVERAGEA", function(){
        var ss = new Spreadsheet();
        ss.fill({
            A1: 2, B1: "foo", C1: 3,
            A2: "bar", B2: "=true", C2: "=false",
            D1: "=average(A1:C3)",
            E1: "=averagea(A1:C3)",
        });
        ss.recalculate(function(){
            equal(ss.getData(ss.makeRef("D1")), (2+3)/2);
            equal(ss.getData(ss.makeRef("E1")), (2+0+3+0+1+0)/6);
        });
    });

    test("evaluate dependent formulas", function(){
        ss.fill({
            D1: "=sum(A1:C3, D2)",
            D2: "=sum(A1:C3)"
        });
        ss.recalculate(function(){
            equal(ss.getData(ss.makeRef("D1")), 90);
            equal(ss.getData(ss.makeRef("D2")), 45);
        });
    });

    asyncTest("async formulas", function(){
        ss.fill({
            D1: "=sum(A1:C3, D2)",
            D2: "=asum(100, A1:A3)",
            D3: "=asum(100, A1:A3, asum(200, B1:B3))",
            E1: "=sum(A:D)",
            E2: "=asum(50, A:D)",
            E3: "=asum(50, A:D, asum(100, A:D))"
        });
        var time = Date.now();
        ss.recalculate(function(){
            //console.log("recalculate async took " + (Date.now() - time) + " milliseconds");
            start();
            equal(ss.getData(ss.makeRef("D1")), 57);
            equal(ss.getData(ss.makeRef("D2")), 12);
            equal(ss.getData(ss.makeRef("D3")), 27);
            equal(ss.getData(ss.makeRef("E1")), 141);
            equal(ss.getData(ss.makeRef("E2")), 141);
            equal(ss.getData(ss.makeRef("E3")), 282);
        });
    });

    test("conditional: IF", function(){
        var ss = new Spreadsheet();
        ss.fill({
            A1: 1, B1: 0, C1: true, D1: false, E1: "stuff", F1: "",
            A2: "=if(a1, foo(), bar())", // inc foo
            A3: "=if(b1, foo(), bar())", // inc bar
            A4: "=if(c1, foo(), bar())", // inc foo
            A5: "=if(d1, foo(), bar())", // inc bar
            A6: "=if(e1, foo(), bar())", // inc bar
            A7: "=if(f1, foo(), bar())", // inc bar
        });
        ss.recalculate(function(){
            // IF is special; only one of the branches should be evaluated
            equal(ss.fooCount, 2);
            equal(ss.barCount, 4);
            equal(ss.getData(ss.makeRef("a2")), "foo");
            equal(ss.getData(ss.makeRef("a3")), "bar");
            equal(ss.getData(ss.makeRef("a4")), "foo");
            equal(ss.getData(ss.makeRef("a5")), "bar");
            equal(ss.getData(ss.makeRef("a6")), "bar");
            equal(ss.getData(ss.makeRef("a7")), "bar");
        });
    });

    test("conditional: AND, OR", function(){
        var ss = new Spreadsheet();
        ss.fill({
            A1: "=AND(false, foo())", // does not call foo
            A2: "=AND(true, foo())",  // does call foo
            A3: "=OR(false, bar())",  // does call bar
            A4: "=OR(true, bar())",   // does not call bar
        });
        ss.recalculate(function(){
            equal(ss.fooCount, 1);
            equal(ss.barCount, 1);
            // foo and bar return strings and they are falsy in
            // conditionals
            equal(ss.getData(ss.makeRef("A1")), false);
            equal(ss.getData(ss.makeRef("A2")), false);
            equal(ss.getData(ss.makeRef("A3")), false);
            equal(ss.getData(ss.makeRef("A4")), true);
        });
    });

    asyncTest("async conditional", function(){
        var ss = new Spreadsheet();
        ss.fill({
            A1: 1, B1: 2, C1: 3,
            A3: "=asum(100, A1:C1)",
            A4: "=asum(100, A2:C2)",
            A5: "=IF(A3, true, false)",
            A6: "=IF(A4, true, false)",
            A7: "=IF(asum(100, A1:C1) > 0, asum(100, A1:C1), 0)",
            A8: "=IF(asum(100, A2:C2) > 0, asum(100, A2:C2), \"zero\")",
        });
        ss.recalculate(function(){
            start();
            equal(ss.getData(ss.makeRef("A3")), 6);
            equal(ss.getData(ss.makeRef("A4")), 0);
            equal(ss.getData(ss.makeRef("A5")), true);
            equal(ss.getData(ss.makeRef("A6")), false);
            equal(ss.getData(ss.makeRef("A7")), 6);
            equal(ss.getData(ss.makeRef("A8")), "zero");
        });
    });

    test("COUNT, COUNTA, COUNTUNIQUE", function(){
        var ss = new Spreadsheet();
        ss.fill({
            A1: 1, B1: 2, C1: 1,
            A2: "x", B2: "", C2: "'",
            A4: "=count(A1:D2)",
            A5: "=counta(A1:D2)",
            A6: "=countunique(A1:D2)",
        });
        ss.recalculate(function(){
            equal(ss.$("A4"), 3);
            equal(ss.$("A5"), 6);
            equal(ss.$("A6"), 4);
        });
    });

    test("SUMIFS, COUNTIFS, AVERAGEIFS", function(){
        var ss = new Spreadsheet();
        ss.fill({
            A1: 1, B1: 2, C1: 3, D1: 'ya', E1: 'n', F1: 'y',
            A2: 4, B2: 5, C2: 6, D2: 'no', E2: 'y', F2: 'n',
            A3: 7, B3: 8, C3: 9, D3: 'ye', E3: 'n', F3: 'y',

            A5: '=sumif(a1:c3, ">3")',
            A6: '=sumif(d1:f3, "y", a1:c3)',
            A7: '=sumif(d1:f3, "y*", a1:c3)',
            A8: '=sumifs(a1:c3, a1:c3, ">3", a1:c3, "<7")',

            B5: '=countif(a1:c3, ">3")',
            B6: '=countif(d1:f3, "y")',
            B7: '=countif(d1:f3, "y*")',
            B8: '=countifs(a1:c3, ">3", a1:c3, "<7")',

            C5: '=averageif(a1:c3, ">3")',
            C6: '=averageif(d1:f3, "y", a1:c3)',
            C7: '=averageif(d1:f3, "y*", a1:c3)',
            C8: '=averageifs(a1:c3, a1:c3, ">3", a1:c3, "<7")',
        });
        ss.recalculate(function(){
            equal(ss.getData(ss.makeRef("A5")), 4+5+6+7+8+9);
            equal(ss.getData(ss.makeRef("A6")), 3+5+9);
            equal(ss.getData(ss.makeRef("A7")), 1+3+5+7+9);
            equal(ss.getData(ss.makeRef("A8")), 4+5+6);

            equal(ss.getData(ss.makeRef("B5")), 6);
            equal(ss.getData(ss.makeRef("B6")), 3);
            equal(ss.getData(ss.makeRef("B7")), 5);
            equal(ss.getData(ss.makeRef("B8")), 3);

            equal(ss.getData(ss.makeRef("C5")), (4+5+6+7+8+9)/6);
            equal(ss.getData(ss.makeRef("C6")), (3+5+9)/3);
            equal(ss.getData(ss.makeRef("C7")), (1+3+5+7+9)/5);
            equal(ss.getData(ss.makeRef("C8")), (4+5+6)/3);
        });
    });

    // https://support.office.com/en-sg/article/IS-functions-490afee4-fd91-4839-89d4-1257a21b4e25
    test("ISERROR, IS*", function(){
        var ss = new Spreadsheet();
        ss.fill({
            A1: 'foo', B1: '1', C1: "'2", D1: '', E1: '=foo()', F1: '=a1+b1', G1: '=sumif()',
            A3: '=iserror(A1)', B3: '=iserror(B1+A1)', C3: '=iserror(F1)', D3: '=iserror(G1)', E3: '=iserror(sumif())',
            A4: '=iserr(A1)', B4: '=iserr(B1+A1)', C4: '=iserr(F1)', D4: '=iserr(G1)', E4: '=iserr(sumif())',
            A5: '=isna(A1)', B5: '=isna(B1+A1)', C5: '=isna(F1)', D5: '=isna(G1)', E5: '=isna(sumif())',
            A6: '=istext(A1)', B6: '=isnontext(A1)', C6: '=istext(B1)', D6: '=isnontext(B1)', E6: '=istext(D1)', F6: '=isnontext(D1)', G6: '=istext(H1)', H6: '=isnontext(H1)',
            A7: '=isblank(A1)', B7: '=isblank(D1)', C7: '=isblank(H1)',
            A8: '=isnumber(A1)', B8: '=isnumber(B1)', C8: '=isnumber(C1)', D8: '=isnumber(D1)', E8: '=isnumber(H1)',
            A9: '=islogical(A1)', B9: '=islogical(B1)', C9: '=islogical(A9)', D9: '=islogical(H1)',
            A10: 'A1', B10: '=isref(A10)', C10: '=isref("A10")', D10: '=isref(indirect(A10))', E10: '=isref(H1)', F10: '=isref(A1:C3)',
        });
        ss.recalculate(function(){
            // ISERROR returns true if and only if the argument is an error
            equal(ss.$("A3"), false);
            equal(ss.$("B3"), true);
            equal(ss.$("C3"), true);
            equal(ss.$("D3"), true);
            equal(ss.$("E3"), true);

            // ISERR returns true if the argument is an error but not N/A
            equal(ss.$("A4"), false);
            equal(ss.$("B4"), true);
            equal(ss.$("C4"), true);
            equal(ss.$("D4"), false);
            equal(ss.$("E4"), false);

            // ISNA returns true if the argument is a N/A error
            equal(ss.$("A5"), false);
            equal(ss.$("B5"), false);
            equal(ss.$("C5"), false);
            equal(ss.$("D5"), true);
            equal(ss.$("E5"), true);

            // ISTEXT returns true if the argument is text, or a cell containing text
            // ISNONTEXT returns true if the argument is not text (including blank cell)
            // seems to me that a cell containing empty string should be treated as blank.
            equal(ss.$("A6"), true);
            equal(ss.$("B6"), false);
            equal(ss.$("C6"), false);
            equal(ss.$("D6"), true);
            equal(ss.$("E6"), false);
            equal(ss.$("F6"), true);
            equal(ss.$("G6"), false);
            equal(ss.$("H6"), true);

            // ISBLANK returns true if the argument is an empty cell
            equal(ss.$("A7"), false);
            equal(ss.$("B7"), true);
            equal(ss.$("C7"), true);

            // ISNUMBER returns true if the argument is numeric
            equal(ss.$("A8"), false);
            equal(ss.$("B8"), true);
            equal(ss.$("C8"), false);
            equal(ss.$("D8"), false);
            equal(ss.$("E8"), false);

            // ISLOGICAL returns true if the argument is boolean
            equal(ss.$("A9"), false);
            equal(ss.$("B9"), false);
            equal(ss.$("C9"), true);
            equal(ss.$("D9"), false);

            // ISREF returns true if the argument is a cell or range reference
            equal(ss.$("B10"), true);
            equal(ss.$("C10"), false);
            equal(ss.$("D10"), true);
            equal(ss.$("E10"), true);
            equal(ss.$("F10"), true);
        });
    });

    /* -----[ lookup functions ]----- */

    test("ADDRESS", function(){
        ss.fill({
            A4  : '=address(1,1)', // absolute
            B4  : '=address(A1,B1,A2)', // take args from cell
            A5  : '=address(1,1,1)', // absolute
            A6  : '=address(1,1,2)', // absolute row, relative col
            A7  : '=address(1,1,3)', // relative row, absolute col
            A8  : '=address(1,1,4)', // relative
            A9  : '=address(1,1,5)', // error
            A10 : '=address(1,1,4,false)', // print in R[1]C[1] style
            B10 : '=address(1,1,1,false)', // print in R[1]C[1] style, absolute
            A11 : '=address(1,1,4,true)', // print in A1 style (default)
            A12 : '=address(1,1,4,true,"Sheet2")', // add sheet information
            A13 : '=address(1,1,,,"Sheet2")',
        });
        ss.recalculate(function(){
            ss.expectEqual({
                A4  : "$A$1", B4: "B1",
                A5  : "$A$1",
                A6  : "A$1",
                A7  : "$A1",
                A8  : "A1",
                A9  : "#VALUE!",
                A10 : "R[0]C[0]",
                B10 : "R1C1",
                A11 : "A1",
                A12 : "Sheet2!A1",
                A13 : "Sheet2!$A$1",
            });
        });
    });

    test("AREAS", function(){
        var ss = new Spreadsheet();
        ss.fill({
            A1: '=areas(B2:D4)',
            A2: '=areas((B2:D4,E5,F6:I9))',
            A3: '=areas(B2:D4 B2)',
        });
        ss.recalculate(function(){
            ss.expectEqual({
                A1: 1, A2: 3, A3: 1
            });
        });
    });

    test("CHOOSE", function(){
        ss.fill({
            A4: '=choose(4, "a", "b", "c", "d", "e", "f")',
            A5: '=choose(4, 1, 2)',
            A6: '=choose(0)',
            A7: '=choose(1, "x")',
            A8: '=choose(B1:C2, "a", "b", "c", "d", "e", "f")'
        });
        ss.recalculate(function(){
            ss.expectEqual({
                A4: "d",
                A5: "#N/A!",
                A6: "#VALUE!",
                A7: "x",
            });
            // result of A8 should be a Matrix object
            var m = ss.$("A8");
            equal(m.get(0,0), "b");
            equal(m.get(0,1), "c");
            equal(m.get(1,0), "e");
            equal(m.get(1,1), "f");
        });
    });

    test("COLUMN", function(){
        ss.fill({
            c4: '=column()',
            a4: '=column(d4)',
            a5: '=column(a1:c3)'
        });
        ss.recalculate(function(){
            ss.expectEqual({
                c4: 3,
                a4: 4,
            });
            equal(JSON.stringify(ss.$("a5").data), "[[1,2,3]]");
        });
    });

    test("COLUMNS", function(){
        ss.fill({
            a4: '=columns(A1:C3)',
            a5: '=columns(a1)',
            a6: '=columns({ 1,2; 3,4,5 })'
        });
        ss.recalculate(function(){
            ss.expectEqual({
                a4: 3,
                a5: 1,
                a6: 3
            });
        });
    });

    test("formulatext", function(){
        ss.fill({
            a4: '=sum(a1:c3)',
            b4: '=formulatext(a4)',
            a5: '=areas((b2:d4, e5, f6:i9))',
            b5: '=formulatext(a5)',
        });
        ss.recalculate(function(){
            ss.expectEqual({
                a4: 45, a5: 3,
                b4: 'sum(A1:C3)',
                b5: 'areas((B2:D4,E5,F6:I9))'
            });
        });
    });

    test("hlookup", function(){
        ss.fill({
            a4: '=hlookup(2, a1:c3, 3)',
            a5: '=hlookup(2.5, a1:c3, 3)',
            a6: '=hlookup(2.5, a1:c3, 3, false)',
        });
        ss.recalculate(function(){
            ss.expectEqual({
                a4: 8,
                a5: 8,
                a6: "#N/A!"
            });
        });
    });

    test("index", function(){
        ss.fill({
            a4: '=index(a1:c3, 2, 2)',
            a5: '=index(a1:c3, 2)',
            a6: '=index(a1:c3, , 2)'
        });
        ss.recalculate(function(){
            ss.expectEqual({
                a4: 5,
            });
            equal(JSON.stringify(ss.$("a5").data), "[[4,5,6]]");
            equal(JSON.stringify(ss.$("a6").data), "[[2],[5],[8]]");
        });
    });

    asyncTest("INDIRECT", function(){
        var ss = new Spreadsheet();
        ss.fill({
            A1: 1,
            A2: 2,
            A3: 3,
            B1: "a1",
            C1: "a3",
            A5: "=2 * indirect(\"A\" & ASUM(50, A1:A3))", // 2 * indirect('A6')
            A6: "=asum(100, indirect(b1):indirect(c1))",
        });
        ss.recalculate(function(){
            start();
            equal(ss.getData(ss.makeRef("A5")), 12);
            equal(ss.getData(ss.makeRef("A6")), 6);
        });
    });

    test("MATCH", function(){
        ss.fill({
            a4  : '=match(3, e1:e8)',
            a5  : '=match(3.5, e1:e8)',
            a6  : '=match(3.5, e1:e8, 0)',
            a7  : '=match(4, f1:f8, -1)',
            a8  : '=match("d*", g1:g8, 0)',
            a9  : '=match("dde", g1:g8)',
            a10 : '=match("dde", h1:h8, -1)',
        });
        ss.recalculate(function(){
            ss.expectEqual({
                a4  : 3,
                a5  : 3,
                a6  : "#N/A!",
                a7  : 5,
                a8  : 4,
                a9  : 4,
                a10 : 4
            });
        });
    });

    test("OFFSET", function(){
        var ss = new Spreadsheet();
        ss.fill({
            a1: '=offset(D5, 2, 3, 4, 5)',
            a2: '=offset(d5:f7, -2, -3)',
            a3: '=offset(d5:f7, -2, -4)',
            a4: '=offset(D5, 1, -2)'
        });
        ss.recalculate(function(){
            ss.expectEqual({
                a1: 'G7:K10',
                a2: 'A3:C5',
                a3: '#VALUE!',
                a4: 'B6'
            });
        });
    });

    test("ROW", function(){
        ss.fill({
            c4: '=row()',
            a4: '=row(d1)',
            a5: '=row(a1:c3)'
        });
        ss.recalculate(function(){
            ss.expectEqual({
                c4: 4,
                a4: 1,
            });
            equal(JSON.stringify(ss.$("a5").data), "[[1],[2],[3]]");
        });
    });

    test("ROWS", function(){
        ss.fill({
            a4: '=rows(A1:C3)',
            a5: '=rows(a1)',
            a6: '=rows({ 1,2; 3,4,5 })'
        });
        ss.recalculate(function(){
            ss.expectEqual({
                a4: 3,
                a5: 1,
                a6: 2
            });
        });
    });

    test("TRANSPOSE", function(){
        ss.fill({
            a4: "=transpose(a1:c2)",
            a5: "=transpose({1;2;3})"
        });
        ss.recalculate(function(){
            equal(JSON.stringify(ss.$("a4").data), "[[1,4],[2,5],[3,6]]");
            equal(JSON.stringify(ss.$("a5").data), "[[1,2,3]]");
        });
    });

    test("vlookup", function(){
        ss.fill({
            a4: '=vlookup(4, a1:c3, 3)',
            a5: '=vlookup(4.5, a1:c3, 3)',
            a6: '=vlookup(4.5, a1:c3, 3, false)',
        });
        ss.recalculate(function(){
            ss.expectEqual({
                a4: 6,
                a5: 6,
                a6: "#N/A!"
            });
        });
    });

})();
