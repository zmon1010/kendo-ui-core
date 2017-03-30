
package com.kendoui.taglib.dateinput;


import com.kendoui.taglib.BaseTag;



import com.kendoui.taglib.DateInputTag;




import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class MessagesTag extends  BaseTag  /* interfaces */ /* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag


        DateInputTag parent = (DateInputTag)findParentWithClass(DateInputTag.class);


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
        return "dateInput-messages";
    }

    public java.lang.String getDay() {
        return (java.lang.String)getProperty("day");
    }

    public void setDay(java.lang.String value) {
        setProperty("day", value);
    }

    public java.lang.String getDayperiod() {
        return (java.lang.String)getProperty("dayperiod");
    }

    public void setDayperiod(java.lang.String value) {
        setProperty("dayperiod", value);
    }

    public java.lang.String getHour() {
        return (java.lang.String)getProperty("hour");
    }

    public void setHour(java.lang.String value) {
        setProperty("hour", value);
    }

    public java.lang.String getMinute() {
        return (java.lang.String)getProperty("minute");
    }

    public void setMinute(java.lang.String value) {
        setProperty("minute", value);
    }

    public java.lang.String getMonth() {
        return (java.lang.String)getProperty("month");
    }

    public void setMonth(java.lang.String value) {
        setProperty("month", value);
    }

    public java.lang.String getSecond() {
        return (java.lang.String)getProperty("second");
    }

    public void setSecond(java.lang.String value) {
        setProperty("second", value);
    }

    public java.lang.String getWeekday() {
        return (java.lang.String)getProperty("weekday");
    }

    public void setWeekday(java.lang.String value) {
        setProperty("weekday", value);
    }

    public java.lang.String getYear() {
        return (java.lang.String)getProperty("year");
    }

    public void setYear(java.lang.String value) {
        setProperty("year", value);
    }

//<< Attributes

}
