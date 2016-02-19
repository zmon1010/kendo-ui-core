
package com.kendoui.taglib.dropdownlist;


import com.kendoui.taglib.BaseTag;



import com.kendoui.taglib.DropDownListTag;




import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class PopupTag extends  BaseTag  /* interfaces */ /* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag


        DropDownListTag parent = (DropDownListTag)findParentWithClass(DropDownListTag.class);


        parent.setPopup(this);

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
        return "dropDownList-popup";
    }

    public java.lang.String getAppendTo() {
        return (java.lang.String)getProperty("appendTo");
    }

    public void setAppendTo(java.lang.String value) {
        setProperty("appendTo", value);
    }

    public java.lang.String getOrigin() {
        return (java.lang.String)getProperty("origin");
    }

    public void setOrigin(java.lang.String value) {
        setProperty("origin", value);
    }

    public java.lang.String getPosition() {
        return (java.lang.String)getProperty("position");
    }

    public void setPosition(java.lang.String value) {
        setProperty("position", value);
    }

//<< Attributes

}
