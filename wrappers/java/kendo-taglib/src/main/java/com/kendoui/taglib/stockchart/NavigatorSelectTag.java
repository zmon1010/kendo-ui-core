
package com.kendoui.taglib.stockchart;


import com.kendoui.taglib.BaseTag;






import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class NavigatorSelectTag extends  BaseTag  /* interfaces *//* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag


        NavigatorTag parent = (NavigatorTag)findParentWithClass(NavigatorTag.class);


        parent.setSelect(this);

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
        return "stockChart-navigator-select";
    }

    public void setMousewheel(com.kendoui.taglib.stockchart.NavigatorSelectMousewheelTag value) {
        setProperty("mousewheel", value);
    }

    public java.util.Date getFrom() {
        return (java.util.Date)getProperty("from");
    }

    public void setFrom(java.util.Date value) {
        setProperty("from", value);
    }

    public boolean getMousewheel() {
        return (Boolean)getProperty("mousewheel");
    }

    public void setMousewheel(boolean value) {
        setProperty("mousewheel", value);
    }

    public java.util.Date getTo() {
        return (java.util.Date)getProperty("to");
    }

    public void setTo(java.util.Date value) {
        setProperty("to", value);
    }

//<< Attributes

}
