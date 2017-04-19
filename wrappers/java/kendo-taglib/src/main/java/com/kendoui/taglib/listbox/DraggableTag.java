
package com.kendoui.taglib.listbox;


import com.kendoui.taglib.BaseTag;



import com.kendoui.taglib.ListBoxTag;



import com.kendoui.taglib.json.Function;


import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class DraggableTag extends  BaseTag  /* interfaces */ /* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag


        ListBoxTag parent = (ListBoxTag)findParentWithClass(ListBoxTag.class);


        parent.setDraggable(this);

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
        return "listBox-draggable";
    }

    public void setHint(DraggableHintFunctionTag value) {
        setEvent("hint", value.getBody());
    }

    public void setPlaceholder(DraggablePlaceholderFunctionTag value) {
        setEvent("placeholder", value.getBody());
    }

    public java.lang.String getHint() {
        return (java.lang.String)getProperty("hint");
    }

    public void setHint(java.lang.String value) {
        setProperty("hint", value);
    }

    public java.lang.String getPlaceholder() {
        return (java.lang.String)getProperty("placeholder");
    }

    public void setPlaceholder(java.lang.String value) {
        setProperty("placeholder", value);
    }

//<< Attributes

}
