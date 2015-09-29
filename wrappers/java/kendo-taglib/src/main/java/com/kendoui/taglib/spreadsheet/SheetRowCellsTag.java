
package com.kendoui.taglib.spreadsheet;


import com.kendoui.taglib.BaseTag;





import java.util.ArrayList;
import java.util.Map;
import java.util.List;

import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class SheetRowCellsTag extends BaseTag /* interfaces */ /* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag
        SheetRowTag parent = (SheetRowTag)findParentWithClass(SheetRowTag.class);

        parent.setCells(this);
//<< doEndTag

        return super.doEndTag();
    }

    @Override
    public void initialize() {
//>> initialize

        cells = new ArrayList<Map<String, Object>>();

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

    private List<Map<String, Object>> cells;

    public List<Map<String, Object>> cells() {
        return cells;
    }

    public static String tagName() {
        return "spreadsheet-sheet-row-cells";
    }

    public void addCell(SheetRowCellTag value) {
        cells.add(value.properties());
    }

//<< Attributes

}
