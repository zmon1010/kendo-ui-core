
package com.kendoui.taglib.window;


import com.kendoui.taglib.BaseTag;



import com.kendoui.taglib.WindowTag;




import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class PositionTag extends  BaseTag  /* interfaces */ /* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag


        WindowTag parent = (WindowTag)findParentWithClass(WindowTag.class);


        parent.setPosition(this);

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
        return "window-position";
    }

    public java.lang.Object getLeft() {
        return (java.lang.Object)getProperty("left");
    }

    public void setLeft(java.lang.Object value) {
        setProperty("left", value);
    }

    public java.lang.Object getTop() {
        return (java.lang.Object)getProperty("top");
    }

    public void setTop(java.lang.Object value) {
        setProperty("top", value);
    }

//<< Attributes

}
