
package com.kendoui.taglib.diagram;


import com.kendoui.taglib.BaseTag;



import com.kendoui.taglib.DiagramTag;




import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class LayoutTag extends  BaseTag  /* interfaces */ /* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag


        DiagramTag parent = (DiagramTag)findParentWithClass(DiagramTag.class);


        parent.setLayout(this);

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

    public static String tagName() {
        return "diagram-layout";
    }

    public void setGrid(com.kendoui.taglib.diagram.LayoutGridTag value) {
        setProperty("grid", value);
    }

    public float getEndRadialAngle() {
        return (Float)getProperty("endRadialAngle");
    }

    public void setEndRadialAngle(float value) {
        setProperty("endRadialAngle", value);
    }

    public float getHorizontalSeparation() {
        return (Float)getProperty("horizontalSeparation");
    }

    public void setHorizontalSeparation(float value) {
        setProperty("horizontalSeparation", value);
    }

    public float getIterations() {
        return (Float)getProperty("iterations");
    }

    public void setIterations(float value) {
        setProperty("iterations", value);
    }

    public float getLayerSeparation() {
        return (Float)getProperty("layerSeparation");
    }

    public void setLayerSeparation(float value) {
        setProperty("layerSeparation", value);
    }

    public float getNodeDistance() {
        return (Float)getProperty("nodeDistance");
    }

    public void setNodeDistance(float value) {
        setProperty("nodeDistance", value);
    }

    public float getRadialFirstLevelSeparation() {
        return (Float)getProperty("radialFirstLevelSeparation");
    }

    public void setRadialFirstLevelSeparation(float value) {
        setProperty("radialFirstLevelSeparation", value);
    }

    public float getRadialSeparation() {
        return (Float)getProperty("radialSeparation");
    }

    public void setRadialSeparation(float value) {
        setProperty("radialSeparation", value);
    }

    public float getStartRadialAngle() {
        return (Float)getProperty("startRadialAngle");
    }

    public void setStartRadialAngle(float value) {
        setProperty("startRadialAngle", value);
    }

    public java.lang.String getSubtype() {
        return (java.lang.String)getProperty("subtype");
    }

    public void setSubtype(java.lang.String value) {
        setProperty("subtype", value);
    }

    public float getTipOverTreeStartLevel() {
        return (Float)getProperty("tipOverTreeStartLevel");
    }

    public void setTipOverTreeStartLevel(float value) {
        setProperty("tipOverTreeStartLevel", value);
    }

    public java.lang.String getType() {
        return (java.lang.String)getProperty("type");
    }

    public void setType(java.lang.String value) {
        setProperty("type", value);
    }

    public float getUnderneathHorizontalOffset() {
        return (Float)getProperty("underneathHorizontalOffset");
    }

    public void setUnderneathHorizontalOffset(float value) {
        setProperty("underneathHorizontalOffset", value);
    }

    public float getUnderneathVerticalSeparation() {
        return (Float)getProperty("underneathVerticalSeparation");
    }

    public void setUnderneathVerticalSeparation(float value) {
        setProperty("underneathVerticalSeparation", value);
    }

    public float getUnderneathVerticalTopOffset() {
        return (Float)getProperty("underneathVerticalTopOffset");
    }

    public void setUnderneathVerticalTopOffset(float value) {
        setProperty("underneathVerticalTopOffset", value);
    }

    public float getVerticalSeparation() {
        return (Float)getProperty("verticalSeparation");
    }

    public void setVerticalSeparation(float value) {
        setProperty("verticalSeparation", value);
    }

//<< Attributes

}
