(function() {
    var element;
    var dialog;
    var colorPalette;
    var borderPalette;

    var moduleOptions = {
        teardown: function() {
            kendo.effects.enable();
            kendo.destroy(QUnit.fixture);
            QUnit.fixture.empty();
        }
    };

    module("spreadsheet ColorChooser", {
        setup: function() {
            kendo.effects.disable();

            element = $("<div>").appendTo(QUnit.fixture);
            colorChooser = new kendo.spreadsheet.ColorChooser(element, { color: "#000" });
        },
        teardown: moduleOptions.teardown
    });

    test("initialises colorPalette", function() {
        ok(colorChooser.colorPalette instanceof kendo.ui.ColorPalette);
    });

    test("initialises dialog", function() {
        ok(colorChooser.dialog instanceof kendo.ui.Window);
        ok(colorChooser.dialog.element.hasClass("k-spreadsheet-window"));
    });

    test("initialises flatColorPicker", function() {
        ok(colorChooser.flatColorPicker instanceof kendo.ui.FlatColorPicker);
    });

    test("clicking the reset button resets the color", 4, function() {
        colorChooser.bind("change", function(e) {
            equal(e.value, null);
        });

        colorChooser.resetButton.trigger("click");

        equal(colorChooser.colorPalette.value(), null);
        equal(colorChooser.flatColorPicker.value(), null);
        equal(colorChooser.value(), null);
    });

    test("clicking the customColor button opens the dialog", 1, function() {
        colorChooser.dialog.bind("open", function() {
            ok(true);
        });

        colorChooser.customColorButton.trigger("click");
    });

    test("applies custom color", 1, function() {
        colorChooser.bind("change", function(e) {
            equal(e.value, "#ff0000");
        });

        colorChooser.flatColorPicker.value("#ff0000");
        colorChooser.dialog.element.find(".k-button.k-primary").trigger("click");
    });
    
    test("does not applies custom color when cancel is clicked", 0, function() {
        colorChooser.bind("change", function(e) {
            ok(false);
        });

        colorChooser.flatColorPicker.value("#ff0000");
        colorChooser.dialog.element.find(".k-button:not(.k-primary)").trigger("click");
    });

    module("spreadsheet BorderPalette", {
        setup: function() {
            kendo.effects.disable();

            element = $("<div>").appendTo(QUnit.fixture);
            borderPalette = new kendo.spreadsheet.BorderPalette(element);
        },
        teardown: moduleOptions.teardown
    });

    test("initialises borderPalette", function() {
        ok(borderPalette.element.find(".k-spreadsheet-border-type-palette").length);
    });

    test("initialises colorChooser", function() {
        ok(borderPalette.colorChooser instanceof kendo.spreadsheet.ColorChooser);
    });

    test("does not trigger change if border type is not yet selected", 0, function() {
        borderPalette.bind("change", function() {
            ok(false);
        });

        borderPalette._colorChange({ value: "#ff0000" });
    });

})();
