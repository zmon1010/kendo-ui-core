(function() {
    var sheet;
    var ValueFilter = kendo.spreadsheet.ValueFilter;
    var filter;

    var defaults = kendo.ui.Spreadsheet.prototype.options;
    module("value filter", {
        setup: function() {
            sheet = new kendo.spreadsheet.Sheet(defaults.rows, defaults.columns,
                defaults.rowHeight, defaults.columnWidth);
        }
    });

   test("filter returns true for known values", function() {
        filter = new ValueFilter({
            values: [1, 2]
        });

        equal(filter.matches(1), true);
        equal(filter.matches(2), true);
    });

    test("filter returns false for unknown values", function() {
        filter = new ValueFilter({
            values: [1, 2]
        });

        equal(filter.matches(3), false);
        equal(filter.matches(4), false);
    });

    test("filter returns false for null values", function() {
        filter = new ValueFilter({
        });

        equal(filter.matches(null), false);
    });

    test("filter returns true for null values if blanks is set to true", function() {
        filter = new ValueFilter({
            blanks: true
        });

        equal(filter.matches(null), true);
    });

    test("filter returns true for dates that are from the same year", function() {
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

    test("filter returns true for dates that are from the same year and month", function() {
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

    test("filter returns true for dates that are from the same year month and day", function() {
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

    test("filter returns true for dates that are from the same year month day and hour", function() {
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

    test("filter returns true for dates that are from the same year month day hour and minute", function() {
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

    test("filter returns true for dates that are from the same year month day hour minute and second", function() {
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
})();
