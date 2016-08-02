
package com.kendoui.taglib.prompt;


import com.kendoui.taglib.BaseTag;



import com.kendoui.taglib.PromptTag;




import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class MessagesTag extends  BaseTag  /* interfaces */ /* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag


        PromptTag parent = (PromptTag)findParentWithClass(PromptTag.class);


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
        return "prompt-messages";
    }

    public java.lang.String getCancel() {
        return (java.lang.String)getProperty("cancel");
    }

    public void setCancel(java.lang.String value) {
        setProperty("cancel", value);
    }

    public java.lang.String getOkText() {
        return (java.lang.String)getProperty("okText");
    }

    public void setOkText(java.lang.String value) {
        setProperty("okText", value);
    }

//<< Attributes

}
