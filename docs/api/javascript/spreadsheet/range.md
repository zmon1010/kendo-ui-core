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
