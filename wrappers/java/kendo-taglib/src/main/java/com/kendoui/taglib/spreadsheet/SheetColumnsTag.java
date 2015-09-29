
package com.kendoui.taglib.spreadsheet;


import com.kendoui.taglib.BaseTag;





import java.util.ArrayList;
import java.util.Map;
import java.util.List;

import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class SheetColumnsTag extends BaseTag /* interfaces */ /* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag
        SheetTag parent = (SheetTag)findParentWithClass(SheetTag.class);

        parent.setColumns(this);
//<< doEndTag

        return super.doEndTag();
    }

    @Override
    public void initialize() {
//>> initialize

        columns = new ArrayList<Map<String, Object>>();

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

    private List<Map<String, Object>> columns;

    public List<Map<String, Object>> columns() {
        return columns;
    }

    public static String tagName() {
        return "spreadsheet-sheet-columns";
    }

    public void addColumn(SheetColumnTag value) {
        columns.add(value.properties());
    }

//<< Attributes

}
