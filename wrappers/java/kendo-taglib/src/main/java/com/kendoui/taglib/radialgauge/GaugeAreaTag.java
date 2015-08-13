
package com.kendoui.taglib.radialgauge;

import com.kendoui.taglib.BaseTag;

import com.kendoui.taglib.RadialGaugeTag;




import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class GaugeAreaTag extends BaseTag /* interfaces *//* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag


        RadialGaugeTag parent = (RadialGaugeTag)findParentWithClass(RadialGaugeTag.class);


        parent.setGaugeArea(this);

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
        return "radialGauge-gaugeArea";
    }

    public void setBorder(com.kendoui.taglib.radialgauge.GaugeAreaBorderTag value) {
        setProperty("border", value);
    }

    public void setMargin(com.kendoui.taglib.radialgauge.GaugeAreaMarginTag value) {
        setProperty("margin", value);
    }

    public java.lang.Object getBackground() {
        return (java.lang.Object)getProperty("background");
    }

    public void setBackground(java.lang.Object value) {
        setProperty("background", value);
    }

    public float getHeight() {
        return (Float)getProperty("height");
    }

    public void setHeight(float value) {
        setProperty("height", value);
    }

    public float getMargin() {
        return (Float)getProperty("margin");
    }

    public void setMargin(float value) {
        setProperty("margin", value);
    }

    public float getWidth() {
        return (Float)getProperty("width");
    }

    public void setWidth(float value) {
        setProperty("width", value);
    }

//<< Attributes

}
