
package com.kendoui.taglib.spreadsheet;


import com.kendoui.taglib.BaseTag;






import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class SheetSortColumnTag extends  BaseTag  /* interfaces */ /* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag

        SheetSortColumnsTag parent = (SheetSortColumnsTag)findParentWithClass(SheetSortColumnsTag.class);

        parent.addColumn(this);

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
        return "spreadsheet-sheet-sort-column";
    }

    public boolean getAscending() {
        return (Boolean)getProperty("ascending");
    }

    public void setAscending(boolean value) {
        setProperty("ascending", value);
    }

    public float getIndex() {
        return (Float)getProperty("index");
    }

    public void setIndex(float value) {
        setProperty("index", value);
    }

//<< Attributes

}
