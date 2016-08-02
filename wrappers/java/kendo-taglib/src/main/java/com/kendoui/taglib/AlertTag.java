
package com.kendoui.taglib;


import com.kendoui.taglib.alert.*;



import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class AlertTag extends WidgetTag /* interfaces *//* interfaces */ {

    public AlertTag() {
        super("Alert");
    }
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag
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
        return "alert";
    }

    public void setMessages(com.kendoui.taglib.alert.MessagesTag value) {
        setProperty("messages", value);
    }

//<< Attributes

}
