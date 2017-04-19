
package com.kendoui.taglib.listbox;


import com.kendoui.taglib.BaseTag;



import com.kendoui.taglib.ListBoxTag;




import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class MessagesTag extends  BaseTag  /* interfaces */ /* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag


        ListBoxTag parent = (ListBoxTag)findParentWithClass(ListBoxTag.class);


        parent.setMessages(this);

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
        return "listBox-messages";
    }

    public void setTools(com.kendoui.taglib.listbox.MessagesToolsTag value) {
        setProperty("tools", value);
    }

//<< Attributes

}
