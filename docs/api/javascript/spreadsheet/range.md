---
title: kendo.spreadsheet.Range
page_title: Configuration, methods and events of Kendo UI Spreadsheet Range Instance object
---

# kendo.spreadsheet.Range

Represents one or more rectangular regions of cells in a given [Sheet](/api/javascript/spreadsheet/sheet). Inherits from [Class](/api/javascript/class).

An instance of a range object may be obtained as a return value from the Sheet [range](/api/javascript/spreadsheet/sheet#methods-range) or [selection](/api/javascript/spreadsheet/sheet#methods-selection) methods.

## Methods

### borderBottom

Gets or sets the state of the bottom border of the cells. If the range includes more than a single cell, the setting is applied to all cells.

#### Parameters

##### value `Object` *optional*

The border configuration object. It may contain `size` and `color` keys.

The `color` may be set to any valid [CSS color](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value).
The `size` accepts any valid [Length value](https://developer.mozilla.org/en-US/docs/Web/CSS/length).

#### Returns

`Object` the current value of the top-left cell of the range.

#### Example

```html
    <div id="spreadsheet"></div>
    <script type="text/javascript" charset="utf-8">

        $("#spreadsheet").kendoSpreadsheet();

        var spreadsheet = $("#spreadsheet").data("kendoSpreadsheet");

        var sheet = spreadsheet.activeSheet();

        sheet.range("A2:B3").borderBottom({ size: "2px", color: "green" });
    </script>
```

### borderLeft

Gets or sets the state of the left border of the cells. If the range includes more than a single cell, the setting is applied to all cells.

#### Parameters

##### value `Object` *optional*

The border configuration object. It may contain `size` and `color` keys.

The `color` may be set to any valid [CSS color](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value).
The `size` accepts any valid [Length value](https://developer.mozilla.org/en-US/docs/Web/CSS/length).

#### Returns

`Object` the current value of the top-left cell of the range.

#### Example

```html
    <div id="spreadsheet"></div>
    <script type="text/javascript" charset="utf-8">

        $("#spreadsheet").kendoSpreadsheet();

        var spreadsheet = $("#spreadsheet").data("kendoSpreadsheet");

        var sheet = spreadsheet.activeSheet();

        sheet.range("A2:B3").borderLeft({ size: "2px", color: "green" });
    </script>
```

### borderRight

Gets or sets the state of the right border of the cells. If the range includes more than a single cell, the setting is applied to all cells.

#### Parameters

##### value `Object` *optional*

The border configuration object. It may contain `size` and `color` keys.

The `color` may be set to any valid [CSS color](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value).
The `size` accepts any valid [Length value](https://developer.mozilla.org/en-US/docs/Web/CSS/length).

#### Returns

`Object` the current value of the top-left cell of the range.

#### Example

```html
    <div id="spreadsheet"></div>
    <script type="text/javascript" charset="utf-8">

        $("#spreadsheet").kendoSpreadsheet();

        var spreadsheet = $("#spreadsheet").data("kendoSpreadsheet");

        var sheet = spreadsheet.activeSheet();

        sheet.range("A2:B3").borderRight({ size: "2px", color: "green" });
    </script>
```

### borderTop

Gets or sets the state of the top border of the cells. If the range includes more than a single cell, the setting is applied to all cells.

#### Parameters

##### value `Object` *optional*

The border configuration object. It may contain `size` and `color` keys.

The `color` may be set to any valid [CSS color](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value).
The `size` accepts any valid [Length value](https://developer.mozilla.org/en-US/docs/Web/CSS/length).

#### Returns

`Object` the current value of the top-left cell of the range.

#### Example

```html
    <div id="spreadsheet"></div>
    <script type="text/javascript" charset="utf-8">

        $("#spreadsheet").kendoSpreadsheet();

        var spreadsheet = $("#spreadsheet").data("kendoSpreadsheet");

        var sheet = spreadsheet.activeSheet();

        sheet.range("A2:B3").borderTop({ size: "2px", color: "green" });
    </script>
```

### input

Gets or sets the value of the cells. If the string passed starts with `=`, the method *sets the formula* of the cell.

#### Parameters

##### value `String|Number|Date` *optional*

The value to be set to the cells.

#### Returns

`Object` the current value of the top-left cell of the range.

#### Example

```html
    <div id="spreadsheet"></div>
    <script type="text/javascript" charset="utf-8">

        $("#spreadsheet").kendoSpreadsheet();

        var spreadsheet = $("#spreadsheet").data("kendoSpreadsheet");

        var sheet = spreadsheet.activeSheet();

        sheet.range("A1").input("1");
        sheet.range("A2").input("=A1*2");
    </script>
```

### value

Gets or sets the value of the cells.

> If the cell has formula set, the value setting will clear it.

#### Parameters

##### value `String|Number|Date` *optional*

The value to be set to the cells.

#### Returns

`Object` the current value of the top-left cell of the range.

#### Example

```html
    <div id="spreadsheet"></div>
    <script type="text/javascript" charset="utf-8">

        $("#spreadsheet").kendoSpreadsheet();

        var spreadsheet = $("#spreadsheet").data("kendoSpreadsheet");

        var sheet = spreadsheet.activeSheet();

        sheet.range("A1:B2").value("foo");
    </script>
```

### format

Gets or sets the format of the cells.

#### Parameters

##### format `String` *optional*

The new format for the cells (see below).

#### Returns

`String` the format of the top-left cell of the range.  When used as a
setter, `format` returns the Range object to allow chained calls.

#### Example

```html
    <div id="spreadsheet"></div>
    <script type="text/javascript" charset="utf-8">

        $("#spreadsheet").kendoSpreadsheet();

        var spreadsheet = $("#spreadsheet").data("kendoSpreadsheet");

        var sheet = spreadsheet.activeSheet();

        sheet.range("A1").value(12.3456).format("#.###");
    </script>
```

#### Format strings

The supported format string is mostly Excel-compatible.  A format string consists of one or more sections (separated
with semicolons).  A section can optionally specify a color and a condition.  Here are some examples:

Display a number with at most 3 decimals:

    #.###

Display pozitive numbers (or zero) in green, negative numbers in red:

    [Green]#.###;[Red]#.###

Display pozitive numbers in green, negative numbers in red, and the text "Zero" in blue if the number is zero.

    [Green]#.###;[Red]#.###;[Blue]"Zero"

Same as above, but if the cell contains text display it in magenta:

    [Green]#.###;[Red]#.###;[Blue]"Zero";[Magenta]@

Excel documentation mentions that at most 4 sections are supported, and if all are present then they are interpreted in
this order:

- pozitive numbers format
- negative numbers format
- format for zero
- format for text

Excel also supports a more flexible conditional formatting, for example to display numbers bigger than 100 in green,
numbers smaller than -100 in yellow, and other numbers in cyan:

    [>100][GREEN]#,##0;[<=-100][YELLOW]#,##0;[CYAN]#,##0

It is not clear in this case whether only at most four sections are allowed, of which the last one must be text.  Our
formatter allows any number of conditional sections.

##### Text and number formatting

| Character | Meaning                                                                                                                                                                                                                    |
|-----------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `0`       | Digit placeholder.  Use this to display insignificant zeroes, for example `8.9` with the format `00.000` will display as `08.900`                                                                                          |
| `#`       | Digit placeholder.  This does not display insignificant zeroes, for example `12.34` in format `###.###` will display as `12.34`                                                                                            |
| `?`       | Digit placeholder.  Similar to `0`, but this displays a space character instead of zero.  You can use this to align numbers by decimal point, for example (but you should use a fixed-width font for this to be effective) |
| `.`       | Decimal point.                                                                                                                                                                                                             |
| `,`       | Thousands separator, or scale (see below)                                                                                                                                                                                  |
| `\`       | Escape the next character (display literally)                                                                                                                                                                              |
| `_`       | Skip the width of the next character.                                                                                                                                                                                      |
| `"text"`  | Includes a piece of text in the format.  Characters inside will not be interpreted in any way, they will just output literally.                                                                                            |
| `@`       | Text placeholder.  Will be replaced with the text in the cell.                                                                                                                                                             |

The thousands separator (`,`) has a double role.  When between any digit placeholders, it will output a number with
thousands separated by the separator in the current culture.  For instance `#,#` will format `1234567` as `1,234,567`.
When a comma follows a digit placeholder but is not followed by one, it will scale the number by one thousand.  For
instance `#.##,` will format `12345` as `12.35`.  Here is a more complicated format that shows where this could be
useful:

    [>1000000]#.##,,"M";[>1000]#.##,"K";[>0]#"B";[=0]"Empty";[<0]"Replace HDD!"

Example values:

|    Value | Display      |
|----------+--------------|
| 12345678 | 12.35M       |
|    34567 | 34.57K       |
|      123 | 123B         |
|        0 | Empty        |
|      -10 | Replace HDD! |

##### Date and time formatting

| Format string | Meaning                                                                           |
|---------------+-----------------------------------------------------------------------------------|
| m             | Display month number without leading zero                                         |
| mm            | Display month number with leading zero                                            |
| mmm           | Display short month name in current culture                                       |
| mmmm          | Display full month name in current culture                                        |
| d             | Display date number without leading zero                                          |
| dd            | Display date number with leading zero                                             |
| ddd           | Display the abbreviated week day name                                             |
| dddd          | Display the full week day name                                                    |
| yy            | Display the year as two digit number                                              |
| yyyy          | Display the full year number                                                      |
|---------------+-----------------------------------------------------------------------------------|
| h             | Display hour without leading zero                                                 |
| hh            | Display hour including leading zero                                               |
| m             | Display minute without leading zero                                               |
| mm            | Display minute including leading zero                                             |
| s             | Display second without leading zero                                               |
| ss            | Display second including leading zero                                             |
| [h]           | Elapsed time, in hours                                                            |
| [m]           | Elapsed time in minutes                                                           |
| [s]           | Elapsed time in seconds                                                           |
| AM/PM         | Forces hours to display in 12-hours clock, and displays `AM` or `PM` as necessary |
| am/pm         | Same as above, but displays lower-case `am` or `pm`                               |
| A/P           | Same as above, but displays `A` or `P`                                            |
| a/p           | Idem, but displays `a` or `p`                                                     |

You can notice that the month and minute specifiers are ambiguous (`m` or `mm`).  It is interpreted as month number,
unless preceded by a hour part (`h` or `hh`) in which case it'll display minutes.  Therefore:

| Format string             | Example display         |
|---------------------------+-------------------------|
| d m yyyy                  | 22 9 2015               |
| h "hours and" m "minutes" | 12 hours and 25 minutes |

##### Differences to Excel

- no support for exponent (“scientific”) notation (Excel's `E+`, `E-` formats).
- no support for filling cell width (Excel's `*` format).

### formula
### validation
### merge
### unmerge
### select
### values
### clear
### filter
### clearFilter
### clearFilters
### hasFilter
### wrap
