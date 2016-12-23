
package com.kendoui.taglib;


import com.kendoui.taglib.spreadsheet.*;


import com.kendoui.taglib.json.Function;


import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class SpreadsheetTag extends WidgetTag /* interfaces *//* interfaces */ {

    public SpreadsheetTag() {
        super("Spreadsheet");
    }
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag
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
        return "spreadsheet";
    }

    public void setDefaultCellStyle(com.kendoui.taglib.spreadsheet.DefaultCellStyleTag value) {
        setProperty("defaultCellStyle", value);
    }

    public void setExcel(com.kendoui.taglib.spreadsheet.ExcelTag value) {
        setProperty("excel", value);
    }

    public void setPdf(com.kendoui.taglib.spreadsheet.PdfTag value) {
        setProperty("pdf", value);
    }

    public void setSheets(SheetsTag value) {

        setProperty("sheets", value.sheets());

    }

    public void setToolbar(com.kendoui.taglib.spreadsheet.ToolbarTag value) {
        setProperty("toolbar", value);
    }

    public void setChange(ChangeFunctionTag value) {
        setEvent("change", value.getBody());
    }

    public void setDeleteColumn(DeleteColumnFunctionTag value) {
        setEvent("deleteColumn", value.getBody());
    }

    public void setDeleteRow(DeleteRowFunctionTag value) {
        setEvent("deleteRow", value.getBody());
    }

    public void setExcelExport(ExcelExportFunctionTag value) {
        setEvent("excelExport", value.getBody());
    }

    public void setExcelImport(ExcelImportFunctionTag value) {
        setEvent("excelImport", value.getBody());
    }

    public void setHideColumn(HideColumnFunctionTag value) {
        setEvent("hideColumn", value.getBody());
    }

    public void setHideRow(HideRowFunctionTag value) {
        setEvent("hideRow", value.getBody());
    }

    public void setInsertColumn(InsertColumnFunctionTag value) {
        setEvent("insertColumn", value.getBody());
    }

    public void setInsertRow(InsertRowFunctionTag value) {
        setEvent("insertRow", value.getBody());
    }

    public void setInsertSheet(InsertSheetFunctionTag value) {
        setEvent("insertSheet", value.getBody());
    }

    public void setPdfExport(PdfExportFunctionTag value) {
        setEvent("pdfExport", value.getBody());
    }

    public void setRemoveSheet(RemoveSheetFunctionTag value) {
        setEvent("removeSheet", value.getBody());
    }

    public void setRenameSheet(RenameSheetFunctionTag value) {
        setEvent("renameSheet", value.getBody());
    }

    public void setRender(RenderFunctionTag value) {
        setEvent("render", value.getBody());
    }

    public void setSelect(SelectFunctionTag value) {
        setEvent("select", value.getBody());
    }

    public void setSelectSheet(SelectSheetFunctionTag value) {
        setEvent("selectSheet", value.getBody());
    }

    public void setUnhideColumn(UnhideColumnFunctionTag value) {
        setEvent("unhideColumn", value.getBody());
    }

    public void setUnhideRow(UnhideRowFunctionTag value) {
        setEvent("unhideRow", value.getBody());
    }

    public java.lang.String getActiveSheet() {
        return (java.lang.String)getProperty("activeSheet");
    }

    public void setActiveSheet(java.lang.String value) {
        setProperty("activeSheet", value);
    }

    public float getColumnWidth() {
        return (Float)getProperty("columnWidth");
    }

    public void setColumnWidth(float value) {
        setProperty("columnWidth", value);
    }

    public float getColumns() {
        return (Float)getProperty("columns");
    }

    public void setColumns(float value) {
        setProperty("columns", value);
    }

    public float getHeaderHeight() {
        return (Float)getProperty("headerHeight");
    }

    public void setHeaderHeight(float value) {
        setProperty("headerHeight", value);
    }

    public float getHeaderWidth() {
        return (Float)getProperty("headerWidth");
    }

    public void setHeaderWidth(float value) {
        setProperty("headerWidth", value);
    }

    public float getRowHeight() {
        return (Float)getProperty("rowHeight");
    }

    public void setRowHeight(float value) {
        setProperty("rowHeight", value);
    }

    public float getRows() {
        return (Float)getProperty("rows");
    }

    public void setRows(float value) {
        setProperty("rows", value);
    }

    public boolean getSheetsbar() {
        return (Boolean)getProperty("sheetsbar");
    }

    public void setSheetsbar(boolean value) {
        setProperty("sheetsbar", value);
    }

    public boolean getToolbar() {
        return (Boolean)getProperty("toolbar");
    }

    public void setToolbar(boolean value) {
        setProperty("toolbar", value);
    }

    public String getChange() {
        Function property = ((Function)getProperty("change"));
        if (property != null) {
            return property.getBody();
        }
        return null;
    }

    public void setChange(String value) {
        setProperty("change", new Function(value));
    }

    public String getDeleteColumn() {
        Function property = ((Function)getProperty("deleteColumn"));
        if (property != null) {
            return property.getBody();
        }
        return null;
    }

    public void setDeleteColumn(String value) {
        setProperty("deleteColumn", new Function(value));
    }

    public String getDeleteRow() {
        Function property = ((Function)getProperty("deleteRow"));
        if (property != null) {
            return property.getBody();
        }
        return null;
    }

    public void setDeleteRow(String value) {
        setProperty("deleteRow", new Function(value));
    }

    public String getExcelExport() {
        Function property = ((Function)getProperty("excelExport"));
        if (property != null) {
            return property.getBody();
        }
        return null;
    }

    public void setExcelExport(String value) {
        setProperty("excelExport", new Function(value));
    }

    public String getExcelImport() {
        Function property = ((Function)getProperty("excelImport"));
        if (property != null) {
            return property.getBody();
        }
        return null;
    }

    public void setExcelImport(String value) {
        setProperty("excelImport", new Function(value));
    }

    public String getHideColumn() {
        Function property = ((Function)getProperty("hideColumn"));
        if (property != null) {
            return property.getBody();
        }
        return null;
    }

    public void setHideColumn(String value) {
        setProperty("hideColumn", new Function(value));
    }

    public String getHideRow() {
        Function property = ((Function)getProperty("hideRow"));
        if (property != null) {
            return property.getBody();
        }
        return null;
    }

    public void setHideRow(String value) {
        setProperty("hideRow", new Function(value));
    }

    public String getInsertColumn() {
        Function property = ((Function)getProperty("insertColumn"));
        if (property != null) {
            return property.getBody();
        }
        return null;
    }

    public void setInsertColumn(String value) {
        setProperty("insertColumn", new Function(value));
    }

    public String getInsertRow() {
        Function property = ((Function)getProperty("insertRow"));
        if (property != null) {
            return property.getBody();
        }
        return null;
    }

    public void setInsertRow(String value) {
        setProperty("insertRow", new Function(value));
    }

    public String getInsertSheet() {
        Function property = ((Function)getProperty("insertSheet"));
        if (property != null) {
            return property.getBody();
        }
        return null;
    }

    public void setInsertSheet(String value) {
        setProperty("insertSheet", new Function(value));
    }

    public String getPdfExport() {
        Function property = ((Function)getProperty("pdfExport"));
        if (property != null) {
            return property.getBody();
        }
        return null;
    }

    public void setPdfExport(String value) {
        setProperty("pdfExport", new Function(value));
    }

    public String getRemoveSheet() {
        Function property = ((Function)getProperty("removeSheet"));
        if (property != null) {
            return property.getBody();
        }
        return null;
    }

    public void setRemoveSheet(String value) {
        setProperty("removeSheet", new Function(value));
    }

    public String getRenameSheet() {
        Function property = ((Function)getProperty("renameSheet"));
        if (property != null) {
            return property.getBody();
        }
        return null;
    }

    public void setRenameSheet(String value) {
        setProperty("renameSheet", new Function(value));
    }

    public String getRender() {
        Function property = ((Function)getProperty("render"));
        if (property != null) {
            return property.getBody();
        }
        return null;
    }

    public void setRender(String value) {
        setProperty("render", new Function(value));
    }

    public String getSelect() {
        Function property = ((Function)getProperty("select"));
        if (property != null) {
            return property.getBody();
        }
        return null;
    }

    public void setSelect(String value) {
        setProperty("select", new Function(value));
    }

    public String getSelectSheet() {
        Function property = ((Function)getProperty("selectSheet"));
        if (property != null) {
            return property.getBody();
        }
        return null;
    }

    public void setSelectSheet(String value) {
        setProperty("selectSheet", new Function(value));
    }

    public String getUnhideColumn() {
        Function property = ((Function)getProperty("unhideColumn"));
        if (property != null) {
            return property.getBody();
        }
        return null;
    }

    public void setUnhideColumn(String value) {
        setProperty("unhideColumn", new Function(value));
    }

    public String getUnhideRow() {
        Function property = ((Function)getProperty("unhideRow"));
        if (property != null) {
            return property.getBody();
        }
        return null;
    }

    public void setUnhideRow(String value) {
        setProperty("unhideRow", new Function(value));
    }

//<< Attributes

}
