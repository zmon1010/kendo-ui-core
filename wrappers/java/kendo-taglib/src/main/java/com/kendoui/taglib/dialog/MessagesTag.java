
package com.kendoui.taglib.dialog;


import com.kendoui.taglib.BaseTag;



import com.kendoui.taglib.DialogTag;




import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class MessagesTag extends  BaseTag  /* interfaces */ /* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag


        DialogTag parent = (DialogTag)findParentWithClass(DialogTag.class);


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
        return "dialog-messages";
    }

    public java.lang.String getClose() {
        return (java.lang.String)getProperty("close");
    }

    public void setClose(java.lang.String value) {
        setProperty("close", value);
    }

    public java.lang.String getPromptInput() {
        return (java.lang.String)getProperty("promptInput");
    }

    public void setPromptInput(java.lang.String value) {
        setProperty("promptInput", value);
    }

//<< Attributes

}
