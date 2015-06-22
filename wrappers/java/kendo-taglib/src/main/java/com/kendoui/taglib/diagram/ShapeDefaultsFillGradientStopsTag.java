
package com.kendoui.taglib.diagram;


import com.kendoui.taglib.BaseTag;





import java.util.ArrayList;
import java.util.Map;
import java.util.List;

import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class ShapeDefaultsFillGradientStopsTag extends BaseTag /* interfaces */ /* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag
//<< doEndTag

      ShapeDefaultsFillGradientTag parent = (ShapeDefaultsFillGradientTag)findParentWithClass(ShapeDefaultsFillGradientTag.class);
      parent.setStops(this);
      
      return super.doEndTag();
    }

    @Override
    public void initialize() {
//>> initialize

        stops = new ArrayList<Map<String, Object>>();

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

    private List<Map<String, Object>> stops;

    public List<Map<String, Object>> stops() {
        return stops;
    }

    public static String tagName() {
        return "diagram-shapeDefaults-fill-gradient-stops";
    }

    public void addStop(ShapeDefaultsFillGradientStopTag value) {
        stops.add(value.properties());
    }

//<< Attributes

}
