
package com.kendoui.taglib.chart;


import com.kendoui.taglib.BaseTag;
import com.kendoui.taglib.json.Function;






import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class SeriesItemHighlightTag extends  BaseTag  /* interfaces *//* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag


        SeriesItemTag parent = (SeriesItemTag)findParentWithClass(SeriesItemTag.class);


        parent.setHighlight(this);

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
        return "chart-seriesItem-highlight";
    }

    public void setBorder(com.kendoui.taglib.chart.SeriesItemHighlightBorderTag value) {
        setProperty("border", value);
    }

    public void setLine(com.kendoui.taglib.chart.SeriesItemHighlightLineTag value) {
        setProperty("line", value);
    }

    public void setToggle(SeriesItemHighlightToggleFunctionTag value) {
        setEvent("toggle", value.getBody());
    }

    public void setVisual(SeriesItemHighlightVisualFunctionTag value) {
        setEvent("visual", value.getBody());
    }

    public java.lang.String getColor() {
        return (java.lang.String)getProperty("color");
    }

    public void setColor(java.lang.String value) {
        setProperty("color", value);
    }

    public float getOpacity() {
        return (float)getProperty("opacity");
    }

    public void setOpacity(float value) {
        setProperty("opacity", value);
    }

    public String getToggle() {
        Function property = ((Function)getProperty("toggle"));
        if (property != null) {
            return property.getBody();
        }
        return null;
    }

    public void setToggle(String value) {
        setProperty("toggle", new Function(value));
    }

    public boolean getVisible() {
        return (boolean)getProperty("visible");
    }

    public void setVisible(boolean value) {
        setProperty("visible", value);
    }

    public String getVisual() {
        Function property = ((Function)getProperty("visual"));
        if (property != null) {
            return property.getBody();
        }
        return null;
    }

    public void setVisual(String value) {
        setProperty("visual", new Function(value));
    }

//<< Attributes

}
