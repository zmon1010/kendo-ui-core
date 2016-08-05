
package com.kendoui.taglib.dialog;


import com.kendoui.taglib.BaseTag;



import com.kendoui.taglib.DialogTag;


import java.util.ArrayList;
import java.util.Map;
import java.util.List;

import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class ActionsTag extends BaseTag /* interfaces */ /* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag
//<< doEndTag

        DialogTag parent = (DialogTag)findParentWithClass(DialogTag.class);

        parent.setActions(this);

        return super.doEndTag();
    }

    @Override
    public void initialize() {
//>> initialize

        actions = new ArrayList<Map<String, Object>>();

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

    private List<Map<String, Object>> actions;

    public List<Map<String, Object>> actions() {
        return actions;
    }

    public static String tagName() {
        return "dialog-actions";
    }

    public void addAction(ActionTag value) {
        actions.add(value.properties());
    }

//<< Attributes

}
