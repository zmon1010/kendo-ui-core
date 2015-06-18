(function(){

    module("Custom number format");

    var spreadsheet = kendo.spreadsheet;
    var F = spreadsheet.formatting;

    test("simple format", function(){
        var format = F.compile("#.#");
        equal(format(0.2), ".2");
        equal(format(-0.2), "-.2");
    });

    test("thousands separator", function(){
        var format = F.compile("#,#");
        equal(format(0), "0");
        equal(format(123), "123");
        equal(format(1234), "1,234");
        equal(format(12345), "12,345");
        equal(format(123456), "123,456");
        equal(format(1234567), "1,234,567");
    });

    test("thousands separator with decimals", function(){
        var format = F.compile("#,#.###");
        equal(format(0), ".");
        equal(format(0.5), ".5");
        equal(format(123.4567), "123.457");
        equal(format(1234.45), "1,234.45");
        equal(format(12345.456), "12,345.456");
        equal(format(123456.0), "123,456.");
        equal(format(1234567.1234), "1,234,567.123");
    });

    test("zero-padding", function(){
        var format = F.compile("0000.00");
        equal(format(0), "0000.00");
        equal(format(0.5), "0000.50");
        equal(format(0.56), "0000.56");
        equal(format(123.578), "0123.58");
        equal(format(1234.578), "1234.58");
        equal(format(12345.578), "12345.58");

        var format = F.compile("0,000.00");
        equal(format(0), "0,000.00");
        equal(format(0.5), "0,000.50");
        equal(format(0.56), "0,000.56");
        equal(format(123.578), "0,123.58");
        equal(format(1234.578), "1,234.58");
        equal(format(12345.578), "12,345.58");
    });

    test("space-padding", function(){
        var format = F.compile("????.??");
        equal(format(0), "    .  ");
        equal(format(0.5), "    .5 ");
        equal(format(0.56), "    .56");
        equal(format(123.578), " 123.58");
        equal(format(1234.578), "1234.58");
        equal(format(12345.578), "12345.58");

        // Excel does not insert the comma after a space
        var format = F.compile("?,???.??");
        equal(format(0), "    .  ");
        equal(format(0.5), "    .5 ");
        equal(format(0.56), "    .56");
        equal(format(123.578), " 123.58");
        equal(format(1234.578), "1,234.58");
        equal(format(12345.578), "12,345.58");
    });

    test("percent", function(){
        var format = F.compile("???.00%");
        equal(format(0), "   .00%");
        equal(format(0.02), "  2.00%");
        equal(format(0.20), " 20.00%");
        equal(format(0.267), " 26.70%");
        equal(format(0.26789), " 26.79%");
        equal(format(1.26789), "126.79%");
    });

    test("phone numbers", function(){
        var format = F.compile("(###) ###-####");
        equal(format(1234567891), "(123) 456-7891");
        equal(format(123456789), "(12) 345-6789");

        var format = F.compile("(000) 000-0000");
        equal(format(1234567891), "(123) 456-7891");
        equal(format(123456789), "(012) 345-6789");
    });

    test("mix text 1", function(){
        var format = F.compile('### "whoa" ###');
        equal(format(123456), "123 whoa 456");
        equal(format(12345), "12 whoa 345");
        equal(format(1234), "1 whoa 234");
        equal(format(123), " whoa 123");
        equal(format(0), " whoa 0");
    });

    test("mix text 2", function(){
        var format = F.compile('000 "whoa" 000');
        equal(format(123456), "123 whoa 456");
        equal(format(12345), "012 whoa 345");
        equal(format(1234), "001 whoa 234");
        equal(format(123), "000 whoa 123");
        equal(format(0), "000 whoa 000");
    });

    test("mix text 3", function(){
        var format = F.compile('#.000 "whoa" 000');
        equal(format(12.123456), "12.123 whoa 456");
        equal(format(12.1234567), "12.123 whoa 457");
        equal(format(0.1234567), ".123 whoa 457");
    });

    test("pathologic", function(){
        var format = F.compile("(?,??????) ###-####");
        equal(format(123456789012), "(  123,45) 6,78-9,012");

        var format = F.compile("(0,000000) ###-####");
        equal(format(123456789012), "(00,123,45) 6,78-9,012");
    });

    test("scale /1000", function(){
        var format = F.compile("0.0,,\\m");
        equal(format(999000), "1.0m");
        equal(format(15500000), "15.5m");
        equal(format(-7200000), "-7.2m");
    });

    test("date and time", function(){
        var format = F.compile("yyyy-mm-dd hh:mm:ss AM/PM");
        var t1 = 34567.2678, t2 = 41113.60625;
        equal(format(t1), "1994-08-21 06:25:37 AM");
        equal(format(t2), "2012-07-23 02:33:00 PM");

        var format = F.compile("dddd, d mmmm yyyy");
        equal(format(t1), "Sunday, 21 August 1994");
        equal(format(t2), "Monday, 23 July 2012");

        var format = F.compile('h "hours", m "minutes and" s "seconds"');
        equal(format(t1), "6 hours, 25 minutes and 37 seconds");
        equal(format(t2), "14 hours, 33 minutes and 0 seconds");
    });

    test("elapsed time", function(){
        var format = F.compile('[h]:mm');
        equal(format(1.158333333), "27:48");

        var format = F.compile('[h] "hours and" mm "minutes"');
        equal(format(1.158333333), "27 hours and 48 minutes");
    });

    test('num+ and text sections', function(){
        var format = F.compile('[Red]+0.0;;;"Some text:" @');
        equal(format(10), "<span style='color: red'>+10.0</span>");
        equal(format(-20), "");
        equal(format(0), "");
        equal(format("Blah"), "Some text: Blah");
    });

    test('all sections', function(){
        var format = F.compile('[Green]_-0.0_);[Red](-0.0);[Blue]"zero";"Some text:" @');
        equal(format(10), "<span style='color: green'><span style='visibility: hidden'>-</span>10.0<span style='visibility: hidden'>)</span></span>");
        equal(format(-20), "<span style='color: red'>(-20.0)</span>");
        equal(format(0), "<span style='color: blue'>zero</span>");
        equal(format("Blah"), "Some text: Blah");
    });

})();
