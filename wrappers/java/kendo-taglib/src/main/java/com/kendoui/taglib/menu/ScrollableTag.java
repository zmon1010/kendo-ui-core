
package com.kendoui.taglib.menu;


import com.kendoui.taglib.BaseTag;



import com.kendoui.taglib.MenuTag;




import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class ScrollableTag extends  BaseTag  /* interfaces */ /* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag


        MenuTag parent = (MenuTag)findParentWithClass(MenuTag.class);


        parent.setScrollable(this);

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
        return "menu-scrollable";
    }

    public float getDistance() {
        return (Float)getProperty("distance");
    }

    public void setDistance(float value) {
        setProperty("distance", value);
    }

//<< Attributes

}
