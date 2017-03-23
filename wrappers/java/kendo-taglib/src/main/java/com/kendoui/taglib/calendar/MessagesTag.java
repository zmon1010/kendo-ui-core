
package com.kendoui.taglib.calendar;


import com.kendoui.taglib.BaseTag;



import com.kendoui.taglib.CalendarTag;




import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class MessagesTag extends  BaseTag  /* interfaces */ /* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag


        CalendarTag parent = (CalendarTag)findParentWithClass(CalendarTag.class);


        parent.setMessages(this);

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
        return "calendar-messages";
    }

    public java.lang.String getWeekColumnHeader() {
        return (java.lang.String)getProperty("weekColumnHeader");
    }

    public void setWeekColumnHeader(java.lang.String value) {
        setProperty("weekColumnHeader", value);
    }

//<< Attributes

}
