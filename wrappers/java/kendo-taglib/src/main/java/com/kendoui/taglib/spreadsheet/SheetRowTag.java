
package com.kendoui.taglib.spreadsheet;


import com.kendoui.taglib.BaseTag;






import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class SheetRowTag extends  BaseTag  /* interfaces */ /* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag

        SheetRowsTag parent = (SheetRowsTag)findParentWithClass(SheetRowsTag.class);

        parent.addRow(this);

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
        return "spreadsheet-sheet-row";
    }

    public void setCells(SheetRowCellsTag value) {

        setProperty("cells", value.cells());

    }

    public float getHeight() {
        return (Float)getProperty("height");
    }

    public void setHeight(float value) {
        setProperty("height", value);
    }

    public float getIndex() {
        return (Float)getProperty("index");
    }

    public void setIndex(float value) {
        setProperty("index", value);
    }

//<< Attributes

}
