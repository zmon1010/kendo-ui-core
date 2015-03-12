
package com.kendoui.taglib.grid;


import com.kendoui.taglib.BaseTag;






import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class ColumnFilterableTag extends  BaseTag  /* interfaces */ /* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag


        ColumnTag parent = (ColumnTag)findParentWithClass(ColumnTag.class);


        parent.setFilterable(this);

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
        return "grid-column-filterable";
    }

    public void setCell(com.kendoui.taglib.grid.ColumnFilterableCellTag value) {
        setProperty("cell", value);
    }

    public void setItemTemplate(ColumnFilterableItemTemplateFunctionTag value) {
        setEvent("itemTemplate", value.getBody());
    }

    public void setUi(ColumnFilterableUiFunctionTag value) {
        setEvent("ui", value.getBody());
    }

    public boolean getCheckAll() {
        return (boolean)getProperty("checkAll");
    }

    public void setCheckAll(boolean value) {
        setProperty("checkAll", value);
    }

    public void setDataSource(DataSourceTag dataSource) {
        setProperty("dataSource", dataSource);
    }

    public String getItemTemplate() {
        Function property = ((Function)getProperty("itemTemplate"));
        if (property != null) {
            return property.getBody();
        }
        return null;
    }

    public void setItemTemplate(String value) {
        setProperty("itemTemplate", new Function(value));
    }

    public java.lang.Object getMulti() {
        return (java.lang.Object)getProperty("multi");
    }

    public void setMulti(java.lang.Object value) {
        setProperty("multi", value);
    }

    public java.lang.String getUi() {
        return (java.lang.String)getProperty("ui");
    }

    public void setUi(java.lang.String value) {
        setProperty("ui", value);
    }

//<< Attributes

}
