
package com.kendoui.taglib.spreadsheet;


import com.kendoui.taglib.BaseTag;






import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class SheetFilterColumnTag extends  BaseTag  /* interfaces */ /* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag

        SheetFilterColumnsTag parent = (SheetFilterColumnsTag)findParentWithClass(SheetFilterColumnsTag.class);

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
        return "spreadsheet-sheet-filter-column";
    }

    public void setCriteria(SheetFilterColumnCriteriaTag value) {

        setProperty("criteria", value.criteria());

    }

    public java.lang.String getFilter() {
        return (java.lang.String)getProperty("filter");
    }

    public void setFilter(java.lang.String value) {
        setProperty("filter", value);
    }

    public float getIndex() {
        return (Float)getProperty("index");
    }

    public void setIndex(float value) {
        setProperty("index", value);
    }

    public java.lang.String getLogic() {
        return (java.lang.String)getProperty("logic");
    }

    public void setLogic(java.lang.String value) {
        setProperty("logic", value);
    }

    public java.lang.String getType() {
        return (java.lang.String)getProperty("type");
    }

    public void setType(java.lang.String value) {
        setProperty("type", value);
    }

    public java.lang.Object getValue() {
        return (java.lang.Object)getProperty("value");
    }

    public void setValue(java.lang.Object value) {
        setProperty("value", value);
    }

//<< Attributes

}
