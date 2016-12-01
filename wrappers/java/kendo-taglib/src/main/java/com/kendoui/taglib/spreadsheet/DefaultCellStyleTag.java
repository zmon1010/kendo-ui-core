
package com.kendoui.taglib.spreadsheet;


import com.kendoui.taglib.BaseTag;



import com.kendoui.taglib.SpreadsheetTag;




import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class DefaultCellStyleTag extends  BaseTag  /* interfaces */ /* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag


        SpreadsheetTag parent = (SpreadsheetTag)findParentWithClass(SpreadsheetTag.class);


        parent.setDefaultCellStyle(this);

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
        return "spreadsheet-defaultCellStyle";
    }

    public boolean getItalic() {
        return (Boolean)getProperty("Italic");
    }

    public void setItalic(boolean value) {
        setProperty("Italic", value);
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

    public java.lang.String getFontFamily() {
        return (java.lang.String)getProperty("fontFamily");
    }

    public void setFontFamily(java.lang.String value) {
        setProperty("fontFamily", value);
    }

    public java.lang.String getFontSize() {
        return (java.lang.String)getProperty("fontSize");
    }

    public void setFontSize(java.lang.String value) {
        setProperty("fontSize", value);
    }

    public boolean getUnderline() {
        return (Boolean)getProperty("underline");
    }

    public void setUnderline(boolean value) {
        setProperty("underline", value);
    }

    public boolean getWrap() {
        return (Boolean)getProperty("wrap");
    }

    public void setWrap(boolean value) {
        setProperty("wrap", value);
    }

//<< Attributes

}
