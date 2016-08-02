
package com.kendoui.taglib.dialog;


import com.kendoui.taglib.BaseTag;





import com.kendoui.taglib.json.Function;


import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class ActionTag extends  BaseTag  /* interfaces */ /* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag

        ActionsTag parent = (ActionsTag)findParentWithClass(ActionsTag.class);

        parent.addAction(this);

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
        return "dialog-action";
    }

    public void setAction(ActionActionFunctionTag value) {
        setEvent("action", value.getBody());
    }

    public String getAction() {
        Function property = ((Function)getProperty("action"));
        if (property != null) {
            return property.getBody();
        }
        return null;
    }

    public void setAction(String value) {
        setProperty("action", new Function(value));
    }

    public boolean getPrimary() {
        return (Boolean)getProperty("primary");
    }

    public void setPrimary(boolean value) {
        setProperty("primary", value);
    }

    public java.lang.String getText() {
        return (java.lang.String)getProperty("text");
    }

    public void setText(java.lang.String value) {
        setProperty("text", value);
    }

//<< Attributes

}
