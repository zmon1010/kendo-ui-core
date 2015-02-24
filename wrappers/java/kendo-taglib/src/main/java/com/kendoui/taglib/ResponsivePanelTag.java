
package com.kendoui.taglib;



import com.kendoui.taglib.json.Function;


import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class ResponsivePanelTag extends WidgetTag /* interfaces *//* interfaces */ {

    public ResponsivePanelTag() {
        super("ResponsivePanel");
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
