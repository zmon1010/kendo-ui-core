
package com.kendoui.taglib;


import com.kendoui.taglib.confirm.*;



import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class ConfirmTag extends WidgetTag /* interfaces *//* interfaces */ {

    public ConfirmTag() {
        super("Confirm");
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
        return "confirm";
    }

    public void setMessages(com.kendoui.taglib.confirm.MessagesTag value) {
        setProperty("messages", value);
    }

//<< Attributes

}
