
package com.kendoui.taglib;


import com.kendoui.taglib.multiselect.*;

import com.kendoui.taglib.html.Element;
import com.kendoui.taglib.html.Select;
import com.kendoui.taglib.json.Function;


import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class MultiSelectTag extends WidgetTag /* interfaces */implements DataBoundWidget/* interfaces */ {

    public MultiSelectTag() {
        super("MultiSelect");
    }
    
    @Override
    protected Element<?> createElement() {
        return new Select().attr("name", getName()).attr("multiple", "multiple");
    }
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag
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
        return "multiSelect";
    }

    public void setAnimation(com.kendoui.taglib.multiselect.AnimationTag value) {
        setProperty("animation", value);
    }

    public void setPopup(com.kendoui.taglib.multiselect.PopupTag value) {
        setProperty("popup", value);
    }

    public void setVirtual(com.kendoui.taglib.multiselect.VirtualTag value) {
        setProperty("virtual", value);
    }

    public void setChange(ChangeFunctionTag value) {
        setEvent("change", value.getBody());
    }

    public void setClose(CloseFunctionTag value) {
        setEvent("close", value.getBody());
    }

    public void setDataBound(DataBoundFunctionTag value) {
        setEvent("dataBound", value.getBody());
    }

    public void setDeselect(DeselectFunctionTag value) {
        setEvent("deselect", value.getBody());
    }

    public void setFiltering(FilteringFunctionTag value) {
        setEvent("filtering", value.getBody());
    }

    public void setOpen(OpenFunctionTag value) {
        setEvent("open", value.getBody());
    }

    public void setSelect(SelectFunctionTag value) {
        setEvent("select", value.getBody());
    }

    public boolean getAnimation() {
        return (Boolean)getProperty("animation");
    }

    public void setAnimation(boolean value) {
        setProperty("animation", value);
    }

    public boolean getAutoBind() {
        return (Boolean)getProperty("autoBind");
    }

    public void setAutoBind(boolean value) {
        setProperty("autoBind", value);
    }

    public boolean getAutoClose() {
        return (Boolean)getProperty("autoClose");
    }

    public void setAutoClose(boolean value) {
        setProperty("autoClose", value);
    }

    public boolean getClearButton() {
        return (Boolean)getProperty("clearButton");
    }

    public void setClearButton(boolean value) {
        setProperty("clearButton", value);
    }

    public void setDataSource(DataSourceTag dataSource) {
        setProperty("dataSource", dataSource);
    }

    public java.lang.String getDataTextField() {
        return (java.lang.String)getProperty("dataTextField");
    }

    public void setDataTextField(java.lang.String value) {
        setProperty("dataTextField", value);
    }

    public java.lang.String getDataValueField() {
        return (java.lang.String)getProperty("dataValueField");
    }

    public void setDataValueField(java.lang.String value) {
        setProperty("dataValueField", value);
    }

    public float getDelay() {
        return (Float)getProperty("delay");
    }

    public void setDelay(float value) {
        setProperty("delay", value);
    }

    public boolean getEnable() {
        return (Boolean)getProperty("enable");
    }

    public void setEnable(boolean value) {
        setProperty("enable", value);
    }

    public boolean getEnforceMinLength() {
        return (Boolean)getProperty("enforceMinLength");
    }

    public void setEnforceMinLength(boolean value) {
        setProperty("enforceMinLength", value);
    }

    public java.lang.String getFilter() {
        return (java.lang.String)getProperty("filter");
    }

    public void setFilter(java.lang.String value) {
        setProperty("filter", value);
    }

    public java.lang.String getFixedGroupTemplate() {
        return (java.lang.String)getProperty("fixedGroupTemplate");
    }

    public void setFixedGroupTemplate(java.lang.String value) {
        setProperty("fixedGroupTemplate", value);
    }

    public java.lang.String getFooterTemplate() {
        return (java.lang.String)getProperty("footerTemplate");
    }

    public void setFooterTemplate(java.lang.String value) {
        setProperty("footerTemplate", value);
    }

    public java.lang.String getGroupTemplate() {
        return (java.lang.String)getProperty("groupTemplate");
    }

    public void setGroupTemplate(java.lang.String value) {
        setProperty("groupTemplate", value);
    }

    public java.lang.String getHeaderTemplate() {
        return (java.lang.String)getProperty("headerTemplate");
    }

    public void setHeaderTemplate(java.lang.String value) {
        setProperty("headerTemplate", value);
    }

    public float getHeight() {
        return (Float)getProperty("height");
    }

    public void setHeight(float value) {
        setProperty("height", value);
    }

    public boolean getHighlightFirst() {
        return (Boolean)getProperty("highlightFirst");
    }

    public void setHighlightFirst(boolean value) {
        setProperty("highlightFirst", value);
    }

    public boolean getIgnoreCase() {
        return (Boolean)getProperty("ignoreCase");
    }

    public void setIgnoreCase(boolean value) {
        setProperty("ignoreCase", value);
    }

    public java.lang.String getItemTemplate() {
        return (java.lang.String)getProperty("itemTemplate");
    }

    public void setItemTemplate(java.lang.String value) {
        setProperty("itemTemplate", value);
    }

    public float getMaxSelectedItems() {
        return (Float)getProperty("maxSelectedItems");
    }

    public void setMaxSelectedItems(float value) {
        setProperty("maxSelectedItems", value);
    }

    public float getMinLength() {
        return (Float)getProperty("minLength");
    }

    public void setMinLength(float value) {
        setProperty("minLength", value);
    }

    public java.lang.String getNoDataTemplate() {
        return (java.lang.String)getProperty("noDataTemplate");
    }

    public void setNoDataTemplate(java.lang.String value) {
        setProperty("noDataTemplate", value);
    }

    public java.lang.String getPlaceholder() {
        return (java.lang.String)getProperty("placeholder");
    }

    public void setPlaceholder(java.lang.String value) {
        setProperty("placeholder", value);
    }

    public java.lang.String getTagMode() {
        return (java.lang.String)getProperty("tagMode");
    }

    public void setTagMode(java.lang.String value) {
        setProperty("tagMode", value);
    }

    public java.lang.String getTagTemplate() {
        return (java.lang.String)getProperty("tagTemplate");
    }

    public void setTagTemplate(java.lang.String value) {
        setProperty("tagTemplate", value);
    }

    public java.lang.Object getValue() {
        return (java.lang.Object)getProperty("value");
    }

    public void setValue(java.lang.Object value) {
        setProperty("value", value);
    }

    public boolean getValuePrimitive() {
        return (Boolean)getProperty("valuePrimitive");
    }

    public void setValuePrimitive(boolean value) {
        setProperty("valuePrimitive", value);
    }

    public boolean getVirtual() {
        return (Boolean)getProperty("virtual");
    }

    public void setVirtual(boolean value) {
        setProperty("virtual", value);
    }

    public String getChange() {
        Function property = ((Function)getProperty("change"));
        if (property != null) {
            return property.getBody();
        }
        return null;
    }

    public void setChange(String value) {
        setProperty("change", new Function(value));
    }

    public String getClose() {
        Function property = ((Function)getProperty("close"));
        if (property != null) {
            return property.getBody();
        }
        return null;
    }

    public void setClose(String value) {
        setProperty("close", new Function(value));
    }

    public String getDataBound() {
        Function property = ((Function)getProperty("dataBound"));
        if (property != null) {
            return property.getBody();
        }
        return null;
    }

    public void setDataBound(String value) {
        setProperty("dataBound", new Function(value));
    }

    public String getDeselect() {
        Function property = ((Function)getProperty("deselect"));
        if (property != null) {
            return property.getBody();
        }
        return null;
    }

    public void setDeselect(String value) {
        setProperty("deselect", new Function(value));
    }

    public String getFiltering() {
        Function property = ((Function)getProperty("filtering"));
        if (property != null) {
            return property.getBody();
        }
        return null;
    }

    public void setFiltering(String value) {
        setProperty("filtering", new Function(value));
    }

    public String getOpen() {
        Function property = ((Function)getProperty("open"));
        if (property != null) {
            return property.getBody();
        }
        return null;
    }

    public void setOpen(String value) {
        setProperty("open", new Function(value));
    }

    public String getSelect() {
        Function property = ((Function)getProperty("select"));
        if (property != null) {
            return property.getBody();
        }
        return null;
    }

    public void setSelect(String value) {
        setProperty("select", new Function(value));
    }

//<< Attributes

}
