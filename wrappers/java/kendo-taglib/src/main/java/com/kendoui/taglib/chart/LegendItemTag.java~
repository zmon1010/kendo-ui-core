
package com.kendoui.taglib.chart;


import com.kendoui.taglib.BaseTag;
import com.kendoui.taglib.json.Function;





import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class LegendItemTag extends  BaseTag  /* interfaces */ /* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag


        LegendTag parent = (LegendTag)findParentWithClass(LegendTag.class);


        parent.setItem(this);

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
        return "chart-legend-item";
    }

    public void setVisual(LegendItemVisualFunctionTag value) {
        setEvent("visual", value.getBody());
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
