
package com.kendoui.taglib;



import com.kendoui.taglib.json.Function;
import com.kendoui.taglib.dateinput.*;
import com.kendoui.taglib.html.Element;
import com.kendoui.taglib.html.Input;

import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class DateInputTag extends WidgetTag /* interfaces *//* interfaces */ {

    public DateInputTag() {
        super("DateInput");
    }
    
    @Override
    protected Element<?> createElement() {
        return new Input().attr("name", getName());
    }
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag
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
        return "dateInput";
    }

    public void setChange(ChangeFunctionTag value) {
        setEvent("change", value.getBody());
    }

    public java.lang.String getFormat() {
        return (java.lang.String)getProperty("format");
    }

    public void setFormat(java.lang.String value) {
        setProperty("format", value);
    }

    public java.util.Date getMax() {
        return (java.util.Date)getProperty("max");
    }

    public void setMax(java.util.Date value) {
        setProperty("max", value);
    }

    public java.util.Date getMin() {
        return (java.util.Date)getProperty("min");
    }

    public void setMin(java.util.Date value) {
        setProperty("min", value);
    }

    public java.util.Date getValue() {
        return (java.util.Date)getProperty("value");
    }

    public void setValue(java.util.Date value) {
        setProperty("value", value);
    }

    public String getChange() {
        Function property = ((Function)getProperty("change"));
        if (property != null) {
            return property.getBody();
        }
        return null;
    }

    public void setChange(String value) {
        setProperty("change", new Function(value));
    }

//<< Attributes

}
