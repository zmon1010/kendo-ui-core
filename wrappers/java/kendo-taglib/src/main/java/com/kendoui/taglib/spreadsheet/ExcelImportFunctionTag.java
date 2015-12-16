
package com.kendoui.taglib.spreadsheet;

import com.kendoui.taglib.FunctionTag;

import com.kendoui.taglib.SpreadsheetTag;


import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class ExcelImportFunctionTag extends FunctionTag /* interfaces */ /* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag


        SpreadsheetTag parent = (SpreadsheetTag)findParentWithClass(SpreadsheetTag.class);


        parent.setExcelImport(this);

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
