
package com.kendoui.taglib;


import com.kendoui.taglib.listbox.*;


import com.kendoui.taglib.json.Function;


import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class ListBoxTag extends WidgetTag /* interfaces */implements DataBoundWidget/* interfaces */ {

    public ListBoxTag() {
        super("ListBox");
    }

    @Override
    protected Element<?> createElement() {
        return new Select().attr("name", getName());
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
        return "listBox";
    }

    public void setDraggable(com.kendoui.taglib.listbox.DraggableTag value) {
        setProperty("draggable", value);
    }

    public void setMessages(com.kendoui.taglib.listbox.MessagesTag value) {
        setProperty("messages", value);
    }

    public void setToolbar(com.kendoui.taglib.listbox.ToolbarTag value) {
        setProperty("toolbar", value);
    }

    public void setAdd(AddFunctionTag value) {
        setEvent("add", value.getBody());
    }

    public void setChange(ChangeFunctionTag value) {
        setEvent("change", value.getBody());
    }

    public void setDataBound(DataBoundFunctionTag value) {
        setEvent("dataBound", value.getBody());
    }

    public void setDrag(DragFunctionTag value) {
        setEvent("drag", value.getBody());
    }

    public void setDragend(DragendFunctionTag value) {
        setEvent("dragend", value.getBody());
    }

    public void setDragstart(DragstartFunctionTag value) {
        setEvent("dragstart", value.getBody());
    }

    public void setDrop(DropFunctionTag value) {
        setEvent("drop", value.getBody());
    }

    public void setRemove(RemoveFunctionTag value) {
        setEvent("remove", value.getBody());
    }

    public void setReorder(ReorderFunctionTag value) {
        setEvent("reorder", value.getBody());
    }

    public boolean getAutoBind() {
        return (Boolean)getProperty("autoBind");
    }

    public void setAutoBind(boolean value) {
        setProperty("autoBind", value);
    }

    public java.lang.String getConnectWith() {
        return (java.lang.String)getProperty("connectWith");
    }

    public void setConnectWith(java.lang.String value) {
        setProperty("connectWith", value);
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

    public boolean getDraggable() {
        return (Boolean)getProperty("draggable");
    }

    public void setDraggable(boolean value) {
        setProperty("draggable", value);
    }

    public java.lang.Object getDropSources() {
        return (java.lang.Object)getProperty("dropSources");
    }

    public void setDropSources(java.lang.Object value) {
        setProperty("dropSources", value);
    }

    public java.lang.Object getHeight() {
        return (java.lang.Object)getProperty("height");
    }

    public void setHeight(java.lang.Object value) {
        setProperty("height", value);
    }

    public java.lang.String getHint() {
        return (java.lang.String)getProperty("hint");
    }

    public void setHint(java.lang.String value) {
        setProperty("hint", value);
    }

    public boolean getNavigatable() {
        return (Boolean)getProperty("navigatable");
    }

    public void setNavigatable(boolean value) {
        setProperty("navigatable", value);
    }

    public boolean getReorderable() {
        return (Boolean)getProperty("reorderable");
    }

    public void setReorderable(boolean value) {
        setProperty("reorderable", value);
    }

    public java.lang.String getSelectable() {
        return (java.lang.String)getProperty("selectable");
    }

    public void setSelectable(java.lang.String value) {
        setProperty("selectable", value);
    }

    public String getTemplate() {
        Function property = ((Function)getProperty("template"));
        if (property != null) {
            return property.getBody();
        }
        return null;
    }

    public void setTemplate(String value) {
        setProperty("template", new Function(value));
    }

    public String getAdd() {
        Function property = ((Function)getProperty("add"));
        if (property != null) {
            return property.getBody();
        }
        return null;
    }

    public void setAdd(String value) {
        setProperty("add", new Function(value));
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

    public String getDrag() {
        Function property = ((Function)getProperty("drag"));
        if (property != null) {
            return property.getBody();
        }
        return null;
    }

    public void setDrag(String value) {
        setProperty("drag", new Function(value));
    }

    public String getDragend() {
        Function property = ((Function)getProperty("dragend"));
        if (property != null) {
            return property.getBody();
        }
        return null;
    }

    public void setDragend(String value) {
        setProperty("dragend", new Function(value));
    }

    public String getDragstart() {
        Function property = ((Function)getProperty("dragstart"));
        if (property != null) {
            return property.getBody();
        }
        return null;
    }

    public void setDragstart(String value) {
        setProperty("dragstart", new Function(value));
    }

    public String getDrop() {
        Function property = ((Function)getProperty("drop"));
        if (property != null) {
            return property.getBody();
        }
        return null;
    }

    public void setDrop(String value) {
        setProperty("drop", new Function(value));
    }

    public String getRemove() {
        Function property = ((Function)getProperty("remove"));
        if (property != null) {
            return property.getBody();
        }
        return null;
    }

    public void setRemove(String value) {
        setProperty("remove", new Function(value));
    }

    public String getReorder() {
        Function property = ((Function)getProperty("reorder"));
        if (property != null) {
            return property.getBody();
        }
        return null;
    }

    public void setReorder(String value) {
        setProperty("reorder", new Function(value));
    }

//<< Attributes

}
