
package com.kendoui.taglib.dialog;

import com.kendoui.taglib.FunctionTag;

import com.kendoui.taglib.DialogTag;


import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class OpenFunctionTag extends FunctionTag /* interfaces */ /* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag


        DialogTag parent = (DialogTag)findParentWithClass(DialogTag.class);


        parent.setOpen(this);

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
