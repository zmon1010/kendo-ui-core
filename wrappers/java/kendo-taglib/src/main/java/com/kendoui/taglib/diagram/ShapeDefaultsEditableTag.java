
package com.kendoui.taglib.diagram;


import com.kendoui.taglib.BaseTag;






import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class ShapeDefaultsEditableTag extends  BaseTag  /* interfaces */ /* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag


        ShapeDefaultsTag parent = (ShapeDefaultsTag)findParentWithClass(ShapeDefaultsTag.class);


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
        return "diagram-shapeDefaults-editable";
    }

    public void setTools(ShapeDefaultsEditableToolsTag value) {

        setProperty("tools", value.tools());

    }

    public boolean getConnect() {
        return (boolean)getProperty("connect");
    }

    public void setConnect(boolean value) {
        setProperty("connect", value);
    }

    public boolean getDrag() {
        return (boolean)getProperty("drag");
    }

    public void setDrag(boolean value) {
        setProperty("drag", value);
    }

    public boolean getRemove() {
        return (boolean)getProperty("remove");
    }

    public void setRemove(boolean value) {
        setProperty("remove", value);
    }

//<< Attributes

}
