
package com.kendoui.taglib.dropdownlist;


import com.kendoui.taglib.BaseTag;



import com.kendoui.taglib.DropDownListTag;




import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class VirtualTag extends  BaseTag  /* interfaces */ /* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag


        DropDownListTag parent = (DropDownListTag)findParentWithClass(DropDownListTag.class);


        parent.setVirtual(this);

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
        return "dropDownList-virtual";
    }

    public void setValueMapper(VirtualValueMapperFunctionTag value) {
        setEvent("valueMapper", value.getBody());
    }

    public float getItemHeight() {
        return (float)getProperty("itemHeight");
    }

    public void setItemHeight(float value) {
        setProperty("itemHeight", value);
    }

    public String getValueMapper() {
        Function property = ((Function)getProperty("valueMapper"));
        if (property != null) {
            return property.getBody();
        }
        return null;
    }

    public void setValueMapper(String value) {
        setProperty("valueMapper", new Function(value));
    }

//<< Attributes

}
