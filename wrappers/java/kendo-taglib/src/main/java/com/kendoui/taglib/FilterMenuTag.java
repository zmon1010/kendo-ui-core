
package com.kendoui.taglib;


import com.kendoui.taglib.filtermenu.*;



import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class FilterMenuTag extends WidgetTag /* interfaces */implements DataBoundWidget/* interfaces */ {

    public FilterMenuTag() {
        super("FilterMenu");
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
        return "filterMenu";
    }

    public void setMessages(com.kendoui.taglib.filtermenu.MessagesTag value) {
        setProperty("messages", value);
    }

    public void setOperators(com.kendoui.taglib.filtermenu.OperatorsTag value) {
        setProperty("operators", value);
    }

    public void setDataSource(DataSourceTag dataSource) {
        setProperty("dataSource", dataSource);
    }

    public boolean getExtra() {
        return (Boolean)getProperty("extra");
    }

    public void setExtra(boolean value) {
        setProperty("extra", value);
    }

    public java.lang.String getField() {
        return (java.lang.String)getProperty("field");
    }

    public void setField(java.lang.String value) {
        setProperty("field", value);
    }

//<< Attributes

}
