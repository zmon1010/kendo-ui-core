
package com.kendoui.taglib.editor;


import com.kendoui.taglib.BaseTag;



import com.kendoui.taglib.EditorTag;



import com.kendoui.taglib.json.Function;


import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class ImmutablesTag extends  BaseTag  /* interfaces */ /* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag


        EditorTag parent = (EditorTag)findParentWithClass(EditorTag.class);


        parent.setImmutables(this);

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
        return "editor-immutables";
    }

    public void setSerialization(ImmutablesSerializationFunctionTag value) {
        setEvent("serialization", value.getBody());
    }

    public void setDeserialization(ImmutablesDeserializationFunctionTag value) {
        setEvent("deserialization", value.getBody());
    }

    public String getDeserialization() {
        Function property = ((Function)getProperty("deserialization"));
        if (property != null) {
            return property.getBody();
        }
        return null;
    }

    public void setDeserialization(String value) {
        setProperty("deserialization", new Function(value));
    }

    public java.lang.String getSerialization() {
        return (java.lang.String)getProperty("serialization");
    }

    public void setSerialization(java.lang.String value) {
        setProperty("serialization", value);
    }

//<< Attributes

}
