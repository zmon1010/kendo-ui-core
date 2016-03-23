
package com.kendoui.taglib.filtermenu;


import com.kendoui.taglib.BaseTag;



import com.kendoui.taglib.FilterMenuTag;




import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class OperatorsTag extends  BaseTag  /* interfaces */ /* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag


        FilterMenuTag parent = (FilterMenuTag)findParentWithClass(FilterMenuTag.class);


        parent.setOperators(this);

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
        return "filterMenu-operators";
    }

    public void setDate(com.kendoui.taglib.filtermenu.OperatorsDateTag value) {
        setProperty("date", value);
    }

    public void setEnums(com.kendoui.taglib.filtermenu.OperatorsEnumsTag value) {
        setProperty("enums", value);
    }

    public void setNumber(com.kendoui.taglib.filtermenu.OperatorsNumberTag value) {
        setProperty("number", value);
    }

    public void setString(com.kendoui.taglib.filtermenu.OperatorsStringTag value) {
        setProperty("string", value);
    }

//<< Attributes

}
