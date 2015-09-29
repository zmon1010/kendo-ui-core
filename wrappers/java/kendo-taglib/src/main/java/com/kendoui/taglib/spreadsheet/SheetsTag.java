
package com.kendoui.taglib.spreadsheet;


import com.kendoui.taglib.BaseTag;



import com.kendoui.taglib.SpreadsheetTag;



import java.util.ArrayList;
import java.util.Map;
import java.util.List;

import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class SheetsTag extends BaseTag /* interfaces */ /* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag
        SpreadsheetTag parent = (SpreadsheetTag)findParentWithClass(SpreadsheetTag.class);

        parent.setSheets(this);
//<< doEndTag

        return super.doEndTag();
    }

    @Override
    public void initialize() {
//>> initialize

        sheets = new ArrayList<Map<String, Object>>();

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

    private List<Map<String, Object>> sheets;

    public List<Map<String, Object>> sheets() {
        return sheets;
    }

    public static String tagName() {
        return "spreadsheet-sheets";
    }

    public void addSheet(SheetTag value) {
        sheets.add(value.properties());
    }

//<< Attributes

}
