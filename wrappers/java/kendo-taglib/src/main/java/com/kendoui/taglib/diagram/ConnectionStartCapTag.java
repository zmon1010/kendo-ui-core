
package com.kendoui.taglib.diagram;


import com.kendoui.taglib.BaseTag;






import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class ConnectionStartCapTag extends  BaseTag  /* interfaces */ /* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag


        ConnectionTag parent = (ConnectionTag)findParentWithClass(ConnectionTag.class);


        parent.setStartCap(this);

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
        return "diagram-connection-startCap";
    }

    public void setFill(com.kendoui.taglib.diagram.ConnectionStartCapFillTag value) {
        setProperty("fill", value);
    }

    public void setStroke(com.kendoui.taglib.diagram.ConnectionStartCapStrokeTag value) {
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

    public java.lang.String getType() {
        return (java.lang.String)getProperty("type");
    }

    public void setType(java.lang.String value) {
        setProperty("type", value);
    }

//<< Attributes

}
