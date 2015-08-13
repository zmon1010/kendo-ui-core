
package com.kendoui.taglib.diagram;


import com.kendoui.taglib.BaseTag;






import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class EditableDragSnapTag extends  BaseTag  /* interfaces */ /* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag


        EditableDragTag parent = (EditableDragTag)findParentWithClass(EditableDragTag.class);


        parent.setSnap(this);

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
        return "diagram-editable-drag-snap";
    }

    public float getSize() {
        return (Float)getProperty("size");
    }

    public void setSize(float value) {
        setProperty("size", value);
    }

//<< Attributes

}
