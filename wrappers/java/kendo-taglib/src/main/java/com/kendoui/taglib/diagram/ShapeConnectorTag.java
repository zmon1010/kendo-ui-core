
package com.kendoui.taglib.diagram;


import com.kendoui.taglib.BaseTag;

import com.kendoui.taglib.json.Function;




import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class ShapeConnectorTag extends  BaseTag  /* interfaces */ /* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag

        ShapeConnectorsTag parent = (ShapeConnectorsTag)findParentWithClass(ShapeConnectorsTag.class);

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
        return "diagram-shape-connector";
    }

    public void setPosition(ShapeConnectorPositionFunctionTag value) {
        setEvent("position", value.getBody());
    }

    public java.lang.String getDescription() {
        return (java.lang.String)getProperty("description");
    }

    public void setDescription(java.lang.String value) {
        setProperty("description", value);
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

//<< Attributes

}
