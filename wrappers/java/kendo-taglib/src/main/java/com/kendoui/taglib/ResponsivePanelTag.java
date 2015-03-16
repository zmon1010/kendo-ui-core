
package com.kendoui.taglib;



import com.kendoui.taglib.html.Div;
import com.kendoui.taglib.html.Element;
import com.kendoui.taglib.json.Function;


import com.kendoui.taglib.responsivepanel.CloseFunctionTag;
import com.kendoui.taglib.responsivepanel.OpenFunctionTag;

import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class ResponsivePanelTag extends WidgetTag /* interfaces *//* interfaces */ {

    public ResponsivePanelTag() {
        super("ResponsivePanel");
    }

    @Override
    protected Element<?> createElement() {
        Div element = new Div();

        element.html(body());

        return element;
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
        return "responsivePanel";
    }

    public void setClose(CloseFunctionTag value) {
        setEvent("close", value.getBody());
    }

    public void setOpen(OpenFunctionTag value) {
        setEvent("open", value.getBody());
    }

    public boolean getAutoClose() {
        return (boolean)getProperty("autoClose");
    }

    public void setAutoClose(boolean value) {
        setProperty("autoClose", value);
    }

    public float getBreakpoint() {
        return (float)getProperty("breakpoint");
    }

    public void setBreakpoint(float value) {
        setProperty("breakpoint", value);
    }

    public java.lang.String getOrientation() {
        return (java.lang.String)getProperty("orientation");
    }

    public void setOrientation(java.lang.String value) {
        setProperty("orientation", value);
    }

    public java.lang.String getToggleButton() {
        return (java.lang.String)getProperty("toggleButton");
    }

    public void setToggleButton(java.lang.String value) {
        setProperty("toggleButton", value);
    }

    public String getClose() {
        Function property = ((Function)getProperty("close"));
        if (property != null) {
            return property.getBody();
        }
        return null;
    }

    public void setClose(String value) {
        setProperty("close", new Function(value));
    }

    public String getOpen() {
        Function property = ((Function)getProperty("open"));
        if (property != null) {
            return property.getBody();
        }
        return null;
    }

    public void setOpen(String value) {
        setProperty("open", new Function(value));
    }

//<< Attributes

}
