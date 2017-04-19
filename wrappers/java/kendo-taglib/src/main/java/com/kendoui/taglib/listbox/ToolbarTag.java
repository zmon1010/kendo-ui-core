
package com.kendoui.taglib.listbox;


import com.kendoui.taglib.BaseTag;



import com.kendoui.taglib.ListBoxTag;




import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class ToolbarTag extends  BaseTag  /* interfaces */ /* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag


        ListBoxTag parent = (ListBoxTag)findParentWithClass(ListBoxTag.class);


        parent.setToolbar(this);

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
        return "listBox-toolbar";
    }

    public java.lang.String getPosition() {
        return (java.lang.String)getProperty("position");
    }

    public void setPosition(java.lang.String value) {
        setProperty("position", value);
    }

    public java.lang.Object getTools() {
        return (java.lang.Object)getProperty("tools");
    }

    public void setTools(java.lang.Object value) {
        setProperty("tools", value);
    }

//<< Attributes

}
