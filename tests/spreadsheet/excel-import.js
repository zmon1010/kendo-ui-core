(function() {
    var zip;

    function addFile(name, content) {
        zip.files[name] = {
            asUint8Array: () =>
                Uint8Array.from(content, (c, i) => content.charCodeAt(i))
        };
    }

    // ------------------------------------------------------------
    module("Spreadsheet / Excel Import", {
        setup: function() {
            zip = { files: {} };
        }
    });

    test("sets solid fill to ARGB fgColor", function() {
        var THEME = {};
        var STYLESHEET = `
            <styleSheet>
              <fills>
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
              <fills>
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
              <fills>
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

    test("reads border style", function() {
        var THEME = {};
        var STYLESHEET = `
          <styleSheet>
          <borders>
            <border>
              <left style="thick">
                <color indexed="64"/>
              </left>
              <right/>
              <top/>
              <bottom/>
              <diagonal/>
            </border>
          </borders>
          </styleSheet>
        `;

        addFile("xl/styles.xml", STYLESHEET);

        var styles = kendo.spreadsheet._readStyles(zip, THEME);
        var border = styles.borders[0];

        equal(border.left.style, "thick");
    });

    test("reads border indexed color", function() {
        var THEME = { };
        var STYLESHEET = `
          <styleSheet>
          <borders>
            <border>
              <left/>
              <right style="thick">
                <color indexed="64"/>
              </right>
              <top/>
              <bottom/>
              <diagonal/>
            </border>
          </borders>
          </styleSheet>
        `;

        addFile("xl/styles.xml", STYLESHEET);

        var styles = kendo.spreadsheet._readStyles(zip, THEME);
        var border = styles.borders[0];

        equal(border.right.color, "rgba(0, 0, 0, 1)");
    });

    test("reads border theme color", function() {
        var THEME = {
            colorScheme: ["rgba(255, 0, 0, 1)"]
        };
        var STYLESHEET = `
          <styleSheet>
          <borders>
            <border>
              <left/>
              <right/>
              <top style="thick">
                <color theme="0"/>
              </top>
              <bottom/>
              <diagonal/>
            </border>
          </borders>
          </styleSheet>
        `;

        addFile("xl/styles.xml", STYLESHEET);

        var styles = kendo.spreadsheet._readStyles(zip, THEME);
        var border = styles.borders[0];

        equal(border.top.color, "rgba(255, 0, 0, 1)");
    });

    test("reads border theme tinted color", function() {
        var THEME = {
            colorScheme: ["rgba(48, 172, 236, 1)"]
        };
        var STYLESHEET = `
          <styleSheet>
          <borders>
            <border>
              <left/>
              <right/>
              <top style="thick">
                <color theme="0" tint="-0.25"/>
              </top>
              <bottom/>
              <diagonal/>
            </border>
          </borders>
          </styleSheet>
        `;

        addFile("xl/styles.xml", STYLESHEET);

        var styles = kendo.spreadsheet._readStyles(zip, THEME);
        var border = styles.borders[0];

        equal(border.top.color, "rgba(18, 135, 195, 1)");
    });

    test("sets solid fill to -tinted theme fgColor", function() {
        var THEME = {
            colorScheme: ["rgba(48, 172, 236, 1)"]
        };
        var STYLESHEET = `
            <styleSheet>
              <fills>
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
              <fills>
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

    test("reads theme colors", function() {
        var THEME = `
            <a:theme name="Office Theme">
              <a:themeElements>
                <a:clrScheme name="Office">
                  <a:dk1>
                    <a:sysClr val="windowText" lastClr="000000"/>
                  </a:dk1>
                  <a:lt1>
                    <a:sysClr val="window" lastClr="FFFFFF"/>
                  </a:lt1>
                  <a:dk2>
                    <a:srgbClr val="44546A"/>
                  </a:dk2>
                  <a:lt2>
                    <a:srgbClr val="E7E6E6"/>
                  </a:lt2>
                  <a:accent1>
                    <a:srgbClr val="5B9BD5"/>
                  </a:accent1>
                  <a:accent2>
                    <a:srgbClr val="ED7D31"/>
                  </a:accent2>
                  <a:accent3>
                    <a:srgbClr val="A5A5A5"/>
                  </a:accent3>
                  <a:accent4>
                    <a:srgbClr val="FFC000"/>
                  </a:accent4>
                  <a:accent5>
                    <a:srgbClr val="4472C4"/>
                  </a:accent5>
                  <a:accent6>
                    <a:srgbClr val="70AD47"/>
                  </a:accent6>
                  <a:hlink>
                    <a:srgbClr val="0563C1"/>
                  </a:hlink>
                  <a:folHlink>
                    <a:srgbClr val="954F72"/>
                  </a:folHlink>
                </a:clrScheme>
              </a:themeElements>
            </a:theme>
        `;

        addFile("xl/theme/theme1.xml", THEME);

        var theme = kendo.spreadsheet._readTheme(zip, "theme/theme1.xml");

        deepEqual(theme.colorScheme, [
            // Notice lt1 <-> dk1 swap,
            // system color defaults
            "rgba(255, 255, 255, 1)",
            "rgba(0, 0, 0, 1)",

            // Notice lt2 <-> dk2 swap
            "rgba(231, 230, 230, 1)",
            "rgba(68, 84, 106, 1)",

            "rgba(91, 155, 213, 1)",
            "rgba(237, 125, 49, 1)",
            "rgba(165, 165, 165, 1)",
            "rgba(255, 192, 0, 1)",
            "rgba(68, 114, 196, 1)",
            "rgba(112, 173, 71, 1)",
            "rgba(5, 99, 193, 1)",
            "rgba(149, 79, 114, 1)"
        ]);
    });

    test("reads strings", function() {
        var STRINGS = `
            <sst count="2" uniqueCount="2">
              <si>
                <t>String 1</t>
              </si>
              <si>
                <t>String 2</t>
              </si>
            </sst>
        `;

        addFile("xl/sharedStrings.xml", STRINGS);

        var strings = kendo.spreadsheet._readStrings(zip);
        deepEqual(strings, ["String 1", "String 2"]);
    });

    test("does not fail if no strings are defined", 0, function() {
        kendo.spreadsheet._readStrings(zip);
    });
})();
