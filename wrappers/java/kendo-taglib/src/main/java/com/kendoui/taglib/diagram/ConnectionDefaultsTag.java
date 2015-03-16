
package com.kendoui.taglib.diagram;


import com.kendoui.taglib.BaseTag;



import com.kendoui.taglib.DiagramTag;




import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class ConnectionDefaultsTag extends  BaseTag  /* interfaces */ /* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag


        DiagramTag parent = (DiagramTag)findParentWithClass(DiagramTag.class);


        parent.setConnectionDefaults(this);

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
        return "diagram-connectionDefaults";
    }

    public void setContent(com.kendoui.taglib.diagram.ConnectionDefaultsContentTag value) {
        setProperty("content", value);
    }

    public void setEditable(com.kendoui.taglib.diagram.ConnectionDefaultsEditableTag value) {
        setProperty("editable", value);
    }

    public void setEndCap.fill(com.kendoui.taglib.diagram.ConnectionDefaultsEndCap.fillTag value) {
        setProperty("endCap.fill", value);
    }

    public void setEndCap.stroke(com.kendoui.taglib.diagram.ConnectionDefaultsEndCap.strokeTag value) {
        setProperty("endCap.stroke", value);
    }

    public void setHover(com.kendoui.taglib.diagram.ConnectionDefaultsHoverTag value) {
        setProperty("hover", value);
    }

    public void setSelection(com.kendoui.taglib.diagram.ConnectionDefaultsSelectionTag value) {
        setProperty("selection", value);
    }

    public void setStartCap(com.kendoui.taglib.diagram.ConnectionDefaultsStartCapTag value) {
        setProperty("startCap", value);
    }

    public void setStroke(com.kendoui.taglib.diagram.ConnectionDefaultsStrokeTag value) {
        setProperty("stroke", value);
    }

    public boolean getEditable() {
        return (boolean)getProperty("editable");
    }

    public void setEditable(boolean value) {
        setProperty("editable", value);
    }

    public java.lang.String getEndCap.fill() {
        return (java.lang.String)getProperty("endCap.fill");
    }

    public void setEndCap.fill(java.lang.String value) {
        setProperty("endCap.fill", value);
    }

    public java.lang.String getEndCap.stroke() {
        return (java.lang.String)getProperty("endCap.stroke");
    }

    public void setEndCap.stroke(java.lang.String value) {
        setProperty("endCap.stroke", value);
    }

    public java.lang.String getStartCap() {
        return (java.lang.String)getProperty("startCap");
    }

    public void setStartCap(java.lang.String value) {
        setProperty("startCap", value);
    }

//<< Attributes

}
