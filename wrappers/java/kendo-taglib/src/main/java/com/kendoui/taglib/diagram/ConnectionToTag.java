
package com.kendoui.taglib.diagram;


import com.kendoui.taglib.BaseTag;






import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class ConnectionToTag extends  BaseTag  /* interfaces */ /* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag


        ConnectionTag parent = (ConnectionTag)findParentWithClass(ConnectionTag.class);


        parent.setTo(this);

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
        return "diagram-connection-to";
    }

    public float getX() {
        return (Float)getProperty("x");
    }

    public void setX(float value) {
        setProperty("x", value);
    }

    public float getY() {
        return (Float)getProperty("y");
    }

    public void setY(float value) {
        setProperty("y", value);
    }

//<< Attributes

}
