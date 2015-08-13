
package com.kendoui.taglib.scheduler;


import com.kendoui.taglib.BaseTag;



import com.kendoui.taglib.SchedulerTag;




import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class CurrentTimeMarkerTag extends  BaseTag  /* interfaces */ /* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag


        SchedulerTag parent = (SchedulerTag)findParentWithClass(SchedulerTag.class);


        parent.setCurrentTimeMarker(this);

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
        return "scheduler-currentTimeMarker";
    }

    public float getUpdateInterval() {
        return (Float)getProperty("updateInterval");
    }

    public void setUpdateInterval(float value) {
        setProperty("updateInterval", value);
    }

    public boolean getUseLocalTimezone() {
        return (Boolean)getProperty("useLocalTimezone");
    }

    public void setUseLocalTimezone(boolean value) {
        setProperty("useLocalTimezone", value);
    }

//<< Attributes

}
