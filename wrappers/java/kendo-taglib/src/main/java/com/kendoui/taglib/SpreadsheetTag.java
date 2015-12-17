
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

    public void setExcel(com.kendoui.taglib.spreadsheet.ExcelTag value) {
        setProperty("excel", value);
    }

    public void setPdf(com.kendoui.taglib.spreadsheet.PdfTag value) {
        setProperty("pdf", value);
    }

    public void setSheets(SheetsTag value) {

        setProperty("sheets", value.sheets());

    }

    public void setExcelExport(ExcelExportFunctionTag value) {
        setEvent("excelExport", value.getBody());
    }

    public void setExcelImport(ExcelImportFunctionTag value) {
        setEvent("excelImport", value.getBody());
    }

    public void setPdfExport(PdfExportFunctionTag value) {
        setEvent("pdfExport", value.getBody());
    }

    public void setRender(RenderFunctionTag value) {
        setEvent("render", value.getBody());
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

//<< Attributes

}
