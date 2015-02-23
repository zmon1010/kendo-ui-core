
package com.kendoui.taglib.editor;

import com.kendoui.taglib.FunctionTag;

import com.kendoui.taglib.EditorTag;


import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class PdfExportFunctionTag extends FunctionTag /* interfaces */ /* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag


        EditorTag parent = (EditorTag)findParentWithClass(EditorTag.class);


        parent.setPdfExport(this);

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
