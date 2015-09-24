(function() {
    var workbook;
    var sheet;
    var clipboard;
    var defaults = {"prefix":"","name":"Spreadsheet","toolbar":true,"rows":200,"columns":10,"rowHeight":20,"columnWidth":64,"headerHeight":20,"headerWidth":32};
    var range;

    module("Clipboard API", {
        setup: function() {
            workbook = new kendo.spreadsheet.Workbook(defaults);
            sheet = workbook.activeSheet();
            clipboard = workbook.clipboard();
            range = sheet.range(0, 0);
        },
        teardown: function() {
            sheet.unbind();
            workbook.destroy();
            kendo.destroy(QUnit.fixture);
            QUnit.fixture.empty();
        }
    });

    test("basic copy - paste works", function() {
        sheet.range("A1").value("test").select();
        clipboard.copy();
        sheet.range("B1").select();
        clipboard.paste();

        equal(sheet.range("B1").value(), "test");
    });

    test("paste on sheet edge truncates the clipboard contents", function() {
        sheet.range("A1:C1").value("test").select();
        clipboard.copy();
        sheet.range("I1:J1").select();
        clipboard.paste();

        equal(sheet.range("J1").value(), "test");
    });

    test("can copy returns false for union ranges", function() {
        sheet.range("A1:C1,B2").select();
        clipboard.copy();

        ok(!clipboard.canCopy())
    });

    test("canPaste returns false if merged cells are partially overlapped", function() {
        sheet.range("A1:C1").select();
        clipboard.copy();

        sheet.range("D1:F1").merge();
        sheet.range("C1").select();

        ok(!clipboard.canPaste())
    });

    test("canPaste returns true if no merged cells are affected", function() {
        sheet.range("A1:C1").select();
        clipboard.copy();

        sheet.range("C1").select();

        ok(clipboard.canPaste());
    });

    test("canPaste returns false if pasting into larger merged cell", function() {
        sheet.range("A1:C1").select();
        clipboard.copy();

        sheet.range("D1:G1").merge().select();

        ok(!clipboard.canPaste());
    });

    test("parse returns font-size as integer", function() {
        var state = clipboard.parse({
            html: "<table><trbody><tr><td style='font-size: 8px'>foo</td></tr></tbody></table>"
        });

        equal(state["0,0"].fontSize, 8);
    });

    test("parseHTML handles merged cells with rowspan", function() {
        var state = clipboard.parse({
            html: '<table> <tbody> <tr> <td>0,0</td> <td rowspan="2">0,1 - 1,1</td> <td>0,2</td> </tr> <tr> <td>1,0</td> <td>1,2</td> </tr> </tbody> </table>'
        });
        var newState = {};
        delete state.ref;
        Object.keys(state).sort().forEach(function(key, i){
            if(key != "mergedCells"){
                newState[key] = {value: state[key].value};
            }else{
                newState[key] = state[key];
            }
        });
        var targetState = {
            "mergedCells" : ["B1:B2"],
            "0,0" : {
                "value" : "0,0",
            },
            "0,1" : {
                "value" : "0,1 - 1,1",
            },
            "0,2" : {
                "value" : "0,2",
            },
            "1,0" : {
                "value" : "1,0",
            },
            "1,1" : {
                "value" : null,
            },
            "1,2" : {
                "value" : "1,2",
            }
        };
        var expected = {};
        Object.keys(targetState).sort().forEach(function(key, i){
            if(key != "mergedCells"){
                expected[key] = {value: targetState[key].value};
            }else{
                expected[key] = targetState[key];
            }
        });
        
        equal(JSON.stringify(newState), JSON.stringify(expected));
    });
    test("parseHTML handles merged cells with colspan", function() {
        var state = clipboard.parse({
            html: '<table> <tbody> <tr><td>0,0</td><td colspan="2">0,1 - 0,2</td><td>0,3</td></tr><tr><td>1,0</td><td>1,1</td><td>1,2</td><td>1,3</td></tr> </tbody> </table>'
        });
        var newState = {};
        delete state.ref;
        Object.keys(state).sort().forEach(function(key, i){
            if(key != "mergedCells"){
                newState[key] = {value: state[key].value};
            }else{
                newState[key] = state[key];
            }
        });
        var targetState = {
            "mergedCells" : ["B1:C1"],
            "0,0" : {
                "value" : "0,0"
            },
            "1,0" : {
                "value" : "1,0"
            },
            "0,1" : {
                "value" : "0,1 - 0,2"
            },
            "1,1" : {
                "value" : "1,1"
            },
            "0,2" : {
                "value" : null
            },
            "1,2" : {
                "value" : "1,2"
            },
            "0,3" : {
                "value" : "0,3"
            },
            "1,3" : {
                "value" : "1,3"
            }
        };

        var expected = {};
        Object.keys(targetState).sort().forEach(function(key, i){
            if(key != "mergedCells"){
                expected[key] = {value: targetState[key].value};
            }else{
                expected[key] = targetState[key];
            }
        });
        
        equal(JSON.stringify(newState), JSON.stringify(expected));
    });
    test("parseHTML handles merged cells with colspan and rowspan", function() {
        var state = clipboard.parse({
            html: '<table> <td>0,0</td> <td colspan="2" rowspan="3">0,1-0,2:2,1-2,2</td> </tr> <tr> <td>1,0</td> </tr> <tr> <td >2,0</td> </tr> </tbody> </table>'
        });
        var newState = {};
        delete state.ref;
        Object.keys(state).sort().forEach(function(key, i){
            if(key != "mergedCells"){
                newState[key] = {value: state[key].value};
            }else{
                newState[key] = state[key];
            }
        });
        var targetState = {
            "mergedCells" : ["B1:C3"],
            "0,0" : {
                "value" : "0,0" 
            },
            "1,0" : {
                "value" : "1,0" 
            },
            "2,0" : {
                "value" : "2,0" 
            },
            "0,1" : {
                "value" : "0,1-0,2:2,1-2,2" 
            },
            "1,1" : {
                "value" : null 
            },
            "2,1" : {
                "value" : null 
            },
            "0,2" : {
                "value" : null 
            },
            "1,2" : {
                "value" : null 
            },
            "2,2" : {
                "value" : null 
            }
        };

        var expected = {};
        Object.keys(targetState).sort().forEach(function(key, i){
            if(key != "mergedCells"){
                expected[key] = {value: targetState[key].value};
            }else{
                expected[key] = targetState[key];
            }
        });
        
        equal(JSON.stringify(newState), JSON.stringify(expected));
    });
})();
