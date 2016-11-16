
package com.kendoui.taglib;


import com.kendoui.taglib.dialog.*;
import com.kendoui.taglib.html.Div;
import com.kendoui.taglib.html.Element;
import com.kendoui.taglib.json.Function;



import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class DialogTag extends WidgetTag /* interfaces *//* interfaces */ {

    public DialogTag() {
        super("Dialog");
    }
    
    @Override
    protected Element<?> createElement() {
        Div element = new Div();

        element.html(body());

        return element;
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
        return "dialog";
    }

    public void setActions(ActionsTag value) {

        setProperty("actions", value.actions());

    }

    public void setAnimation(com.kendoui.taglib.dialog.AnimationTag value) {
        setProperty("animation", value);
    }

    public void setMessages(com.kendoui.taglib.dialog.MessagesTag value) {
        setProperty("messages", value);
    }

    public void setClose(CloseFunctionTag value) {
        setEvent("close", value.getBody());
    }

    public void setHide(HideFunctionTag value) {
        setEvent("hide", value.getBody());
    }

    public void setInitOpen(InitOpenFunctionTag value) {
        setEvent("initOpen", value.getBody());
    }

    public void setOpen(OpenFunctionTag value) {
        setEvent("open", value.getBody());
    }

    public void setShow(ShowFunctionTag value) {
        setEvent("show", value.getBody());
    }

    public boolean getAnimation() {
        return (Boolean)getProperty("animation");
    }

    public void setAnimation(boolean value) {
        setProperty("animation", value);
    }

    public java.lang.String getButtonLayout() {
        return (java.lang.String)getProperty("buttonLayout");
    }

    public void setButtonLayout(java.lang.String value) {
        setProperty("buttonLayout", value);
    }

    public boolean getClosable() {
        return (Boolean)getProperty("closable");
    }

    public void setClosable(boolean value) {
        setProperty("closable", value);
    }

    public java.lang.String getContent() {
        return (java.lang.String)getProperty("content");
    }

    public void setContent(java.lang.String value) {
        setProperty("content", value);
    }

    public java.lang.Object getHeight() {
        return (java.lang.Object)getProperty("height");
    }

    public void setHeight(java.lang.Object value) {
        setProperty("height", value);
    }

    public float getMaxHeight() {
        return (Float)getProperty("maxHeight");
    }

    public void setMaxHeight(float value) {
        setProperty("maxHeight", value);
    }

    public float getMaxWidth() {
        return (Float)getProperty("maxWidth");
    }

    public void setMaxWidth(float value) {
        setProperty("maxWidth", value);
    }

    public float getMinHeight() {
        return (Float)getProperty("minHeight");
    }

    public void setMinHeight(float value) {
        setProperty("minHeight", value);
    }

    public float getMinWidth() {
        return (Float)getProperty("minWidth");
    }

    public void setMinWidth(float value) {
        setProperty("minWidth", value);
    }

    public boolean getModal() {
        return (Boolean)getProperty("modal");
    }

    public void setModal(boolean value) {
        setProperty("modal", value);
    }

    public java.lang.Object getTitle() {
        return (java.lang.Object)getProperty("title");
    }

    public void setTitle(java.lang.Object value) {
        setProperty("title", value);
    }

    public boolean getVisible() {
        return (Boolean)getProperty("visible");
    }

    public void setVisible(boolean value) {
        setProperty("visible", value);
    }

    public java.lang.Object getWidth() {
        return (java.lang.Object)getProperty("width");
    }

    public void setWidth(java.lang.Object value) {
        setProperty("width", value);
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

    public String getHide() {
        Function property = ((Function)getProperty("hide"));
        if (property != null) {
            return property.getBody();
        }
        return null;
    }

    public void setHide(String value) {
        setProperty("hide", new Function(value));
    }

    public String getInitOpen() {
        Function property = ((Function)getProperty("initOpen"));
        if (property != null) {
            return property.getBody();
        }
        return null;
    }

    public void setInitOpen(String value) {
        setProperty("initOpen", new Function(value));
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

    public String getShow() {
        Function property = ((Function)getProperty("show"));
        if (property != null) {
            return property.getBody();
        }
        return null;
    }

    public void setShow(String value) {
        setProperty("show", new Function(value));
    }

//<< Attributes

}
