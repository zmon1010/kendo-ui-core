---
title: Add Background Color to Sorted Columns by Using LESS Themes
page_title: Add Background Color to Sorted Columns by Using LESS Themes | Kendo UI Grid
description: "Learn how to add a background color to the sorted columns in a Kendo UI Grid by using the LESS themes."
slug: howto_add_background_sorted_columns_LESS_themes_grid
---

# Add Background Color to Sorted Columns by Using LESS Themes

Your project might require you to add a background color to the sorted columns of the Grid by using the [LESS themes]({% slug themesandappearnce_kendoui_desktopwidgets %}).

To achieve this behavior:

1. Change the default background of the alternate row to an RGBA color format with a low opaque level.
1. Add the background color to the `.k-sorted` class by using the RGBA color format.

> **Important**
> * The `.k-sorted` class is available as of the Kendo UI 2017 R2 SP1 release.
> * If you do not override the `k-alt` class, the background color of the `.k-sorted` class will not apply.

## Scenarios

The following examples demonstrate how to change the background color of selected rows in a Grid when working with:

* [Dark themes](#dark-themes)
* [Light themes](#light-themes)

### Dark Themes

When working with dark theme, use light colors.

###### Example

```tab-Black-theme
    .k-grid .k-alt{
        background-color: rgba(255, 255, 255, 0.04);
    }
    col.k-sorted, th.k-sorted {
        background-color: rgba(255, 255, 255, 0.2);
    }
```
```tab-Material-Black-theme
    .k-grid .k-alt{
        background-color: rgba(255, 255, 255, 0);
    }
    col.k-sorted, th.k-sorted {
        background-color: rgba(255, 255, 255, 0.1);
    }
```

### Light Themes

When working with light themes, use dark colors.

###### Example

For the Kendo UI **Default** theme, the CSS code could look like this:

```tab-Default-theme
    .k-grid .k-alt{
        background-color: rgba(0, 0, 0, 0.06);
    }
    col.k-sorted, th.k-sorted {
        background-color: rgba(0, 0, 0, 0.1);
    }
```
```tab-Material-theme
    .k-grid .k-alt{
        background-color: rgba(0, 0, 0, 0);
    }
    col.k-sorted, th.k-sorted {
        background-color: rgba(0, 0, 0, 0.1);
    }
```

## See Also

* [JavaScript API Reference of the Grid](/api/javascript/ui/grid)
* [How to Implement Stable Sort in Chrome]({% slug howto_implement_stable_sortin_chrome_grid %})
* [Grid Sorting Demo](http://demos.telerik.com/kendo-ui/grid/sorting)

For more runnable examples on the Kendo UI Grid, browse its [**How To** documentation folder]({% slug howto_adjust_row_heights_template_locked_columns_grid %}).
