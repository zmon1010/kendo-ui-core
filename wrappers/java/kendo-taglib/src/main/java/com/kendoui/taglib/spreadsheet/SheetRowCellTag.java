
package com.kendoui.taglib.spreadsheet;


import com.kendoui.taglib.BaseTag;






import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class SheetRowCellTag extends  BaseTag  /* interfaces */ /* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag

        SheetRowCellsTag parent = (SheetRowCellsTag)findParentWithClass(SheetRowCellsTag.class);

        parent.addCell(this);

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
        return "spreadsheet-sheet-row-cell";
    }

    public void setBorderBottom(com.kendoui.taglib.spreadsheet.SheetRowCellBorderBottomTag value) {
        setProperty("borderBottom", value);
    }

    public void setBorderLeft(com.kendoui.taglib.spreadsheet.SheetRowCellBorderLeftTag value) {
        setProperty("borderLeft", value);
    }

    public void setBorderRight(com.kendoui.taglib.spreadsheet.SheetRowCellBorderRightTag value) {
        setProperty("borderRight", value);
    }

    public void setBorderTop(com.kendoui.taglib.spreadsheet.SheetRowCellBorderTopTag value) {
        setProperty("borderTop", value);
    }

    public void setValidation(com.kendoui.taglib.spreadsheet.SheetRowCellValidationTag value) {
        setProperty("validation", value);
    }

    public java.lang.String getBackground() {
        return (java.lang.String)getProperty("background");
    }

    public void setBackground(java.lang.String value) {
        setProperty("background", value);
    }

    public boolean getBold() {
        return (Boolean)getProperty("bold");
    }

    public void setBold(boolean value) {
        setProperty("bold", value);
    }

    public java.lang.String getColor() {
        return (java.lang.String)getProperty("color");
    }

    public void setColor(java.lang.String value) {
        setProperty("color", value);
    }

    public boolean getEnable() {
        return (Boolean)getProperty("enable");
    }

    public void setEnable(boolean value) {
        setProperty("enable", value);
    }

    public java.lang.String getFontFamily() {
        return (java.lang.String)getProperty("fontFamily");
    }

    public void setFontFamily(java.lang.String value) {
        setProperty("fontFamily", value);
    }

    public float getFontSize() {
        return (Float)getProperty("fontSize");
    }

    public void setFontSize(float value) {
        setProperty("fontSize", value);
    }

    public java.lang.String getFormat() {
        return (java.lang.String)getProperty("format");
    }

    public void setFormat(java.lang.String value) {
        setProperty("format", value);
    }

    public java.lang.String getFormula() {
        return (java.lang.String)getProperty("formula");
    }

    public void setFormula(java.lang.String value) {
        setProperty("formula", value);
    }

    public float getIndex() {
        return (Float)getProperty("index");
    }

    public void setIndex(float value) {
        setProperty("index", value);
    }

    public boolean getItalic() {
        return (Boolean)getProperty("italic");
    }

    public void setItalic(boolean value) {
        setProperty("italic", value);
    }

    public java.lang.String getLink() {
        return (java.lang.String)getProperty("link");
    }

    public void setLink(java.lang.String value) {
        setProperty("link", value);
    }

    public java.lang.String getTextAlign() {
        return (java.lang.String)getProperty("textAlign");
    }

    public void setTextAlign(java.lang.String value) {
        setProperty("textAlign", value);
    }

    public boolean getUnderline() {
        return (Boolean)getProperty("underline");
    }

    public void setUnderline(boolean value) {
        setProperty("underline", value);
    }

    public java.lang.Object getValue() {
        return (java.lang.Object)getProperty("value");
    }

    public void setValue(java.lang.Object value) {
        setProperty("value", value);
    }

    public java.lang.String getVerticalAlign() {
        return (java.lang.String)getProperty("verticalAlign");
    }

    public void setVerticalAlign(java.lang.String value) {
        setProperty("verticalAlign", value);
    }

    public boolean getWrap() {
        return (Boolean)getProperty("wrap");
    }

    public void setWrap(boolean value) {
        setProperty("wrap", value);
    }

//<< Attributes

}
