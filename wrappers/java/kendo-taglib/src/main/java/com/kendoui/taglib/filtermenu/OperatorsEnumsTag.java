
package com.kendoui.taglib.filtermenu;


import com.kendoui.taglib.BaseTag;






import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class OperatorsEnumsTag extends  BaseTag  /* interfaces */ /* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag


        OperatorsTag parent = (OperatorsTag)findParentWithClass(OperatorsTag.class);


        parent.setEnums(this);

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
        return "filterMenu-operators-enums";
    }

    public java.lang.String getEq() {
        return (java.lang.String)getProperty("eq");
    }

    public void setEq(java.lang.String value) {
        setProperty("eq", value);
    }

    public java.lang.String getIsnotnull() {
        return (java.lang.String)getProperty("isnotnull");
    }

    public void setIsnotnull(java.lang.String value) {
        setProperty("isnotnull", value);
    }

    public java.lang.String getIsnull() {
        return (java.lang.String)getProperty("isnull");
    }

    public void setIsnull(java.lang.String value) {
        setProperty("isnull", value);
    }

    public java.lang.String getNeq() {
        return (java.lang.String)getProperty("neq");
    }

    public void setNeq(java.lang.String value) {
        setProperty("neq", value);
    }

//<< Attributes

}
