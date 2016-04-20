

package com.kendoui.taglib.editor;


import com.kendoui.taglib.BaseTag;
import com.kendoui.taglib.json.Function;



import com.kendoui.taglib.EditorTag;




import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class SerializationTag extends  BaseTag  /* interfaces */ /* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag


        EditorTag parent = (EditorTag)findParentWithClass(EditorTag.class);


        parent.setSerialization(this);

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
        return "editor-serialization";
    }

    public void setCustom(SerializationCustomFunctionTag value) {
        setEvent("custom", value.getBody());
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

    public boolean getEntities() {
        return (Boolean)getProperty("entities");
    }

    public void setEntities(boolean value) {
        setProperty("entities", value);
    }

    public boolean getScripts() {
        return (Boolean)getProperty("scripts");
    }

    public void setScripts(boolean value) {
        setProperty("scripts", value);
    }

    public boolean getSemantic() {
        return (Boolean)getProperty("semantic");
    }

    public void setSemantic(boolean value) {
        setProperty("semantic", value);
    }

//<< Attributes

}
