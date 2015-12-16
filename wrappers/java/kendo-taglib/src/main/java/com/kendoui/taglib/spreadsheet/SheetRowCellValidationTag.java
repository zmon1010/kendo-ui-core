
package com.kendoui.taglib.spreadsheet;


import com.kendoui.taglib.BaseTag;






import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class SheetRowCellValidationTag extends  BaseTag  /* interfaces */ /* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag


        SheetRowCellTag parent = (SheetRowCellTag)findParentWithClass(SheetRowCellTag.class);


        parent.setValidation(this);

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
        return "spreadsheet-sheet-row-cell-validation";
    }

    public boolean getAllowNulls() {
        return (Boolean)getProperty("allowNulls");
    }

    public void setAllowNulls(boolean value) {
        setProperty("allowNulls", value);
    }

    public java.lang.String getComparerType() {
        return (java.lang.String)getProperty("comparerType");
    }

    public void setComparerType(java.lang.String value) {
        setProperty("comparerType", value);
    }

    public java.lang.String getDataType() {
        return (java.lang.String)getProperty("dataType");
    }

    public void setDataType(java.lang.String value) {
        setProperty("dataType", value);
    }

    public java.lang.String getFrom() {
        return (java.lang.String)getProperty("from");
    }

    public void setFrom(java.lang.String value) {
        setProperty("from", value);
    }

    public java.lang.String getMessageTemplate() {
        return (java.lang.String)getProperty("messageTemplate");
    }

    public void setMessageTemplate(java.lang.String value) {
        setProperty("messageTemplate", value);
    }

    public java.lang.String getTitleTemplate() {
        return (java.lang.String)getProperty("titleTemplate");
    }

    public void setTitleTemplate(java.lang.String value) {
        setProperty("titleTemplate", value);
    }

    public java.lang.String getTo() {
        return (java.lang.String)getProperty("to");
    }

    public void setTo(java.lang.String value) {
        setProperty("to", value);
    }

    public java.lang.String getType() {
        return (java.lang.String)getProperty("type");
    }

    public void setType(java.lang.String value) {
        setProperty("type", value);
    }

//<< Attributes

}
