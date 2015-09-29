
package com.kendoui.taglib.spreadsheet;


import com.kendoui.taglib.BaseTag;






import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class SheetFilterColumnCriteriaItemTag extends  BaseTag  /* interfaces */ /* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag

        SheetFilterColumnCriteriaTag parent = (SheetFilterColumnCriteriaTag)findParentWithClass(SheetFilterColumnCriteriaTag.class);

        parent.addCriteriaItem(this);

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
        return "spreadsheet-sheet-filter-column-criteriaItem";
    }

    public java.lang.String getOperator() {
        return (java.lang.String)getProperty("operator");
    }

    public void setOperator(java.lang.String value) {
        setProperty("operator", value);
    }

    public java.lang.String getValue() {
        return (java.lang.String)getProperty("value");
    }

    public void setValue(java.lang.String value) {
        setProperty("value", value);
    }

//<< Attributes

}
