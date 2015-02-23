
package com.kendoui.taglib.chart;

import com.kendoui.taglib.FunctionTag;


import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class SeriesItemHighlightToggleFunctionTag extends FunctionTag /* interfaces */ /* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag


        SeriesItemHighlightTag parent = (SeriesItemHighlightTag)findParentWithClass(SeriesItemHighlightTag.class);


        parent.setToggle(this);

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
