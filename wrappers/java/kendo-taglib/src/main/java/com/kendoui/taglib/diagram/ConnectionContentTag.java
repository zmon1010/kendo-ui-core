
package com.kendoui.taglib.diagram;


import com.kendoui.taglib.BaseTag;
import com.kendoui.taglib.json.Function;





import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class ConnectionContentTag extends  BaseTag  /* interfaces */ /* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag


        ConnectionTag parent = (ConnectionTag)findParentWithClass(ConnectionTag.class);


        parent.setContent(this);

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
        return "diagram-connection-content";
    }

    public void setTemplate(ConnectionContentTemplateFunctionTag value) {
        setEvent("template", value.getBody());
    }

    public void setVisual(ConnectionContentVisualFunctionTag value) {
        setEvent("visual", value.getBody());
    }

    public java.lang.String getColor() {
        return (java.lang.String)getProperty("color");
    }

    public void setColor(java.lang.String value) {
        setProperty("color", value);
    }

    public java.lang.String getFontFamily() {
        return (java.lang.String)getProperty("fontFamily");
    }

    public void setFontFamily(java.lang.String value) {
        setProperty("fontFamily", value);
    }

    public float getFontSize() {
        return (Float)getProperty("fontSize");
    }

    public void setFontSize(float value) {
        setProperty("fontSize", value);
    }

    public java.lang.String getFontStyle() {
        return (java.lang.String)getProperty("fontStyle");
    }

    public void setFontStyle(java.lang.String value) {
        setProperty("fontStyle", value);
    }

    public java.lang.String getFontWeight() {
        return (java.lang.String)getProperty("fontWeight");
    }

    public void setFontWeight(java.lang.String value) {
        setProperty("fontWeight", value);
    }

    public java.lang.String getTemplate() {
        return (java.lang.String)getProperty("template");
    }

    public void setTemplate(java.lang.String value) {
        setProperty("template", value);
    }

    public java.lang.String getText() {
        return (java.lang.String)getProperty("text");
    }

    public void setText(java.lang.String value) {
        setProperty("text", value);
    }

    public String getVisual() {
        Function property = ((Function)getProperty("visual"));
        if (property != null) {
            return property.getBody();
        }
        return null;
    }

    public void setVisual(String value) {
        setProperty("visual", new Function(value));
    }

//<< Attributes

}
