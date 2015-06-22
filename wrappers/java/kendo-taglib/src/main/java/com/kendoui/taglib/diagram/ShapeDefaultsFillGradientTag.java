
package com.kendoui.taglib.diagram;


import com.kendoui.taglib.BaseTag;






import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class ShapeDefaultsFillGradientTag extends  BaseTag  /* interfaces */ /* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag


        ShapeDefaultsFillTag parent = (ShapeDefaultsFillTag)findParentWithClass(ShapeDefaultsFillTag.class);


        parent.setGradient(this);

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
        return "diagram-shapeDefaults-fill-gradient";
    }

    public void setStops(ShapeDefaultsFillGradientStopsTag value) {

        setProperty("stops", value.stops());

    }

    public java.lang.Object getCenter() {
        return (java.lang.Object)getProperty("center");
    }

    public void setCenter(java.lang.Object value) {
        setProperty("center", value);
    }

    public java.lang.Object getEnd() {
        return (java.lang.Object)getProperty("end");
    }

    public void setEnd(java.lang.Object value) {
        setProperty("end", value);
    }

    public float getRadius() {
        return (float)getProperty("radius");
    }

    public void setRadius(float value) {
        setProperty("radius", value);
    }

    public java.lang.Object getStart() {
        return (java.lang.Object)getProperty("start");
    }

    public void setStart(java.lang.Object value) {
        setProperty("start", value);
    }

    public java.lang.String getType() {
        return (java.lang.String)getProperty("type");
    }

    public void setType(java.lang.String value) {
        setProperty("type", value);
    }

//<< Attributes

}
