
package com.kendoui.taglib;


import com.kendoui.taglib.prompt.*;



import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class PromptTag extends WidgetTag /* interfaces *//* interfaces */ {

    public PromptTag() {
        super("Prompt");
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
        return "prompt";
    }

    public void setMessages(com.kendoui.taglib.prompt.MessagesTag value) {
        setProperty("messages", value);
    }

//<< Attributes

}
