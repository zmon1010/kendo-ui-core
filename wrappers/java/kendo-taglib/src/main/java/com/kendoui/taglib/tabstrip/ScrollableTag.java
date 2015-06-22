
package com.kendoui.taglib.tabstrip;


import com.kendoui.taglib.BaseTag;



import com.kendoui.taglib.TabStripTag;




import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class ScrollableTag extends  BaseTag  /* interfaces */ /* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag


        TabStripTag parent = (TabStripTag)findParentWithClass(TabStripTag.class);


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
        return "tabStrip-scrollable";
    }

    public float getDistance() {
        return (float)getProperty("distance");
    }

    public void setDistance(float value) {
        setProperty("distance", value);
    }

//<< Attributes

}
