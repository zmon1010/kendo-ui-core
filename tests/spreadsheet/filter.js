(function() {
    var sheet;
    var ValueFilter = kendo.spreadsheet.ValueFilter;
    var CustomFilter = kendo.spreadsheet.CustomFilter;
    var TopFilter = kendo.spreadsheet.TopFilter;
    var filter;

    var defaults = kendo.ui.Spreadsheet.prototype.options;

    module("filter");

    test("creates value filter", function() {
        var filter = kendo.spreadsheet.Filter.create({ type: "value", values: [1, 2] });

        ok(filter instanceof ValueFilter);
        equal(filter.values.length, 2);
        equal(filter.values[0], 1);
        equal(filter.values[1], 2);
    });

    test("creates custom filter", function() {
        var filter = kendo.spreadsheet.Filter.create({ type: "custom", criteria: [{ operator: "eq", value: "foo" }] });

        ok(filter instanceof CustomFilter);
        equal(filter.criteria[0].operator, "eq");
        equal(filter.criteria[0].value, "foo");
    });

    test("create throws error if type is not specified", 1, function() {
        try {

            kendo.spreadsheet.Filter.create({ });
        } catch(e) {
            equal(e.message, "Filter type not specified.");
        }
    });

    test("create throws error if unknown type is specified", 1, function() {
        try {
            kendo.spreadsheet.Filter.create({ type: "foo" });
        } catch(e) {
            equal(e.message, "Filter type not recognized.");
        }
    });

    module("value filter", {
        setup: function() {
            sheet = new kendo.spreadsheet.Sheet(defaults.rows, defaults.columns,
                defaults.rowHeight, defaults.columnWidth);
        }
    });

   test("returns true for known values", function() {
        filter = new ValueFilter({
            values: [1, 2]
        });

        equal(filter.matches(1), true);
        equal(filter.matches(2), true);
    });

    test("returns false for unknown values", function() {
        filter = new ValueFilter({
            values: [1, 2]
        });

        equal(filter.matches(3), false);
        equal(filter.matches(4), false);
    });

    test("returns false for null values", function() {
        filter = new ValueFilter({
        });

        equal(filter.matches(null), false);
    });

    test("returns true for null values if blanks is set to true", function() {
        filter = new ValueFilter({
            blanks: true
        });

        equal(filter.matches(null), true);
    });

    test("returns true for dates that are from the same year", function() {
        filter = new ValueFilter({
            dates: [
                {
                    year: 1999
                },
                {
                    year: 2000
                }
            ]
        });

        equal(filter.matches(new Date("1/1/1999")), true);
        equal(filter.matches(new Date("3/3/1999")), true);
        equal(filter.matches(new Date("3/3/2000")), true);
        equal(filter.matches(new Date("1/1/2001")), false);
    });

    test("returns true for dates that are from the same year and month", function() {
        filter = new ValueFilter({
            dates: [
                {
                    year: 1999,
                    month: 0
                }
            ]
        });

        equal(filter.matches(new Date("1/1/1999")), true);
        equal(filter.matches(new Date("2/1/1999")), false);
    });

    test("returns true for dates that are from the same year month and day", function() {
        filter = new ValueFilter({
            dates: [
                {
                    year: 1999,
                    month: 0,
                    day: 2
                }
            ]
        });

        equal(filter.matches(new Date("1/1/1999")), false);
        equal(filter.matches(new Date("1/2/1999")), true);
    });

    test("returns true for dates that are from the same year month day and hour", function() {
        filter = new ValueFilter({
            dates: [
                {
                    year: 1999,
                    month: 0,
                    day: 2,
                    hours: 13
                }
            ]
        });

        equal(filter.matches(new Date("1/2/1999 13:00")), true);
        equal(filter.matches(new Date("1/2/1999 14:00")), false);
    });

    test("returns true for dates that are from the same year month day hour and minute", function() {
        filter = new ValueFilter({
            dates: [
                {
                    year: 1999,
                    month: 0,
                    day: 2,
                    hours: 13,
                    minutes: 53
                }
            ]
        });

        equal(filter.matches(new Date("1/2/1999 13:52")), false);
        equal(filter.matches(new Date("1/2/1999 13:53")), true);
    });

    test("returns true for dates that are from the same year month day hour minute and second", function() {
        filter = new ValueFilter({
            dates: [
                {
                    year: 1999,
                    month: 0,
                    day: 2,
                    hours: 13,
                    minutes: 52,
                    seconds: 23
                }
            ]
        });

        equal(filter.matches(new Date("1/2/1999 13:52:23")), true);
        equal(filter.matches(new Date("1/2/1999 13:52:22")), false);
    });

    module("custom filter", {
        setup: function() {
            sheet = new kendo.spreadsheet.Sheet(defaults.rows, defaults.columns,
                defaults.rowHeight, defaults.columnWidth);
        }
    });

    test("returns false for null values", function() {
        filter = new CustomFilter({
            criteria: [
                { operator: "eq", value: 1}
            ]
        });

        equal(filter.matches(null), false);
    });

    test("multiple criteria", function() {
        filter = new CustomFilter({
            logic: "or",
            criteria: [
                { operator: "eq", value: 1},
                { operator: "eq", value: 2},
                { operator: "eq", value: 3}
            ]
        });

        equal(filter.matches(1), true);
        equal(filter.matches(2), true);
        equal(filter.matches(3), true);
        equal(filter.matches(4), false);
    });

    test("number equals", function() {
        filter = new CustomFilter({
            criteria: [
                { operator: "eq", value: 1}
            ]
        });

        equal(filter.matches(1), true);
        equal(filter.matches(2), false);
    });

    test("number does not equal", function() {
        filter = new CustomFilter({
            criteria: [
                { operator: "neq", value: 1}
            ]
        });

        equal(filter.matches(1), false);
        equal(filter.matches(2), true);
    });

    test("number greater than", function() {
        filter = new CustomFilter({
            criteria: [
                { operator: "gt", value: 1}
            ]
        });

        equal(filter.matches(1), false);
        equal(filter.matches(2), true);
    });

    test("number greater than or equal to", function() {
        filter = new CustomFilter({
            criteria: [
                { operator: "gte", value: 1}
            ]
        });

        equal(filter.matches(0), false);
        equal(filter.matches(1), true);
        equal(filter.matches(2), true);
    });

    test("number less than", function() {
        filter = new CustomFilter({
            criteria: [
                { operator: "lt", value: 1}
            ]
        });

        equal(filter.matches(1), false);
        equal(filter.matches(0), true);
    });

    test("number less than or equal to", function() {
        filter = new CustomFilter({
            criteria: [
                { operator: "lte", value: 1}
            ]
        });

        equal(filter.matches(2), false);
        equal(filter.matches(1), true);
        equal(filter.matches(0), true);
    });

    test("date equals", function() {
        filter = new CustomFilter({
            criteria: [
                { operator: "eq", value: new Date("1/1/1990")}
            ]
        });

        equal(filter.matches(new Date("1/1/1990")), true);
        equal(filter.matches(new Date("1/1/1990 1:00")), false);
    });

    test("date does not equal", function() {
        filter = new CustomFilter({
            criteria: [
                { operator: "neq", value: new Date("1/1/1990")}
            ]
        });

        equal(filter.matches(new Date("1/1/1990")), false);
        equal(filter.matches(new Date("1/1/1991")), true);
    });

    test("date greater than", function() {
        filter = new CustomFilter({
            criteria: [
                { operator: "gt", value: new Date("1/1/1990")}
            ]
        });

        equal(filter.matches(new Date("1/1/1990")), false);
        equal(filter.matches(new Date("1/1/1990 1:00")), true);
    });

    test("date greater than or equal to", function() {
        filter = new CustomFilter({
            criteria: [
                { operator: "gte", value: new Date("1/1/1990") }
            ]
        });

        equal(filter.matches(new Date("1/1/1989")), false);
        equal(filter.matches(new Date("1/1/1990")), true);
        equal(filter.matches(new Date("1/1/1990 1:00")), true);
    });

    test("number less than", function() {
        filter = new CustomFilter({
            criteria: [
                { operator: "lt", value: new Date("1/1/1990")}
            ]
        });

        equal(filter.matches(new Date("1/1/1990")), false);
        equal(filter.matches(new Date("1/1/1989")), true);
    });

    test("number less than or equal to", function() {
        filter = new CustomFilter({
            criteria: [
                { operator: "lte", value: new Date("1/1/1990")}
            ]
        });

        equal(filter.matches(new Date("1/1/1990 1:00")), false);
        equal(filter.matches(new Date("1/1/1990")), true);
        equal(filter.matches(new Date("1/1/1989")), true);
    });

    test("string equals", function() {
        filter = new CustomFilter({
            criteria: [
                { operator: "eq", value: "foo"}
            ]
        });

        equal(filter.matches("foo"), true);
        equal(filter.matches("FOO"), true);
        equal(filter.matches("bar"), false);
    });

    test("string begins with", function() {
        filter = new CustomFilter({
            criteria: [
                { operator: "startswith", value: "foo"}
            ]
        });

        equal(filter.matches("foo"), true);
        equal(filter.matches("Fooo"), true);
        equal(filter.matches("foobar"), true);
        equal(filter.matches("bar"), false);
    });

    test("string does not begin with", function() {
        filter = new CustomFilter({
            criteria: [
                { operator: "doesnotstartwith", value: "foo"}
            ]
        });

        equal(filter.matches("foo"), false);
        equal(filter.matches("Fooo"), false);
        equal(filter.matches("foobar"), false);
        equal(filter.matches("bar"), true);
    });

    test("string ends with", function() {
        filter = new CustomFilter({
            criteria: [
                { operator: "endswith", value: "foo"}
            ]
        });

        equal(filter.matches("foo"), true);
        equal(filter.matches("Foo"), true);
        equal(filter.matches("foobar"), false);
        equal(filter.matches("bar"), false);
    });

    test("string does not end with", function() {
        filter = new CustomFilter({
            criteria: [
                { operator: "doesnotendwith", value: "foo"}
            ]
        });

        equal(filter.matches("foo"), false);
        equal(filter.matches("Foo"), false);
        equal(filter.matches("foobar"), true);
        equal(filter.matches("bar"), true);
    });

    module("top filter");

    test("top number matches the top X values", function() {
        filter = new TopFilter({ kind: "topNumber", value: 2 });

        filter.prepare([
            1, 10, 2, 4
        ]);

        equal(filter.matches(2), false);
        equal(filter.matches(3), false);
        equal(filter.matches(4), true);
        equal(filter.matches(10), true);
        equal(filter.matches(11), false);
    });

    test("bottom number matches the bottom X values", function() {
        filter = new TopFilter({ kind: "bottomNumber", value: 2 });

        filter.prepare([
            1, 10, 2, 4
        ]);

        equal(filter.matches(0), false);
        equal(filter.matches(2), true);
        equal(filter.matches(1), true);
        equal(filter.matches(3), false);
        equal(filter.matches(4), false);
        equal(filter.matches(10), false);
    });

    test("top percent matches the top X percent ", function() {
        filter = new TopFilter({ kind: "topPercent", value: 25 });

        filter.prepare([
            1, 10, 2, 4
        ]);

        equal(filter.matches(1), false);
        equal(filter.matches(2), false);
        equal(filter.matches(3), false);
        equal(filter.matches(4), false);
        equal(filter.matches(10), true);
        equal(filter.matches(11), false);
    });

    test("bottom percent matches the bottom X percent ", function() {
        filter = new TopFilter({ kind: "bottomPercent", value: 25 });

        filter.prepare([
            1, 10, 2, 4
        ]);

        equal(filter.matches(1), true);
        equal(filter.matches(2), false);
        equal(filter.matches(3), false);
        equal(filter.matches(4), false);
        equal(filter.matches(10), false);
        equal(filter.matches(11), false);
    });
})();
