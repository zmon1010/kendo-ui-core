
package com.kendoui.taglib.diagram;

import com.kendoui.taglib.FunctionTag;


import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class ShapeDefaultsEditableToolButtonClickFunctionTag extends FunctionTag /* interfaces */ /* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag


        ShapeDefaultsEditableToolButtonTag parent = (ShapeDefaultsEditableToolButtonTag)findParentWithClass(ShapeDefaultsEditableToolButtonTag.class);


        parent.setClick(this);

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
