
package com.kendoui.taglib.diagram;


import com.kendoui.taglib.BaseTag;






import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class ShapeConnectorHoverTag extends  BaseTag  /* interfaces */ /* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag


        ShapeConnectorTag parent = (ShapeConnectorTag)findParentWithClass(ShapeConnectorTag.class);


        parent.setHover(this);

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
        return "diagram-shape-connector-hover";
    }

    public void setFill(com.kendoui.taglib.diagram.ShapeConnectorHoverFillTag value) {
        setProperty("fill", value);
    }

    public void setStroke(com.kendoui.taglib.diagram.ShapeConnectorHoverStrokeTag value) {
        setProperty("stroke", value);
    }

    public java.lang.String getFill() {
        return (java.lang.String)getProperty("fill");
    }

    public void setFill(java.lang.String value) {
        setProperty("fill", value);
    }

    public java.lang.String getStroke() {
        return (java.lang.String)getProperty("stroke");
    }

    public void setStroke(java.lang.String value) {
        setProperty("stroke", value);
    }

//<< Attributes

}
