
package com.kendoui.taglib.chart;


import com.kendoui.taglib.BaseTag;






import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class CategoryAxisItemLabelsRotationTag extends  BaseTag  /* interfaces */ /* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag


        CategoryAxisItemLabelsTag parent = (CategoryAxisItemLabelsTag)findParentWithClass(CategoryAxisItemLabelsTag.class);


        parent.setRotation(this);

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
        return "chart-categoryAxisItem-labels-rotation";
    }

    public java.lang.String getAlign() {
        return (java.lang.String)getProperty("align");
    }

    public void setAlign(java.lang.String value) {
        setProperty("align", value);
    }

    public java.lang.Object getAngle() {
        return (java.lang.Object)getProperty("angle");
    }

    public void setAngle(java.lang.Object value) {
        setProperty("angle", value);
    }

//<< Attributes

}
