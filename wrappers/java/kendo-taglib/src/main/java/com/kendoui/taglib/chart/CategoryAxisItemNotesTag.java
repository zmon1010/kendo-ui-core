
package com.kendoui.taglib.chart;


import com.kendoui.taglib.BaseTag;
import com.kendoui.taglib.json.Function;






import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class CategoryAxisItemNotesTag extends  BaseTag  /* interfaces */ /* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag


        CategoryAxisItemTag parent = (CategoryAxisItemTag)findParentWithClass(CategoryAxisItemTag.class);


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
        return "chart-categoryAxisItem-notes";
    }

    public void setData(CategoryAxisItemNotesDataTag value) {

        setProperty("data", value.data());

    }

    public void setIcon(com.kendoui.taglib.chart.CategoryAxisItemNotesIconTag value) {
        setProperty("icon", value);
    }

    public void setLabel(com.kendoui.taglib.chart.CategoryAxisItemNotesLabelTag value) {
        setProperty("label", value);
    }

    public void setLine(com.kendoui.taglib.chart.CategoryAxisItemNotesLineTag value) {
        setProperty("line", value);
    }

    public void setVisual(CategoryAxisItemNotesVisualFunctionTag value) {
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
