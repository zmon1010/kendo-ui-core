
package com.kendoui.taglib.datasource;


import com.kendoui.taglib.BaseTag;

import com.kendoui.taglib.FunctionTag;




import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class SortItemTag extends  BaseTag  /* interfaces *//* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag

        SortTag parent = (SortTag)findParentWithClass(SortTag.class);

        parent.addSortItem(this);

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
        return "dataSource-sortItem";
    }

    public void setCompare(SortItemCompareFunctionTag value) {
        setEvent("compare", value.getBody());
    }

    public String getCompare() {
        Function property = ((Function)getProperty("compare"));
        if (property != null) {
            return property.getBody();
        }
        return null;
    }

    public void setCompare(String value) {
        setProperty("compare", new Function(value));
    }

    public java.lang.String getDir() {
        return (java.lang.String)getProperty("dir");
    }

    public void setDir(java.lang.String value) {
        setProperty("dir", value);
    }

    public java.lang.String getField() {
        return (java.lang.String)getProperty("field");
    }

    public void setField(java.lang.String value) {
        setProperty("field", value);
    }

//<< Attributes

}
