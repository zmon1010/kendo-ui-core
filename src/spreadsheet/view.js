(function(f, define){
    define([ "../kendo.core", "../kendo.menu", "./sheetsbar" ], f);
})(function(){

(function(kendo) {
    if (kendo.support.browser.msie && kendo.support.browser.version < 9) {
        return;
    }

    var $ = kendo.jQuery;
    var CellRef = kendo.spreadsheet.CellRef;
    var DOT = ".";
    var RESIZE_HANDLE_WIDTH = 7;
    var viewClassNames = {
        view: "k-spreadsheet-view",
        fixedContainer: "k-spreadsheet-fixed-container",
        scroller: "k-spreadsheet-scroller",
        viewSize: "k-spreadsheet-view-size",
        clipboard: "k-spreadsheet-clipboard",
        cellEditor: "k-spreadsheet-cell-editor",
        barEditor: "k-spreadsheet-editor",
        topCorner: "k-spreadsheet-top-corner",
        filterHeadersWrapper: "k-filter-wrapper",
        filterRange: "k-filter-range",
        filterButton: "k-spreadsheet-filter",
        filterButtonActive: "k-state-active",
        icon: "k-icon k-font-icon",
        iconFilterDefault: "k-i-arrow-s",
        sheetsBar: "k-spreadsheet-sheets-bar",
        sheetsBarActive: "k-spreadsheet-sheets-bar-active",
        sheetsBarInactive: "k-spreadsheet-sheets-bar-inactive",
        cellContextMenu: "k-spreadsheet-cell-context-menu",
        rowHeaderContextMenu: "k-spreadsheet-row-header-context-menu",
        colHeaderContextMenu: "k-spreadsheet-col-header-context-menu"
    };

    var messages = kendo.spreadsheet.messages.view = {
        errors: {
            shiftingNonblankCells: "Cannot insert cells due to data loss possibility. Select another insert location or delete the data from the end of your worksheet."
        },
        tabs: {
            home: "Home",
            insert: "Insert",
            data: "Data"
        }
    };

    function selectElementContents(el) {
        var sel = window.getSelection();
        sel.removeAllRanges();

        var range = document.createRange();
        range.selectNodeContents(el);

        sel.addRange(range);
    }

    function cellBefore(table, row) {
        var cells = table.trs[row].children;
        return cells[cells.length - 2];
    }

    function cellAbove(table, row) {
        var prevRow = table.trs[row-1];
        var index = table.trs[row].children.length-1;

        if (prevRow && index >= 0) {
            return prevRow.children[index];
        }
    }

    function cellBorder(value) {
        return [
            "solid",
            value.size || "1px",
            value.color || "#000"
        ].join(" ");
    }

    function addCell(table, row, cell) {
        var style = {};

        if (cell.background) {
            style.backgroundColor = cell.background;
        }

        if (cell.color) {
            style.color = cell.color;
        }

        if (cell.fontFamily) {
            style.fontFamily = cell.fontFamily;
        }

        if (cell.underline) {
            style.textDecoration = "underline";
        }

        if (cell.italic) {
            style.fontStyle = "italic";
        }

        if (cell.textAlign) {
            style.textAlign = cell.textAlign;
        }

        if (cell.verticalAlign) {
            style.verticalAlign = cell.verticalAlign;
        }

        if (cell.bold) {
            style.fontWeight = "bold";
        }

        if (cell.fontSize) {
            style.fontSize = cell.fontSize + "px";
        }

        if (cell.wrap === true) {
            style.whiteSpace = "normal";
            style.wordBreak = "break-all";
        } else {
            style.whiteSpace = "nowrap";
        }

        if (cell.borderRight) {
            style.borderRight = cellBorder(cell.borderRight);
        } else if (cell.background) {
            style.borderRightColor = cell.background;
        }

        if (cell.borderBottom) {
            style.borderBottom = cellBorder(cell.borderBottom);
        } else if (cell.background) {
            style.borderBottomColor = cell.background;
        }

        var data = cell.value, type = typeof data;
        if (cell.format && data !== null) {
            data = kendo.spreadsheet.formatting.format(data, cell.format);
            if (data.__dataType) {
                type = data.__dataType;
            }
        }

        if (!style.textAlign) {
            switch (type) {
               case "number":
               case "date":
                   style.textAlign = "right";
               break;
               case "boolean":
                   style.textAlign = "center";
               break;
            }
        }

        var td = table.addCell(row, data, style, null, cell.validation);

        var border, sibling;

        if (cell.borderLeft) {
            sibling = cellBefore(table, row);
            border = cellBorder(cell.borderLeft);
            if (sibling && border) {
                sibling.attr.style.borderRight = border;
            }
        } else if (cell.background) {
            style.borderLeftColor = cell.background;
        }

        if (cell.borderTop) {
            sibling = cellAbove(table, row);
            border = cellBorder(cell.borderTop);
            if (sibling && border) {
                sibling.attr.style.borderBottom = border;
            }
        } else if (cell.background) {
            style.borderTopColor = cell.background;
        }

        return td;
    }

    var HtmlTable = kendo.Class.extend({
        init: function() {
            this.cols = [];
            this.trs = [];
            this._height = 0;
            this._width = 0;
        },

        addColumn: function(width) {
            this._width += width;

            var col = kendo.dom.element("col", { style: { width: width + "px" } });

            col.visible = width > 0;

            this.cols.push(col);
        },

        addRow: function(height) {
            var attr = null;

            attr = { style: { height: height + "px" } };

            this._height += height;

            var tr = kendo.dom.element("tr", attr);

            tr.visible = height > 0;

            this.trs.push(tr);
        },

        addCell: function(rowIndex, text, style, className, validation) {
            if (text === null || text === undefined) {
                text = "";
            }
            if (!(text instanceof kendo.dom.Node)) {
                text = kendo.dom.text(text);
            }

            var children = [ text ];
            var properties = { style: style };

            if (validation && !validation.value) {
                children.push(kendo.dom.element("span", { className: "k-dirty" }));

                className = (className || "") + (className ? " " : "") + "k-dirty-cell";
                properties.title = validation._getOptions().messageTemplate;
            }

            if (className) {
                properties.className = className;
            }
            var td = kendo.dom.element("td", properties, children);

            this.trs[rowIndex].children.push(td);
            return td;
        },

        toDomTree: function(x, y, className) {
            this.trs = this.trs.filter(function(tr) {
                return tr.visible;
            });

            var offset = 0;
            this.cols = this.cols.filter(function(col, ci) {
                if (!col.visible) {
                    this.trs.forEach(function(tr) {
                        tr.children.splice(ci - offset, 1);
                    });
                    offset++;
                }

                return col.visible;
            }, this);

            return kendo.dom.element("table", { style: { left: x + "px", top: y + "px", height: this._height + "px", width: this._width + "px" }, className: className },
                [
                    kendo.dom.element("colgroup", null, this.cols),
                    kendo.dom.element("tbody", null, this.trs)
                ]);
        }
    });

    var CELL_CONTEXT_MENU = '<ul class="#=classNames.cellContextMenu#">' +
        '<li data-action=cut>Cut</li>' +
        '<li data-action=copy>Copy</li>' +
        '<li data-action=paste>Paste</li>' +
        '<li class="k-separator"></li>' +
        '<li data-action=merge>Merge</li>' +
        '<li data-action=unmerge>Unmerge</li>' +
    '</ul>';

    var ROW_HEADER_CONTEXT_MENU = '<ul class="#=classNames.rowHeaderContextMenu#">' +
        '<li data-action=cut>Cut</li>' +
        '<li data-action=copy>Copy</li>' +
        '<li data-action=paste>Paste</li>' +
        '<li class="k-separator"></li>' +
        '<li data-action="delete-row">Delete</li>'+
        '<li data-action="hide-row">Hide</li>'+
        '<li data-action="unhide-row">Unhide</li>'+
    '</ul>';

    var COL_HEADER_CONTEXT_MENU = '<ul class="#=classNames.colHeaderContextMenu#">' +
        '<li data-action=cut>Cut</li>' +
        '<li data-action=copy>Copy</li>' +
        '<li data-action=paste>Paste</li>' +
        '<li class="k-separator"></li>' +
        '<li data-action="delete-column">Delete</li>'+
        '<li data-action="hide-column">Hide</li>'+
        '<li data-action="unhide-column">Unhide</li>'+
    '</ul>';


    kendo.spreadsheet.ContextMenu = kendo.ui.ContextMenu;

    var VIEW_CONTENTS = kendo.template('<div class="#=classNames.view#"><div class="#=classNames.fixedContainer#"></div><div class="#=classNames.scroller#"><div class="#=classNames.viewSize#"></div></div>' +
        '<div tabindex="0" class="#=classNames.clipboard#" contenteditable=true></div><div class="#=classNames.cellEditor#"></div></div><div class="#=classNames.sheetsBar#"></div>' +
        CELL_CONTEXT_MENU + ROW_HEADER_CONTEXT_MENU + COL_HEADER_CONTEXT_MENU
    );

    function within(value, min, max) {
        return value >= min && value <= max;
    }

    var View = kendo.Class.extend({
        init: function(element, options) {
            var classNames = View.classNames;

            this.element = element;

            this.options = $.extend(true, {}, this.options, options);

            this._chrome();

            this._dialogs = [];

            element.append(VIEW_CONTENTS({ classNames: classNames }));

            this._formulaInput();

            this.wrapper =      element.find(DOT + classNames.view);
            this.container =    element.find(DOT + classNames.fixedContainer)[0];
            this.scroller =     element.find(DOT + classNames.scroller)[0];
            this.clipboard =    element.find(DOT + classNames.clipboard);

            this.viewSize = $(this.scroller.firstChild);

            this.tree = new kendo.dom.Tree(this.container);
            this.clipboardContents = new kendo.dom.Tree(this.clipboard[0]);

            this.editor = new kendo.spreadsheet.SheetEditor(this);

            this._sheetsbar();

            var contextMenuConfig = {
                target: element,
                animation: false,
                showOn: "never" // this is just an invalid event name to prevent the show
            };

            this.cellContextMenu = new kendo.spreadsheet.ContextMenu(element.find(DOT + classNames.cellContextMenu), contextMenuConfig);

            this.colHeaderContextMenu = new kendo.spreadsheet.ContextMenu(element.find(DOT + classNames.colHeaderContextMenu), contextMenuConfig);

            this.rowHeaderContextMenu = new kendo.spreadsheet.ContextMenu(element.find(DOT + classNames.rowHeaderContextMenu), contextMenuConfig);

            var scrollbar = kendo.support.scrollbar();

            $(this.container).css({
                width: this.wrapper[0].clientWidth - scrollbar,
                height: this.wrapper[0].clientHeight - scrollbar
            });
        },

        options: {
            messages: messages
        },

        _resize: function() {
            var tabstripHeight = this.tabstrip ? this.tabstrip.element.outerHeight() : 0;
            var formulaBarHeight = this.formulaBar ? this.formulaBar.element.outerHeight() : 0;
            var sheetsBarHeight = this.sheetsbar ? this.sheetsbar.element.outerHeight() : 0;

            this.wrapper.height(
                this.element.height() -
                    (tabstripHeight + formulaBarHeight + sheetsBarHeight)
            );

            if (this.tabstrip) {
                this.tabstrip.quickAccessAdjust();
            }
        },

        _chrome: function() {
            var formulaBar = $("<div />").prependTo(this.element);
            this.formulaBar = new kendo.spreadsheet.FormulaBar(formulaBar);

            if (this.options.toolbar) {
                this._tabstrip();
            }
        },

        _formulaInput: function() {
            var editor = this.element.find(DOT + View.classNames.cellEditor);

            this.formulaInput = new kendo.spreadsheet.FormulaInput(editor, {
                autoScale: true
            });
        },

        _sheetsbar: function() {
            if (this.options.sheetsbar) {
                this.sheetsbar = new kendo.spreadsheet.SheetsBar(this.element.find(DOT + View.classNames.sheetsBar), $.extend(true, {}, this.options.sheetsbar));
            }
        },

        _tabstrip: function() {
            var messages = this.options.messages.tabs;
            var options = $.extend(true, { home: true, insert: true, data: true }, this.options.toolbar);
            var tabs = [];

            if (this.tabstrip) {
                this.tabstrip.destroy();
                this.element.children(".k-tabstrip").remove();
            }

            for (var name in options) {
                if (options[name] === true || options[name] instanceof Array) {
                    tabs.push({ id: name, text: messages[name], content: "" });
                }
            }

            this.tabstrip = new kendo.spreadsheet.TabStrip($("<div />").prependTo(this.element), {
                animation: false,
                dataTextField: "text",
                dataContentField: "content",
                dataSource: tabs,
                toolbarOptions: options,
                view: this
            });

            this.tabstrip.select(0);
        },

        _executeCommand: function(e) {
            this._workbook.execute(e);
        },

        workbook: function(workbook) {
            this._workbook = workbook;
        },

        sheet: function(sheet) {
            this._sheet = sheet;
        },

        activeCellRectangle: function() {
            return this.cellRectangle(this._sheet._viewActiveCell());
        },

        _rectangle: function(pane, ref) {
            return pane._grid.boundingRectangle(ref.toRangeRef());
        },

        isColumnResizer: function(x, pane, ref) {
            var rectangle = this._rectangle(pane, ref);

            x -= this._sheet._grid._headerWidth;

            var handleWidth = RESIZE_HANDLE_WIDTH/2;
            var right = rectangle.right - this.scroller.scrollLeft;

            return right - handleWidth <= x && x <= right + handleWidth;
        },

        isRowResizer: function(y, pane, ref) {
            var rectangle = this._rectangle(pane, ref);

            y -= this._sheet._grid._headerHeight;

            var handleWidth = RESIZE_HANDLE_WIDTH/2;
            var bottom = rectangle.bottom - this.scroller.scrollTop;

            return bottom - handleWidth <= y && y <= bottom + handleWidth;
        },

        isFilterIcon: function(x, y, pane, ref) {
            var result = false;

            x -= this._sheet._grid._headerWidth;
            y -= this._sheet._grid._headerHeight;

            this._sheet.forEachFilterHeader(ref, function(ref) {
                var rect = this._rectangle(pane, ref);
                result = result || pane.filterIconRect(rect).intersects(x, y);
            }.bind(this));

            return result;
        },

        objectAt: function(x, y) {
            var grid = this._sheet._grid;

            var object, pane;

            if (x < 0 || y < 0 || x > this.scroller.clientWidth || y > this.scroller.clientHeight) {
                object = { type: "outside" };
            } else if (x < grid._headerWidth && y < grid._headerHeight) {
                object = { type: "topcorner" };
            } else {
                pane = this.paneAt(x, y);

                var row = pane._grid.rows.index(y, this.scroller.scrollTop);
                var column = pane._grid.columns.index(x, this.scroller.scrollLeft);

                var type = "cell";
                var ref = new CellRef(row, column);

                if (this.isFilterIcon(x, y, pane, ref)) {
                    type = "filtericon";
                } else if (x < grid._headerWidth) {
                    ref = new CellRef(row, -Infinity);
                    type = this.isRowResizer(y, pane, ref) ? "rowresizehandle" : "rowheader";
                } else if (y < grid._headerHeight) {
                    ref = new CellRef(-Infinity, column);
                    type = this.isColumnResizer(x, pane, ref) ? "columnresizehandle" : "columnheader";
                }

                object = { type: type, ref: ref };
            }

            object.pane = pane;
            object.x = x;
            object.y = y;
            return object;
        },

        paneAt: function(x, y) {
            return this.panes.filter(function paneLocationWithin(pane) {
                var grid = pane._grid;
                return within(y, grid.top, grid.bottom) && within(x, grid.left, grid.right);
            })[0];
        },

        containingPane: function(cell) {
            return this.panes.filter(function(pane) {
                if (pane._grid.contains(cell)) {
                    return true;
                }
                return false;
            })[0];
        },

        cellRectangle: function(cell) {
            var theGrid = this.containingPane(cell)._grid;
            var rectangle = this._sheet._grid.rectangle(cell);

            return rectangle.offset(
                theGrid.headerWidth - this.scroller.scrollLeft,
                theGrid.headerHeight - this.scroller.scrollTop
            );
        },

        refresh: function(reason) {
            var sheet = this._sheet;

            if (this.tabstrip) {
                this.tabstrip.refreshTools(sheet.range(sheet.activeCell()));
            }

            if (reason.sheetSelection && this.sheetsbar) {
                this.sheetsbar.renderSheets(this._workbook.sheets(), this._workbook.sheetIndex(this._sheet));
            }

            this._resize();

            //TODO: refresh sheets list on sheetSelection
            this.viewSize[0].style.height = sheet._grid.totalHeight() + "px";
            this.viewSize[0].style.width = sheet._grid.totalWidth() + "px";

            if (reason.layout) {
                var frozenColumns = sheet.frozenColumns();
                var frozenRows = sheet.frozenRows();

                // main or bottom or right pane
                this.panes = [ this._pane(frozenRows, frozenColumns) ];

                // left pane
                if (frozenColumns > 0) {
                    this.panes.push(this._pane(frozenRows, 0, null, frozenColumns));
                }

                // top pane
                if (frozenRows > 0) {
                    this.panes.push(this._pane(0, frozenColumns, frozenRows, null));
                }

                // left-top "fixed" pane
                if (frozenRows > 0 && frozenColumns > 0) {
                    this.panes.push(this._pane(0, 0, frozenRows, frozenColumns));
                }
            }

            if (reason.filter) {
                this._destroyFilterMenu();
            }

            if (reason.activeCell) {
                this._focus = sheet.activeCell().toRangeRef();
            }
        },

        createFilterMenu: function(column) {
            if (this._filterMenu && this._filterMenu.options.column == column) {
                return this._filterMenu;
            }

            var sheet = this._sheet;
            var ref = sheet.filter().ref;
            var range = new kendo.spreadsheet.Range(ref, sheet);
            var filterMenu = new kendo.spreadsheet.FilterMenu({ column: column, range: range });

            this._destroyFilterMenu();

            this._filterMenu = filterMenu;

            return filterMenu;
        },

        selectClipBoardContents: function() {
                this.clipboard.focus();
                selectElementContents(this.clipboard[0]);
        },

        scrollIntoView: function(cell) {
            var willScroll = false;
            var theGrid = this.containingPane(cell)._grid;

            var boundaries = theGrid.scrollBoundaries(cell);

            var scroller = this.scroller;
            var scrollTop = theGrid.rows.frozen ? 0 : scroller.scrollTop;
            var scrollLeft = theGrid.columns.frozen ? 0 : scroller.scrollLeft;

            if (boundaries.top < scrollTop) {
                willScroll = true;
                scroller.scrollTop = boundaries.scrollTop;
            }

            if (boundaries.bottom > scrollTop) {
                willScroll = true;
                scroller.scrollTop = boundaries.scrollBottom;
            }

            if (boundaries.left < scrollLeft) {
                willScroll = true;
                scroller.scrollLeft = boundaries.scrollLeft;
            }

            if (boundaries.right > scrollLeft) {
                willScroll = true;
                scroller.scrollLeft = boundaries.scrollRight;
            }

            return willScroll;
        },

        openDialog: function(name, options) {
            var sheet = this._sheet;
            var ref = sheet.activeCell();
            var range = new kendo.spreadsheet.Range(ref, sheet);
            var dialog = kendo.spreadsheet.dialogs.create(name, options);

            if (dialog) {
                dialog.bind("action", this._executeCommand.bind(this));
                this._dialogs.push(dialog);
                dialog.open(range);
                return dialog;
            }
        },

        showError: function(options) {
            var errorMessages = this.options.messages.errors;
            this.openDialog("message", {
                title : options.title || "Error",
                text  : options.reason ? errorMessages[options.reason] : options.body
            });
        },

        destroy: function() {
            this._dialogs.forEach(function(dialog) {
                dialog.destroy();
            });
            this.cellContextMenu.destroy();
            this.rowHeaderContextMenu.destroy();
            this.colHeaderContextMenu.destroy();

            if (this.tabstrip) {
                this.tabstrip.destroy();
            }

            this._destroyFilterMenu();
        },

        _destroyFilterMenu: function() {
            if (this._filterMenu) {
                this._filterMenu.destroy();
                this._filterMenu = undefined;
                this._filterMenuColumn = undefined;
            }
        },

        render: function() {
            if (!this.element.is(":visible")) {
                return;
            }
            var sheet = this._sheet;
            var focus = sheet.focus();

            if (focus && this.scrollIntoView(focus)) {
                return;
            }

            var grid = sheet._grid;

            var scrollTop = this.scroller.scrollTop;
            var scrollLeft = this.scroller.scrollLeft;

            if (scrollTop < 0) {
                scrollTop = 0;
            }

            if (scrollLeft < 0) {
                scrollLeft = 0;
            }

            var result = this.panes.map(function(pane) {
                return pane.render(scrollLeft, scrollTop);
            }, this);

            var merged = [];
            merged = Array.prototype.concat.apply(merged, result);

            var topCorner = kendo.dom.element("div", {
                style: { width: grid._headerWidth + "px", height: grid._headerHeight + "px" },
                className: View.classNames.topCorner
            });

            merged.push(topCorner);

            if (sheet.resizeHandlePosition() && sheet.resizeHintPosition()) {
                merged.push(this.renderResizeHint());
            }

            this.tree.render(merged);

            if (this.editor.isActive()) {
                this.editor.toggleTooltip(this.activeCellRectangle());
            } else if (!sheet.selectionInProgress() && !sheet.resizingInProgress() && !sheet._edit()) {
                this.renderClipboardContents();
            }
        },

        renderResizeHint: function() {
            var sheet = this._sheet;
            var ref = sheet.resizeHandlePosition();

            var horizontal = ref.col !== -Infinity;

            var style;
            if (horizontal) {
                style = {
                    height: this.scroller.clientHeight + "px",
                    width: RESIZE_HANDLE_WIDTH + "px",
                    left: sheet.resizeHintPosition().x + "px"
                };
            } else {
                style = {
                    height: RESIZE_HANDLE_WIDTH + "px",
                    width: this.scroller.clientWidth + "px",
                    top: sheet.resizeHintPosition().y + "px"
                };
            }

            var classNames = Pane.classNames;

            return kendo.dom.element("div", {
                className: classNames.resizeHint + (!horizontal ? " " + classNames.resizeHintVertical : ""),
                style: style
            },[
                kendo.dom.element("div", { className: classNames.resizeHintHandle }),
                kendo.dom.element("div", { className: classNames.resizeHintMarker })
            ]);
        },


        renderClipboardContents: function() {
            var sheet = this._sheet;
            var grid = sheet._grid;

            var selection = sheet.select();
            var status = this._workbook.clipboard().canCopy();
            if(status.canCopy === false && status.multiSelection) {
                this.clipboardContents.render([]);
                this.selectClipBoardContents();
                return;
            }

            selection = sheet.trim(selection);

            var table = new HtmlTable();

            var selectionView = grid.rangeDimensions(selection);

            selectionView.rows.forEach(function(height) {
                table.addRow(height);
            });

            selectionView.columns.forEach(function(width) {
                table.addColumn(width);
            });

            var primaryMergedCells = {};
            var secondaryMergedCells = {};

            sheet.forEachMergedCell(selection, function(ref) {
                var topLeft = ref.topLeft;

                grid.forEach(ref, function(cellRef) {
                    if (topLeft.eq(cellRef)) {
                        primaryMergedCells[cellRef.print()] = ref;
                    } else {
                        secondaryMergedCells[cellRef.print()] = true;
                    }
                });
            });

            sheet.forEach(selection, function(row, col, cell) {
                var location = new CellRef(row, col).print();

                if (!secondaryMergedCells[location]) {
                    var td = addCell(table, row - selection.topLeft.row, cell);

                    var mergedCell = primaryMergedCells[location];

                    if (mergedCell) {
                       td.attr.colspan = mergedCell.width();
                       td.attr.rowspan = mergedCell.height();
                    }
                }
            });
            this.clipboardContents.render([ table.toDomTree(0, 0, "kendo-clipboard-" + this._workbook.clipboard()._uid) ]);

            this.selectClipBoardContents();
        },

        _pane: function(row, column, rowCount, columnCount) {
            var pane = new Pane(this._sheet, this._sheet._grid.pane({ row: row, column: column, rowCount: rowCount, columnCount: columnCount }));
            pane.refresh(this.scroller.clientWidth, this.scroller.clientHeight);
            return pane;
        }
    });

    function orientedClass(classNames, defaultClass, left, top, right, bottom) {
        var classes = [defaultClass];

        if (top) {
            classes.push(classNames.top);
        }

        if (right) {
            classes.push(classNames.right);
        }

        if (bottom) {
            classes.push(classNames.bottom);
        }

        if (left) {
            classes.push(classNames.left);
        }

        return classes.join(" ");
    }

    var paneClassNames = {
        rowHeader: "k-spreadsheet-row-header",
        columnHeader: "k-spreadsheet-column-header",
        pane: "k-spreadsheet-pane",
        data: "k-spreadsheet-data",
        mergedCell: "k-spreadsheet-merged-cell",
        mergedCellsWrapper: "k-merged-cells-wrapper",
        activeCell: "k-spreadsheet-active-cell",
        selection: "k-spreadsheet-selection",
        selectionWrapper: "k-selection-wrapper",
        single: "k-single",
        top: "k-top",
        right: "k-right",
        bottom: "k-bottom",
        left: "k-left",
        resizeHandle: "k-resize-handle",
        resizeHint: "k-resize-hint",
        resizeHintHandle: "k-resize-hint-handle",
        resizeHintMarker: "k-resize-hint-marker",
        resizeHintVertical: "k-resize-hint-vertical",
        selectionHighlight: "k-spreadsheet-selection-highlight",
        series: [
            "k-series-a",
            "k-series-b",
            "k-series-c",
            "k-series-d",
            "k-series-e",
            "k-series-f"
        ]
    };

    var Pane = kendo.Class.extend({
        init: function(sheet, grid) {
            this._sheet = sheet;
            this._grid = grid;
        },

        refresh: function(width, height) {
            this._grid.refresh(width, height);
        },

        isVisible: function(scrollLeft, scrollTop, ref) {
            return this._grid.view(scrollLeft, scrollTop).ref.intersects(ref);
        },

        render: function(scrollLeft, scrollTop) {
            var classNames = Pane.classNames;
            var sheet = this._sheet;
            var grid = this._grid;

            var view = grid.view(scrollLeft, scrollTop);
            this._currentView = view;
            this._selectedHeaders = sheet.selectedHeaders();

            var children = [];

            children.push(this.renderData());

            children.push(this.renderMergedCells());

            children.push(this.renderSelection());

            children.push(this.renderEditorSelection());

            children.push(this.renderFilterHeaders());

            if (grid.hasRowHeader) {
                var rowHeader = new HtmlTable();
                rowHeader.addColumn(grid.headerWidth);

                view.rows.values.forEach(function(height) {
                    rowHeader.addRow(height);
                });

                sheet.forEach(view.ref.leftColumn(), function(row) {
                    var text = row + 1;
                    rowHeader.addCell(row - view.ref.topLeft.row, text, {}, this.headerClassName(row, "row"));
                }.bind(this));

                children.push(rowHeader.toDomTree(0, view.rowOffset, classNames.rowHeader));
            }

            if (grid.hasColumnHeader) {
                var columnHeader = new HtmlTable();

                view.columns.values.forEach(function(width) {
                    columnHeader.addColumn(width);
                });

                columnHeader.addRow(grid.headerHeight);

                sheet.forEach(view.ref.topRow(), function(row, col) {
                    var text = kendo.spreadsheet.Ref.display(null, Infinity, col);
                    columnHeader.addCell(0, text, {}, this.headerClassName(col, "col"));
                }.bind(this));

                children.push(columnHeader.toDomTree(view.columnOffset, 0, classNames.columnHeader));
            }

            if (sheet.resizeHandlePosition() && (grid.hasColumnHeader || grid.hasRowHeader)) {
                var ref = sheet._grid.normalize(sheet.resizeHandlePosition());

                if (view.ref.intersects(ref)) {
                    if (!sheet.resizeHintPosition()) {
                        children.push(this.renderResizeHandler());
                    }
                }
            }

            return kendo.dom.element("div", {
                style: grid.style,
                className: orientedClass(classNames, classNames.pane, grid.hasRowHeader, grid.hasColumnHeader)
            }, children);
        },

        headerClassName: function(index, type) {
            var selectedHeaders = this._selectedHeaders;

            var itemSelection;
            var allHeaders;

            if (type === "row") {
                itemSelection = selectedHeaders.rows[index];
                allHeaders = selectedHeaders.allRows;
            } else {
                itemSelection = selectedHeaders.cols[index];
                allHeaders = selectedHeaders.allCols;
            }

            var className = itemSelection || (selectedHeaders.all ? "full" : (allHeaders ? "partial" : "none"));

            if (className) {
                className = "k-selection-" + className;
            }

            return className;
        },

        renderData: function() {
            var table = new HtmlTable();
            var view = this._currentView;

            view.rows.values.forEach(function(height) {
                table.addRow(height);
            });

            view.columns.values.forEach(function(width) {
                table.addColumn(width);
            });

            this._sheet.forEach(view.ref, function(row, col, cell) {
                addCell(table, row - view.ref.topLeft.row, cell);
            });

            return table.toDomTree(view.columnOffset, view.rowOffset, Pane.classNames.data);
        },

        renderMergedCells: function() {
            var classNames = Pane.classNames;
            var mergedCells = [];
            var sheet = this._sheet;

            sheet.forEachMergedCell(function(ref) {
                this._addTable(mergedCells, ref, classNames.mergedCell);
            }.bind(this));

            return kendo.dom.element("div", { className: classNames.mergedCellsWrapper }, mergedCells);
        },

        renderResizeHandler: function() {
            var sheet = this._sheet;
            var ref = sheet.resizeHandlePosition();
            var rectangle = this._rectangle(ref);

            var style;
            if (ref.col !== -Infinity) {
                style = {
                    height: this._grid.headerHeight + "px",
                    width: RESIZE_HANDLE_WIDTH + "px",
                    left: rectangle.right - RESIZE_HANDLE_WIDTH/2  + "px"
                };
            } else {
                style = {
                    height: RESIZE_HANDLE_WIDTH + "px",
                    width:  this._grid.headerWidth + "px",
                    top: rectangle.bottom - RESIZE_HANDLE_WIDTH/2  + "px"
                };
            }
            return kendo.dom.element("div", {
                className: Pane.classNames.resizeHandle,
                style: style
            });
        },

        filterIconRect: function(rect) {
            var BUTTON_SIZE = 16;
            var BUTTON_OFFSET = 3;

            return new kendo.spreadsheet.Rectangle(
                rect.right - BUTTON_SIZE - BUTTON_OFFSET,
                rect.top + BUTTON_OFFSET,
                BUTTON_SIZE,
                BUTTON_SIZE
            );
        },

        renderFilterHeaders: function() {
            var sheet = this._sheet;
            var children = [];
            var classNames = View.classNames;
            var index = 0;
            var filter = sheet.filter();

            function icon(className) {
                return kendo.dom.element("span", {
                    className: classNames.icon + " " + className
                });
            }

            function filterButton(classNames, position, index) {
                var style = {
                    left: position.left + "px",
                    top: position.top + "px"
                };
                var filtered = filter && filter.columns.some(function(c) {
                    return c.index === index;
                });
                var classes = classNames.filterButton;

                if (filtered) {
                    classes += " " + classNames.filterButtonActive;
                }

                var button = kendo.dom.element(
                    "span",
                    { className: classes, style: style, "data-column": index },
                    [ icon(classNames.iconFilterDefault) ]
                );

                return button;
            }

            if (filter) {
                this._addDiv(children, filter.ref, classNames.filterRange);
            }

            sheet.forEachFilterHeader(this._currentView.ref, function(ref) {
                var rect = this._rectangle(ref);
                var position = this.filterIconRect(rect);
                var button = filterButton(classNames, position, index);
                index++;

                children.push(button);
            }.bind(this));

            return kendo.dom.element("div", {
                className: classNames.filterHeadersWrapper
            }, children);

        },

        renderEditorSelection: function() {
            var classNames = Pane.classNames;
            var sheet = this._sheet;
            var selections = [];

            sheet._formulaSelections.forEach(function(range) {
                var ref = range.ref;

                if (ref === kendo.spreadsheet.NULLREF) {
                    return;
                }

                this._addDiv(selections, ref, classNames.selectionHighlight + " " + range.seriesCls);
            }.bind(this));

            return kendo.dom.element("div", { className: classNames.selectionWrapper }, selections);

        },

        _active: function() {
            return this._sheet._formulaSelections.filter(function(sel) {
                return sel.active;
            })[0];
        },

        renderSelection: function() {
            var classNames = Pane.classNames;
            var selections = [];
            var seriesColorClass = "";
            var sheet = this._sheet;
            var view = this._currentView;
            var activeCell = sheet.activeCell().toRangeRef();
            var className = orientedClass(
                classNames,
                classNames.activeCell,
                !activeCell.move(0, -1).intersects(view.ref),
                !activeCell.move(-1, 0).intersects(view.ref),
                !activeCell.move(0, 1).intersects(view.ref),
                !activeCell.move(1, 0).intersects(view.ref)
            );

            if (sheet._edit()) {
                var token = this._active();

                if (token && token.type == "ref") {
                    seriesColorClass = " " + token.seriesCls;
                    className += seriesColorClass;
                }
            }

            if (sheet.select().eq(activeCell)) {
                className += " " + classNames.single;
            }

            sheet.select().forEach(function(ref) {
                if (ref === kendo.spreadsheet.NULLREF) {
                    return;
                }

                this._addDiv(selections, ref, classNames.selection + seriesColorClass);
            }.bind(this));

            this._addTable(selections, activeCell, className);

            return kendo.dom.element("div", { className: classNames.selectionWrapper }, selections);
        },

        _addDiv: function(collection, ref, className) {
            var view = this._currentView;

            if (view.ref.intersects(ref)) {
                var div = this._rectangle(ref).resize(1, 1).toDiv(className);
                collection.push(div);
            }
        },

        _addTable: function(collection, ref, className) {
            var sheet = this._sheet;
            var view = this._currentView;

            if (view.ref.intersects(ref)) {
                sheet.forEach(ref.collapse(), function(row, col, cell) {
                    var rectangle = this._rectangle(ref);

                    var table = new HtmlTable();
                    table.addColumn(rectangle.width);
                    table.addRow(rectangle.height);
                    addCell(table, 0, cell);

                    collection.push(table.toDomTree(rectangle.left, rectangle.top, className));
                }.bind(this));
            }
        },

        _rectangle: function(ref) {
            return this._grid.boundingRectangle(ref.toRangeRef()).offset(-this._currentView.mergedCellLeft, -this._currentView.mergedCellTop);
        }
    });

    kendo.spreadsheet.View = View;
    kendo.spreadsheet.Pane = Pane;
    kendo.spreadsheet.addCell = addCell;

    $.extend(true, View, { classNames: viewClassNames });
    $.extend(true, Pane, { classNames: paneClassNames });

})(window.kendo);
}, typeof define == 'function' && define.amd ? define : function(a1, a2, a3){ (a3 || a2)(); });
