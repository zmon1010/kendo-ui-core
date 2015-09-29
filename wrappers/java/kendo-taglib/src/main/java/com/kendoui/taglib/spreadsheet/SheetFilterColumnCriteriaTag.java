
package com.kendoui.taglib.spreadsheet;


import com.kendoui.taglib.BaseTag;




import java.util.ArrayList;
import java.util.Map;
import java.util.List;

import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class SheetFilterColumnCriteriaTag extends BaseTag /* interfaces */ /* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag
//<< doEndTag

        return super.doEndTag();
    }

    @Override
    public void initialize() {
//>> initialize

        criteria = new ArrayList<Map<String, Object>>();

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

    private List<Map<String, Object>> criteria;

    public List<Map<String, Object>> criteria() {
        return criteria;
    }

    public static String tagName() {
        return "spreadsheet-sheet-filter-column-criteria";
    }

    public void addCriteriaItem(SheetFilterColumnCriteriaItemTag value) {
        criteria.add(value.properties());
    }

//<< Attributes

}
