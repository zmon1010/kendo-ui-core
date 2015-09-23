(function(){

    var ss;
    var Sheet1 = "Sheet1";

    module("validation parser/evaluator", {
        setup: function() {
            ss = new Spreadsheet();
            ss.fill({
                A1: 1, B1: 2, C1: 3,
                A2: 4, B2: 5, C2: 6,
                A3: 7, B3: 8, C3: 9,
                A4: '=""', B4: '=" "',

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
    var validation = spreadsheet.validation;

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
        onFormula: function(f) {
            var sheet = f.sheet, row = f.row, col = f.col, value = f.value;
            this.maxrow = Math.max(row, this.maxrow);
            this.maxcol = Math.max(col, this.maxcol);
            var cell = this.data[this.id(row, col)];
            if (!cell) {
                this.data[this.id(row, col)] = cell = {};
            }
            cell.value = value;
            return true;
        },
        getRefCells: function(ref) {
            if (ref instanceof spreadsheet.CellRef) {
                var cell = this.get(ref.row, ref.col);
                if (cell) {
                    cell.sheet = Sheet1;
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
                            cell.sheet = Sheet1;
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
            if (ref instanceof spreadsheet.NameRef) {
                return [{
                    value: new spreadsheet.calc.runtime.CalcError("NAME")
                }];
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
            return spreadsheet.calc.parseReference(ref);
        },
        set: function(row, col, val) {
            val += "";
            val = spreadsheet.calc.parse(Sheet1, row, col, val);
            if (val.type == "exp") {
                val = { formula: spreadsheet.calc.compile(val), exp: val };
            }
            this.maxrow = Math.max(row, this.maxrow);
            this.maxcol = Math.max(col, this.maxcol);
            this.data[this.id(row, col)] = val;
        },
        bounds: function() {
            return new spreadsheet.RangeRef(
                new spreadsheet.CellRef(0, 0, 0),
                new spreadsheet.CellRef(this.maxrow, this.maxcol, 0)
            ).setSheet(Sheet1);
        },
        get: function(row, col) {
            return this.data[this.id(row, col)];
        },
        id: function(row, col) {
            return row + ":" + col;
        },
        fill: function(data) {
            var self = this;
            if (typeof data == "string") {
                // alternate syntax.
                var ref = this.makeRef(data).toRangeRef();
                data = arguments[1], i = 0;
                for (var row = ref.topLeft.row; row <= ref.bottomRight.row; ++row) {
                    for (var col = ref.topLeft.col; col <= ref.bottomRight.col; ++col) {
                        if (data instanceof spreadsheet.calc.runtime.Matrix) {
                            self.set(row, col, data.get(row, col));
                        } else {
                            self.set(row, col, data[i++]);
                        }
                    }
                }
                if (arguments.length > 2) {
                    this.fill.apply(this, Array.prototype.slice.call(arguments, 2));
                }
            } else {
                Object.keys(data).forEach(function(key){
                    var ref = self.makeRef(key);
                    self.set(ref.row, ref.col, data[key]);
                });
                if (arguments.length > 1) {
                    this.fill.apply(this, Array.prototype.slice.call(arguments, 1));
                }
            }
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
                cell.formula.exec(self, function(){
                    if (!--count && callback) {
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
                var val = self.$(cell);
                var expected = hash[cell];
                if (expected instanceof APPROX) {
                    if (typeof val != "number") {
                        val = parseFloat(val);
                    }
                    ok(Math.abs(val - expected.val) < expected.eps);
                    if (!(Math.abs(val - expected.val) < expected.eps)) {
                        console.log(val, expected.val);
                    }
                } else {
                    equal(val, expected);
                }
            });
        }
    });

    /* -----[ validation tests ]----- */

    test("validation parse greaterThan", function(){
        var exp = validation.parse(Sheet1, 0, 0, {
            from: "A1",
            //to: "",
            comparerType: "greaterThan",
            dataType: "date"
        });

        hasProps(exp, {
            comparerType: "greaterThan",
            dataType: "date",
            from: {
                type: "exp",
                ast: {
                    type: "ref",
                    ref: "cell",
                    sheet: Sheet1,
                    row: 0,
                    col: 0,
                    rel: 3
                }
            }
        });
    });

    test("validation parse between", function(){
        var exp = validation.parse(Sheet1, 0, 0, {
            from: "A2",
            to: "A3",
            comparerType: "between",
            dataType: "date"
        });

        hasProps(exp, {
            comparerType: "between",
            dataType: "date",
            from: {
                type: "exp",
                ast: {
                    type: "ref",
                    ref: "cell",
                    sheet: Sheet1,
                    row: 1,
                    col: 0,
                    rel: 3
                }
            },
            to: {
                type: "exp",
                ast: {
                    type: "ref",
                    ref: "cell",
                    sheet: Sheet1,
                    row: 2,
                    col: 0,
                    rel: 3
                }
            }
        });
    });

    test("validation exec calls exec of nested functions as well and execute passed callback", 3, function(){
        var exp = validation.parse(Sheet1, 0, 0, {
            from: "A2",
            to: "A3",
            comparerType: "between",
            dataType: "date"
        });

        var validationCallback = function(e) {
            ok(true);
        };

        var f = validation.compile(exp);

        f.from.exec = function(e, callback) {
            ok(true);
            callback();
        };

        f.to.exec = function(e, callback) {
            ok(true);
            callback();
        };

        f.exec(ss, 10, "m/d/yyyy", validationCallback);
    });

    test("validation exec call without compare values executes nested functions without error", 2, function(){
        var exp = validation.parse(Sheet1, 0, 0, {
            from: "A2",
            to: "A3",
            comparerType: "between",
            dataType: "date"
        });

        var f = validation.compile(exp);

        f.from.exec = function(e, callback) {
            ok(true);
            callback();
        };

        f.to.exec = function(e, callback) {
            ok(true);
            callback();
        };

        f.exec(ss);
    });

    test("validation initializes nested functions correctly", function(){
        var exp = validation.parse(Sheet1, 0, 0, {
            from: "A2",
            to: "A3",
            comparerType: "between",
            dataType: "date"
        });

        var f = validation.compile(exp);

        ok(f.from instanceof spreadsheet.calc.runtime.Formula);
        ok(f.to instanceof spreadsheet.calc.runtime.Formula);
    });

    test("validation toJSON exports JSON object", function(){
        var customOptions = {
            from: "A2",
            to: "A3",
            comparerType: "between",
            dataType: "date",
            type: "reject",
            tooltipTitleTemplate: "tooltipTitle",
            tooltipMessageTemplate: "tooltipMessage",
            messageTemplate: "Custom message",
            titleTemplate: "CustomTitle"
        };
        var exp = validation.parse(Sheet1, 0, 0, $.extend({}, customOptions));

        var f = validation.compile(exp);

        var parsedOutput = f.toJSON();

        equal(parsedOutput.from, customOptions.from);
        equal(parsedOutput.to, customOptions.to);
        equal(parsedOutput.comparerType, customOptions.comparerType);
        equal(parsedOutput.dataType, customOptions.dataType);
        equal(parsedOutput.type, customOptions.type);
        equal(parsedOutput.tooltipTitleTemplate, customOptions.tooltipTitleTemplate);
        equal(parsedOutput.tooltipMessageTemplate, customOptions.tooltipMessageTemplate);
        equal(parsedOutput.messageTemplate, customOptions.messageTemplate);
        equal(parsedOutput.titleTemplate, customOptions.titleTemplate);
    });

    test("validation type is set to warning by default", function(){
        var customOptions = {
            from: "A2",
            to: "A3",
            comparerType: "between",
            dataType: "date"
        };
        var exp = validation.parse(Sheet1, 0, 0, $.extend({}, customOptions));

        var f = validation.compile(exp);

        var parsedOutput = f.toJSON();

        equal(parsedOutput.type, "warning");
    });

    test("validation default messages are set", function(){
        var customOptions = {
            from: "A2",
            to: "A3",
            comparerType: "between",
            dataType: "date",
            type: "reject"
        };

        var exp = validation.parse(Sheet1, 0, 0, $.extend({}, customOptions));

        var f = validation.compile(exp);

        var validationCallback = function(result) {
            equal(f.tooltipTitle, undefined);
            equal(f.tooltipMessage, undefined);
            equal(f.message, "Please enter a valid date value between 4 and 7.");
            equal(f.title, "Validation reject");
        };

        f.exec(ss, 2, "m/d/yyyy", validationCallback);
    });

    test("validation default messages are set when custom comparer is used", function(){
        var customOptions = {
            from: "A2",
            comparerType: "custom",
            dataType: "date",
            type: "reject",
            allowNulls: false
        };

        var exp = validation.parse(Sheet1, 0, 0, $.extend({}, customOptions));

        var f = validation.compile(exp);

        var validationCallback = function(result) {
            equal(f.tooltipTitle, undefined);
            equal(f.tooltipMessage, undefined);
            equal(f.message, "Please enter a valid date value that satisfies the formula: A2.");
            equal(f.title, "Validation reject");
        };

        f.exec(ss, null, "m/d/yyyy", validationCallback);
    });

    test("validation adjust modify both the validation ref and the nested formulas", 5, function(){
        var customOptions = {
            from: "Sheet1!A2",
            to: "Sheet1!A3",
            comparerType: "between",
            dataType: "date",
            type: "reject"
        };

        debugger;

        var exp = validation.parse(Sheet1, 0, 0, $.extend({}, customOptions));
        var f = validation.compile(exp);

        f.adjust("Sheet1","row", 0, 1);

        var validationCallback = function(result) {
            equal(f.row, 1);
            equal(f.from.row, 1);
            equal(f.to.row, 1);
            equal(f.from.absrefs[0].row, 2);
            equal(f.to.absrefs[0].row, 3);
        };

        f.exec(ss, 2, "m/d/yyyy", validationCallback);
    });

    test("validation reset modify both the validation and the nested formulas", 5, function(){
        var customOptions = {
            from: "Sheet1!A2",
            to: "Sheet1!A3",
            comparerType: "between",
            dataType: "date",
            type: "reject"
        };

        var exp = validation.parse(Sheet1, 0, 0, $.extend({}, customOptions));

        var f = validation.compile(exp);

        f.adjust("row", 0, 1);

        var validationCallback = function(result) {
            f.pending = true;

            f.from.reset = function () {
                ok(true);
            };

            f.to.reset = function () {
                ok(true);
            };

            f.reset();

            equal(f.onReady.length, 0);
            equal(f.value, undefined);
            equal(f.pending, false);
        };

        f.exec(ss, 2, "m/d/yyyy", validationCallback);
    });

    test("validation clone is working as expected", 9, function(){
        var customOptions = {
            from: "Sheet1!A2",
            to: "Sheet1!A3",
            comparerType: "between",
            dataType: "date",
            type: "reject",
            allowNulls: true
        };

        var exp = validation.parse(Sheet1, 0, 0, $.extend({}, customOptions));

        var f = validation.compile(exp);

        var newFormula = f.clone("Sheet2", 1, 1);

        equal(newFormula.handler, f.handler);
        equal(newFormula.row, 1);
        equal(newFormula.col, 1);
        equal(newFormula.type, customOptions.type);

        equal(newFormula.from.row, 1);
        equal(newFormula.from.col, 1);
        equal(newFormula.to.row, 1);
        equal(newFormula.to.col, 1);
        equal(newFormula.allowNulls, true);
    });

    test("validation allow null values when allowNulls is set to true", 1, function(){
        var exp = validation.parse(Sheet1, 0, 0, {
            from: "A2",
            to: "A3",
            comparerType: "between",
            dataType: "date",
            allowNulls: true
        });

        var validationCallback = function(result) {
            ok(result);
        };

        var f = validation.compile(exp);

        f.from.exec = function(e, callback) {
            f.from.value = 1;
            callback(1);
        };

        f.to.exec = function(e, callback) {
            f.to.value = 3;
            callback(3);
        };

        f.exec(ss, null, "m/d/yyyy", validationCallback);
    });

    test("validation does not allow null values by default", 1, function(){
        var exp = validation.parse(Sheet1, 0, 0, {
            from: "A2",
            to: "A3",
            comparerType: "between",
            dataType: "date"
        });

        var validationCallback = function(result) {
            ok(!result);
        };

        var f = validation.compile(exp);

        f.from.exec = function(e, callback) {
            f.from.value = 1;
            callback(1);
        };

        f.to.exec = function(e, callback) {
            f.to.value = 3;
            callback(3);
        };

        f.exec(ss, null, "m/d/yyyy", validationCallback);
    });

    test("validation compare values between correctly", 1, function(){
        var exp = validation.parse(Sheet1, 0, 0, {
            from: "A2",
            to: "A3",
            comparerType: "between",
            dataType: "date"
        });

        var validationCallback = function(result) {
            ok(result);
        };

        var f = validation.compile(exp);

        f.from.exec = function(e, callback) {
            f.from.value = 1;
            callback(1);
        };

        f.to.exec = function(e, callback) {
            f.to.value = 3;
            callback(3);
        };

        f.exec(ss, 2, "m/d/yyyy", validationCallback);
    });

    test("validation compare values greaterThan correctly", 1, function(){
        var exp = validation.parse(Sheet1, 0, 0, {
            from: "A2",
            comparerType: "greaterThan",
            dataType: "date"
        });

        var validationCallback = function(result) {
            ok(result);
        };

        var f = validation.compile(exp);

        f.from.exec = function(e, callback) {
            f.from.value = 1;
            callback(1);
        };

        f.exec(ss, 2, "m/d/yyyy", validationCallback);
    });

    test("validation compare values lessThan correctly", 1, function(){
        var exp = validation.parse(Sheet1, 0, 0, {
            from: "A2",
            comparerType: "lessThan",
            dataType: "date"
        });

        var validationCallback = function(result) {
            ok(result);
        };

        var f = validation.compile(exp);

        f.from.exec = function(e, callback) {
            f.from.value = 2;
            callback(2);
        };

        f.exec(ss, 1, "m/d/yyyy", validationCallback);
    });

    test("validation compare values equalTo correctly", 1, function(){
        var exp = validation.parse(Sheet1, 0, 0, {
            from: "A2",
            comparerType: "equalTo",
            dataType: "date"
        });

        var validationCallback = function(result) {
            ok(result);
        };

        var f = validation.compile(exp);

        f.from.exec = function(e, callback) {
            f.from.value = 2;
            callback(2);
        };

        f.exec(ss, 2, "m/d/yyyy", validationCallback);
    });

    test("validation compare values notEqualTo correctly", 1, function(){
        var exp = validation.parse(Sheet1, 0, 0, {
            from: "A2",
            comparerType: "notEqualTo",
            dataType: "date"
        });

        var validationCallback = function(result) {
            ok(result);
        };

        var f = validation.compile(exp);

        f.from.exec = function(e, callback) {
            f.from.value = 2;
            callback(2);
        };

        f.exec(ss, 21321321, "m/d/yyyy", validationCallback);
    });

    test("validation compare values greaterThanOrEqualTo correctly", 2, function(){
        var firstExecute = true;
        var exp = validation.parse(Sheet1, 0, 0, {
            from: "A2",
            comparerType: "greaterThanOrEqualTo",
            dataType: "date"
        });

        var validationCallback = function(result) {
            ok(result);
            if (firstExecute) {

                firstExecute = false;
                f.reset();

                f.exec(ss, 2, "m/d/yyyy", validationCallback);
            }
        };

        var f = validation.compile(exp);

        f.from.exec = function(e, callback) {
            f.from.value = 2;
            callback(2);
        };

        f.exec(ss, 23, "m/d/yyyy", validationCallback);

    });

    test("validation compare values lessThanOrEqualTo correctly", 2, function(){
        var firstExecute = true;
        var exp = validation.parse(Sheet1, 0, 0, {
            from: "A2",
            comparerType: "lessThanOrEqualTo",
            dataType: "date"
        });

        var validationCallback = function(result) {
            ok(result);
            if (firstExecute) {

                firstExecute = false;
                f.reset();

                f.exec(ss, 2, "m/d/yyyy", validationCallback);
            }
        };

        var f = validation.compile(exp);

        f.from.exec = function(e, callback) {
            f.from.value = 2;
            callback(2);
        };

        f.exec(ss, 1, "m/d/yyyy", validationCallback);
    });

    test("validation compare values notBetween correctly", 2, function(){
        var firstExecute = true;
        var exp = validation.parse(Sheet1, 0, 0, {
            from: "A2",
            to: "A3",
            comparerType: "notBetween",
            dataType: "date"
        });

        var validationCallback = function(result) {
            ok(result);
            if (firstExecute) {

                firstExecute = false;
                f.reset();

                f.exec(ss, 4, "m/d/yyyy", validationCallback);
            }
        };

        var f = validation.compile(exp);

        f.from.exec = function(e, callback) {
            f.from.value = 1;
            callback(1);
        };

        f.to.exec = function(e, callback) {
            f.to.value = 3;
            callback(3);
        };

        f.exec(ss, 0, "m/d/yyyy", validationCallback);
    });

    test("validation compare values custom comparer correctly", 1, function(){
        var forumulaResult = true;

        var exp = validation.parse(Sheet1, 0, 0, {
            from: "ISODD(5)",
            comparerType: "custom",
            allowNulls: false
        });

        var validationCallback = function(result) {
            ok(result);
        };

        var f = validation.compile(exp);

        f.from.exec = function(e, callback) {
            f.from.value = forumulaResult;
            callback(forumulaResult);
        };

        f.exec(ss, null, "m/d/yyyy", validationCallback);
    });

})();
