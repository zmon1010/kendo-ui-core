(function() {
    var zip;

    function addFile(name, content) {
        zip.files[name] = {
            asUint8Array: () =>
                Uint8Array.from(content, (c, i) => content.charCodeAt(i))
        };
    }

    // ------------------------------------------------------------
    module("Spreadsheet / Excel Import / Styles", {
        setup: function() {
            zip = { files: {} };
        }
    });

    test("sets solid fill to ARGB fgColor", function() {
        var THEME = {};
        var STYLESHEET = `
            <styleSheet>
              <fills count="4">
                <fill>
                  <patternFill patternType="solid">
                    <fgColor rgb="FFCCFF00"/>
                    <bgColor indexed="64"/>
                  </patternFill>
                </fill>
              </fills>
            </styleSheet>
        `;

        addFile("xl/styles.xml", STYLESHEET);

        var styles = kendo.spreadsheet._readStyles(zip, THEME);
        equal(styles.fills[0].color, "rgba(204, 255, 0, 1)");
    });

    test("sets solid fill to indexed fgColor", function() {
        var THEME = {};
        var STYLESHEET = `
            <styleSheet>
              <fills count="4">
                <fill>
                  <patternFill patternType="solid">
                    <fgColor indexed="64"/>
                    <bgColor rgb="FFCCFF00"/>
                  </patternFill>
                </fill>
              </fills>
            </styleSheet>
        `;

        addFile("xl/styles.xml", STYLESHEET);

        var styles = kendo.spreadsheet._readStyles(zip, THEME);
        equal(styles.fills[0].color, "rgba(0, 0, 0, 1)");
    });

    test("sets solid fill to theme fgColor", function() {
        var THEME = {
            colorScheme: ["rgba(204, 255, 0, 1)"]
        };
        var STYLESHEET = `
            <styleSheet>
              <fills count="4">
                <fill>
                  <patternFill patternType="solid">
                    <fgColor theme="0"/>
                    <bgColor indexed="64"/>
                  </patternFill>
                </fill>
              </fills>
            </styleSheet>
        `;

        addFile("xl/styles.xml", STYLESHEET);

        var styles = kendo.spreadsheet._readStyles(zip, THEME);
        equal(styles.fills[0].color, "rgba(204, 255, 0, 1)");
    });

    test("sets solid fill to -tinted theme fgColor", function() {
        var THEME = {
            colorScheme: ["rgba(48, 172, 236, 1)"]
        };
        var STYLESHEET = `
            <styleSheet>
              <fills count="4">
                <fill>
                  <patternFill patternType="solid">
                    <fgColor theme="0" tint="-0.25"/>
                    <bgColor indexed="64"/>
                  </patternFill>
                </fill>
              </fills>
            </styleSheet>
        `;

        addFile("xl/styles.xml", STYLESHEET);

        var styles = kendo.spreadsheet._readStyles(zip, THEME);
        equal(styles.fills[0].color, "rgba(18, 135, 195, 1)");
    });

    test("sets solid fill to +tinted theme fgColor", function() {
        var THEME = {
            colorScheme: ["rgba(48, 172, 236, 1)"]
        };
        var STYLESHEET = `
            <styleSheet>
              <fills count="4">
                <fill>
                  <patternFill patternType="solid">
                    <fgColor theme="0" tint="0.6"/>
                    <bgColor indexed="64"/>
                  </patternFill>
                </fill>
              </fills>
            </styleSheet>
        `;

        addFile("xl/styles.xml", STYLESHEET);

        var styles = kendo.spreadsheet._readStyles(zip, THEME);
        equal(styles.fills[0].color, "rgba(172, 222, 247, 1)");
    });
})();
