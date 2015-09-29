
package com.kendoui.taglib.spreadsheet;


import com.kendoui.taglib.BaseTag;






import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class SheetSortTag extends  BaseTag  /* interfaces */ /* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag


        SheetTag parent = (SheetTag)findParentWithClass(SheetTag.class);


        parent.setSort(this);

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
        return "spreadsheet-sheet-sort";
    }

    public void setColumns(SheetSortColumnsTag value) {

        setProperty("columns", value.columns());

    }

    public java.lang.String getRef() {
        return (java.lang.String)getProperty("ref");
    }

    public void setRef(java.lang.String value) {
        setProperty("ref", value);
    }

//<< Attributes

}
