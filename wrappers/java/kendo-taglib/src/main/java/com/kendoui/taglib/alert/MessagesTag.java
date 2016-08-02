
package com.kendoui.taglib.alert;


import com.kendoui.taglib.BaseTag;



import com.kendoui.taglib.AlertTag;




import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class MessagesTag extends  BaseTag  /* interfaces */ /* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag


        AlertTag parent = (AlertTag)findParentWithClass(AlertTag.class);


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
        return "alert-messages";
    }

    public java.lang.String getOkText() {
        return (java.lang.String)getProperty("okText");
    }

    public void setOkText(java.lang.String value) {
        setProperty("okText", value);
    }

//<< Attributes

}
