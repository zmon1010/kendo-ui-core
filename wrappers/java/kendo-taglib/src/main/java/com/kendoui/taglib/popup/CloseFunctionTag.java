
package com.kendoui.taglib.popup;

import com.kendoui.taglib.FunctionTag;

import com.kendoui.taglib.PopupTag;


import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class CloseFunctionTag extends FunctionTag /* interfaces */ /* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag


        PopupTag parent = (PopupTag)findParentWithClass(PopupTag.class);


        parent.setClose(this);

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
