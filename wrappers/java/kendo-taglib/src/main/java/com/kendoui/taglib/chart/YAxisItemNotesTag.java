
package com.kendoui.taglib.chart;


import com.kendoui.taglib.BaseTag;






import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class YAxisItemNotesTag extends  BaseTag  /* interfaces */ /* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag


        YAxisItemTag parent = (YAxisItemTag)findParentWithClass(YAxisItemTag.class);


        parent.setNotes(this);

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
        return "chart-yAxisItem-notes";
    }

    public void setData(YAxisItemNotesDataTag value) {

        setProperty("data", value.data());

    }

    public void setIcon(com.kendoui.taglib.chart.YAxisItemNotesIconTag value) {
        setProperty("icon", value);
    }

    public void setLabel(com.kendoui.taglib.chart.YAxisItemNotesLabelTag value) {
        setProperty("label", value);
    }

    public void setLine(com.kendoui.taglib.chart.YAxisItemNotesLineTag value) {
        setProperty("line", value);
    }

    public void setVisual(YAxisItemNotesVisualFunctionTag value) {
        setEvent("visual", value.getBody());
    }

    public java.lang.String getPosition() {
        return (java.lang.String)getProperty("position");
    }

    public void setPosition(java.lang.String value) {
        setProperty("position", value);
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
