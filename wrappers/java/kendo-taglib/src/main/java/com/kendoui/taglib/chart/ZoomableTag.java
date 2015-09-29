
package com.kendoui.taglib.chart;


import com.kendoui.taglib.BaseTag;



import com.kendoui.taglib.ChartTag;




import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class ZoomableTag extends  BaseTag  /* interfaces */ /* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag


        ChartTag parent = (ChartTag)findParentWithClass(ChartTag.class);


        parent.setZoomable(this);

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
        return "chart-zoomable";
    }

    public void setMousewheel(com.kendoui.taglib.chart.ZoomableMousewheelTag value) {
        setProperty("mousewheel", value);
    }

    public void setSelection(com.kendoui.taglib.chart.ZoomableSelectionTag value) {
        setProperty("selection", value);
    }

    public boolean getMousewheel() {
        return (Boolean)getProperty("mousewheel");
    }

    public void setMousewheel(boolean value) {
        setProperty("mousewheel", value);
    }

    public boolean getSelection() {
        return (Boolean)getProperty("selection");
    }

    public void setSelection(boolean value) {
        setProperty("selection", value);
    }

//<< Attributes

}
