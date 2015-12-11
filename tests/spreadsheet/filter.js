(function() {
    var ValueFilter = kendo.spreadsheet.ValueFilter;
    var CustomFilter = kendo.spreadsheet.CustomFilter;
    var DynamicFilter = kendo.spreadsheet.DynamicFilter;
    var TopFilter = kendo.spreadsheet.TopFilter;
    var filter;

    var defaults = kendo.ui.Spreadsheet.prototype.options;

    module("filter");

    test("creates value filter", function() {
        var filter = kendo.spreadsheet.Filter.create({ filter: "value" });

        ok(filter instanceof ValueFilter);
    });

    test("creates custom filter", function() {
        var filter = kendo.spreadsheet.Filter.create({ filter: "custom", criteria: [{ operator: "eq", value: "foo" }] });

        ok(filter instanceof CustomFilter);
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
            kendo.spreadsheet.Filter.create({ filter: "foo" });
        } catch(e) {
            equal(e.message, "Filter type not recognized.");
        }
    });

    module("value filter");

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

    test("value returns Date object if dates are specified", function() {
        filter = new ValueFilter({
            dates: [
                {
                    year: 1999
                }
            ]
        });

        ok(filter.value({ value: 1, format: "m/d/yyyy" }) instanceof Date);
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

    module("custom filter");

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

    function cell(value) {
        return { value: value };
    }

    test("number contains string", function() {
        filter = new CustomFilter({
            criteria: [
                { operator: "contains", value: "10" }
            ]
        });

        equal(filter.matches(filter.value(cell(100))), true);
        equal(filter.matches(filter.value(cell(200))), false);
        equal(filter.matches(filter.value(cell(210))), true);
    });

    test("date contains string", function() {
        filter = new CustomFilter({
            criteria: [
                { operator: "contains", value: "10" }
            ]
        });

        equal(filter.matches(filter.value({ value: 1, format: "m/d/yyyy" })), false);
        equal(filter.matches(filter.value({ value: 11, format: "m/d/yyyy" })), true);
    });

    test("formatted number contains string", function() {
        filter = new CustomFilter({
            criteria: [
                { operator: "contains", value: "10" }
            ]
        });

        equal(filter.matches(filter.value({ value: 2100, format: "$??.00" })), true);
        equal(filter.matches(filter.value({ value: 2099, format: "$??.00" })), false);
    });

    test("formatted number startswith string", function() {
        filter = new CustomFilter({
            criteria: [
                { operator: "contains", value: "$" }
            ]
        });

        equal(filter.matches(filter.value({ value: 2100, format: "$??.00" })), true);
        equal(filter.matches(filter.value({ value: 2099 })), false);
    });

    test("number does not match string/date values", function() {
        filter = new CustomFilter({
            criteria: [
                { operator: "eq", value: 10 }
            ]
        });

        equal(filter.matches(filter.value(cell(10))), true);
        equal(filter.matches(filter.value(cell("foo"))), false);
        equal(filter.matches(filter.value({ value: 11, format: "m/d/yyyy" })), false);
    });

    test("date does not match string/number values", function() {
        filter = new CustomFilter({
            criteria: [
                { operator: "eq", value: 11, format: "m/d/yyyy" }
            ]
        });

        equal(filter.matches(filter.value(cell(10))), false);
        equal(filter.matches(filter.value(cell("foo"))), false);
        equal(filter.matches(filter.value({ value: 11, format: "m/d/yyyy" })), true);
    });

    test("date filter matches formatted numbers", function() {
        var date = kendo.spreadsheet.dateToNumber(new Date("1/1/2001"));
        filter = new CustomFilter({
            criteria: [
                { operator: "eq", value: new Date("1/1/2001") }
            ]
        });

        equal(filter.matches(filter.value({ value: date, format: "m/d/yyyy" })), true);
        equal(filter.matches(filter.value({ value: date+1, format: "m/d/yyyy" })), false);
    });

    module("top filter");

    test("top number matches the top X values", function() {
        filter = new TopFilter({ type: "topNumber", value: 2 });

        filter.prepare([
            { value: 1 },
            { value: 10 },
            { value: 2 },
            { value: 4 }
        ]);

        equal(filter.matches(2), false);
        equal(filter.matches(3), false);
        equal(filter.matches(4), true);
        equal(filter.matches(10), true);
        equal(filter.matches(11), false);
    });

    test("top number ignores duplicates", function() {
        filter = new TopFilter({ type: "topNumber", value: 2 });

        filter.prepare([
            { value: 1 },
            { value: 10 },
            { value: 2 },
            { value: 4 }
        ]);

        equal(filter.matches(2), false);
        equal(filter.matches(3), false);
        equal(filter.matches(4), true);
        equal(filter.matches(10), true);
        equal(filter.matches(11), false);
    });

    test("bottom number matches the bottom X values", function() {
        filter = new TopFilter({ type: "bottomNumber", value: 2 });

        filter.prepare([
            { value: 1 },
            { value: 10 },
            { value: 2 },
            { value: 4 }
        ]);

        equal(filter.matches(0), false);
        equal(filter.matches(2), true);
        equal(filter.matches(1), true);
        equal(filter.matches(3), false);
        equal(filter.matches(4), false);
        equal(filter.matches(10), false);
    });

    test("top percent matches the top X percent ", function() {
        filter = new TopFilter({ type: "topPercent", value: 25 });

        filter.prepare([
            { value: 1 },
            { value: 10 },
            { value: 2 },
            { value: 4 }
        ]);

        equal(filter.matches(1), false);
        equal(filter.matches(2), false);
        equal(filter.matches(3), false);
        equal(filter.matches(4), false);
        equal(filter.matches(10), true);
        equal(filter.matches(11), false);
    });

    test("bottom percent matches the bottom X percent ", function() {
        filter = new TopFilter({ type: "bottomPercent", value: 25 });

        filter.prepare([
            { value: 1 },
            { value: 10 },
            { value: 2 },
            { value: 4 }
        ]);

        equal(filter.matches(1), true);
        equal(filter.matches(2), false);
        equal(filter.matches(3), false);
        equal(filter.matches(4), false);
        equal(filter.matches(10), false);
        equal(filter.matches(11), false);
    });

    module("dynamic filter");

    test("below average filter", function() {
        filter = new DynamicFilter({ type: "belowAverage" });

        filter.prepare([
            { value: 1 },
            { value: 10 },
            { value: 2 },
            { value: 4 }
        ]);

        equal(filter.matches(1), true);
        equal(filter.matches(10), false);
        equal(filter.matches(2), true);
        equal(filter.matches(5), false);
    });

    test("above average filter", function() {
        filter = new DynamicFilter({ type: "aboveAverage" });

        filter.prepare([
            { value: 1 },
            { value: 10 },
            { value: 2 },
            { value: 4 }
        ]);

        equal(filter.matches(1), false);
        equal(filter.matches(10), true);
        equal(filter.matches(2), false);
        equal(filter.matches(5), true);
    });

    test("above average filter treats dates as numbers", function() {
        filter = new DynamicFilter({ type: "aboveAverage" });

        filter.prepare([
            { value: 3 }
        ]);

        equal(filter.matches(new Date("1/1/1900")), false);
        equal(filter.matches(new Date("1/5/1900")), true);
    });

    test("above average filter treats dates as numbers", function() {
        filter = new DynamicFilter({ type: "aboveAverage" });

        filter.prepare([
            { value: 3 }
        ]);

        equal(filter.matches(new Date("1/1/1900")), false);
        equal(filter.matches(new Date("1/5/1900")), true);
    });

    test("above average doesn't match strings and booleans", function() {
        filter = new DynamicFilter({ type: "aboveAverage" });

        filter.prepare([
            { value: 1 }
        ]);

        equal(filter.matches("1"), false);
        equal(filter.matches(true), false);
        equal(filter.matches(false), false);
    });

    test("below average doesn't match strings and booleans", function() {
        filter = new DynamicFilter({ type: "belowAverage" });

        filter.prepare([
            { value: 1 }
        ]);

        equal(filter.matches("1"), false);
        equal(filter.matches(true), false);
        equal(filter.matches(false), false);
    });

    test("below average filter treats dates as numbers", function() {
        filter = new DynamicFilter({ type: "belowAverage" });

        filter.prepare([
            { value: 3 }
        ]);

        equal(filter.matches(new Date("1/1/1900")), true);
        equal(filter.matches(new Date("1/5/1900")), false);
    });

    test("dates are ignored during average calculation", function() {
        filter = new DynamicFilter({ type: "aboveAverage" });

        filter.prepare([
            { value: 2, format: "m/d/yyyy" },
            { value: 1 },
            { value: 10 },
            { value: 2 },
            { value: 4 }
        ]);

        equal(filter._average, 4.25);
    });

    test("tomorrow", function() {
        filter = new DynamicFilter({ type: "tomorrow" });

        var today = kendo.date.today();

        var tomorrow = kendo.date.addDays(today, 1);

        equal(filter.matches(today), false);
        equal(filter.matches(tomorrow), true);
        tomorrow.setHours(10);
        equal(filter.matches(tomorrow), true);
        equal(filter.matches(true), false);
        equal(filter.matches(""), false);
        equal(filter.matches(1), false);
    });

    test("today", function() {
        filter = new DynamicFilter({ type: "today" });

        var today = kendo.date.today();

        var tomorrow = kendo.date.addDays(today, 1);

        equal(filter.matches(today), true);
        equal(filter.matches(tomorrow), false);
        today.setHours(10);
        equal(filter.matches(today), true);
        equal(filter.matches(true), false);
        equal(filter.matches(""), false);
        equal(filter.matches(1), false);
    });

    test("yesterday", function() {
        filter = new DynamicFilter({ type: "yesterday" });

        var today = kendo.date.today();

        var yesterday = kendo.date.addDays(today, -1);

        equal(filter.matches(today), false);
        equal(filter.matches(yesterday), true);
        yesterday.setHours(10);
        equal(filter.matches(yesterday), true);
        equal(filter.matches(true), false);
        equal(filter.matches(""), false);
        equal(filter.matches(1), false);
    });

    test("nextWeek", function() {
        filter = new DynamicFilter({ type: "nextWeek" });

        var today = kendo.date.today();

        var nextweek = kendo.date.addDays(today, 7);

        equal(filter.matches(today), false);
        equal(filter.matches(nextweek), true);
        nextweek.setHours(10);
        equal(filter.matches(nextweek), true);
        equal(filter.matches(true), false);
        equal(filter.matches(""), false);
        equal(filter.matches(1), false);
    });

    test("thisWeek", function() {
        filter = new DynamicFilter({ type: "thisWeek" });

        var today = kendo.date.today();

        var thisWeek = kendo.date.dayOfWeek(today, 1);

        equal(filter.matches(today), true);
        equal(filter.matches(thisWeek), true);
        thisWeek.setHours(10);
        equal(filter.matches(thisWeek), true);
        equal(filter.matches(true), false);
        equal(filter.matches(""), false);
        equal(filter.matches(1), false);
    });

    test("lastWeek", function() {
        filter = new DynamicFilter({ type: "lastWeek" });

        var today = kendo.date.today();

        var lastWeek = kendo.date.addDays(today, -7);

        equal(filter.matches(today), false);
        equal(filter.matches(lastWeek), true);
        lastWeek.setHours(10);
        equal(filter.matches(lastWeek), true);
        equal(filter.matches(true), false);
        equal(filter.matches(""), false);
        equal(filter.matches(1), false);
    });

    test("nextMonth", function() {
        filter = new DynamicFilter({ type: "nextMonth" });

        var today = kendo.date.today();

        var nextMonth = kendo.date.firstDayOfMonth(today);

        nextMonth.setMonth(nextMonth.getMonth() + 1, 1);

        equal(filter.matches(today), false);
        equal(filter.matches(nextMonth), true);
        nextMonth.setDate(10);
        equal(filter.matches(nextMonth), true);
        equal(filter.matches(true), false);
        equal(filter.matches(""), false);
        equal(filter.matches(1), false);
    });

    test("thisMonth", function() {
        filter = new DynamicFilter({ type: "thisMonth" });

        var today = kendo.date.today();

        var thisMonth = kendo.date.firstDayOfMonth(today);

        equal(filter.matches(today), true);
        equal(filter.matches(thisMonth), true);
        thisMonth.setDate(10);
        equal(filter.matches(thisMonth), true);
        equal(filter.matches(true), false);
        equal(filter.matches(""), false);
        equal(filter.matches(1), false);
    });

    test("lastMonth", function() {
        filter = new DynamicFilter({ type: "lastMonth" });

        var today = kendo.date.today();

        var lastMonth = kendo.date.firstDayOfMonth(today);

        lastMonth.setMonth(lastMonth.getMonth() - 1, 1);

        equal(filter.matches(today), false);
        equal(filter.matches(lastMonth), true);
        lastMonth.setDate(10);
        equal(filter.matches(lastMonth), true);
        equal(filter.matches(true), false);
        equal(filter.matches(""), false);
        equal(filter.matches(1), false);
    });

    test("nextQuarter", function() {
        filter = new DynamicFilter({ type: "nextQuarter" });

        var today = kendo.date.today();

        var month = today.getMonth() + 1;

        if (month >= 1 && month <= 3) {
            // make it second quarter
            today.setMonth(4, 1);
        } else if (month >= 4 && month <= 6) {
            // make it third quarter
            today.setMonth(7, 1);
        } else if (month >= 7 && month <= 9) {
            // make it fourth quarter
            today.setMonth(10, 1);
        } else {
            // make it first quarter, next year
            today.setMonth(1, 1);
            today.setFullYear(today.getFullYear() + 1);
        }

        equal(filter.matches(today), true);
        today.setDate(10);
        equal(filter.matches(today), true);
        equal(filter.matches(new Date()), false);
        equal(filter.matches(true), false);
        equal(filter.matches(""), false);
        equal(filter.matches(1), false);
    });

    test("thisQuarter", function() {
        filter = new DynamicFilter({ type: "thisQuarter" });

        var today = kendo.date.today();

        var month = today.getMonth() + 1;

        if (month >= 1 && month <= 3) {
            // make it second quarter
            today.setMonth(4, 1);
        } else if (month >= 4 && month <= 6) {
            // make it third quarter
            today.setMonth(7, 1);
        } else if (month >= 7 && month <= 9) {
            // make it fourth quarter
            today.setMonth(10, 1);
        } else {
            // make it first quarter, next year
            today.setMonth(1, 1);
            today.setFullYear(today.getFullYear() + 1);
        }

        equal(filter.matches(today), false);
        today = kendo.date.today();
        equal(filter.matches(today), true);
        today.setDate(10);
        equal(filter.matches(today), true);
        equal(filter.matches(true), false);
        equal(filter.matches(""), false);
        equal(filter.matches(1), false);
    });

    test("lastQuarter", function() {
        filter = new DynamicFilter({ type: "lastQuarter" });

        var today = kendo.date.today();

        var month = today.getMonth() + 1;

        if (month >= 1 && month <= 3) {
            // make it fourth quarter, previous year
            today.setMonth(10, 1);
            today.setFullYear(today.getFullYear() - 1);
        } else if (month >= 4 && month <= 6) {
            // make it first quarter
            today.setMonth(1, 1);
        } else if (month >= 7 && month <= 9) {
            // make it second quarter
            today.setMonth(4, 1);
        } else {
            // make it third quarter, next year
            today.setMonth(7, 1);
        }
        equal(filter.matches(today), true);
        today.setDate(10);
        equal(filter.matches(today), true);
        equal(filter.matches(new Date()), false);
        equal(filter.matches(true), false);
        equal(filter.matches(""), false);
        equal(filter.matches(1), false);
    });

    test("nextYear", function() {
        filter = new DynamicFilter({ type: "nextYear" });

        var today = kendo.date.today();

        today.setFullYear(today.getFullYear() + 1);

        equal(filter.matches(today), true);
        today.setDate(10);
        equal(filter.matches(today), true);
        equal(filter.matches(new Date()), false);
        equal(filter.matches(true), false);
        equal(filter.matches(""), false);
        equal(filter.matches(1), false);
    });

    test("thisYear", function() {
        filter = new DynamicFilter({ type: "thisYear" });

        var today = kendo.date.today();

        today.setFullYear(today.getFullYear() + 1);

        equal(filter.matches(today), false);

        today = kendo.date.today();
        equal(filter.matches(today), true);
        today.setDate(10);
        equal(filter.matches(today), true);
        equal(filter.matches(new Date()), true);
        equal(filter.matches(true), false);
        equal(filter.matches(""), false);
        equal(filter.matches(1), false);
    });

    test("lastYear", function() {
        filter = new DynamicFilter({ type: "lastYear" });

        var today = kendo.date.today();

        today.setFullYear(today.getFullYear() - 1);

        equal(filter.matches(today), true);

        today.setDate(10);
        equal(filter.matches(today), true);

        equal(filter.matches(new Date()), false);
        equal(filter.matches(true), false);
        equal(filter.matches(""), false);
        equal(filter.matches(1), false);
    });

    test("yearToDate", function() {
        filter = new DynamicFilter({ type: "yearToDate" });

        var today = kendo.date.today();

        equal(filter.matches(today), true);

        today.setDate(today.getDate() - 1);

        equal(filter.matches(today), true);

        today.setFullYear(today.getFullYear() - 1);

        equal(filter.matches(today), false);

        equal(filter.matches(new Date()), false);
        equal(filter.matches(true), false);
        equal(filter.matches(""), false);
        equal(filter.matches(1), false);
    });

    test("quarter1", function() {
        filter = new DynamicFilter({ type: "quarter1" });

        equal(filter.matches(new Date("1/1/1990")), true);
        equal(filter.matches(new Date("5/1/1990")), false);

        equal(filter.matches(true), false);
        equal(filter.matches(""), false);
        equal(filter.matches(1), false);
    });

    test("quarter2", function() {
        filter = new DynamicFilter({ type: "quarter2" });

        equal(filter.matches(new Date("4/1/1990")), true);
        equal(filter.matches(new Date("7/1/1990")), false);

        equal(filter.matches(true), false);
        equal(filter.matches(""), false);
        equal(filter.matches(1), false);
    });

    test("quarter3", function() {
        filter = new DynamicFilter({ type: "quarter3" });

        equal(filter.matches(new Date("7/1/1990")), true);
        equal(filter.matches(new Date("10/1/1990")), false);

        equal(filter.matches(true), false);
        equal(filter.matches(""), false);
        equal(filter.matches(1), false);
    });

    test("quarter4", function() {
        filter = new DynamicFilter({ type: "quarter4" });

        equal(filter.matches(new Date("10/1/1990")), true);
        equal(filter.matches(new Date("1/1/1990")), false);

        equal(filter.matches(true), false);
        equal(filter.matches(""), false);
        equal(filter.matches(1), false);
    });

    test("months", function() {
        var months = kendo.cultures["en-US"].calendar.months.names;

        months.forEach(function(month, index) {
            filter = new DynamicFilter({ type: month.toLowerCase() });

            equal(filter.matches(new Date((index + 1) + "/1/1990")), true);

            equal(filter.matches(new Date((index + 2) + "/1/1990")), false);

            equal(filter.matches(true), false);
            equal(filter.matches(""), false);
            equal(filter.matches(1), false);
        });
    });
})();
