
package com.kendoui.taglib.spreadsheet;


import com.kendoui.taglib.BaseTag;



import com.kendoui.taglib.SpreadsheetTag;




import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class ToolbarTag extends  BaseTag  /* interfaces */ /* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag


        SpreadsheetTag parent = (SpreadsheetTag)findParentWithClass(SpreadsheetTag.class);


        parent.setToolbar(this);

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
        return "spreadsheet-toolbar";
    }

    public java.lang.Object getData() {
        return (java.lang.Object)getProperty("data");
    }

    public void setData(java.lang.Object value) {
        setProperty("data", value);
    }

    public java.lang.Object getHome() {
        return (java.lang.Object)getProperty("home");
    }

    public void setHome(java.lang.Object value) {
        setProperty("home", value);
    }

    public java.lang.Object getInsert() {
        return (java.lang.Object)getProperty("insert");
    }

    public void setInsert(java.lang.Object value) {
        setProperty("insert", value);
    }

//<< Attributes

}
