
package com.kendoui.taglib.editor;


import com.kendoui.taglib.BaseTag;



import com.kendoui.taglib.EditorTag;



import com.kendoui.taglib.json.Function;


import com.kendoui.taglib.json.Function;

import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class DeserializationTag extends  BaseTag  /* interfaces */ /* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag


        EditorTag parent = (EditorTag)findParentWithClass(EditorTag.class);


        parent.setDeserialization(this);

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
        return "editor-deserialization";
    }

    public void setCustom(DeserializationCustomFunctionTag value) {
        setEvent("custom", value.getBody());
    }

    public String getCustom() {
        Function property = ((Function)getProperty("custom"));
        if (property != null) {
            return property.getBody();
        }
        return null;
    }

    public void setCustom(String value) {
        setProperty("custom", new Function(value));
    }

//<< Attributes

}
