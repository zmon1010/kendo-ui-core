
package com.kendoui.taglib.diagram;


import com.kendoui.taglib.BaseTag;






import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class EditableDragTag extends  BaseTag  /* interfaces */ /* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag


        EditableTag parent = (EditableTag)findParentWithClass(EditableTag.class);


        parent.setDrag(this);

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
        return "diagram-editable-drag";
    }

    public void setSnap(com.kendoui.taglib.diagram.EditableDragSnapTag value) {
        setProperty("snap", value);
    }

    public boolean getSnap() {
        return (Boolean)getProperty("snap");
    }

    public void setSnap(boolean value) {
        setProperty("snap", value);
    }

//<< Attributes

}
