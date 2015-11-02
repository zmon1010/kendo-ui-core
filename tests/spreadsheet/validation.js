(function(){

    var ss;
    var Sheet1 = "Sheet1";
    var Spreadsheet = kendo.TEST_SpreadsheetData;

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

    /* -----[ validation tests ]----- */
    test("validation exec executes passed callback", 1, function(){
        var validationCallback = function(e) {
            ok(true);
        };

        var f = validation.compile(Sheet1, 0, 0, {
            from: "A2",
            to: "A3",
            comparerType: "between",
            dataType: "date"
        });

        f.exec(ss, 10, "m/d/yyyy", validationCallback);
    });

    test("validation initializes nested functions correctly", function(){
        var f = validation.compile(Sheet1, 0, 0, {
            from: "A2",
            to: "A3",
            comparerType: "between",
            dataType: "date"
        });

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

        var f = validation.compile(Sheet1, 0, 0, $.extend({}, customOptions));

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

        var f = validation.compile(Sheet1, 0, 0, $.extend({}, customOptions));

        var parsedOutput = f.toJSON();

        equal(parsedOutput.type, "warning");
    });

    test("validation no default messages are set", function(){
        var customOptions = {
            from: "A2",
            to: "A3",
            comparerType: "between",
            dataType: "date",
            type: "reject"
        };

        var f = validation.compile(Sheet1, 0, 0, $.extend({}, customOptions));

        var validationCallback = function(result) {
            equal(f.tooltipTitle, undefined);
            equal(f.tooltipMessage, undefined);
            equal(f.message, "");
            equal(f.title, "");
        };

        f.exec(ss, 2, "m/d/yyyy", validationCallback);
    });

    test("validation messages are formatted correctly", function(){
        var customOptions = {
            from: "A2",
            to: "A3",
            comparerType: "between",
            dataType: "date",
            type: "reject",
            messageTemplate: "{0}{1}{2}{3}{4}{5}{6}{7}"
        };

        var f = validation.compile(Sheet1, 0, 0, $.extend({}, customOptions));

        var validationCallback = function(result) {
            equal(f.message, "47A2A3daterejectbetween");
        };

        f.exec(ss, 2, "m/d/yyyy", validationCallback);
    });

    test("validation adjust modify both the validation ref and the nested formulas", 5, function(){
        var customOptions = {
            from: "Sheet1!A2",
            to: "Sheet1!A3",
            comparerType: "between",
            dataType: "date",
            type: "reject"
        };

        var f = validation.compile(Sheet1, 0, 0, $.extend({}, customOptions));

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

    test("validation reset modify both the validation and the nested formulas", 3, function(){
        var customOptions = {
            from: "Sheet1!A2",
            to: "Sheet1!A3",
            comparerType: "between",
            dataType: "date",
            type: "reject"
        };

        var f = validation.compile(Sheet1, 0, 0, $.extend({}, customOptions));

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

            equal(f.value, undefined);
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

        var f = validation.compile(Sheet1, 0, 0, $.extend({}, customOptions));

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
        var validationCallback = function(result) {
            ok(result);
        };

        var f = validation.compile(Sheet1, 0, 0, {
            from: "A2",
            to: "A3",
            comparerType: "between",
            dataType: "date",
            allowNulls: true
        });

        f.exec(ss, null, "m/d/yyyy", validationCallback);
    });

    test("validation does not allow null values by default", 1, function(){
        var validationCallback = function(result) {
            ok(!result);
        };

        var f = validation.compile(Sheet1, 0, 0, {
            from: "A2",
            to: "A3",
            comparerType: "between",
            dataType: "date"
        });

        f.exec(ss, null, "m/d/yyyy", validationCallback);
    });

    test("validation compare values between correctly", 1, function(){
        var validationCallback = function(result) {
            ok(result);
        };

        var f = validation.compile(Sheet1, 0, 0, {
            from: "A2",
            to: "A3",
            comparerType: "between",
            dataType: "date"
        });

        f.exec(ss, 5, "m/d/yyyy", validationCallback);
    });

    test("validation compare values greaterThan correctly", 1, function(){
        var validationCallback = function(result) {
            ok(result);
        };

        var f = validation.compile(Sheet1, 0, 0, {
            from: "A1",
            comparerType: "greaterThan",
            dataType: "date"
        });

        f.exec(ss, 2, "m/d/yyyy", validationCallback);
    });

    test("validation compare values lessThan correctly", 1, function(){
        var validationCallback = function(result) {
            ok(result);
        };

        var f = validation.compile(Sheet1, 0, 0, {
            from: "B1",
            comparerType: "lessThan",
            dataType: "date"
        });

        f.exec(ss, 1, "m/d/yyyy", validationCallback);
    });

    test("validation compare values equalTo correctly", 1, function(){
        var validationCallback = function(result) {
            ok(result);
        };

        var f = validation.compile(Sheet1, 0, 0, {
            from: "B1",
            comparerType: "equalTo",
            dataType: "date"
        });

        f.exec(ss, 2, "m/d/yyyy", validationCallback);
    });

    test("validation compare values notEqualTo correctly", 1, function(){
        var validationCallback = function(result) {
            ok(result);
        };

        var f = validation.compile(Sheet1, 0, 0, {
            from: "B1",
            comparerType: "notEqualTo",
            dataType: "date"
        });

        f.exec(ss, 21321321, "m/d/yyyy", validationCallback);
    });

    test("validation compare values greaterThanOrEqualTo correctly", 2, function(){
        var firstExecute = true;
        var validationCallback = function(result) {
            ok(result);
            if (firstExecute) {

                firstExecute = false;
                f.reset();

                f.exec(ss, 2, "m/d/yyyy", validationCallback);
            }
        };

        var f = validation.compile(Sheet1, 0, 0, {
            from: "B1",
            comparerType: "greaterThanOrEqualTo",
            dataType: "date"
        });

        f.exec(ss, 23, "m/d/yyyy", validationCallback);
    });

    test("validation compare values lessThanOrEqualTo correctly", 2, function(){
        var firstExecute = true;

        var validationCallback = function(result) {
            ok(result);
            if (firstExecute) {

                firstExecute = false;
                f.reset();

                f.exec(ss, 2, "m/d/yyyy", validationCallback);
            }
        };

        var f = validation.compile(Sheet1, 0, 0, {
            from: "B1",
            comparerType: "lessThanOrEqualTo",
            dataType: "date"
        });

        f.exec(ss, 1, "m/d/yyyy", validationCallback);
    });

    test("validation compare values notBetween correctly", 2, function(){
        var firstExecute = true;

        var validationCallback = function(result) {
            ok(result);
            if (firstExecute) {

                firstExecute = false;
                f.reset();

                f.exec(ss, 4, "m/d/yyyy", validationCallback);
            }
        };

        var f = validation.compile(Sheet1, 0, 0, {
            from: "A1",
            to: "B3",
            comparerType: "notBetween",
            dataType: "date"
        });

        f.exec(ss, 0, "m/d/yyyy", validationCallback);
    });

    test("validation compare values custom comparer correctly", 1, function(){
        var validationCallback = function(result) {
            ok(result);
        };

        var f = validation.compile(Sheet1, 0, 0, {
            from: "ISODD(5)",
            dataType: "custom",
            allowNulls: false
        });

        f.exec(ss, null, null, validationCallback);
    });

    test("validation compare null value with custom comparer correctly", function(){
        var validationCallback = function(result) {
            ok(!result);
        };

        var f = validation.compile(Sheet1, 0, 0, {
            from: "ISODD(6)",
            dataType: "custom",
            allowNulls: true
        });

        f.exec(ss, null, null, validationCallback);
    });

})();
