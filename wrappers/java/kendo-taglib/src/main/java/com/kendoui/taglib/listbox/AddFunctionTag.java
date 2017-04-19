
package com.kendoui.taglib.listbox;

import com.kendoui.taglib.FunctionTag;

import com.kendoui.taglib.ListBoxTag;


import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class AddFunctionTag extends FunctionTag /* interfaces */ /* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag


        ListBoxTag parent = (ListBoxTag)findParentWithClass(ListBoxTag.class);


        parent.setAdd(this);

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
