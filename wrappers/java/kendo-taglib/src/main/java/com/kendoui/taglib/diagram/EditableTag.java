
package com.kendoui.taglib.diagram;


import com.kendoui.taglib.BaseTag;



import com.kendoui.taglib.DiagramTag;




import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class EditableTag extends  BaseTag  /* interfaces */ /* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag


        DiagramTag parent = (DiagramTag)findParentWithClass(DiagramTag.class);


        parent.setEditable(this);

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
        return "diagram-editable";
    }

    public void setDrag(com.kendoui.taglib.diagram.EditableDragTag value) {
        setProperty("drag", value);
    }

    public void setResize(com.kendoui.taglib.diagram.EditableResizeTag value) {
        setProperty("resize", value);
    }

    public void setRotate(com.kendoui.taglib.diagram.EditableRotateTag value) {
        setProperty("rotate", value);
    }

    public void setTools(EditableToolsTag value) {

        setProperty("tools", value.tools());

    }

    public void setConnectionTemplate(EditableConnectionTemplateFunctionTag value) {
        setEvent("connectionTemplate", value.getBody());
    }

    public void setShapeTemplate(EditableShapeTemplateFunctionTag value) {
        setEvent("shapeTemplate", value.getBody());
    }

    public java.lang.String getConnectionTemplate() {
        return (java.lang.String)getProperty("connectionTemplate");
    }

    public void setConnectionTemplate(java.lang.String value) {
        setProperty("connectionTemplate", value);
    }

    public boolean getDrag() {
        return (Boolean)getProperty("drag");
    }

    public void setDrag(boolean value) {
        setProperty("drag", value);
    }

    public boolean getRemove() {
        return (Boolean)getProperty("remove");
    }

    public void setRemove(boolean value) {
        setProperty("remove", value);
    }

    public boolean getResize() {
        return (Boolean)getProperty("resize");
    }

    public void setResize(boolean value) {
        setProperty("resize", value);
    }

    public boolean getRotate() {
        return (Boolean)getProperty("rotate");
    }

    public void setRotate(boolean value) {
        setProperty("rotate", value);
    }

    public java.lang.String getShapeTemplate() {
        return (java.lang.String)getProperty("shapeTemplate");
    }

    public void setShapeTemplate(java.lang.String value) {
        setProperty("shapeTemplate", value);
    }

//<< Attributes

}
