(function(){

    module("Custom number format");

    var spreadsheet = kendo.spreadsheet;
    var F = spreadsheet.formatting;

    function htmlEqual(dom, html) {
        if (!/^<span/.test(html)) {
            html = "<span>" + html + "</span>";
        }
        return equal(render(dom), html);
    }

    function render(el) {
        switch (el.nodeName) {
          case "#text":
            return kendo.htmlEncode(el.nodeValue);
          case "#html":
            return el.html;
        }
        if (el.children) {
            return "<" + el.nodeName + Object.keys(el.attr).map(function(attrName){
                var val = el.attr[attrName];
                if (typeof val == "object") {
                    return " " + attrName + "=" + JSON.stringify(Object.keys(val).map(function(key){
                        return key + ": " + val[key];
                    }).join("; "));
                } else {
                    return " " + attrName + "=" + JSON.stringify(kendo.htmlEncode(el.attr[attrName]));
                }
            }) + ">" + el.children.map(render).join("") + "</" + el.nodeName + ">";
        }
    }

    test("simple format", function(){
        var format = F.compile("#.#");
        htmlEqual(format(0.2), ".2");
        htmlEqual(format(-0.2), "-.2");
    });

    test("thousands separator", function(){
        var format = F.compile("#,#");
        htmlEqual(format(0), "0");
        htmlEqual(format(123), "123");
        htmlEqual(format(1234), "1,234");
        htmlEqual(format(12345), "12,345");
        htmlEqual(format(123456), "123,456");
        htmlEqual(format(1234567), "1,234,567");
    });

    test("thousands separator with decimals", function(){
        var format = F.compile("#,#.###");
        htmlEqual(format(0), ".");
        htmlEqual(format(0.5), ".5");
        htmlEqual(format(123.4567), "123.457");
        htmlEqual(format(1234.45), "1,234.45");
        htmlEqual(format(12345.456), "12,345.456");
        htmlEqual(format(123456.0), "123,456.");
        htmlEqual(format(1234567.1234), "1,234,567.123");
    });

    test("zero-padding", function(){
        var format = F.compile("0000.00");
        htmlEqual(format(0), "0000.00");
        htmlEqual(format(0.5), "0000.50");
        htmlEqual(format(0.56), "0000.56");
        htmlEqual(format(123.578), "0123.58");
        htmlEqual(format(1234.578), "1234.58");
        htmlEqual(format(12345.578), "12345.58");

        var format = F.compile("0,000.00");
        htmlEqual(format(0), "0,000.00");
        htmlEqual(format(0.5), "0,000.50");
        htmlEqual(format(0.56), "0,000.56");
        htmlEqual(format(123.578), "0,123.58");
        htmlEqual(format(1234.578), "1,234.58");
        htmlEqual(format(12345.578), "12,345.58");
    });

    test("space-padding", function(){
        var format = F.compile("????.??");
        htmlEqual(format(0), "    .  ");
        htmlEqual(format(0.5), "    .5 ");
        htmlEqual(format(0.56), "    .56");
        htmlEqual(format(123.578), " 123.58");
        htmlEqual(format(1234.578), "1234.58");
        htmlEqual(format(12345.578), "12345.58");

        // Excel does not insert the comma after a space
        var format = F.compile("?,???.??");
        htmlEqual(format(0), "    .  ");
        htmlEqual(format(0.5), "    .5 ");
        htmlEqual(format(0.56), "    .56");
        htmlEqual(format(123.578), " 123.58");
        htmlEqual(format(1234.578), "1,234.58");
        htmlEqual(format(12345.578), "12,345.58");
    });

    test("percent", function(){
        var format = F.compile("???.00%");
        htmlEqual(format(0), "   .00%");
        htmlEqual(format(0.02), "  2.00%");
        htmlEqual(format(0.20), " 20.00%");
        htmlEqual(format(0.267), " 26.70%");
        htmlEqual(format(0.26789), " 26.79%");
        htmlEqual(format(1.26789), "126.79%");
    });

    test("phone numbers", function(){
        var format = F.compile("(###) ###-####");
        htmlEqual(format(1234567891), "(123) 456-7891");
        htmlEqual(format(123456789), "(12) 345-6789");

        var format = F.compile("(000) 000-0000");
        htmlEqual(format(1234567891), "(123) 456-7891");
        htmlEqual(format(123456789), "(012) 345-6789");
    });

    test("mix text 1", function(){
        var format = F.compile('### "whoa" ###');
        htmlEqual(format(123456), "123 whoa 456");
        htmlEqual(format(12345), "12 whoa 345");
        htmlEqual(format(1234), "1 whoa 234");
        htmlEqual(format(123), " whoa 123");
        htmlEqual(format(0), " whoa 0");
    });

    test("mix text 2", function(){
        var format = F.compile('000 "whoa" 000');
        htmlEqual(format(123456), "123 whoa 456");
        htmlEqual(format(12345), "012 whoa 345");
        htmlEqual(format(1234), "001 whoa 234");
        htmlEqual(format(123), "000 whoa 123");
        htmlEqual(format(0), "000 whoa 000");
    });

    test("mix text 3", function(){
        var format = F.compile('#.000 "whoa" 000');
        htmlEqual(format(12.123456), "12.123 whoa 456");
        htmlEqual(format(12.1234567), "12.123 whoa 457");
        htmlEqual(format(0.1234567), ".123 whoa 457");
    });

    test("pathologic", function(){
        var format = F.compile("(?,??????) ###-####");
        htmlEqual(format(123456789012), "(  123,45) 6,78-9,012");

        var format = F.compile("(0,000000) ###-####");
        htmlEqual(format(123456789012), "(00,123,45) 6,78-9,012");
    });

    test("scale /1000", function(){
        var format = F.compile("0.0,,\\m");
        htmlEqual(format(999000), "1.0m");
        htmlEqual(format(15500000), "15.5m");
        htmlEqual(format(-7200000), "-7.2m");
    });

    test("date and time", function(){
        var format = F.compile("yyyy-mm-dd hh:mm:ss AM/PM");
        var t1 = 34567.2678, t2 = 41113.60625;
        htmlEqual(format(t1), "1994-08-21 06:25:37 AM");
        htmlEqual(format(t2), "2012-07-23 02:33:00 PM");

        var format = F.compile("dddd, d mmmm yyyy");
        htmlEqual(format(t1), "Sunday, 21 August 1994");
        htmlEqual(format(t2), "Monday, 23 July 2012");

        var format = F.compile("dddd, d mmmm yyyy");
        htmlEqual(format(t1, kendo.getCulture("de-DE")), "Sonntag, 21 August 1994");
        htmlEqual(format(t2, kendo.getCulture("de-DE")), "Montag, 23 Juli 2012");

        var format = F.compile('h "hours", m "minutes and" s "seconds"');
        htmlEqual(format(t1), "6 hours, 25 minutes and 37 seconds");
        htmlEqual(format(t2), "14 hours, 33 minutes and 0 seconds");
    });

    test("elapsed time", function(){
        var format = F.compile('[h]:mm');
        htmlEqual(format(1.158333333), "27:48");

        var format = F.compile('[h] "hours and" mm "minutes"');
        htmlEqual(format(1.158333333), "27 hours and 48 minutes");
    });

    test("num+ and text sections", function(){
        var format = F.compile('[Red]+0.0;;;"Some text:" @');
        htmlEqual(format(10), "<span style=\"color: red\">+10.0</span>");
        htmlEqual(format(-20), "");
        htmlEqual(format(0), "");
        htmlEqual(format("Blah"), "Some text: Blah");
    });

    test("all sections", function(){
        var format = F.compile('[Green]_-0.0_);[Red](-0.0);[Blue]"zero";"Some text:" @');
        htmlEqual(format(10), "<span style=\"color: green\"><span style=\"visibility: hidden\">-</span>10.0<span style=\"visibility: hidden\">)</span></span>");
        htmlEqual(format(-20), "<span style=\"color: red\">(-20.0)</span>");
        htmlEqual(format(0), "<span style=\"color: blue\">zero</span>");
        htmlEqual(format("Blah"), "Some text: Blah");
    });

    test("conditionals", function(){
        var format = F.compile('[<10]"less than 10";[<20]"less than 20";[<30]"less than 30";[=30]"thirty";[>30]"more than thirty:" 0,0;"Some text:" @');
        htmlEqual(format(1), "less than 10");
        htmlEqual(format(11), "less than 20");
        htmlEqual(format(21), "less than 30");
        htmlEqual(format(30), "thirty");
        htmlEqual(format(123456), "more than thirty: 123,456");
        htmlEqual(format("foo"), "Some text: foo");
    });

    test("data type", function(){
        var format = '#';
        equal(F.type(12345, format), "number");
        equal(F.type("foo", format), "text");

        var format = 'm/d/yyyy;[Red]#;"text:" @';
        equal(F.type(12345, format), "date");
        equal(F.type(-5, format), "number");
        equal(F.type("foo", format), "text");
    });

    test("adjust decimals", function(){
        var format = F.compile(F.adjustDecimals('#', +2));
        htmlEqual(format(1), "1.00");

        var format = F.compile(F.adjustDecimals('#', -2));
        htmlEqual(format(1), "1");

        var format = F.compile(F.adjustDecimals('#,###.00', +2));
        htmlEqual(format(12345.67891), "12,345.6789");

        var format = F.compile(F.adjustDecimals('#,###.00', -1));
        htmlEqual(format(12345.67891), "12,345.7");

        var format = F.compile(F.adjustDecimals('#,###.00', -2));
        htmlEqual(format(12345.67891), "12,346");

        var format = F.compile(F.adjustDecimals('#,###.00 0000', -2));
        htmlEqual(format(12345.777777777), "12,345.77 78");

        var format = F.compile(F.adjustDecimals('#,###.00 0000', -4));
        htmlEqual(format(12345.777777777), "12,345.78 ");

        var format = F.compile(F.adjustDecimals('#,###.00 0000', -5));
        htmlEqual(format(12345.777777777), "12,345.8 ");

        var format = F.compile(F.adjustDecimals('#,###.00 0000', -8));
        htmlEqual(format(12345.777777777), "12,346 ");
    });

    test("does not error out when given string in number format", function(){
        var format = F.compile("[Red][<50]#;[Green][>50]#;[Blue]0.00");
        htmlEqual(format("abc"), "abc");
    });

    test("dot is output literally when not followed by digit part", function(){
        var format = F.compile('d.m.yyyy "г." h:mm | "as number: "#,#.00');
        htmlEqual(format(12345, kendo.getCulture("bg-BG")), "18.10.1933 г. 0:00 | as number: 12 345,00");
    });

    test("time with am/pm outputs correctly hour 12 noon", function(){
        var format = F.compile('d-mmm-yyyy hh:mm:ss am/pm');
        var date = 30586.524988425925;
        htmlEqual(format(date), "27-Sep-1983 12:35:59 pm");
    });

})();
