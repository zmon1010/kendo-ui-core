
package com.kendoui.taglib.chart;

import com.kendoui.taglib.FunctionTag;


import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class YAxisItemTitleVisualFunctionTag extends FunctionTag /* interfaces */ /* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag


        YAxisItemTitleTag parent = (YAxisItemTitleTag)findParentWithClass(YAxisItemTitleTag.class);


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
