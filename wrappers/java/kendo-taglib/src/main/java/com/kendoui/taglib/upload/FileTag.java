
package com.kendoui.taglib.upload;


import com.kendoui.taglib.BaseTag;






import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class FileTag extends  BaseTag  /* interfaces */ /* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag

        FilesTag parent = (FilesTag)findParentWithClass(FilesTag.class);

        parent.addFile(this);

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
        return "upload-file";
    }

    public java.lang.String getExtension() {
        return (java.lang.String)getProperty("extension");
    }

    public void setExtension(java.lang.String value) {
        setProperty("extension", value);
    }

    public java.lang.String getName() {
        return (java.lang.String)getProperty("name");
    }

    public void setName(java.lang.String value) {
        setProperty("name", value);
    }

    public float getSize() {
        return (Float)getProperty("size");
    }

    public void setSize(float value) {
        setProperty("size", value);
    }

//<< Attributes

}
