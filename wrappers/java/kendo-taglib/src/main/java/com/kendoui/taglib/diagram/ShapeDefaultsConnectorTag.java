
package com.kendoui.taglib.diagram;


import com.kendoui.taglib.BaseTag;

import com.kendoui.taglib.json.Function;




import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class ShapeDefaultsConnectorTag extends  BaseTag  /* interfaces */ /* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag

        ShapeDefaultsConnectorsTag parent = (ShapeDefaultsConnectorsTag)findParentWithClass(ShapeDefaultsConnectorsTag.class);

        parent.addConnector(this);

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
        return "diagram-shapeDefaults-connector";
    }

    public void setFill(com.kendoui.taglib.diagram.ShapeDefaultsConnectorFillTag value) {
        setProperty("fill", value);
    }

    public void setHover(com.kendoui.taglib.diagram.ShapeDefaultsConnectorHoverTag value) {
        setProperty("hover", value);
    }

    public void setStroke(com.kendoui.taglib.diagram.ShapeDefaultsConnectorStrokeTag value) {
        setProperty("stroke", value);
    }

    public void setPosition(ShapeDefaultsConnectorPositionFunctionTag value) {
        setEvent("position", value.getBody());
    }

    public java.lang.String getFill() {
        return (java.lang.String)getProperty("fill");
    }

    public void setFill(java.lang.String value) {
        setProperty("fill", value);
    }

    public float getHeight() {
        return (Float)getProperty("height");
    }

    public void setHeight(float value) {
        setProperty("height", value);
    }

    public java.lang.String getName() {
        return (java.lang.String)getProperty("name");
    }

    public void setName(java.lang.String value) {
        setProperty("name", value);
    }

    public String getPosition() {
        Function property = ((Function)getProperty("position"));
        if (property != null) {
            return property.getBody();
        }
        return null;
    }

    public void setPosition(String value) {
        setProperty("position", new Function(value));
    }

    public java.lang.String getStroke() {
        return (java.lang.String)getProperty("stroke");
    }

    public void setStroke(java.lang.String value) {
        setProperty("stroke", value);
    }

    public float getWidth() {
        return (Float)getProperty("width");
    }

    public void setWidth(float value) {
        setProperty("width", value);
    }

//<< Attributes

}
