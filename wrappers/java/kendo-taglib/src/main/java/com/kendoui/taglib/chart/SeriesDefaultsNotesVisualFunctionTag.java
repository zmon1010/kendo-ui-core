
package com.kendoui.taglib.chart;

import com.kendoui.taglib.FunctionTag;


import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class SeriesDefaultsNotesVisualFunctionTag extends FunctionTag /* interfaces */ /* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag


        SeriesDefaultsNotesTag parent = (SeriesDefaultsNotesTag)findParentWithClass(SeriesDefaultsNotesTag.class);


        parent.setVisual(this);

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
//<< Attributes

}
