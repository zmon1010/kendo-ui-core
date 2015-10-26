(function() {
    var sheet;
    var RangeRef = kendo.spreadsheet.RangeRef;
    var CellRef = kendo.spreadsheet.CellRef;
    var defaults = kendo.ui.Spreadsheet.prototype.options;
    var success = $.proxy(ok, null, true);
    var failure = $.proxy(ok, null, false);

    module("Sheet API", {
        setup: function() {
            sheet = new kendo.spreadsheet.Sheet(defaults.rows, defaults.columns,
                                                defaults.rowHeight, defaults.columnWidth);
            sheet.name("Sheet1");
        }
    });

    test("rowHeight sets the height of the specified row", function() {
        sheet.rowHeight(0, 100);

        equal(sheet._grid._rows.values.iterator(0, 0).at(0), 100);
    });

    test("rowHeight returns the height of the specified row", function() {
        equal(sheet.rowHeight(0), defaults.rowHeight);
    });

    test("columnWidth sets the width of the specified column", function() {
        sheet.columnWidth(0, 100);

        equal(sheet._grid._columns.values.iterator(0, 0).at(0), 100);
    });

    test("columnWidth returns the width of the specified column", function() {
        equal(sheet.columnWidth(0), defaults.columnWidth);
    });

    test("range returns a Range object by row and col index", function() {
        ok(sheet.range(0, 0) instanceof kendo.spreadsheet.Range);
    });

    test("range returns a Range object by A1 reference", function() {
        var range = sheet.range("A1:B1");
        ok(range instanceof kendo.spreadsheet.Range);
        equal(range._ref.topLeft.row, 0);
        equal(range._ref.topLeft.col, 0);
        equal(range._ref.bottomRight.col, 1);
        equal(range._ref.bottomRight.row, 0);
    });

    test("rowHeight triggers the change event", 1, function() {
       sheet.bind("change", success).rowHeight(0, 0);
    });

    test("columnWidth triggers the change event", 1, function() {
       sheet.bind("change", success).columnWidth(0, 0);
    });

    test("hideColumn triggers the change event", 1, function() {
       sheet.bind("change", success).hideColumn(0);
    });

    test("hideRow triggers the change event", 1, function() {
       sheet.bind("change", success).hideRow(0);
    });

    test("unhideColumn triggers the change event", 1, function() {
       sheet.bind("change", success).unhideColumn(0);
    });

    test("unhideRow triggers the change event", 1, function() {
       sheet.bind("change", success).unhideRow(0);
    });

    test("frozenRows triggers the change event", 1, function() {
       sheet.bind("change", success).frozenRows(2);
    });

    test("frozenColumns triggers the change event", 1, function() {
       sheet.bind("change", success).frozenColumns(2);
    });

    test("select triggers the change event", 1, function() {
       sheet.bind("change", success).range("A2").select();
    });

    test("triggerChange triggers the change event", 1, function() {
       sheet.bind("change", success).triggerChange();
    });

    test("triggerChange doesn't trigger the change event if changes are suspended", 0, function() {
       sheet.bind("change", failure).suspendChanges(true).triggerChange();
    });

    test("deleteRow triggers the change event", 1, function() {
       sheet.bind("change", success).deleteRow(0);
    });

    test("deleteRow triggers the deleteRow event passing the row index", 1, function() {
       sheet.bind("deleteRow", function(e) {
           equal(e.index, 0);
       }).deleteRow(0);
    });

    test("deleteRow move the bottom row values to the deleted one", function() {
        sheet.range("2:2").value("foo");

        sheet.deleteRow(0);

        equal(sheet.range("1:1").value(), "foo");
        equal(sheet.range("2:2").value(), null);
    });

    test("deleteRow removes merged cells when all of them are deleted", function(){
        sheet.range("A1:B2").merge();
        sheet.deleteRow(0);
        equal(sheet._mergedCells.length, 1);
        equal(sheet._mergedCells[0].toString(), "A1:B1");
        sheet.deleteRow(0);
        equal(sheet._mergedCells.length, 0);
    });

    test("deleteColumn removes merged cells when all of them are deleted", function(){
        sheet.range("A1:B2").merge();
        sheet.deleteColumn(0);
        equal(sheet._mergedCells.length, 1);
        equal(sheet._mergedCells[0].toString(), "A1:A2");
        sheet.deleteColumn(0);
        equal(sheet._mergedCells.length, 0);
    });

    test("deleteRow persist merged cells when deleting row is at the start of the merged group", function() {
        sheet.range("A2:B3").merge();

        sheet.deleteRow(1);

        var mergedCells = sheet._mergedCells;

        equal(mergedCells.length, 1);
        equal(mergedCells[0].toString(), "A2:B2");
    });

    test("deleteRow moves the merged cells when deleting the row prior to the range", function() {
        sheet.range("A2:B3").merge();

        sheet.deleteRow(0);

        var mergedCells = sheet._mergedCells;

        equal(mergedCells.length, 1);
        equal(mergedCells[0].toString(), "A1:B2");
    });

    test("deleteRow persist styling of the merged cell", function() {
        sheet.range("A2:B3").merge().background("red");

        sheet.deleteRow(1);

        var mergedCells = sheet._mergedCells;

        equal(sheet.range("A2:B2").background(), "red");
    });

    test("deleteRow persist merged cells two overlapping ranges", function() {
        sheet.range("A1:B3").merge();

        sheet.range("C2:F5").merge();

        sheet.deleteRow(2);

        var mergedCells = sheet._mergedCells;

        equal(mergedCells.length, 2);
        equal(mergedCells[0].toString(), "A1:B2");
        equal(mergedCells[1].toString(), "C2:F4");
    });

    test("deleteRow does not change merged cells when deleted row is not included", function() {
        sheet.range("A1:B3").merge();

        sheet.deleteRow(5);

        var mergedCells = sheet._mergedCells;

        equal(mergedCells.length, 1);
        equal(mergedCells[0].toString(), "A1:B3");
    });

    test("deleteRow move the bottom row background to the deleted one", function() {
        sheet.range("2:2").background("foo");

        sheet.deleteRow(0);

        equal(sheet.range("1:1").background(), "foo");
        equal(sheet.range("2:2").background(), null);
    });

    test("deleteRow deleting frozen row makes frozen row pane smaller", function() {
        sheet.frozenRows(3);

        sheet.deleteRow(0);

        equal(sheet.frozenRows(), 2);
    });

    test("deleteRow deleting last frozen row does makes frozen row pane smaller", function() {
        sheet.frozenRows(3);

        sheet.deleteRow(2);

        equal(sheet.frozenRows(), 2);
    });

    test("deleteRow deleting first non-frozen row does not make frozen row pane smaller", function() {
        sheet.frozenRows(3);

        sheet.deleteRow(3);

        equal(sheet.frozenRows(), 3);
    });

    test("deleteRow deleting non-frozen row does not make frozen row pane smaller", function() {
        sheet.frozenRows(3);

        sheet.deleteRow(4);

        equal(sheet.frozenRows(), 3);
    });

    test("insertRow into merged cells region expands the merged cells", function() {
        sheet.range("A1:C5").merge();

        sheet.insertRow(1);

        var mergedCells = sheet._mergedCells;

        equal(mergedCells.length, 1);
        equal(mergedCells[0].toString(), "A1:C6");
    });

    test("insertRow into multiple merged cells regions expands the merged cells", function() {
        sheet.range("A1:C5").merge();
        sheet.range("F2:G5").merge();

        sheet.insertRow(2);

        var mergedCells = sheet._mergedCells;

        equal(mergedCells.length, 2);
        equal(mergedCells[0].toString(), "A1:C6");
        equal(mergedCells[1].toString(), "F2:G6");
    });

    test("insertRow outside of merged cells region the merged cells", function() {
        sheet.range("A1:C5").merge();

        sheet.insertRow(7);

        var mergedCells = sheet._mergedCells;

        equal(mergedCells.length, 1);
        equal(mergedCells[0].toString(), "A1:C5");
    });


    test("insertRow frozen row expands frozen rows pane", function() {
        sheet.frozenRows(3);

        sheet.insertRow(0);

        equal(sheet.frozenRows(), 4);
    });

    test("insertRow non-frozen row does not expand frozen rows pane", function() {
        sheet.frozenRows(3);

        sheet.insertRow(3);

        equal(sheet.frozenRows(), 3);
    });

    test("insertRow move the data bottom row", function() {
        sheet.range("1:1").value("foo");

        sheet.insertRow(0);

        equal(sheet.range("1:1").value(), null);
        equal(sheet.range("2:2").value(), "foo");
    });

    test("insertRow at the last position", function() {
        sheet.insertRow(defaults.rows - 1);

        equal(sheet.range(defaults.rows + ":" + defaults.rows).value(), null);
    });

    test("insertRow triggers the change event", 1, function() {
       sheet.bind("change", success).insertRow(0);
    });

    test("insertRow triggers the insertRow event passing the row index", 1, function() {
       sheet.bind("insertRow", function(e) {
           equal(e.index, 0);
       }).insertRow(0);
    });

    test("insertRow pushing record outside of the sheet throws error", function() {
        sheet.range("A" + defaults.rows).values("some value");

        /* global throws */
        throws(function() { sheet.insertRow(0); });
    });

    test("canInsertRows is true if data will not be lost", function() {
        ok(sheet.canInsertRow(0));
    });

    test("canInsertRow is false if data will be lost", function() {
        sheet.range("A" + defaults.rows).values("some value");

        ok(!sheet.canInsertRow(0));
    });

    test("canInsertRow is false if data will be lost when inserting multiple rows", function() {
        sheet.range("A" + (defaults.rows-1)).values("some value");

        ok(!sheet.canInsertRow(0, 2));
    });

    test("deleteColumn triggers the change event", 1, function() {
       sheet.bind("change", success).deleteColumn(0);
    });

    test("deleteColumn trimming the merged cells range when deleting column from the range", function() {
        sheet.range("A1:C3").merge();

        sheet.deleteColumn(0);

        var mergedCells = sheet._mergedCells;

        equal(mergedCells.length, 1);
        equal(mergedCells[0].toString(), "A1:B3");
    });

    test("deleteColumn reposition the merged cells range when deleting column before the range", function() {
        sheet.range("B1:C3").merge();

        sheet.deleteColumn(0);

        var mergedCells = sheet._mergedCells;

        equal(mergedCells.length, 1);
        equal(mergedCells[0].toString(), "A1:B3");
    });

    test("deleteColumn does not change the merged cells range if removing column after the range", function() {
        sheet.range("B1:C3").merge();

        sheet.deleteColumn(3);

        var mergedCells = sheet._mergedCells;

        equal(mergedCells.length, 1);
        equal(mergedCells[0].toString(), "B1:C3");
    });

    test("deleteColumn moves the next column values to the deleted one", function() {
        sheet.range("B:B").value("foo");

        sheet.deleteColumn(0);

        equal(sheet.range("A:A").value(), "foo");
        equal(sheet.range("B:B").value(), null);
    });

    test("insertColumn triggers the change event", 1, function() {
       sheet.bind("change", success).insertColumn(0);
    });

    test("deleteColumn frozen column collapse frozen columns pane", function() {
        sheet.frozenColumns(3);

        sheet.deleteColumn(0);

        equal(sheet.frozenColumns(), 2);
    });

    test("deleteColumn non-frozen column does not collapse frozen columns pane", function() {
        sheet.frozenColumns(3);

        sheet.deleteColumn(3);

        equal(sheet.frozenColumns(), 3);
    });

    test("insertColumn before a merged cells range moves the merged cells", function() {
        sheet.range("B1:C3").merge();

        sheet.insertColumn(0);

        var mergedCells = sheet._mergedCells;

        equal(mergedCells.length, 1);
        equal(mergedCells[0].toString(), "C1:D3");
    });

    test("insertColumn as merged cell first column moves the merged cells range", function() {
        sheet.range("A1:C3").merge();

        sheet.insertColumn(0);

        var mergedCells = sheet._mergedCells;

        equal(mergedCells.length, 1);
        equal(mergedCells[0].toString(), "B1:D3");
    });

    test("insertColumn into a merged cells range expands the merged cells", function() {
        sheet.range("A1:C3").merge();

        sheet.insertColumn(1);

        var mergedCells = sheet._mergedCells;

        equal(mergedCells.length, 1);
        equal(mergedCells[0].toString(), "A1:D3");
    });

    test("insertColumn frozen column expands frozen columns pane", function() {
        sheet.frozenColumns(3);

        sheet.insertColumn(0);

        equal(sheet.frozenColumns(), 4);
    });

    test("insertColumn non-frozen column does not expand frozen columns pane", function() {
        sheet.frozenColumns(3);

        sheet.insertColumn(3);

        equal(sheet.frozenColumns(), 3);
    });

    test("insertColumn clears the column and move the data to the right", function() {
        sheet.range("A:A").value(1);
        sheet.range("B:B").value(2);

        sheet.insertColumn(0);

        equal(sheet.range("A:A").value(), null);
        equal(sheet.range("B:B").value(), 1);
        equal(sheet.range("C:C").value(), 2);
    });

    test("insertRow adjust validation", 2, function() {
        sheet.range("A1").validation({
            from: "A2",
            comparerType: "greaterThan",
            dataType: "date"
        });

        sheet.insertRow(0);

        equal(sheet.range("A1").validation(), null);

        equal(sheet.range("A2").validation().comparerType, "greaterThan");
    });

    test("deleteRow adjust validation", function() {
        sheet.range("2:2").validation({
            from: "A2",
            comparerType: "greaterThan",
            dataType: "date"
        });

        sheet.deleteRow(0);

        equal(sheet.range("1:1").validation().comparerType, "greaterThan");
        equal(sheet.range("2:2").validation(), null);
    });

    test("deleteColumn moves the next column validation to the deleted one", function() {
        sheet.range("B:B").validation({
            from: "A2",
            comparerType: "greaterThan",
            dataType: "date"
        });

        sheet.deleteColumn(0);

        equal(sheet.range("A:A").validation().comparerType, "greaterThan");
        equal(sheet.range("B:B").value(), null);
    });

    test("insertColumn clears the column and move the validation to the right", function() {
        sheet.range("A:A").validation({
            from: "A2",
            comparerType: "greaterThan",
            dataType: "date"
        });
        sheet.range("B:B").validation({
            from: "A3",
            comparerType: "lessThan",
            dataType: "date"
        });

        sheet.insertColumn(0);

        equal(sheet.range("A:A").value(), null);
        equal(sheet.range("B:B").validation().comparerType, "greaterThan");
        equal(sheet.range("C:C").validation().comparerType, "lessThan");
    });

    test("activeCellSelection returns a Range containing only activeCell", function() {
        sheet.select("A1:A3", true);

        var range = sheet.activeCellSelection();

        ok(range._ref.eq(sheet.activeCell()));
    });

    module("Sheet trimming", {
        setup: function() {
            sheet = new kendo.spreadsheet.Sheet(defaults.rows, defaults.columns,
            defaults.rowHeight, defaults.columnWidth);
        }
    });

    test("sheet trims range from empty cells", function() {
        sheet.range("A2:B3").value(1);
        sheet.range("C1:C2").background("foo");

        var range = new RangeRef(new CellRef(0,0), new CellRef(3,3));

        ok(sheet.trim(range).eq(new RangeRef(new CellRef(0,0), new CellRef(2,2))));
    });

    test("sheet trimming preserves merged cells", function() {
        sheet.range("C3:D4").merge();
        sheet.range("A2:B3").value(1);
        sheet.range("C1:C2").background("foo");

        var range = new RangeRef(new CellRef(0,0), new CellRef(3,3));

        ok(sheet.trim(range).eq(new RangeRef(new CellRef(0,0), new CellRef(3,3))));
    });

    module("Sheet state", {
        setup: function() {
            sheet = new kendo.spreadsheet.Sheet(defaults.rows, defaults.columns,
            defaults.rowHeight, defaults.columnWidth);
        }
    });

    test("sheet state preserves hidden columns", function() {
        var state = sheet.getState();
        sheet.hideColumn(1);
        equal(sheet._grid._columns.sum(1, 1), 0);
        sheet.setState(state);
        equal(sheet._grid._columns.sum(1, 1), 64);
    });

    test("sheet state preserves merged cells", function() {
        sheet.range("C3:D4").merge();
        var state = sheet.getState();
        sheet.range("C3:D4").unmerge();
        sheet.setState(state);
        ok(sheet._mergedCells[0].eq(sheet._ref("C3:D4")));
    });

    test("sheet state preserves the property bag", 1, function() {
        sheet.range("C3:D4").value("foo");
        var state = sheet.getState();
        sheet.range("C3:D4").value("bar");
        sheet.setState(state);
        equal(sheet.range("C3:D4").value(), "foo");
    });

    test("setting the editor selection triggers change", 1, function() {
       sheet.bind("change", success);
       sheet._setFormulaSelections([]);
    });

    /* -----[ autofill ]----- */

    test("autofill from single number", function(){
        sheet.range("A1").value(1);
        var values = sheet.range("A2:A4").fillFrom("A1").values();
        deepEqual(values, [ [1], [1], [1] ]);
    });

    test("autofill simple progression", function(){
        sheet.range("A1:B2").values([ [1, 3], [2, 6] ]);
        var values1 = sheet.range("A3:B10").fillFrom("A1:B2").values();
        var values2 = sheet.range("C1:G2").fillFrom("A1:B2").values();
        deepEqual(values1, [
            [ 3, 9 ],
            [ 4, 12 ],
            [ 5, 15 ],
            [ 6, 18 ],
            [ 7, 21 ],
            [ 8, 24 ],
            [ 9, 27 ],
            [ 10, 30 ]
        ]);
        deepEqual(values2, [
            [ 5, 7, 9, 11, 13 ],
            [ 10, 14, 18, 22, 26 ]
        ]);
    });

    test("autofill from single weekday name", function(){
        sheet.range("F5").values([[ "Sun" ]]);
        var values = sheet.range("G5:L5").fillFrom("F5").values();
        deepEqual(values, [[ "Mon", "Tue", "Wed", "Thu", "Fri", "Sat" ]]);
    });

    test("autofill more weekday names", function(){
        sheet.range("F4:G4").values([[ "Mon", "Wed" ]]);
        var values = sheet.range("H4:L4").fillFrom("F4:G4").values();
        deepEqual(values, [[ "Fri", "Sun", "Tue", "Thu", "Sat" ]]);
    });

    test("autofill from single string with number", function(){
        sheet.range("F6").values([[ "Foo 1" ]]);
        var values = sheet.range("G6:L6").fillFrom("F6").values();
        deepEqual(values, [[ "Foo 2", "Foo 3", "Foo 4", "Foo 5", "Foo 6", "Foo 7" ]]);
    });

    test("autofill from single string with number with decimal part", function(){
        sheet.range("F7").values([[ "Foo 1.5" ]]);
        var values = sheet.range("G7:L7").fillFrom("F7").values();
        deepEqual(values, [[ "Foo 1.6", "Foo 1.7", "Foo 1.8", "Foo 1.9", "Foo 1.10", "Foo 1.11" ]]);
    });

    test("autofill from multiple strings with numbers", function(){
        sheet.range("F8:G8").values([[ "Foo 10", "Foo 8" ]]);
        var values = sheet.range("H8:L8").fillFrom("F8:G8").values();
        deepEqual(values, [[ "Foo 6", "Foo 4", "Foo 2", "Foo 0", "Foo -2" ]]);
    });

    test("autofill mixed series", function(){
        sheet.range("F10:F13").values([[ 1 ], [ 4 ], [ "Bar 2" ], [ "Bar 2.5" ]]);
        var values = sheet.range("F14:F25").fillFrom("F10:F13").values();
        deepEqual(values, [
            [  7 ], [ 10 ], [ "Bar 3" ], [ "Bar 2.6" ],
            [ 13 ], [ 16 ], [ "Bar 4" ], [ "Bar 2.7" ],
            [ 19 ], [ 22 ], [ "Bar 5" ], [ "Bar 2.8" ],
        ]);
    });

    test("autofill month names", function(){
        sheet.range("G10:G11").values([ ["January"], ["June"] ]);
        var values = sheet.range("G12:G22").fillFrom("G10:G11").values();
        deepEqual(values, [
            [ "November" ],
            [ "April" ],
            [ "September" ],
            [ "February" ],
            [ "July" ],
            [ "December" ],
            [ "May" ],
            [ "October" ],
            [ "March" ],
            [ "August" ],
            [ "January" ]
        ]);
    });

    test("autofill month names with no progression", function(){
        sheet.range("H10:H12").values([ ["Jan"], [ "May" ], [ "Feb" ]]);
        var values = sheet.range("H13:H22").fillFrom("H10:H12").values();
        deepEqual(values, [
            [ "Jan" ], [ "May" ], [ "Feb" ],
            [ "Jan" ], [ "May" ], [ "Feb" ],
            [ "Jan" ], [ "May" ], [ "Feb" ],
            [ "Jan" ]
        ]);
    });

    test("autofill mix month names and number", function(){
        sheet.range("I10:I12").values([ ["Jan"], ["Feb"], [2] ]);
        var values = sheet.range("I13:I30").fillFrom("I10:I12").values();
        deepEqual(values, [
            [ "Mar" ], [ "Apr" ], [ 3 ],
            [ "May" ], [ "Jun" ], [ 4 ],
            [ "Jul" ], [ "Aug" ], [ 5 ],
            [ "Sep" ], [ "Oct" ], [ 6 ],
            [ "Nov" ], [ "Dec" ], [ 7 ],
            [ "Jan" ], [ "Feb" ], [ 8 ],
        ]);
    });

    test("autofill date", function(){
        var date = kendo.spreadsheet.calc.runtime.packDate(2015, 9, 26);
        sheet.range("J10")
            .value(date)
            .format("yyyy-mm-dd");
        var values = sheet.range("J11:J18").fillFrom("J10").values();
        equal(date, 42303);
        deepEqual(values, [
            [ 42304 ],
            [ 42305 ],
            [ 42306 ],
            [ 42307 ],
            [ 42308 ],
            [ 42309 ],
            [ 42310 ],
            [ 42311 ],
        ]);
        equal(sheet.range("J15").format(), "yyyy-mm-dd"); // keeps format
    });

})();
