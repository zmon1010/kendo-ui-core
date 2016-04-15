
package com.kendoui.taglib;


import com.kendoui.taglib.popup.*;


import com.kendoui.taglib.json.Function;


import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class PopupTag extends WidgetTag /* interfaces *//* interfaces */ {

    public PopupTag() {
        super("Popup");
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
        return "popup";
    }

    public void setAnimation(com.kendoui.taglib.popup.AnimationTag value) {
        setProperty("animation", value);
    }

    public void setActivate(ActivateFunctionTag value) {
        setEvent("activate", value.getBody());
    }

    public void setClose(CloseFunctionTag value) {
        setEvent("close", value.getBody());
    }

    public void setDeactivate(DeactivateFunctionTag value) {
        setEvent("deactivate", value.getBody());
    }

    public void setOpen(OpenFunctionTag value) {
        setEvent("open", value.getBody());
    }

    public java.lang.Object getAdjustSize() {
        return (java.lang.Object)getProperty("adjustSize");
    }

    public void setAdjustSize(java.lang.Object value) {
        setProperty("adjustSize", value);
    }

    public java.lang.Object getAnchor() {
        return (java.lang.Object)getProperty("anchor");
    }

    public void setAnchor(java.lang.Object value) {
        setProperty("anchor", value);
    }

    public boolean getAnimation() {
        return (Boolean)getProperty("animation");
    }

    public void setAnimation(boolean value) {
        setProperty("animation", value);
    }

    public java.lang.Object getAppendTo() {
        return (java.lang.Object)getProperty("appendTo");
    }

    public void setAppendTo(java.lang.Object value) {
        setProperty("appendTo", value);
    }

    public java.lang.String getCollision() {
        return (java.lang.String)getProperty("collision");
    }

    public void setCollision(java.lang.String value) {
        setProperty("collision", value);
    }

    public java.lang.String getOrigin() {
        return (java.lang.String)getProperty("origin");
    }

    public void setOrigin(java.lang.String value) {
        setProperty("origin", value);
    }

    public java.lang.String getPosition() {
        return (java.lang.String)getProperty("position");
    }

    public void setPosition(java.lang.String value) {
        setProperty("position", value);
    }

    public String getActivate() {
        Function property = ((Function)getProperty("activate"));
        if (property != null) {
            return property.getBody();
        }
        return null;
    }

    public void setActivate(String value) {
        setProperty("activate", new Function(value));
    }

    public String getClose() {
        Function property = ((Function)getProperty("close"));
        if (property != null) {
            return property.getBody();
        }
        return null;
    }

    public void setClose(String value) {
        setProperty("close", new Function(value));
    }

    public String getDeactivate() {
        Function property = ((Function)getProperty("deactivate"));
        if (property != null) {
            return property.getBody();
        }
        return null;
    }

    public void setDeactivate(String value) {
        setProperty("deactivate", new Function(value));
    }

    public String getOpen() {
        Function property = ((Function)getProperty("open"));
        if (property != null) {
            return property.getBody();
        }
        return null;
    }

    public void setOpen(String value) {
        setProperty("open", new Function(value));
    }

//<< Attributes

}
