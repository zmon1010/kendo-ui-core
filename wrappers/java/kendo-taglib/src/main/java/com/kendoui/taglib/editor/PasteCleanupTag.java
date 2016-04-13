
package com.kendoui.taglib.editor;


import com.kendoui.taglib.BaseTag;



import com.kendoui.taglib.EditorTag;
import com.kendoui.taglib.json.Function;




import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class PasteCleanupTag extends  BaseTag  /* interfaces */ /* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag


        EditorTag parent = (EditorTag)findParentWithClass(EditorTag.class);


        parent.setPasteCleanup(this);

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
        return "editor-pasteCleanup";
    }

    public void setCustom(PasteCleanupCustomFunctionTag value) {
        setEvent("custom", value.getBody());
    }

    public boolean getAll() {
        return (Boolean)getProperty("all");
    }

    public void setAll(boolean value) {
        setProperty("all", value);
    }

    public boolean getCss() {
        return (Boolean)getProperty("css");
    }

    public void setCss(boolean value) {
        setProperty("css", value);
    }

    public String getCustom() {
        Function property = ((Function)getProperty("custom"));
        if (property != null) {
            return property.getBody();
        }
        return null;
    }

    public void setCustom(String value) {
        setProperty("custom", new Function(value));
    }

    public boolean getKeepNewLines() {
        return (Boolean)getProperty("keepNewLines");
    }

    public void setKeepNewLines(boolean value) {
        setProperty("keepNewLines", value);
    }

    public boolean getMsAllFormatting() {
        return (Boolean)getProperty("msAllFormatting");
    }

    public void setMsAllFormatting(boolean value) {
        setProperty("msAllFormatting", value);
    }

    public boolean getMsConvertLists() {
        return (Boolean)getProperty("msConvertLists");
    }

    public void setMsConvertLists(boolean value) {
        setProperty("msConvertLists", value);
    }

    public boolean getMsTags() {
        return (Boolean)getProperty("msTags");
    }

    public void setMsTags(boolean value) {
        setProperty("msTags", value);
    }

    public boolean getNone() {
        return (Boolean)getProperty("none");
    }

    public void setNone(boolean value) {
        setProperty("none", value);
    }

    public boolean getSpan() {
        return (Boolean)getProperty("span");
    }

    public void setSpan(boolean value) {
        setProperty("span", value);
    }

//<< Attributes

}
