
package com.kendoui.taglib.gantt;


import com.kendoui.taglib.BaseTag;



import com.kendoui.taglib.GanttTag;




import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class EditableTag extends  BaseTag  /* interfaces */ /* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag


        GanttTag parent = (GanttTag)findParentWithClass(GanttTag.class);


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
        return "gantt-editable";
    }

    public void setTemplate(EditableTemplateFunctionTag value) {
        setEvent("template", value.getBody());
    }

    public boolean getConfirmation() {
        return (Boolean)getProperty("confirmation");
    }

    public void setConfirmation(boolean value) {
        setProperty("confirmation", value);
    }

    public boolean getCreate() {
        return (Boolean)getProperty("create");
    }

    public void setCreate(boolean value) {
        setProperty("create", value);
    }

    public boolean getDependencyCreate() {
        return (Boolean)getProperty("dependencyCreate");
    }

    public void setDependencyCreate(boolean value) {
        setProperty("dependencyCreate", value);
    }

    public boolean getDependencyDestroy() {
        return (Boolean)getProperty("dependencyDestroy");
    }

    public void setDependencyDestroy(boolean value) {
        setProperty("dependencyDestroy", value);
    }

    public boolean getDestroy() {
        return (Boolean)getProperty("destroy");
    }

    public void setDestroy(boolean value) {
        setProperty("destroy", value);
    }

    public boolean getDragPercentComplete() {
        return (Boolean)getProperty("dragPercentComplete");
    }

    public void setDragPercentComplete(boolean value) {
        setProperty("dragPercentComplete", value);
    }

    public boolean getMove() {
        return (Boolean)getProperty("move");
    }

    public void setMove(boolean value) {
        setProperty("move", value);
    }

    public boolean getReorder() {
        return (Boolean)getProperty("reorder");
    }

    public void setReorder(boolean value) {
        setProperty("reorder", value);
    }

    public boolean getResize() {
        return (Boolean)getProperty("resize");
    }

    public void setResize(boolean value) {
        setProperty("resize", value);
    }

    public java.lang.String getTemplate() {
        return (java.lang.String)getProperty("template");
    }

    public void setTemplate(java.lang.String value) {
        setProperty("template", value);
    }

    public boolean getUpdate() {
        return (Boolean)getProperty("update");
    }

    public void setUpdate(boolean value) {
        setProperty("update", value);
    }

//<< Attributes

}
