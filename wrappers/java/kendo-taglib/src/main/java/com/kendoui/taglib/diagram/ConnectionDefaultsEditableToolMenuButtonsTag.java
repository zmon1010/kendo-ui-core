
package com.kendoui.taglib.diagram;


import com.kendoui.taglib.BaseTag;




import java.util.ArrayList;
import java.util.Map;
import java.util.List;

import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class ConnectionDefaultsEditableToolMenuButtonsTag extends BaseTag /* interfaces */ /* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag
//<< doEndTag

        return super.doEndTag();
    }

    @Override
    public void initialize() {
//>> initialize

        menuButtons = new ArrayList<Map<String, Object>>();

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

    private List<Map<String, Object>> menuButtons;

    public List<Map<String, Object>> menuButtons() {
        return menuButtons;
    }

    public static String tagName() {
        return "diagram-connectionDefaults-editable-tool-menuButtons";
    }

    public void addMenuButton(ConnectionDefaultsEditableToolMenuButtonTag value) {
        menuButtons.add(value.properties());
    }

//<< Attributes

}
