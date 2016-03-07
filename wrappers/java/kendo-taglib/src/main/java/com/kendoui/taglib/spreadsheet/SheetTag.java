
package com.kendoui.taglib.spreadsheet;


import com.kendoui.taglib.BaseTag;






import com.kendoui.taglib.DataSourceTag;

import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class SheetTag extends  BaseTag  /* interfaces */ /* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag

        SheetsTag parent = (SheetsTag)findParentWithClass(SheetsTag.class);

        parent.addSheet(this);

//<< doEndTag

        return super.doEndTag();
    }

    @Override
    public void initialize() {
//>> initialize
//<< initialize

        super.initialize();
    }

    @Override
    public void destroy() {
//>> destroy
//<< destroy

        super.destroy();
    }

//>> Attributes

    public static String tagName() {
        return "spreadsheet-sheet";
    }

    public void setColumns(SheetColumnsTag value) {

        setProperty("columns", value.columns());

    }

    public void setFilter(com.kendoui.taglib.spreadsheet.SheetFilterTag value) {
        setProperty("filter", value);
    }

    public void setRows(SheetRowsTag value) {

        setProperty("rows", value.rows());

    }

    public void setSort(com.kendoui.taglib.spreadsheet.SheetSortTag value) {
        setProperty("sort", value);
    }

    public java.lang.String getActiveCell() {
        return (java.lang.String)getProperty("activeCell");
    }

    public void setActiveCell(java.lang.String value) {
        setProperty("activeCell", value);
    }

    public void setDataSource(DataSourceTag dataSource) {
        setProperty("dataSource", dataSource);
    }

    public float getFrozenColumns() {
        return (Float)getProperty("frozenColumns");
    }

    public void setFrozenColumns(float value) {
        setProperty("frozenColumns", value);
    }

    public float getFrozenRows() {
        return (Float)getProperty("frozenRows");
    }

    public void setFrozenRows(float value) {
        setProperty("frozenRows", value);
    }

    public java.lang.Object getMergedCells() {
        return (java.lang.Object)getProperty("mergedCells");
    }

    public void setMergedCells(java.lang.Object value) {
        setProperty("mergedCells", value);
    }

    public java.lang.String getName() {
        return (java.lang.String)getProperty("name");
    }

    public void setName(java.lang.String value) {
        setProperty("name", value);
    }

    public java.lang.String getSelection() {
        return (java.lang.String)getProperty("selection");
    }

    public void setSelection(java.lang.String value) {
        setProperty("selection", value);
    }

    public boolean getShowGridLines() {
        return (Boolean)getProperty("showGridLines");
    }

    public void setShowGridLines(boolean value) {
        setProperty("showGridLines", value);
    }

//<< Attributes

}
